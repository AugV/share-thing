import React, { useState } from 'react';
import { BsImage } from 'react-icons/bs';
import { MdAddAPhoto } from 'react-icons/md';
import './image-upload.css';

interface ImageInputProps {
    onChange: (e: any) => void;
    preview: string;
}

const ImageInputComponent: React.FC<ImageInputProps> = (props) => {

    return(
        preview ?

        (
            <img className="preview" src={preview} />
        )

        :

        (
        <label className="label">
            <div>
                <MdAddAPhoto className="icon" />
                <input className="input" type="file" onChange={props.onChange} accept="image/*;capture=camera"/>
            </div>
        </label>
        )

    );
};

export const ImageInput = ImageInputComponent;
