import React, { useState } from 'react';
import { ImageInput } from './Input';

const ImageUploadContainerComponent: React.FC = () => {
    const [imgUrl, setImgUrl] = useState<string[]>([]);
    const imgPack: File[] = [];

    const handleImageChange = (e: any) => {
        e.preventDefault();
        const files: File[] = Array.from(e.target.files);

        files.forEach((file, i) => {

            const url = URL.createObjectURL(file);

            setImgUrl(prevState => {
                const newState = [url, ...prevState];
                return newState;
            });

            imgPack.push(file); 
        },
        );
    };

    const onDelete = (e: React.MouseEvent<HTMLElement>) => {

    };

    return (
            <div>
                <ImageInput onChange={handleImageChange} preview="https://homepages.cae.wisc.edu/~ece533/images/monarch.png"/>
                <ImageInput onChange={handleImageChange} preview=""/>
                <ImageInput onChange={handleImageChange} preview="https://homepages.cae.wisc.edu/~ece533/images/monarch.png"/>
            </div>
    );

};

export const ImageUploadContainer = ImageUploadContainerComponent;
