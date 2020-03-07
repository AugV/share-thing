import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ItemModel } from '../../Entities/Interfaces';
import Spinner from 'react-bootstrap/Spinner';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import { ImageUpload } from '../../Components/ImageUpload';

interface ItemFormProps {
    fetchData: (id?: string) => Promise<ItemModel>;
    pageTitle: string;
}

const ItemFormPage: React.FC<ItemFormProps> = (props) => {
    const { fetchData } = props;
    const [item, setItem] = useState<ItemModel | null>(null);
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
                <ImageUpload/>

            </div>)
            }
        </>
    );
};

export const ItemForm = ItemFormPage;
