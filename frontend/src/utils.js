import { redirect } from 'react-router-dom';


export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function requireAuth(request){
    const isLoggedIn = localStorage.getItem("loggedIn");
    const pathName = new URL(request.url).pathname ;
    // localStorage.getItem('loggedIn');
    if(isLoggedIn!== 'true') {
        // throw redirect('/login?message=You are required to login to view this page');
        throw redirect(`/login?redirectTo=${pathName}`);
    }else{
        console.log('logged in so pathName', pathName)
    }
    console.log('loader of approve company reg')
    // return null
}