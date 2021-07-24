import React,{useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useHistory} from "react-router-dom";
import axios from 'axios';

library.add(fas, fab);
 

function LogoutBtn() {
    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post(`api/logout`)
            .then((res) => {
                if (res.data.status === 200) {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_name');
                    history.push(`/`);
                }
            });
        });
    }
    
    return (
        <div>
            <button className="flex items-center" onClick={logoutSubmit}>
                <FontAwesomeIcon icon={["fas", "sign-out-alt"]} color="#6b6b6b" size="2x" className="" />
            </button>
        </div>
    )
}

export default LogoutBtn
