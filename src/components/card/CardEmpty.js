import React, { useState } from "react";





function Card(props) {
    return (
        <div className="flex flex-col mb-4">
            <div className="bg-white shadow-lg  rounded-3xl p-4 border-2" >
                <div className="flex justify-center items-center h-52">
                    <h1 className="text-2xl font-semibold uppercase">{props.title}</h1>
                </div>
            </div>
        </div>
    );
}

export default Card;