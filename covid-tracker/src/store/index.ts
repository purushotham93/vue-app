import { COVID_API } from '@/constants/constants';
import { LatestStats } from '@/models/summary';
import apiClient from '../services/covid-api-service';
import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';

Vue.use(Vuex);

type State = {
  latestStats?: LatestStats;
};

const getDefaultState = () => {
  return {
    latestStats: undefined,
  };
};
export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    clearState(state: State, data: any) {
      Object.assign(state, getDefaultState());
    },
    setLatestStats(state: State, data: LatestStats) {
      Vue.set(state, 'latestStats', data || {});
    },
  },
  actions: {
    async getLatestCovidStats(context: ActionContext<State, object>) {
      const { data } = await apiClient.get(COVID_API.LATEST_STATS);
      context.commit('setLatestStats', data);
    },
  },
  modules: {},
});
