import { Inject, Service } from "typedi";
import { Request, Response, NextFunction } from "express";
import { MatchService } from "../services/match.service";
import { IMatch, IMatchedList, INameAndGender } from "../interfaces/match.interface";
import { Logger } from "../helpers/logger.helper";

@Service()
export class MatchController {
  // eslint-disable-next-line no-useless-constructor
  constructor(@Inject() private matchService: MatchService) {}

  /**
   * @method matchNames
   * @instance
   * @async
   * @param {Request} req
   * @param {Response} res
   */
  matchNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const names = req.body as IMatch;
      const percentage = await this.matchService.match(names);
      const message = this.matchService.matchStatement(names, percentage);

      return res.status(200).json({ status: true, message });
    } catch (e) {
      Logger.error(e.message);
      next(e);
    }
  };

  /**
   * @method bulkMatchNames
   * @instance
   * @async
   * @param {Request} req
   * @param {Response} res
   */
  bulkMatchNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nameList = await this.matchService.resolveCsvToArray(req.files.csv);
      let resolvedList: IMatchedList[];
      let message: string = "";
      if (nameList.length) {
        resolvedList = await this.matchService.bulkMatch(nameList);
        message = await this.matchService.outputTxt(resolvedList);
      } else {
        resolvedList = [];
      }
      return res.status(200).json({ status: true, matches: resolvedList, message });
    } catch (e) {
      Logger.error(e.message);
      next(e);
    }
  };

  /**
   * @method averageMatchNames
   * @instance
   * @async
   * @param {Request} req
   * @param {Response} res
   */
  averageMatchNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const nameList = await this.matchService.resolveCsvToArray(req.files.csv);
      let resolvedList: IMatchedList[];
      let message: string = "";
      if (nameList.length) {
        resolvedList = await this.matchService.bulkMatch(nameList, true);
        message = await this.matchService.outputTxt(resolvedList, "./average-output.txt");
      } else {
        resolvedList = [];
      }
      return res.status(200).json({ status: true, matches: resolvedList, message });
    } catch (e) {
      Logger.error(e.message);
      next(e);
    }
  };
}
