import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ItemModel } from '../../Entities/Interfaces';
import Spinner from 'react-bootstrap/Spinner';

interface ItemFormProps {
    fetchData: (id?: string) => Promise<ItemModel>;
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
            : <div>{item.name}</div>
            }
        </>
    );
};

export const ItemForm = ItemFormPage;
