import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_LINK
});

// A request interceptor
api.interceptors.request.use(
    function (config){
        // Get the token
        const token = localStorage.getItem('access');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function(error){
        console.log("ERROR IN REUQEST INTERCEPTOR");
        return Promise.reject(error);
    }
);

export default api;