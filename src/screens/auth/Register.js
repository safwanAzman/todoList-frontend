import React,{useState} from 'react';

import { Link,useHistory } from "react-router-dom";
import logo from '../../logo.svg';
import google from '../../google.png';

import {
    GridAutoflow,
    Input
} from '../../components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

library.add(fas, fab);

export default function Register() {
    const history = useHistory();
    const [register, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...register, ...{[e.target.name]: e.target.value}});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: register.name,
            email: register.email,
            password: register.password,
            password_confirmation: register.password_confirmation
        }
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post(`api/register`, data)
            .then((res) => {
                if(res.data.status === 200){
                    toast.success(res.data.message);
                    history.push('/');
                    
                }else{
                    setRegister({...register, error_list: res.data.validation_errors });
                }
            });
        });
    }
    
    return (
        <div>
            <GridAutoflow mobile="1" sm="1" md="1" lg="2" xl="2" anyclass="col-span-12 h-screen">
                <div className="hidden lg:block">
                    <div className="relative flex items-center justify-center h-full bg-pink-700 rounded-r-none lg:rounded-r-custom">
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
                </div>
                <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center justify-center w-full p-10 bg-white">
                        <img src={logo} className="w-64 h-64" />
                        <p className="mb-5 text-3xl text-left text-gray-600 uppercase">Welcome to register</p>
                        <form onSubmit={handleSubmit}>
                            <Input 
                            type="text"
                            name="name" 
                            placeholder="Username" 
                            value={register.name}
                            onChange={handleInput} 
                            width="w-80 lg:w-96" 
                            errorMessage={register.error_list.name}
                            />

                            <Input 
                            type="text" 
                            name="email"
                            value={register.email}
                            onChange={handleInput}  
                            placeholder="Email" 
                            width="w-80 lg:w-96" 
                            errorMessage={register.error_list.email}
                            />

                            <Input 
                            type="password" 
                            name="password"
                            value={register.password}
                            onChange={handleInput}  
                            placeholder="Password" 
                            width="w-80 lg:w-96" 
                            errorMessage={register.error_list.password}
                            />

                            <Input 
                            type="password" 
                            name="password_confirmation" 
                            value={register.password_confirmation}
                            onChange={handleInput} 
                            placeholder="Confirm Password" 
                            width="w-80 lg:w-96"
                            errorMessage={register.error_list.password} 
                            />

                            
                            <button className="p-2 mt-4 font-bold text-white bg-pink-600 rounded hover:bg-pink-500 w-80 lg:w-96"
                                type="submit">
                                Sign up
                            </button>
                        </form>      

                        <Link to="/">
                            <button className="p-2 mt-4 font-bold text-white bg-gray-800 rounded hover:bg-gray-700 w-80 lg:w-96"
                                type="submit">
                                Back to Sign in
                            </button>
                        </Link>

                    </div>
                </div>
            </GridAutoflow>
        </div>
    );
}