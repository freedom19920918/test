import axios from 'axios';
// import qs from 'qs';

//设置baseURL
axios.defaults.baseURL = `http://localhost:8000`;
//登录
// export const loginApi = (params)=>{
//    return axios.post(`http://localhost:8000/login`,params);
// }

// export const loginApi = (params)=> axios.post(`/login`,qs.stringify(params))//拦截器里面已经处理了参数
export const loginApi = (params)=> axios.post(`/login`,params)


/* 
获取房产列表
*/
export const getHouseListApi = ()=>axios.get(`/getHouseList`)

// loginApi()
// .then()
// .catch()