import React, { useState } from 'react';
import { BsImage } from 'react-icons/bs';
import { MdAddAPhoto } from 'react-icons/md';
import './image-upload.css';

interface ImageInputProps {
    onChange: (e: any) => void;
    onDelete: (e: any) => void;
    preview: string;
    position: string;
}

const ImageInputComponent: React.FC<ImageInputProps> = (props) => {

    return(
        props.preview ?

        (
            <img className="preview" onClick={props.onDelete} accessKey={props.position} src={props.preview} />
        )

        :

        (
        <label className="label">
            <div>
                <MdAddAPhoto className="icon" />
                <input className="input" accessKey={props.position} type="file" onChange={props.onChange} accept="image/*;capture=camera"/>
            </div>
        </label>
        )

    );
};

export const ImageInput = ImageInputComponent;
