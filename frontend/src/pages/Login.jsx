import { useSearchParams, useLoaderData, Form, redirect, useActionData, useNavigation } from "react-router-dom";
 
export async function loader({request}) {
    const message = new URL(request.url).searchParams.get("message");
    if(localStorage.getItem("loggedIn") === "true"){
        return redirect("/");
    }
    return message;
}   
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export async function action({request}) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    // const data = await loginUser({ email, password })
    console.log("from action of login : localStorage.getItem('loggedIn') ", localStorage.getItem("loggedIn") );
    if(localStorage.getItem("loggedIn") === "true"){
        return redirect("/");
    }
    
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/";
    // await sleep(2000); 
    
    try {
        if(email === 'admin@gmail.com' && password === 'admin'){
            localStorage.setItem("loggedIn", "true");
            return redirect(pathname);
        }else{
            throw new Error("Incorrect email or password");
        }
        // const user = await fakeLoginUser({ email, password })
        // throw new Error("Incorrect email or password");
        
    } catch (err) {
        return err.message
    }
    
    // await sleep(2000); 
    // return "Incorrect email or password";
}

const Login = () => {
    const message = useLoaderData();
    // const [searchParams, setSearchParams] = useSearchParams();
    const actionData = useActionData();
    const navigation = useNavigation();
    
    return (
        <div>
            <p>{message}</p>
            {actionData && <p>{actionData}</p>}
            <h1>Login</h1>
            <Form method="post" replace>
                <input name="email" type="email" placeholder="Email address" />
                <input name="password" type="password" placeholder="Password"/>
                <button disabled={navigation.state==='submitting'}>
                    {navigation.state==='submitting' ? 'Submitting...' : 'Submit'}
                </button>
            </Form>
        </div>
    )
}

export default Login;