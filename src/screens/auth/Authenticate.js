import React, {useState} from 'react';
import {Redirect,useLocation} from "react-router-dom";
import axios from 'axios';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Authenticate() {
    let query = useQuery();

    if(localStorage.setItem("auth_token",query.get("auth_token"))){
        return <Redirect to="/Home"/>;
    }else{
        return <Redirect to="/"/>;
    }
    
}