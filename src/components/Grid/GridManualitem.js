import React from "react";

function GridManualitem(props) {
    return (
        <div className={`col-span-${props.mobile} sm:col-span-${props.sm} md:col-span-${props.md} lg:col-span-${props.lg} xl:col-span-${props.lg} ${props.anyclass}`}>
            {props.children}
        </div>
    );
}

export default GridManualitem;