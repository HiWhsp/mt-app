import Axios from 'axios'
import urls from './urls'

const appkey = {
    appkey: "panda_1545214432912"
}
const api = Axios.create({
    baseURL: urls.baseURL,
    params: {
        ...appkey
    }
})

export default {
    search() { // 搜索框数据
        return api.get(urls.search);
    },
    searchHots() { // 热门搜索
        return api.get(urls.searchHot);
    },
    navLists() { // 首页左侧数据
        return api.get(urls.navLeft);
    },
    results() { // 首页下方数据
        return api.get(urls.results);
    },
    province() {// 获取省份数据
        return api.get(urls.province);
    },
    cityList() {// 获取城市列表数据
        return api.get(urls.cityList);
    },
    hotCity() {// 获取热门城市数据
        return api.get(urls.cityList);
    },
    recents() { // 最近访问城市数据
        return api.get(urls.recents);
    },
    classify() { // 商品分类数据
        return api.get(urls.classify);
    },
    areaList() { // 区域分类数据
        return api.get(urls.areaList);
    },
    goodsList() { // 产品数据
        return api.get(urls.goodsList);
    },
    login(data) {
        return api.get(urls.login, {
            params: {
                ...data
            }
        });
    },
    register(data) {
        return api.get(urls.register, {
            params: {
                ...data
            }
        });
    }
}