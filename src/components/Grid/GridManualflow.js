import React from "react";

function GridManualflow(props) {
    return (

        <div className={`grid grid-cols-12 gap-${props.gap} ${props.anyclass}`}>
            {props.children}
        </div>
    );
}

export default GridManualflow;