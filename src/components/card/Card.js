import React,{useState} from "react";

import Slide from 'react-reveal/Slide';



function Card(props) {
    return (
        <div className="flex flex-col mb-4">
            <div className="bg-white shadow-lg  rounded-3xl p-4 border-2" >
                <div className="flex-none lg:flex">
                    <div className=" h-full w-full lg:h-48 lg:w-48   lg:mb-0 mb-3">
                        <img src={`${props.taskImg}`}
                            alt="Just a flower" className="w-full  object-scale-down lg:object-cover  lg:h-48 rounded-2xl" />
                    </div>
                    <div className="flex-auto ml-3 justify-evenly py-2">
                        <div className="flex flex-wrap  justify-between">
                            <div>
                                <h2 className={(props.complete == "complete") ? `line-through flex-auto text-xl font-medium` :'flex-auto text-xl font-medium'}>{props.taskName}</h2>
                            </div>
                            <div>
                                <button onClick={props.onClick} 
                                    className={(props.complete == "complete") ? `bg-pink-700 rounded-full p-1 text-pink-100 focus:outline-none focus:ring-2` : 'hidden'}>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                
                            </div>
                        </div>
                        <p className="mt-3"></p>
                        <div className="flex py-4  text-base text-gray-600">
                            <div className="flex-1 inline-flex items-center">
                                {/* icon */}
                                <p className={(props.complete == "complete") ? `line-through ` : 't'}>
                                    <p  className={props.levelTask == "1" ? 'text-green-500':''}>
                                        {props.levelTask == "1" ?
                                            "LOW LEVEL"
                                        :
                                        null
                                        }
                                    </p>
                                    
                                    <p className={props.levelTask == "2" ? 'text-yellow-500 ':''}>
                                        {props.levelTask == "2" ?
                                            "MEDIUM LEVEL"
                                            :
                                            null
                                        }
                                    </p>

                                    <p className={props.levelTask == "3" ? 'text-red-500 ':''}>
                                        {props.levelTask == "3" ?
                                            "HIGH LEVEL"
                                            :
                                            null
                                        }
                                    </p>
                                </p>
                            </div>
                            <div className="flex-1 inline-flex items-center">
                                {/* icon */}
                                <p className={(props.complete == "complete") ? `line-through` : ''}>{props.dateTask}</p>

                            </div>
                        </div>
                        <div className="flex p-4 pb-2 border-t border-gray-200 "></div>
                        <div className="flex space-x-3 text-sm font-medium">

                            <div class="flex-auto flex space-x-3">
                                <label class="inline-flex items-center ">
                                    <input type="checkbox" class="form-checkbox h-5 w-5 text-pink-600" 
                                    checked={props.complete == "complete" ? true : false}
                                    onChange={props.checkedTask}/>
                                </label>
                            </div>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;