import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons"

library.add(fas, fab);

function ImagePreview(props) {
    // upload image to storage
    const [image, setImage] = useState({ preview: "", raw: "" });

    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };


    return (
    <div className="w-40 h-full px-4 py-4 bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-400">
            <label htmlFor="file_name">
            {image.preview ? (
            <img src={image.preview} alt="img" className="w-40 h-36"/>
            ):(
                <div>
                    <div className="flex flex-col items-center justify-center text-sm font-semibold text-center text-pink-700 h-36">
                        <FontAwesomeIcon icon={["fas", "cloud-upload-alt"]} color="#bf125d" size="lg" className="animate-bounce" />
                        Upload Image
                    </div>
                </div>
            )}
        </label>
            <input type="file" id="file_name" style={{ display: "none" }} onChange={props.onChange}/>
    </div>
    );
}

export default ImagePreview;