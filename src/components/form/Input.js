import React from "react";


function Input(props) {
    return (
        <div className="">
            <label className="text-gray-700 ml-1">{props.label}</label>
            <input id={props.id} value={props.value} onChange={props.onChange} type={props.type} name={props.name} className={`my-2 p-3 ${props.width} focus:border-pink-200 rounded border-2 outline-none bg-white`}
                placeholder={props.placeholder} required autocomplete="off" />
        </div>
    );
}

export default Input;