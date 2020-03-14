import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ItemModel, ItemModelSend } from '../../Entities/Interfaces';
import Spinner from 'react-bootstrap/Spinner';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import { ImageInput } from '../../Components/ImageUpload/Input';
import { AddGroupBox } from '../../Components/AddGroupBox/AddGroupBox';
import { Input, Button } from 'antd';
import { ImagePack } from '../../Entities/Types';
const { TextArea } = Input;

interface ItemFormProps {
    fetchData: (id?: string) => Promise<ItemModel>;
    saveData: (item: ItemModelSend) => void;
    pageTitle: string;
}

interface ItemTextFormData {
    itemName: string;
    itemDescription: string;
    [key: string]: string;
}

const imageBoxPosition: string[] = ['0', '1', '2'];
// TODO: should reset for every different item
const imgPack: ImagePack = [undefined, undefined, undefined];

const ItemFormPage: React.FC<ItemFormProps> = (props) => {
    const { fetchData, saveData, pageTitle } = props;

    const [textFormData, setTextFormData] = useState<ItemTextFormData | undefined>(undefined);
    const [preview, setPreview] = useState<string[]>([]);
    const [groups, setGroups] = useState<string[] | undefined>(undefined);

    const { id } = useParams();

    useEffect(() => {
        fetchData(id).then(data => {
            const urls: string[] = [];
            data.images.map(image => urls.push(image.url));
            setPreview(urls);

            const formData: ItemTextFormData = {
                itemName: data.name,
                itemDescription: data.description || ''};
            setTextFormData(formData);

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
        console.log(imgPack);
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

    const handleGroupChange = (selectedGroups: string[]) => {
        setGroups(selectedGroups);
    };

    function to<T>(value: T): T { return value; }

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        const newTextState = { ...textFormData, [fieldName]: fieldValue } as ItemTextFormData;
        setTextFormData(newTextState);
    };

    const saveItem = () => {
        const completeItem: ItemModelSend = {
            id,
            name: textFormData!.itemName,
            description: textFormData!.itemDescription,
            images: imgPack,
            borrowed: false,
            groups: groups!,
        };

        saveData(completeItem);
    };

    return(
        <>
            {
                !textFormData ? <Spinner style={{ position: 'fixed', top: '50%', left: '50%' }} animation="grow"/>
                :

                (
                <div>
                <SubPageHeader title={pageTitle}/>
                <div className="container" style={{ paddingBottom: '50px' }}>

                    <h3>Images</h3>
                    <div>
                        {imageBoxPosition.map((position, index) => (
                            <ImageInput
                                key={index}
                                position={position}
                                onChange={handleImageChange}
                                onDelete={handleImageDelete}
                                preview={(preview && preview[index]) || ''}
                            />
                        ))}
                    </div>

                    <AddGroupBox itemGroups={groups} handleChange={handleGroupChange}/>

                    <h3>Name</h3>
                    <Input name="itemName" value={textFormData.itemName} onChange={onTextChange} placeholder="Basic usage" />
                    <h3>Description</h3>
                    <TextArea
                        autoSize={true}
                        name="itemDescription"
                        value={textFormData.itemDescription}
                        onChange={onTextChange}
                    />

                    </div>

                    <Button
                        style={{ position: 'fixed', bottom: '0', marginTop: '10px' }}
                        size="large"
                        type="primary"
                        block={true}
                        onClick={saveItem}
                    >
                        Save
                </Button>

                </div>
            )
            }
        </>
    );

};

export const ItemForm = ItemFormPage;
