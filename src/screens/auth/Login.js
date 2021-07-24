import React, {useState} from 'react';

import { Link ,useHistory} from "react-router-dom";
import logo from '../../logo.svg';
import google from '../../google.png';

import {
    GridAutoflow,
    Input
} from '../../components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons"

import Authenticate from './Authenticate';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

library.add(fas, fab);

export default function Login() {
    const history = useHistory();
    const [login, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });
    
    if(localStorage.getItem('auth_token')){
        history.push(`/Home`);
    }
    const handleInput = (e) => {
        e.persist();
        setLogin({...login, ...{[e.target.name]: e.target.value}});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: login.email,
            password: login.password
        }
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data)
            .then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    history.push(`/Home`);
                }else if (res.data.status === 401){
                    toast.error(`${res.data.message}`);
                    history.push(`/`);
                }else{
                    setLogin({...login, error_list: res.data.validation_errors });
                }
            });
        });
    }

    const googleBtn = async () => {
        try {
            const response = await axios.get(`api/google`)
            window.location = response.data;
            
        } catch (error) {
            console.error(error);
        }
    }


    
    return (

        <div>
            
            <ToastContainer
                position="top-right"
                hideProgressBar={true}
            />
            <GridAutoflow mobile="1" sm="1" md="1" lg="2" xl="2" anyclass="col-span-12 h-screen w-screen">
                <div className="relative flex items-center justify-center h-screen bg-pink-700 rounded-r-none w- lg:rounded-r-custom lg:h-full">
                    <div className="absolute top-0 left-0 px-6 py-4 text-2xl font-semibold text-white ">
                        todo-list
                    </div>
                    <div className="max-w-lg px-6 text-4xl leading-snug text-white uppercase lg:text-5xl lg:leading-snug myfont">
                        Success is never getting to the bottom of your <br />to-do list.
                        <div className="block lg:hidden">
                            <div className="flex justify-center">
                                <div className="absolute bottom-0 p-5 my-4 text-sm border-2 rounded-lg animate-bounce">
                                    <p>Sign in</p>
                                    <div>
                                        <FontAwesomeIcon icon={["fas", "long-arrow-alt-down"]} color="#ffffff" size="lg" className="mt-2 ml-7" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center h-full ">
                    <div className="flex flex-col items-center justify-center w-full p-10 bg-white">
                        <img src={logo} className="w-64 h-64"/>
                        <p className="mb-5 text-3xl text-left text-gray-600 uppercase">Welcome to login</p>
                        <form onSubmit={handleSubmit}>
                            <Input 
                            type="email" 
                            name="email" 
                            value={login.email}
                            onChange={handleInput} 
                            placeholder="Email" 
                            width="w-80 lg:w-96" 
                            errorMessage={login.error_list.email}
                            />
                            
                            <Input 
                            type="password" 
                            name="password" v
                            alue={login.password} 
                            onChange={handleInput} 
                            placeholder="Password" 
                            width="w-80 lg:w-96"
                            errorMessage={login.error_list.password} 
                            />

                            <button  className="p-2 mt-4 font-bold text-white bg-pink-600 rounded hover:bg-pink-500 w-80 lg:w-96"
                                type="submit">
                                Sign in
                            </button>
                            
                            <p className="pt-1 pb-4 mt-4 text-gray-500 border-t-2 border-gray-400 ">Or create new account</p>
                        </form>
                        
                        
                        <Link to="/Register">
                            <button className="p-2 font-bold text-white bg-gray-800 rounded hover:bg-gray-700 w-80 lg:w-96 "
                                type="submit">
                                Sign up
                            </button>
                        </Link>

                        <button onClick={googleBtn} className="p-2 mt-4 text-sm font-semibold text-gray-600 bg-gray-200 rounded w-80 lg:w-96"
                            type="submit">
                                <div className="flex items-center justify-center space-x-2">
                                    <img src={google} className="w-6 h-6"/>
                                    <p>Sign in With Google</p>
                                </div>
                        </button>
                        
                    </div>
                </div>
            </GridAutoflow>
        </div>
    );
}