import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import '../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons"
import axios from 'axios';
import { useFormik } from 'formik';
import { ToWords } from 'to-words';

//component
import {
    Slideover,
    GridManualflow,
    GridManualitem,
    TabRender,
    Card,
    CardEmpty,
    LogoutBtn
} from '../components'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

library.add(fas, fab);

export default function Home() {

    const token = localStorage.getItem("auth_token");
    

    //list of tasks
    const [list, setList] = useState([]);

    //list of profile
    const [profile, setProfile] = useState([]);

    const profileList = async () => {
        try {
            const response = await axios.get('api/profile')
            setProfile([{name:response.data.user.name}])
        } catch (error) {
            console.error(error);
        }
    }
    
    
    //get id for edit 
    const [listId, setListId] = useState(null);

    //edit State
    const [editData, setEditData] = useState({
        user_id: '1',
        task_name: '',
        task_level: '',
        start_date: '',
        end_date: '',
        file_name: ''
    });

    //edit Tasks slider
    const [editSlide, setEditSlideState] = useState(false)

    //Add Tasks slider
    const [addSlide, setAddSlideState] = useState(false)


    useEffect(() => {
        lists()
        profileList()
    }, []);

    const triggerday = (type) => {
        
        if (type == 'DAY') {
            lists()
        }else if (type == 'WEEK') {
            listsweek()
        } else{
            listsmonth()
        }
    }

//get list of tasks by token
    
    //Read data
    const lists = async () => {
        try {
            const response = await axios.get(`api/tasks`)
            setList(response.data.tasks)
            
        } catch (error) {
            console.error(error);
        }
    }

    //Read Data by Week
    const listsweek = async () => {
        try {
            const response = await axios.get('api/tasksWeek')
            setList(response.data.tasks)
        } catch (error) {
            console.error(error);
        }
    }


    //Read Data by Month
    const listsmonth = async () => {
        try {
            const response = await axios.get('api/tasksMonth')
            setList(response.data.tasks)
        } catch (error) {
            console.error(error);
        }
    }

    //Update status
    const updateStatus = async (id,type) => {
        try {
            const response = await axios.get(`api/tasks/${id}`)
            triggerday(type)

        } catch (error) {
            console.error(error);
        }
    }

    
    //Delete data
    const deleteTask = async (id,type) => {
        try {
            const response = await axios.delete(`api/tasks/${id}`)
            lists()
            triggerday(type)
            toast.success("Your task successfully deleted")
            return
        } catch (error) {
            console.error(error);

        }
    }

    //validate using Formik
    

    //Create data
    const formik = useFormik({
        initialValues: {
            user_id: '',
            task_name: '',
            task_level: '',
            start_date: '',
            end_date: '',
            file_name: ''
        },
        onSubmit: async (values, {resetForm}) => {
            resetForm(values)
            setImage(values)
            try {
                const data = new FormData()
                data.append('task_name', values.task_name)
                data.append('task_level', values.task_level)
                data.append('start_date', values.start_date)
                data.append('end_date', values.end_date)
                data.append('file_name', image.raw)
                const response = await axios.post('api/tasks',  data , 
                { headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json' , 
                    'Content-Type':"multipart/form-data" 
                } })
                lists()
                toast.success("Your task successfully added")
                setAddSlideState(!addSlide)
            } catch (error) {
                console.error(error);
            }
        },
        onSubmitSuccess: values => {
            console.log(values);
        },
        onSubmitFail: values => {
            console.log(values);
        }
    });

    
    //update data
    const updateFormik = useFormik({
        initialValues: editData,
        enableReinitialize:true,
        onSubmit: async (values, type) => {
            setImage(values)
            try {
                const data = new FormData()
                data.append('id', values.id)
                data.append('task_name', values.task_name)
                data.append('task_level', values.task_level)
                data.append('start_date', values.start_date)
                data.append('end_date', values.end_date)
                data.append('file_name', image.raw)
                const response = await axios.post(`api/tasks/${listId}/update`, data,
                { headers: { 
                    'Accept': 'application/json' , 
                    'Content-Type':"multipart/form-data" 
                } }
                ) 
                lists()
                triggerday(type)
                toast.success("Your task successfully updated")
                setEditSlideState(!editSlide)
            } catch (error) {
                console.error(error);
            }
        },
        onSubmitSuccess: values => {
            console.log(values);
        },
        onSubmitFail: values => {
            console.log(values);
        }
    });
    

    //convert number to words
    const toWords = new ToWords();
    let words = toWords.convert(list.length);

    //upload image
    const [image, setImage] = useState({ preview: "", raw: "" });
    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
            formik.setFieldValue('file_name', e.target.files[0].name);
        }
    };

    const [tabIndex , setTabIndex] = useState(1);

    const data = [
        {
            title: "TODAY",
            tab: '1',
            changeIndex: (index) => {
                lists()
                setTabIndex(index)
            },            
            content:
                <div>
                    <ToastContainer
                        position="bottom-right"
                    />
                    {list.length > 0 ?
                        <div>
                            {list.map(item =>
                            
                                <Card
                                    taskImg={"http://127.0.0.1:8000/storage/" + item.file_name }
                                    taskName={item.task_name}
                                    levelTask={item.task_level}
                                    dateTask={item.expired}
                                    complete={item.status}
                                    checkedTask={() => updateStatus(item.id,"DAY")}
                                    onClick={() => deleteTask(item.id,"DAY")}
                                >
                                    <Slideover bg="gray" icon="marker" title="Edit Task" description="Enjoy your Work and always productive"
                                        setSlide={() => 
                                            {   
                                                setEditData(
                                                    {
                                                        
                                                        id: item.id,
                                                        file_name: item.file_name,
                                                        task_name: item.task_name,
                                                        task_level: item.task_level,
                                                        start_date: item.start_date,
                                                        end_date: item.end_date,
                                                    }
                                                )
                                                
                                                setListId(item.id)
                                                setEditSlideState(!editSlide)
                                            }
                                        }
                                        slide={editSlide}
                                        formSubmit={updateFormik.handleSubmit}
                                        imagePreview={image.preview ? image.preview : "http://127.0.0.1:8000/storage/" + updateFormik.values.file_name }
                                        imageChange={handleChange}
                                        TaskNameChange={updateFormik.handleChange}
                                        TaskNameValue={updateFormik.values.task_name}
                                        TaskLevelChange={(e) => { updateFormik.setFieldValue('task_level', e.target.value) }}
                                        TaskLevelValue={updateFormik.values.task_level}
                                        TaskStarDateChange={updateFormik.handleChange}
                                        TaskStarDateValue={updateFormik.values.start_date}
                                        TaskEndDateChange={updateFormik.handleChange}
                                        TaskEndDateValue={updateFormik.values.end_date}
                                    />
                                </Card>
                            )}
                        </div>
                        :
                        <div>
                            <CardEmpty title="Add Your Task Today"/>
                        </div>
                    }
                </div>
        },

        {
            title: "WEEKLY",
            tab: '2',
            changeIndex: (index) => {
                listsweek()
                setTabIndex(index)
            },
            content: 
                <div>
                    <ToastContainer
                        position="bottom-right"
                    />
                    {list.length > 0 ?
                        <div>
                            {list.map(item =>

                                <Card
                                    taskImg={"http://127.0.0.1:8000/storage/" + item.file_name}
                                    taskName={item.task_name}
                                    levelTask={item.task_level}
                                    dateTask={item.expired}
                                    complete={item.status}
                                    checkedTask={() => updateStatus(item.id,"WEEK")}
                                    onClick={() => deleteTask(item.id,"WEEK")}
                                >
                                    <Slideover bg="gray" icon="marker" title="Edit Task" description="Enjoy your Work and always productive"
                                        setSlide={() => {
                                            setEditData(
                                                {

                                                    id: item.id,
                                                    file_name: item.file_name,
                                                    task_name: item.task_name,
                                                    task_level: item.task_level,
                                                    start_date: item.start_date,
                                                    end_date: item.end_date,
                                                }
                                            )

                                            setListId(item.id)
                                            setEditSlideState(!editSlide)
                                        }
                                        }
                                        slide={editSlide}
                                        formSubmit={updateFormik.handleSubmit}
                                        imagePreview={image.preview ? image.preview : "http://127.0.0.1:8000/storage/" + updateFormik.values.file_name}
                                        imageChange={handleChange}
                                        TaskNameChange={updateFormik.handleChange}
                                        TaskNameValue={updateFormik.values.task_name}
                                        TaskLevelChange={(e) => { updateFormik.setFieldValue('task_level', e.target.value) }}
                                        TaskLevelValue={updateFormik.values.task_level}
                                        TaskStarDateChange={updateFormik.handleChange}
                                        TaskStarDateValue={updateFormik.values.start_date}
                                        TaskEndDateChange={updateFormik.handleChange}
                                        TaskEndDateValue={updateFormik.values.end_date}
                                    />
                                </Card>
                            )}
                        </div>
                        :
                        <div>
                            <CardEmpty title="No Task For This Week"/>
                        </div>
                    }
                </div>
        },

        {
            title: "MONTHLY",
            tab: '3',
            changeIndex: (index) => {
                listsmonth()
                setTabIndex(index)
            },
            content: 
                <div>
                    <ToastContainer
                        position="bottom-right"
                    />
                    {list.length > 0 ?
                        <div>
                            {list.map(item =>

                                <Card
                                    taskImg={"http://127.0.0.1:8000/storage/" + item.file_name}
                                    taskName={item.task_name}
                                    levelTask={item.task_level}
                                    dateTask={item.expired}
                                    complete={item.status}
                                    checkedTask={() => updateStatus(item.id,'MONTH')}
                                    onClick={() => deleteTask(item.id,"MONTH")}
                                >
                                    <Slideover bg="gray" icon="marker" title="Edit Task" description="Enjoy your Work and always productive"
                                        setSlide={() => {
                                            setEditData(
                                                {

                                                    id: item.id,
                                                    file_name: item.file_name,
                                                    task_name: item.task_name,
                                                    task_level: item.task_level,
                                                    start_date: item.start_date,
                                                    end_date: item.end_date,
                                                }
                                            )

                                            setListId(item.id)
                                            setEditSlideState(!editSlide)
                                        }
                                        }
                                        slide={editSlide}
                                        formSubmit={updateFormik.handleSubmit}
                                        imagePreview={image.preview ? image.preview : "http://127.0.0.1:8000/storage/" + updateFormik.values.file_name}
                                        imageChange={handleChange}
                                        TaskNameChange={updateFormik.handleChange}
                                        TaskNameValue={updateFormik.values.task_name}
                                        TaskLevelChange={(e) => { updateFormik.setFieldValue('task_level', e.target.value) }}
                                        TaskLevelValue={updateFormik.values.task_level}
                                        TaskStarDateChange={updateFormik.handleChange}
                                        TaskStarDateValue={updateFormik.values.start_date}
                                        TaskEndDateChange={updateFormik.handleChange}
                                        TaskEndDateValue={updateFormik.values.end_date}
                                    />
                                </Card>
                            )}
                        </div>
                        :
                        <div>
                            <CardEmpty title="No Task For This Month"/>
                        </div>
                    }
                </div>
        }
    ];

    return (
        <div>
            <div className="relative flex h-auto overflow-y-auto lg:h-screen">
                <aside className="fixed bottom-0 flex justify-between w-full h-auto px-4 py-6 bg-gray-300 lg:flex-col lg:h-full lg:w-auto">
                    <Link to="/Profile" className="flex items-center justify-center">
                        <div>
                            <FontAwesomeIcon icon={["fas", "user-circle"]} color="#6b6b6b" size="2x" />
                        </div>
                    </Link>
                    <div className="flex justify-center">
                        <ToastContainer
                            position="bottom-right"
                        />
                        <Slideover bg="pink" icon="plus" title="Add Task" description="Enjoy your Work and always productive"
                            imagePreview={image.preview}
                            imageChange={handleChange}
                            setSlide={() => setAddSlideState(!addSlide)}
                            slide={addSlide}
                            formSubmit={formik.handleSubmit}
                            TaskNameChange={formik.handleChange}
                            TaskNameValue={formik.values.task_name}
                            TaskLevelChange={(e) => { formik.setFieldValue('task_level', e.target.value) }}
                            TaskStarDateChange={formik.handleChange}
                            TaskStarDateValue={formik.values.start_date}
                            TaskEndDateChange={formik.handleChange}
                            TaskEndDateValue={formik.values.end_date}
                        />

                    </div>
                    <div className="flex items-center justify-center">
                        <LogoutBtn/>
                    </div>
                </aside>
                <div className="container w-full ml-0 lg:ml-20">
                    <GridManualflow anyclass="h-full w-full " gap="0">
                        <GridManualitem mobile="12" sm="12" md="12" lg="7" xl="7" anyclass="py-4 px-2 ">
                            <div className="sticky top-0" style={{ zIndex: -1 }}>
                                <div className="flex justify-between p-4" >
                                    <div>
                                        <h1 className="text-2xl font-semibold lg:text-3xl">to-do list</h1>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center h-full px-6 mt-4 lg:mt-36">
                                    <p className="text-3xl font-bold leading-10 myfont lg:text-5xl lg:leading-tight">
                                        Hello {(profile[0]) ? profile[0].name:null}, welcome back.
                                        You have <span className="text-pink-500 underline">{words} </span>
                                        remaining tasks
                                        to complete
                                        this {tabIndex == 1 ? "day" : tabIndex == 2 ? "week" : "month"}
                                    </p>
                                </div>
                            </div>
                        </GridManualitem>

                        <GridManualitem mobile="12" sm="12" md="12" lg="5" xl="5"
                            anyclass="border-t-2 mt-8 lg:mt-0 lg:border-l-2 py-4 px-2  mb-20 lg:mb-2">
                            <TabRender index={tabIndex} data={data}/>
                        </GridManualitem>
                    </GridManualflow>
                </div>
            </div>
        </div>
    );
}