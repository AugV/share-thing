import React, { useState } from 'react';

const ImageUploadComponent: React.FC = () => {
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
            {console.log(imgUrl); }
        });
    };

    return (
            <div>
                {console.log(imgUrl)}
                <label className="btn btn-default btn-sm z-depth-0 mr-0 pl-2 pr-2 custom-file-upload waves-effect waves-light" htmlFor="file">
                    <i className="fas fa-image fa-fw" aria-hidden="true"/>
                    <input className="upload" type="file" onChange={handleImageChange} multiple={true}/>
                </label>
                {imgUrl.map((image, i) => (
                    <img key={i} src="https://homepages.cae.wisc.edu/~ece533/images/goldhill.png" />
                ),
                    )}
            </div>
    );

};

export const ImageUpload = ImageUploadComponent;
