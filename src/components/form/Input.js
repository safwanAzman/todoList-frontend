import React from "react";


function Input(props) {
    return (
        <div className="">
            <label className="ml-1 text-gray-700">{props.label}</label>
            <input id={props.id} value={props.value} onChange={props.onChange} type={props.type} name={props.name} className={`my-2 p-3 ${props.width} focus:border-pink-200 rounded border-2 outline-none bg-white`}
                placeholder={props.placeholder}  autoComplete="off" />
            <p className="pl-2 text-xs text-red-500 ">{props.errorMessage}</p>
        </div>
    );
}

export default Input;