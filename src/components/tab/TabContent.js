import React, { useState } from "react";

export default function TabContent(props) {
    return (
        <div className={`${props.anyclass}`} >
            <div className="px-4 py-5 flex-auto">
                {props.children}
            </div>
        </div>
    );
}