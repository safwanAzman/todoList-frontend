import React from "react";

function Select(props) {
    return (
        <div className="">
            <label className="text-gray-700 ml-1">{props.label}</label>
            <select name={props.name} className={`my-2 p-3 ${props.width} focus:border-pink-200 rounded border-2 outline-none bg-white`} required onChange={props.onChange} >
                <option value="0" hidden>Select an option</option>
                {props.children}
            </select>
        </div>
    );
}

export default Select;