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
    <div className="bg-gray-300 hover:bg-gray-400 w-40 h-full py-4 px-4 rounded-lg cursor-pointer">
            <label htmlFor="file_name">
            {image.preview ? (
            <img src={image.preview} alt="img" className="w-40 h-36"/>
            ):(
                <>
                    <div className="h-36 flex flex-col items-center justify-center text-sm font-semibold text-center text-pink-700">
                        <FontAwesomeIcon icon={["fas", "cloud-upload-alt"]} color="#bf125d" size="lg" className="animate-bounce" />
                        Upload Image
                    </div>
                </>
            )}
        </label>
            <input type="file" id="file_name" style={{ display: "none" }} onChange={props.onChange}/>
    </div>
    );
}

export default ImagePreview;