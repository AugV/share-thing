import React from 'react';
import { MdAdd } from 'react-icons/md';
import './add-group.css';

interface AddGroupBtnProps {
    openModal: (open: boolean) => void;
}

const AddGroupBtnComponent: React.FC<AddGroupBtnProps> = (props) => (
    <div onClick={() => props.openModal(true)} className="add-group-btn" >
        <MdAdd size={50}/>
    </div >
);

export const AddGroupButton = AddGroupBtnComponent;
