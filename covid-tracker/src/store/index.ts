import { COVID_API } from '@/constants/constants';
import { HospitalRegion, HospitalStats, LatestStats } from '@/models/summary';
import apiClient from '../services/covid-api-service';
import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';

Vue.use(Vuex);

type State = {
  latestStats?: LatestStats;
  hospitalStats?: HospitalStats;
};

const getDefaultState = () => {
  return {
    latestStats: undefined,
    hospitalStats: undefined,
  };
};
export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    setLatestStats(state: State, data: LatestStats) {
      Vue.set(state, 'latestStats', data || {});
    },
    setHospitalsData(state: State, data: HospitalStats) {
      if (data && data.regional) {
        data.regional = data.regional.filter(
          (region: HospitalRegion) => region.state !== 'INDIA',
        );
      }
      Vue.set(state, 'hospitalData', data || {});
    },
  },
  actions: {
    async getLatestCovidStats(context: ActionContext<State, object>) {
      const { data } = await apiClient.get(COVID_API.LATEST_STATS);
      context.commit('setLatestStats', data);
    },
    async getHospitalInfo(context: ActionContext<State, object>) {
      const { data } = await apiClient.get(COVID_API.HOSPITAL_INFO);
      context.commit('setHospitalsData', data);
    },
  },
});
