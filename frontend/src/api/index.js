import axios from "axios";

console.log("Inside axios create !!!!");
// Create an Axios instance
const api = axios.create({
    baseURL: process.env.REACT_APP_API_LINK,
});

// Request interceptor to add the access token to headers
// api.interceptors.request.use(
    
//     (config) => {
//         console.log("api.interceptors.request.use");
//         const token = localStorage.getItem('access');
//         if (token){
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     }, (error) => {
//         console.log("error api.interceptors.request.use");
//         return Promise.reject(error);
// });

// Response interceptor to handle token refresh
// api.interceptors.response.use(
//     (response) => {
//         return response;
//     }, async (error) => {
//         const originalRequest = error.config;

//         if(error.response){
//             console.log("STATUS ", error.response)
//             console.log( error);
//             console.log( error.response);
//             if (error.response.status === 401 && !originalRequest._retry){
//                 originalRequest._retry = true;
//                 try{
//                     const refreshToken = localStorage.getItem('refresh');
//                     if(!refreshToken){
//                         console.error('No refresh token found');
//                         return Promise.reject(error);
//                     }
//                     const url = `${process.env.REACT_APP_API_LINK}api/token/refresh/`;
//                     const response = await axios.post(url, {refresh: refreshToken});
//                     const {access, refresh} = response.data;

//                     // Store new tokens
//                     localStorage.setItem('access', access);
//                     localStorage.setItem('refresh', refresh);

//                     // Update the authorization header
//                     api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
//                     originalRequest.headers['Authorization'] = `Bearer ${access}`;

//                     // Retry the original request
//                     return api(originalRequest);

//                 }catch(refreshError){
//                     console.error('Failed to refresh token', refreshError);
//                     // Handle token refresh failure (e.g., logout user) #ToDo
//                     localStorage.removeItem('access');
//                     localStorage.removeItem('refresh');
//                     window.location.href = '/login'; 
//                     return Promise.reject(refreshError);
//                 }

//             }
//         }else{
//             console.log("ERROR RESPONSE NOT PRESENT ");
//             if (!originalRequest._retry) {
//                 originalRequest._retry = true;
//             }
//         }
//         return Promise.reject(error);
// });
export default api;