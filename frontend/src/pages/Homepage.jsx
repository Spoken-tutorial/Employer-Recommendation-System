import { Link, useLoaderData } from "react-router-dom";
import { Alert, Button, Container } from "react-bootstrap";

import Navbar from '../layout/Navbar.jsx';
import Layout from '../layout/Layout.jsx';
import Header from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";
export function loader() {
    return "This is from loader function";
    // throw new Error("This is from loader function");
    // throw {
    //     status: 404,
    //     message: "This is from loader function",
    // }
    // 
}

function clearLocalStorage(){
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedin");

}


const Homepage = () => {

    const data = useLoaderData();
    // throw new Error("This is from Homepage");
    return <>
   
    <Container fluid>
        <Header />
        <main>
            <Link to="/approve/companies" className='me-2'>Approve Company</Link>
            <Button onClick={clearLocalStorage}>Clear Local Storage</Button>
        </main>
        <Footer />
        
    </Container> 
    </>
}

export default Homepage;