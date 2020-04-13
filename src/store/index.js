import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, //严格模式开启
  state: {
    hotPlace: [], // 热点查询数据
    searchList: [], // 搜索框数据
    navLeft: [], // 首页左侧导航数据
    results: [], // 首页下发数据
    province: [], // 省份数据
    hotCity: [], // 热门城市数据
    cityList: [], // 所有城市数据
    position: {}, // 当前城市
    userName: '', // 登录用户名
  },
  mutations: {
    setHotPlace(state, hot) {
      state.hotPlace = hot.slice(0, 5);
    },
    searchList(state, search) {
      state.searchList = search;
    },
    setNavLeft(state, nav) {
      state.navLeft = nav;
    },
    setResults(state, res) {
      state.results = res;
    },
    setProvince(state, data) {
      state.province = data;
    },
    setHotCity(state, data) {
      state.hotCity = data;
    },
    setCityList(state, data) {
      state.cityList = data;
    },
    setPosition(state, data) {
      state.position = data;
    },
    setUserName(state, data) {
      state.userName = data;
    }
  },
  actions: {
    getSearch({ commit }) {
      api.search().then(data => {
        commit('searchList', data.data.data.list)
      })
    },
    getHotPlace({ commit }) {
      api.searchHots().then(data => {
        commit('setHotPlace', data.data.data);
      })
    },
    getNavLeft({ commit }) {
      api.navLists().then(data => {
        commit('setNavLeft', data.data.data)
      })
    },
    getResult({ commit }, type = 'all') {
      return api.results().then(data => {
        const arr = data.data.data;
        let ele = [];
        for (const key in arr) {
          const nowKey = arr[key];
          if (key === type) {
            for (const i in nowKey) {
              ele.push(nowKey[i]);
            }
          }
        }
        commit('setResults', ele);
        return ele;
      })
    },
    getProvince({ commit }) {
      let content = 0;
      return api.province().then(data => {
        const res = data.data.data;
        for (const key in res) {
          // 循环省份，得到所有城市
          content += res[key].cityInfoList.length; // 记录城市数量
        }
        let searchList = new Array(content); // 创建一个和城市数量相同的数组
        for (let i = 0; i < res.length; i++) {
          for (let j = 0; j < res[i].cityInfoList.length; j++) {
            searchList.push(res[i].cityInfoList[j]);
          }
        }
        commit("setCityList", searchList);
        commit('setProvince', res)
        return searchList;
      })
    },
    getHotCity({ commit }) {
      return api.hotCity().then(data => {
        commit('setHotCity', data.data.data);
        return data.data.data;
      })
    },
    getRecents({ commit }) {
      return api.recents().then(data => {
        return data.data.data;
      })
    },
    getPosition({ commit }, data) {
      commit('setPosition', data)
    },
    getClassify({ commit }) {
      return api.classify().then(data => {
        return data.data.data;
      })
    },
    getGoodsList({ commit }) {
      return api.goodsList().then(data => {
        return data.data.data;
      })
    },
    getPosition({ commit }, data) {
      commit('setPosition', data);
    }
  },
  modules: {
  }
})
