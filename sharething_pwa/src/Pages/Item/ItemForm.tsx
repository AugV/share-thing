import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ItemModel, ItemModelSend } from '../../Entities/Interfaces';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import { ImageInput } from '../../Components/ImageUpload/Input';
import { AddGroupBox } from '../../Components/AddGroupBox/AddGroupBox';
import { Input, Button, Spin, Typography, Row, Col } from 'antd';
import { ImagePack } from '../../Entities/Types';
import { MdDeleteForever } from 'react-icons/md';
import i18n from 'i18next';

const { TextArea } = Input;

interface ItemFormProps {
    fetchData: (id?: string) => Promise<ItemModel>;
    saveData: (item: ItemModelSend) => void;
    deleteData?: (id: string) => void;
    pageTitle: string;
}

interface ItemTextFormData {
    itemName: string;
    itemDescription: string;
    [key: string]: string;
}

const imageBoxPosition: string[] = ['0', '1', '2'];

const ItemFormPage: React.FC<ItemFormProps> = (props) => {
    const { fetchData, saveData, deleteData, pageTitle } = props;

    const [textFormData, setTextFormData] = useState<ItemTextFormData | undefined>(undefined);
    const [preview, setPreview] = useState<string[]>([]);
    const [groups, setGroups] = useState<string[] | undefined>(undefined);
    const changedImgPack = useRef<ImagePack>([undefined, undefined, undefined]);

    const { id } = useParams();

    useEffect(() => {
        fetchData(id).then(data => {
            const urls: string[] = [];
            data.images.map(image => urls.push(image));
            setPreview(urls);

            const formData: ItemTextFormData = {
                itemName: data.name,
                itemDescription: data.description || ''};
            setTextFormData(formData);
            setGroups(data.groups);
        });
    }, [fetchData, id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const position = parseInt(e.target.getAttribute('data-position')!, 10);

        const image: File = e.target.files![0];
        const url = URL.createObjectURL(image);

        const newPreview: string[] = { ...preview };
        newPreview[position] = url;
        setPreview(newPreview);
        changedImgPack.current[position] = image;
    };

    const handleImageDelete = (e: React.ChangeEvent<HTMLInputElement>) => {

        e.preventDefault();
        const position = parseInt(e.target.getAttribute('data-position')!, 10);

        const newPreview: string[] = { ...preview };
        newPreview[position] = '';
        setPreview(newPreview);

        changedImgPack.current[position] = null;
    };

    const handleGroupChange = (selectedGroups: string[]) => {
        setGroups(selectedGroups);
    };

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
            images: changedImgPack.current,
            borrowed: false,
            groups: groups!,
        };

        saveData(completeItem);
    };

    const deleteButton = () => (
        <>
            {deleteData && <MdDeleteForever onClick={() => deleteData(id!)} size={50}/>}
        </>
    );

    return(
        <>
            {
                !textFormData ? <Spin style={{ position: 'fixed', top: '50%', left: '50%' }} />
                :

                (
                <div>
                    <SubPageHeader title={pageTitle} action={deleteButton()}/>
                    <div className="container" style={{ paddingBottom: '50px' }}>

                    <Row>
                        <Col span={24}>
                            <Typography.Title style={{ marginBottom: '0px', marginTop: '5px' }} level={4}>
                                {i18n.t('images')}
                            </Typography.Title>
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

                        </Col>
                    </Row>

                        <Row>
                            <Col span={24}>
                                <Typography.Title style={{ marginBottom: '0px', marginTop: '5px' }} level={4}>
                                    {i18n.t('groups')}
                                </Typography.Title>
                                <AddGroupBox itemGroups={groups} handleChange={handleGroupChange}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Typography.Title style={{ marginBottom: '0px', marginTop: '5px' }} level={4}>
                                    {i18n.t('itemName')}
                                </Typography.Title>
                                <Input name="itemName" value={textFormData.itemName} onChange={onTextChange} placeholder={i18n.t('enterItemName')} />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Typography.Title style={{ marginBottom: '0px', marginTop: '5px' }} level={4}>
                                    {i18n.t('itemDescription')}
                                </Typography.Title>
                                <TextArea
                                    autoSize={true}
                                    name="itemDescription"
                                    value={textFormData.itemDescription}
                                    onChange={onTextChange}
                                    placeholder={i18n.t('enterItemDescription')}
                                />
                            </Col>
                        </Row>

                    </div>

                    <Button
                        style={{ maxWidth: '750px', position: 'fixed', bottom: '0', marginTop: '10px' }}
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
