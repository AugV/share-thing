import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ItemModel } from '../../Entities/Interfaces';
import Spinner from 'react-bootstrap/Spinner';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import { ImageUploadContainer } from '../../Components/ImageUpload/ImageUploadContainer';
import { ImageInput } from '../../Components/ImageUpload/Input';

interface ItemFormProps {
    fetchData: (id?: string) => Promise<ItemModel>;
    pageTitle: string;
}

const imageBoxes: string[] = ['first', 'second', 'third'];

const ItemFormPage: React.FC<ItemFormProps> = (props) => {
    const { fetchData } = props;
    const imgPack: File[];

    const [item, setItem] = useState<ItemModel | null>(null);
    const [imgUrl, setImgUrl] = useState<string[]>([]);
    const [preview, setPreview] = useState<string[]>();

    const { id } = useParams();

    useEffect(() => {
        fetchData(id).then(data => setItem(data));
    }, [fetchData, id]);

    return(
        <>
            {
                !item ? <Spinner style={{ position: 'fixed', top: '50%', left: '50%' }} animation="grow"/>
                :

                (<div>
                <SubPageHeader title={props.pageTitle}/>
                <div className="container">
                <h2>Images</h2>
                <div>
                    {imageBoxes.map((position) => {
                        <ImageInput onChange={handleImageChange} preview="https://homepages.cae.wisc.edu/~ece533/images/monarch.png"/>;
                    })}
                </div>
                </div>
            </div>)
            }
        </>
    );
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
};

export const ItemForm = ItemFormPage;
