import React from "react";

function StudentProfileData(){


    return (
        <>
            Studetn profile
        </>
    )
}

export default StudentProfileData;


export async function loader(){
    console.log("loader for student profile data");
}