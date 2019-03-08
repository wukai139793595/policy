import axios from 'axios'
import Qs from 'qs'
axios.defaults.widthCredentials = true;
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://dev-open.yunbisai.com';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://dev-open.yunbisai.com';
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

export const postInsuranceClassify = (params) => {return post('/index/index/getRisk',params)};