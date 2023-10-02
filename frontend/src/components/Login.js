import React, { useState } from "react";
import axios1 from "axios";

function Login(){

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(e.target);
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        

        try {
            // const response = await axios1.post("http://127.0.0.1:8000/api/login/", formData, {
            //     withCredentials: true,
            // });
            const response = await axios1.post("http://127.0.0.1:8000/api/login/", formData,
                // {withCredentials: true,}
            );
            console.log(response);
        }catch(err){
            console.log(err);
        }
    }



    return <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="username" onChange={handleChange}></input>
            <input type="password" name="password" placeholder="password" onChange={handleChange}></input>
            <button type="submit">Login</button>

        </form>

    </>
}

export default Login;
