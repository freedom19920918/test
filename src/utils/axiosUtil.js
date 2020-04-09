import axios from 'axios';
import qs from 'qs';


//请求拦截器
axios.interceptors.request.use((req)=>{
    console.log('req',req)
    //统一为接口添加token
    const token = localStorage.getItem('token');
    if(token){
        req.headers.token = token;
    }
    //统一处理post请求的参数
    if(req.method === 'post'){
        req.data = qs.stringify(req.data);
    }
    return req;
},(err)=>Promise.reject(err));





//响应拦截器
axios.interceptors.response.use((res)=>{
    /* 
        过滤数据（把前端所需要的的数据，给到前端）
    
    */
    console.log('res',res)
    // return Promise.reject(res)
    return res.data;
},(err)=>{
    //统一处理错误
/*     console.dir(err)
    const {response}   = err;
    if(response){
        switch(response.status){
            case 500:
                break;
            case 401:
                break;
                default:
                
        }
    } */
   
  return  Promise.reject(err)
});