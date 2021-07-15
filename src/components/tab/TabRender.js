import React, { useState } from "react";

import {TabTitle ,TabContent} from '../../components' 


// get opentab component 




export default function TabsRender(props , { color = "pink" }) {
    const tabLists = props.data;
    const tabIndex = props.index;
    return (
        <div>
            <div className="flex flex-wrap ">
                <div className="w-full">
                    <ul className="flex flex-row flex-wrap pt-3 pb-4 mb-0 list-none" role="tablist">
                        {tabLists.map((tab) => (
                            <TabTitle
                                anyclass={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " 
                                    + (tabIndex == `${tab.tab}` ? "text-white bg-" + color + "-600" : "text-" + color + "-600 bg-white")}
                                title={tab.title}
                                tab={
                                    (e) =>
                                        { 
                                            tab.changeIndex(tab.tab);
                                        }
                                }/>
                        ))}
                    </ul>
                    {tabLists.map((tab) => (
                        <TabContent anyclass={tabIndex == `${tab.tab}` ? `flex flex-col min-w-0 break-words  w-full mb-6  ` : `hidden`} >
                            {tab.content}
                        </TabContent>
                    ))}
                </div>
            </div>
            
        </div>
    );

}

