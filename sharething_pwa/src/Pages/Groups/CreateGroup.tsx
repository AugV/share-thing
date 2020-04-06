import React, { useState } from 'react';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import Input from 'antd/lib/input/Input';
import TextArea from 'antd/lib/input/TextArea';
import Button from 'antd/lib/button/button';

interface FormData {
    name: string | undefined;
    description: string | undefined;
    [key: string]: string | undefined;
}

interface CreateGroupProps {
    createGroup: () => void;
}

const initialFormValues: FormData = {
    name: undefined,
    description: undefined,
};

const CreateGroup: React.FC<CreateGroupProps> = (props) => {
    const { createGroup } = props;
    const [formData, setFormData] = useState<FormData>(initialFormValues);

    const updateFormData = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        const newFormData = { ...formData, [fieldName]: fieldValue } as FormData;
        setFormData(newFormData);
    };

    return(
        <React.Fragment>
            <SubPageHeader title="New Group"/>

            <h3>Name</h3>
            <Input name="name" value={formData.name} onChange={updateFormData} placeholder="Group name" />
            <h3>Description</h3>
            <TextArea
                autoSize={true}
                name="description"
                value={formData.description}
                onChange={updateFormData}
            />

            <p>group members</p>

            <Button
                style={{ position: 'fixed', bottom: '0', marginTop: '10px' }}
                size="large"
                type="primary"
                block={true}
                onClick={createGroup}
            >
                Save
            </Button>
        </React.Fragment>
    );
};

export { CreateGroup };
