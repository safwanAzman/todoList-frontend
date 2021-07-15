import React, { useState } from "react";

export default function TabTitle(props) {
    return (
        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a className={`${props.anyclass}`}
                data-toggle="tab"
                href="#link1"
                role="tablist"
                onClick={props.tab}
            >
                <i className="fas fa-space-shuttle text-base mr-1"></i> {props.title}
            </a>
        </li>
    );
}