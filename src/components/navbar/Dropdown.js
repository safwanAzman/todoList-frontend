import React, { useState, useRef} from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

function Dropdown(props) {
    const [setShow,setShowState] = useState(false)
    const sensitive = useRef()
    useOnClickOutside(sensitive, () => {
        setShowState(false);
    });
    return (

        <div className="cursor-pointer relative" ref={sensitive} onClick={() => setShowState(!setShow)}>
            <div className="text-lg font-semibold flex space-x-2 items-center ">
                <img src="https://image.flaticon.com/icons/png/512/149/149071.png" className="w-12 h-12 rounded-full border-4" />
                <p>{props.username}</p>
            </div>
            <div className={setShow ? 'block' : 'hidden'}>
                <div className="absolute top-14 w-full right-8">
                    <div className="bg-white py-1 px-2 rounded-lg w-40 border-2">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dropdown;