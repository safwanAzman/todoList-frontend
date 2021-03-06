import React, { useState} from "react";
import Slide from 'react-reveal/Slide';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons"
import { GridAutoflow, Input, Select, ImagePreview } from '../../components'

library.add(fas, fab);



function SlideOver(props) {

    // upload image to storage
    const [image, setImage] = useState({ preview: "", raw: "" });

    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };

    return (
        <div>

            <button onClick={props.setSlide} className={`bg-${props.bg}-700 hover:bg-${props.bg}-800 rounded-full py-4 px-4 flex items-center`}>
                <FontAwesomeIcon icon={["fas", `${props.icon}`]} color="#ffffff" size="lg" className="" />
            </button>

            <div className={props.slide ? `fixed inset-0 overflow-hidden z-40` : `hidden` }>
                <div className="absolute inset-0 overflow-hidden">

                    <div className="absolute inset-0 bg-black opacity-30"></div>

                    <div className="fixed inset-y-0 flex max-w-full pl-0 lg:-left-10 lg:pl-10">
                        <div className="w-screen max-w-md">
                            <Slide left>
                                <div className="z-50 flex flex-col w-full h-full overflow-y-auto bg-white shadow-xl">
                                    <div className="px-4 py-6 bg-pink-700 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg font-medium text-white" >
                                                {props.title}
                                            </h2>
                                            <div className="flex items-center ml-3 h-7">
                                                <button onClick={props.setSlide}
                                                    className="text-pink-100 bg-pink-700 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                            d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-1">
                                            <p className="text-sm text-gray-100">
                                                {props.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative flex-1 px-4 py-6 sm:px-6">
                                        <div className="absolute inset-0 px-4 py-6 sm:px-6">
                                            <div className="w-full px-4 py-4 border-2 border-gray-200">
                                                <form onSubmit={props.formSubmit}>
                                                    <GridAutoflow mobile="1" sm="1" md="1" lg="1" xl="1" anyclass="">
                                                        
                                                        <div className="w-40 h-full px-4 py-4 bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-400">
                                                            <label htmlFor="file_name">
                                                                {props.imagePreview ? (
                                                                    <img src={props.imagePreview} alt="img" className="w-40 h-36" />
                                                                ) : (
                                                                    <div>
                                                                        <div className="flex flex-col items-center justify-center text-sm font-semibold text-center text-pink-700 h-36">
                                                                            <FontAwesomeIcon icon={["fas", "cloud-upload-alt"]} color="#bf125d" size="lg" className="animate-bounce" />
                                                                            Upload Image
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </label>
                                                            <input type="file" id="file_name" name="file_name" style={{ display: "none" }} onChange={props.imageChange} />
                                                        </div>
                                                        
                                                        <Input type="text" name="task_name" label="Name of Task" width="w-full"
                                                            id="task_name"
                                                            onChange={props.TaskNameChange}
                                                            value={props.TaskNameValue}
                                                        />

                                                        <Select type="text" name="task" label="Level of Task" width="w-full"
                                                            onChange={props.TaskLevelChange}>
                                                            <option value="1" selected={props.TaskLevelValue =="1" ? true :false}>LOW</option>
                                                            <option value="2" selected={props.TaskLevelValue == "2" ? true : false}>MEDIUM</option>
                                                            <option value="3" selected={props.TaskLevelValue == "3" ? true : false}>HIGH</option>
                                                        </Select>

                                                    </GridAutoflow>
                                                    <GridAutoflow mobile="2" sm="1" md="2" lg="2" xl="2" anyclass="mt-6">

                                                        <Input type="date" name="start_date" label="Start Date" width="w-full"
                                                            date="dd/mmm/Y"
                                                            id="start_date"
                                                            onChange={props.TaskStarDateChange}
                                                            value={props.TaskStarDateValue} />

                                                        <Input type="date" name="end_date" label="End Date" width="w-full"
                                                            date="dd/mmm/Y"
                                                            id="end_date"
                                                            onChange={props.TaskEndDateChange}
                                                            value={props.TaskEndDateValue}  />

                                                    </GridAutoflow>
                                                    <GridAutoflow mobile="1" sm="1" md="1" lg="1" xl="1" anyclass="py-6">
                                                        <button onClick={props.loading}
                                                            class="bg-pink-600 hover:bg-pink-500 text-white font-bold p-2 rounded w-full"
                                                            type="submit" >
                                                            Submit
                                                        </button>
                                                    </GridAutoflow>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Slide>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );

}

export default SlideOver;