import { IMatch } from "@/interfaces/match.interfaces";
import axios from "axios";
import { ActionContext } from "vuex";

declare interface MatchState {
  matchResult: string;
}

const baseUrl = "http://localhost:3000";

export default {
  namespaced: true as true,
  state: {
    matchResult: "",
  },
  mutations: {
    SET_MATCH_RESULT(state: MatchState, matchResult: string) {
      console.log(matchResult);
      state.matchResult = matchResult;
    },
  },
  actions: {
    async matchNames({ commit }: ActionContext<any, any>, names: IMatch) {
      try {
        const res = (await axios.post(`${baseUrl}/match`, names, {
          headers: {
            "Content-Type": "application/json",
          },
        })) as unknown as any;
        commit("SET_MATCH_RESULT", res.data.message);
      } catch (e) {
        console.log(e);
      }
    },
    async bulkMatchNames({ commit }: ActionContext<any, any>, formData: any) {
      try {
        const res = (await axios.post(
          `${baseUrl}/bulk-match`,
          { csv: formData },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )) as unknown as any;
        commit("SET_MATCH_RESULT", res.data.message);
      } catch (e) {
        console.log(e);
      }
    },
    async averageBulkMatchNames(
      { commit }: ActionContext<any, any>,
      formData: any,
    ) {
      try {
        const res = (await axios.post(
          `${baseUrl}/average-match`,
          { csv: formData },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )) as unknown as any;
        commit("SET_MATCH_RESULT", res.data.message);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
