import React from 'react';

import { Link } from "react-router-dom";
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

library.add(fas, fab);

export default function Login() {
    return (
        <div>
            <GridAutoflow mobile="1" sm="1" md="1" lg="2" xl="2" anyclass="col-span-12">
                <div className="relative bg-pink-700 h-screen rounded-r-none lg:rounded-r-custom flex items-center justify-center">
                    <div className="absolute top-0 left-0 px-6 py-4 text-2xl text-white font-semibold ">
                        todo-list
                    </div>
                    <div className="text-4xl leading-snug lg:text-5xl px-6 max-w-lg lg:leading-snug text-white uppercase myfont">
                        Success is never getting to the bottom of your <br />to-do list.
                        <div className="block lg:hidden">
                            <div className="flex  justify-center">
                                <div className="text-sm rounded-lg border-2 p-5 absolute bottom-0 my-4 animate-bounce">
                                    <p>Sign in</p>
                                    <div classNmae="">
                                        <FontAwesomeIcon icon={["fas", "long-arrow-alt-down"]} color="#ffffff" size="lg" className="ml-7 mt-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center h-full justify-center w-full">
                    <div class="p-10 bg-white flex justify-center items-center flex-col">
                        <img src={logo} className="w-64 h-64"/>
                        <p class="mb-5 text-3xl uppercase text-gray-600 text-left">Welcome to login</p>
                        
                        <Input type="text" name="email" placeholder="Email" width="w-80 lg:w-96" />

                        <Input type="password" name="password" placeholder="Password" width="w-80 lg:w-96" />

                        <Link to="/Home">
                            <button class="bg-pink-600 hover:bg-pink-500 text-white font-bold p-2 rounded w-80 lg:w-96 mt-4"
                                type="submit">
                                Sign in
                            </button>
                        </Link>
                        <div className="border-t-2 mt-4 border-gray-400 w-full">
                            <p className="py-2 text-gray-500">Or create new account</p>
                        </div>
                        <Link to="/Register">
                            <button class="bg-gray-800 hover:bg-gray-700 text-white font-bold p-2 rounded w-80 lg:w-96 "
                                type="submit">
                                Sign up
                            </button>
                        </Link>
                        <button class="text-sm bg-gray-200  text-gray-600 font-semibold p-2 rounded w-80 lg:w-96 mt-4"
                            type="submit">
                                <div className="flex items-center justify-center space-x-2">
                                    <img src={google} className="w-6 h-6"/>
                                    <p>Sign Up With Google</p>
                                </div>
                        </button>
                    </div>
                </div>
            </GridAutoflow>
        </div>
    );
}