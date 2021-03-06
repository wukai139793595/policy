import axios from 'axios'
import Qs from 'qs'
axios.defaults.widthCredentials = true;
const API_URL = (function () {
    // 返回请求头，如http://dev等
    if (/^dev-/.test(location.host) || /^localhost/.test(location.host)) {
        return 'http://dev-'
    } else if (/^test-/.test(location.host)) {
        return 'http://test-'
    } else {
        return 'http://'
    }
})()

if (location.host === '192.168.2.81:3001' ) {  
    // 测试环境的请求地址
    const PROCOTOL_HEAD = 'http://192.168.2.81:3001'
    var post = function (url, params) {
        let paramsStr = '?';
        let fullUrl = '';
        for (let prop in params) {
            paramsStr += `${prop}=${params[prop]}&`;
        }
        fullUrl = PROCOTOL_HEAD + url + paramsStr;
        console.log(fullUrl)
        return new Promise((resolve, reject) => {
            axios.get(fullUrl)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
    var postApi = post;
} else {
    //以http://dev-open开头的请求
    var post = function (url, params) {
        console.log(API_URL)
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: API_URL+'open.yunbisai.com'+url,
                data: Qs.stringify(params),
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Cookie': 'e9hbliskas76gss1oh24l2hui4'
                }
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }   
//以http://dev-api开头的请求
    var postApi = function (url, params) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: API_URL+'api.yunbisai.com'+url,
                data: Qs.stringify(params),
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Cookie': 'e9hbliskas76gss1oh24l2hui4'
                }
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }    
}


// 获取赛事小组
export const postGroup = (params) => {return post('/index/index/group', params)};
// 获取赛事小组未保险人员
export const postNoPolicyPerson = (params) => {return post('/index/index/noPolicy', params)};
// 获取保险种类
export const postInsuranceClassify = (params) => {return post('/index/index/getRisk',params)};
// 钱包余额
export const postWallet = (params) => {return post('/index/index/wellet',params)}
// 创建订单
export const postCreateOrder = (params) => {return post('/index/index/createOrder', params)}
// 余额支付
export const postPay = (params) => {return post('/index/index/pay', params)}
// 建行支付请求
export const postCcbPay = (params) => {return postApi('/pay/ccb', params)}
//付款订单轮询
export const postPolling = (params) => {return postApi('/pollingPay/index/index', params)}