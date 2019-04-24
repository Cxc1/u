import axios from 'axios'
import API from '../api'
import qs from 'qs'


export function getdata(url, options) {
  return new Promise((resolve, reject) => {
    axios.post(API.URL + url, qs.stringify(options))
      .then(response => {

        resolve(response);
      })
      .catch(error => {
        console.log(error);
      })
  })
}
export function getdata_u(url, options) {
  return new Promise((resolve, reject) => {
    axios.post(API.URL_U + url, qs.stringify(options))
      .then(response => {

        resolve(response);
      })
      .catch(error => {
        console.log(error);
      })
  })
}

export function getdataBz(url, options) {
  return new Promise((resolve, reject) => {
    axios.post(API.URL + url, qs.stringify(options))
      .then(response => {

        resolve(response);
      })
      .catch(error => {
        console.log(error);
      })
  })
}



//获取用户信息
export function getuserinfo(options) {
  return new Promise((resolve, reject) => {
    axios.post(API.USERINFO_URL, qs.stringify(options))
      .then(response => {

        resolve(response);
      })
      .catch(error => {
        console.log(error);
      })
  })
}

