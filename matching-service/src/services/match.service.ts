import { Service } from "typedi";
import { Readable } from "stream";
import fs from "fs";
import { parseStream } from "fast-csv";
import { Gender } from "../constants/gender.constants";
import { IMatch, IMatchedList, INameAndGender } from "../interfaces/match.interface";
import { Logger } from "../helpers/logger.helper";

@Service()
export class MatchService {
  /**
   * @method match
   * @async
   * @param {IMatch} names
   * @returns {Promise<number>}
   */
  async match(names: IMatch): Promise<number> {
    const matchStr = `${names.nameOne}matches${names.nameTwo}`.toLowerCase();
    const charArr = matchStr.split("");
    const charCount: number[] = Object.values(
      charArr.reduce((obj, b) => {
        obj[b] = ++obj[b] || 1;
        return obj;
      }, {}),
    );

    return parseInt(await this.calculatePercentage(charCount.join("")));
  }

  /**
   * @method calculatePercentage
   * @async
   * @private
   * @param {number []} numbers
   * @returns {Promise<number>}
   */
  private async calculatePercentage(numbers: string): Promise<string> {
    let total: string = "";
    while (numbers.length > 1) {
      total += (parseInt(numbers[0]) + parseInt(numbers[numbers.length - 1])).toString();
      numbers = numbers.substring(1, numbers.length - 1);
    }
    total += numbers;

    return total.length > 2 ? this.calculatePercentage(total) : total;
  }

  /**
   * @method bulkMatch
   * @async
   * @param {INameAndGender[]} nameList
   * @param {boolean} averageMatch
   * @returns {Promise<IMatchedList[]>}
   */
  async bulkMatch(nameList: INameAndGender[], averageMatch: boolean = false): Promise<IMatchedList[]> {
    const maleList: INameAndGender[] = nameList.filter((individual) => individual.gender === Gender.MALE);
    const femaleList: INameAndGender[] = nameList.filter((individual) => individual.gender === Gender.FEMALE);
    let finalList: IMatchedList[] = [];
    let male: string;
    let female: string;
    let names: IMatch;
    let names2: IMatch;
    let percentage: number;

    for (let i = 0; i < maleList.length; i++) {
      male = maleList[i].name;
      for (let j = 0; j < femaleList.length; j++) {
        female = femaleList[j].name;
        names = {
          nameOne: male,
          nameTwo: female,
        };

        if (averageMatch) {
          names2 = {
            nameOne: female,
            nameTwo: male,
          };

          percentage = ((await this.match(names)) + (await this.match(names2))) / 2;
        } else {
          percentage = await this.match(names);
        }

        finalList.push({
          nameOne: names.nameOne,
          nameTwo: names.nameTwo,
          percentage,
        });
      }
    }

    return finalList.sort((a, b) => {
      if (b.percentage - a.percentage === 0) {
        if (b.nameOne.toUpperCase() === a.nameOne.toUpperCase()) {
          if (b.nameTwo.toUpperCase() > a.nameTwo.toUpperCase()) {
            return -1;
          } else {
            return 1;
          }
        } else if (b.nameOne.toUpperCase() > a.nameOne.toUpperCase()) {
          return -1;
        } else {
          return 1;
        }
      }
      return b.percentage - a.percentage;
    });
  }

  /**
   * @method resolveCsvToArray
   * @async
   * @param {any} uploadData
   * @returns {Promise<INameAndGender[]>}
   */
  async resolveCsvToArray(uploadData: any): Promise<INameAndGender[]> {
    const options = {
      objectMode: true,
      delimiter: ",",
      quote: null,
      headers: true,
      renameHeaders: false,
    };
    const readableStream = Readable.from(uploadData.data);

    return new Promise((resolve, reject) => {
      let nameList: INameAndGender[] = [];

      parseStream(readableStream, options)
        .on("error", (e) => {
          Logger.error(e.message);
          reject(e);
        })
        .on("data", (row) => {
          nameList.push(row);
        })
        .on("end", () => {
          resolve(nameList);
        });
    });
  }

  /**
   * @method outputTxt
   * @async
   * @param {IMatchedList} matchedList
   * @returns {Promise<void>}
   */
  async outputTxt(matchedList: IMatchedList[], fileName: string = "./output.txt"): Promise<void> {
    let outputData: string = "";
    let names: IMatch;

    for (let i = 0; i < matchedList.length; i++) {
      names = {
        nameOne: matchedList[i].nameOne,
        nameTwo: matchedList[i].nameTwo,
      };
      outputData += `${this.matchStatement(names, matchedList[i].percentage)}\n`;
    }

    fs.writeFile(fileName, outputData, (err) => {
      if (err) {
        Logger.error(err.message);
      }
      Logger.info("File successsfully created!");
    });
  }

  /**
   * @method matchStatement
   * @param {IMatch} names
   * @param {number} percentage
   * @returns {string}
   */
  matchStatement(names: IMatch, percentage: number): string {
    return percentage >= 80
      ? `${names.nameOne} matches ${names.nameTwo} ${percentage}%, good match`
      : `${names.nameOne} matches ${names.nameTwo} ${percentage}%`;
  }
}
