import React from "react";
import {requireAuth, sleep} from "../utils";
import { defer, useLoaderData, Await } from "react-router-dom";

async function getData(){
    await sleep(2000); 
    console.log("from getData");
    return "approve-company";
}

export async function loader({request}) {
    await requireAuth(request);
    // return "approve-company";
    const dataPromise =  getData();
    console.log("from loader of approve company");
    return defer({data: dataPromise});
}

// export async function loader() {
//     return defer({ vans: getVans(), user: await getUser() })
// }


const ApproveCompany = () => {
    const d = useLoaderData();
return (
    <div>
        <h1>Approve Company</h1>
        <React.Suspense fallback={<p>Loading...</p>}>
        <Await resolve={d.data}>
            {data => <p>{data}</p>}
        </Await>
        </React.Suspense>
    </div>
);
}

export default ApproveCompany;