import React from "react";

function GridAutoflow(props) {
    return (

        <div x-max="1" className={
            `grid grid-cols-${props.mobile} gap-4 sm:grid-cols-${props.sm} md:grid-cols-${props.md} lg:grid-cols-${props.lg} xl:grid-cols-${props.xl} 
            ${props.anyclass}`
        }
        >
            {props.children}
        </div>
    );
}

export default GridAutoflow;