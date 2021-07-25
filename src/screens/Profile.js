import React, { useState, useEffect } from 'react';
import '../App.css';
import {Link,useHistory} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons"
import axios from 'axios';
import { useFormik } from 'formik';

import Loading from '../screens/Loading';

//component
import {
    Slideover,
    GridManualflow,
    GridManualitem,
    TabRender,
    Card,
    CardEmpty,
    LogoutBtn,
    GridAutoflow
} from '../components'

import ImageCard from '../test.png';



library.add(fas, fab);


export default function Profile() {



    const token = localStorage.getItem("auth_token");
    
    const [todolist, setTodoList] = useState([]);

    const [completelist, setCompleteList] = useState([]);

    const [daylist, setdayList] = useState([]);

    const [weeklist, setweekList] = useState([]);

    const [monthlist, setmonthList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    


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
        todoTasks()
        completeTasks()
        listsday()
        listsweek()
        listsmonth()
    }, []);

    const triggertask = (type) => {
        
        if (type == 'completeTaks') {
            completeTasks()
        }else if (type == 'todoTasks') {
            todoTasks()
        }
    }
    
    //Read Completelist
    const completeTasks = async () => {
        try {
            const response = await axios.get(`api/tasksComplete`)
            setCompleteList(response.data.tasks)
            
        } catch (error) {
            console.error(error);
        }
    }

    //Read todolist
    const todoTasks = async () => {
        try {
            const response = await axios.get('api/tasksTodo')
            setTodoList(response.data.tasks)
        } catch (error) {
            console.error(error);
        }
    }

        //Read by day
        const listsday = async () => {
            try {
                const response = await axios.get(`api/tasks`)
                setdayList(response.data.tasks)
                
            } catch (error) {
                console.error(error);
            }
        }
    
        //Read Data by Week
        const listsweek = async () => {
            try {
                const response = await axios.get('api/tasksWeek')
                setweekList(response.data.tasks)
            } catch (error) {
                console.error(error);
            }
        }
    
    
        //Read Data by Month
        const listsmonth = async () => {
            try {
                const response = await axios.get('api/tasksMonth')
                setmonthList(response.data.tasks)
            } catch (error) {
                console.error(error);
            }
        }


    //Update status
    const updateStatus = async (id,type) => {
        try {
            const response = await axios.get(`api/tasks/${id}`)
            triggertask(type)
            window.location.href = '/Profile'

        } catch (error) {
            console.error(error);
        }
    }

    
    //Delete data
    const deleteTask = async (id,type) => {
        try {
            const response = await axios.delete(`api/tasks/${id}`)
            todoTasks()
            triggertask(type)
            loadingEditData()
            window.location.href = '/Profile'
        } catch (error) {
            console.error(error);

        }
    }

     //loading Create Data
    const loadingCreateData = () => {
        const data = {
            task_name: formik.values.task_name == '',
            task_level: formik.values.task_level == '',
            start_date: formik.values.start_date == '',
            end_date: formik.values.end_date == '',
        }
        if(data.task_name || data.task_level || data.start_date || data.end_date){
            setIsLoading(false);
        }else
        {
            setIsLoading(true);
        }
    }

    //loading Edit Data
    const loadingEditData = () => {
        setIsLoading(true);
    }
    

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
                todoTasks()
                setAddSlideState(!addSlide)
                window.location.href = '/Profile'
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
                todoTasks()
                triggertask(type)
                setEditSlideState(!editSlide)
                window.location.href = '/Profile'
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
            title: "TO-DO TASKS",
            tab: '1',
            changeIndex: (index) => {
                todoTasks()
                setTabIndex(index)
            },            
            content:
                <div>
                    {todolist.length > 0 ?
                        <div>
                            {todolist.map(item =>
                            
                                <Card
                                    taskImg={
                                        item.file_name == '' ?
                                        (ImageCard):
                                        "https://todolist.safwan-azman.ml/storage/" + item.file_name 
                                    }
                                    taskName={item.task_name}
                                    levelTask={item.task_level}
                                    dateTask={item.expired}
                                    complete={item.status}
                                    checkedTask={() => updateStatus(item.id,"todoTasks")}
                                    onClick={() => deleteTask(item.id,"todoTasks")}
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
                                        imagePreview={image.preview ? image.preview : "https://todolist.safwan-azman.ml/storage/" + updateFormik.values.file_name }
                                        imageChange={handleChange}
                                        TaskNameChange={updateFormik.handleChange}
                                        TaskNameValue={updateFormik.values.task_name}
                                        TaskLevelChange={(e) => { updateFormik.setFieldValue('task_level', e.target.value) }}
                                        TaskLevelValue={updateFormik.values.task_level}
                                        TaskStarDateChange={updateFormik.handleChange}
                                        TaskStarDateValue={updateFormik.values.start_date}
                                        TaskEndDateChange={updateFormik.handleChange}
                                        TaskEndDateValue={updateFormik.values.end_date}
                                        loading={loadingEditData}
                                    />
                                </Card>
                            )}
                        </div>
                        :
                        <div>
                            <CardEmpty title="No Todo Tasks Today"/>
                        </div>
                    }
                </div>
        },

        {
            title: "COMPLETE TASKS",
            tab: '2',
            changeIndex: (index) => {
                completeTasks()
                setTabIndex(index)
            },
            content: 
                <div>
                    {completelist.length > 0 ?
                        <div>
                            {completelist.map(item =>

                                <Card
                                    taskImg={
                                        item.file_name == '' ?
                                        (ImageCard):
                                        "https://todolist.safwan-azman.ml/storage/" + item.file_name 
                                    }
                                    taskName={item.task_name}
                                    levelTask={item.task_level}
                                    dateTask={item.expired}
                                    complete={item.status}
                                    checkedTask={() => updateStatus(item.id,"completeTaks")}
                                    onClick={() => deleteTask(item.id,"completeTaks")}
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
                                        imagePreview={image.preview ? image.preview : "https://todolist.safwan-azman.ml/storage/" + updateFormik.values.file_name}
                                        imageChange={handleChange}
                                        TaskNameChange={updateFormik.handleChange}
                                        TaskNameValue={updateFormik.values.task_name}
                                        TaskLevelChange={(e) => { updateFormik.setFieldValue('task_level', e.target.value) }}
                                        TaskLevelValue={updateFormik.values.task_level}
                                        TaskStarDateChange={updateFormik.handleChange}
                                        TaskStarDateValue={updateFormik.values.start_date}
                                        TaskEndDateChange={updateFormik.handleChange}
                                        TaskEndDateValue={updateFormik.values.end_date}
                                        loading={loadingEditData}
                                    />
                                </Card>
                            )}
                        </div>
                        :
                        <div>
                            <CardEmpty title="No Complete Tasks Today"/>
                        </div>
                    }
                </div>
        },
    ];

    return (
        <div>
            { isLoading ? <Loading /> : null}
            <div className="relative flex h-auto overflow-y-auto lg:h-screen">
                <aside className="fixed bottom-0 flex justify-between w-full h-auto px-4 py-6 bg-gray-300 lg:flex-col lg:h-full lg:w-auto">
                    <Link to="/Home" className="flex items-center justify-center">
                        <div>
                            <FontAwesomeIcon icon={["fas", "home"]} color="#6b6b6b" size="2x" />
                        </div>
                    </Link>
                    <div className="flex justify-center">
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
                            loading={loadingCreateData}
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
                                <div className="flex items-center justify-center h-full px-6 mt-4 space-x-4 lg:mt-18">

                                <GridAutoflow mobile="2" sm="2" md="2" lg="2" xl="2" anyclass="col-span-12  w-screen">
                                    <div className="p-4 bg-pink-600 rounded-lg shadow-xl">
                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center px-5 py-4 bg-white rounded-full">
                                                <FontAwesomeIcon icon={["fas", "clipboard-list"]} color="#db2777" size="2x" />
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-2 text-xs font-semibold text-center text-white lg:text-lg">
                                            to-do tasks
                                        </div>
                                        <div className="flex justify-center mt-2 text-xl font-semibold text-center text-white lg:text-6xl">
                                            {todolist.length}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-green-600 rounded-lg shadow-xl">
                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center px-5 py-4 bg-white rounded-full">
                                                <FontAwesomeIcon icon={["fas", "clipboard-check"]} color="#34d399" size="2x" />
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-2 text-xs font-semibold text-center text-white lg:text-lg">
                                            Complete tasks
                                        </div>
                                        <div className="flex justify-center mt-2 text-xl font-semibold text-center text-white lg:text-6xl">
                                            {completelist.length}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-yellow-500 rounded-lg shadow-xl">
                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center px-5 py-4 bg-white rounded-full">
                                                <FontAwesomeIcon icon={["fas", "calendar-day"]} color="#f59e0b" size="2x" />
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-2 text-xs font-semibold text-center text-white lg:text-lg">
                                            Today tasks
                                        </div>
                                        <div className="flex justify-center mt-2 text-xl font-semibold text-center text-white lg:text-6xl">
                                            {daylist.length}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-indigo-600 rounded-lg shadow-xl">
                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center px-5 py-4 bg-white rounded-full">
                                                <FontAwesomeIcon icon={["fas", "calendar-week"]} color="#4f46e5" size="2x" />
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-2 text-xs font-semibold text-center text-white lg:text-lg">
                                            Weekly tasks
                                        </div>
                                        <div className="flex justify-center mt-2 text-xl font-semibold text-center text-white lg:text-6xl">
                                            {weeklist.length}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-blue-600 rounded-lg shadow-xl">
                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center px-5 py-4 bg-white rounded-full">
                                                <FontAwesomeIcon icon={["fas", "calendar-alt"]} color="#2563eb" size="2x" />
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-2 text-xs font-semibold text-center text-white lg:text-lg">
                                            Monthly tasks
                                        </div>
                                        <div className="flex justify-center mt-2 text-xl font-semibold text-center text-white lg:text-6xl">
                                            {monthlist.length} 
                                        </div>
                                    </div>

                                    <div className="w-full p-4 bg-purple-500 rounded-lg ">
                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center px-5 py-4 bg-white rounded-full">
                                                <FontAwesomeIcon icon={["fas", "chart-bar"]} color="#8b5cf6" size="2x" />
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-2 text-xs font-semibold text-center text-white lg:text-lg">
                                            Overall Progress tasks this month
                                        </div>
                                        <div className="flex justify-center mt-2 text-xl font-semibold text-center text-white lg:text-6xl">
                                          { (parseInt(completelist.length / monthlist.length * 100) ? parseInt(completelist.length / monthlist.length * 100) : 0) }%
                                        </div>
                                    </div>
                                </GridAutoflow>
                                    
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