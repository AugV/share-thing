import React, { useState, useEffect } from 'react';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import Input from 'antd/lib/input/Input';
import TextArea from 'antd/lib/input/TextArea';
import Button from 'antd/lib/button/button';
import { User, GroupModelSend } from '../../Entities/Interfaces';
import { SelectionList } from '../../Components/Selectors/SelectionList';
import i18n from 'i18next';

interface FormData {
    name: string | undefined;
    description: string | undefined;
    [key: string]: string | undefined;
}

interface CreateGroupProps {
    createGroup: (group: GroupModelSend) => Promise<void>;
    getUserList: () => Promise<User[]>;
}

const initialFormValues: FormData = {
    name: undefined,
    description: undefined,
};

const CreateGroup: React.FC<CreateGroupProps> = (props) => {
    const { createGroup, getUserList } = props;
    const [formData, setFormData] = useState<FormData>(initialFormValues);
    const [userList, setUserList] = useState<User[] | undefined>(undefined);
    const [selectedMembers, setSelectedMembers] = useState<string[] | undefined>(undefined);

    useEffect(() => {
        getUserList().then(userList => setUserList(userList));
    }, [getUserList]);

    const updateFormData = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        const newFormData = { ...formData, [fieldName]: fieldValue } as FormData;
        setFormData(newFormData);
    };

    const handleMemberChange = (selectedMembers: string[]) => {
        setSelectedMembers(selectedMembers);
    };

    const saveGroup = () => {
        const group: GroupModelSend = {
            name: formData.name!,
            description: formData.description,
            members: selectedMembers!,
        };

        createGroup(group);
    };

    return(
        <React.Fragment>
            <SubPageHeader title={i18n.t('createGroup')}/>
            <div style={{ padding: '10px' }}>

                <h3>{i18n.t('groupName')}</h3>
                <Input name="name" value={formData.name} onChange={updateFormData} placeholder={i18n.t('enterGroupName')} />

                <h3>{i18n.t('groupDescription')}</h3>
                <TextArea
                    autoSize={true}
                    name="description"
                    placeholder={i18n.t('enterGroupDescription')}
                    value={formData.description}
                    onChange={updateFormData}
                />

                <SelectionList
                    header={i18n.t('groupMembers')}
                    listItems={userList}
                    defaultListItems={selectedMembers}
                    handleChange={handleMemberChange}
                />

            </div>

            <Button
                style={{ position: 'fixed', bottom: '0', marginTop: '10px' }}
                size="large"
                type="primary"
                block={true}
                onClick={saveGroup}
            >
                Save
            </Button>
        </React.Fragment>
    );
};

export { CreateGroup };
