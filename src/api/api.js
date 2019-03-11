import axios from 'axios'
import Qs from 'qs'
axios.defaults.widthCredentials = true;
const PROTOCOL_BRANCH = 'http://dev-open.';
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = PROTOCOL_BRANCH +'yunbisai.com';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = PROTOCOL_BRANCH + 'yunbisai.com';
}

let post = function (url, params) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: url,
            data: Qs.stringify(params),
            header: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}
// 获取赛事小组
export const postGroup = (params) => {return post('/index/index/group', params)};
// 获取赛事小组未保险人员
export const postNoPolicyPerson = (params) => {return post('/index/index/noPolicy', params)};
// 获取保险种类
export const postInsuranceClassify = (params) => {return post('/index/index/getRisk',params)};

// 钱包余额
export const postWallet = (params) => {return post('/index/index/wellet',params)}