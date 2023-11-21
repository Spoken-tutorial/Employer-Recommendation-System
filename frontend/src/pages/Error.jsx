import { useRouteError } from "react-router-dom";


const Error = () => {

    const error = useRouteError();
    console.log(Object.getOwnPropertyNames(error));
    return (
        <>
    An error has occured : {error.message}
    </>
    )
}

export default Error;