import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ItemModel } from '../../Entities/Interfaces';
import Spinner from 'react-bootstrap/Spinner';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import { ImageInput } from '../../Components/ImageUpload/Input';

interface ItemFormProps {
    fetchData: (id?: string) => Promise<ItemModel>;
    pageTitle: string;
}

interface ItemFormData {
    itemName: string;
    itemDescription: string;
    [key: string]: string;
}

const imageBoxes: string[] = ['0', '1', '2'];

const ItemFormPage: React.FC<ItemFormProps> = (props) => {
    const { fetchData } = props;
    const imgPack: (File | undefined)[] = [undefined, undefined, undefined];

    const [itemFormData, setItemFormData] = useState<ItemFormData | undefined>(undefined);
    const [preview, setPreview] = useState<string[]>([]);
    const [groups, setGroups] = useState<string[] | undefined>(undefined);

    const { id } = useParams();

    useEffect(() => {
        fetchData(id).then(data => {

            const urls: string[] = [];
            data.images.map(image => urls.push(image.url));
            setPreview(urls);

            const formData: ItemFormData = {
                itemName: data.name,
                itemDescription: data.description || ''};
            setItemFormData(formData);

            setGroups(data.groups);
        });
    }, [fetchData, id]);

    const handleImageChange = (e: any) => {
        e.preventDefault();
        const position = parseInt(e.target.accessKey, 10);

        const image: File = e.target.files[0];
        const url = URL.createObjectURL(image);

        const newPreview: string[] = { ...preview };
        newPreview[position] = url;
        setPreview(newPreview);

        imgPack[position] = image;
    };

    const handleImageDelete = (e: any) => {
        e.preventDefault();
        const position = parseInt(e.target.accessKey, 10);

        const newPreview: string[] = { ...preview };
        newPreview[position] = '';
        setPreview(newPreview);

        imgPack[position] = undefined;

    };

    return(
        <>
            {
                !itemFormData ? <Spinner style={{ position: 'fixed', top: '50%', left: '50%' }} animation="grow"/>
                :

                (
                <div>
                <SubPageHeader title={props.pageTitle}/>
                <div className="container">
                    <h2>Images</h2>
                    <div>
                        {imageBoxes.map((position, index) => (
                            <ImageInput
                                key={index}
                                position={position}
                                onChange={handleImageChange}
                                onDelete={handleImageDelete}
                                preview={(preview && preview[index]) || ''}
                            />
                        ))}
                    </div>
                </div>
            </div>)
            }
        </>
    );

};

export const ItemForm = ItemFormPage;
