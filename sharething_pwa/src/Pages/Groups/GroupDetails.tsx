import React, { useEffect, useState } from 'react';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import { useParams } from 'react-router-dom';
import { GroupModel, User, GroupModelSend } from '../../Entities/Interfaces';
import { Spin, List, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import { SelectionList } from '../../Components/selectors/SelectionList';

interface GroupDetailsProps {
    fetchData: (id: string) => Promise<GroupModel>;
    getUserList: () => Promise<User[]>;
    updateGroup: (group: Partial<GroupModelSend>) => Promise<void>;
}

const GroupDetails: React.FC<GroupDetailsProps> = (props) => {
    const { fetchData, getUserList, updateGroup } = props;
    const { id } = useParams();
    const [userList, setUserList] = useState<User[] | undefined>(undefined);
    const [selectedMembers, setSelectedMembers] = useState<string[] | undefined>(undefined);
    const [group, setGroup] = useState<GroupModel | undefined>(undefined);

    useEffect(() => {
        if (id) {
            fetchData(id).then(group => setGroup(group));
            getUserList().then(userList => {
                setUserList(userList);
            });
        } else {
            setGroup(undefined);
        }
    }, [id, fetchData]);

    const handleMemberChange = (selectedMembers: string[]) => {
        setSelectedMembers(selectedMembers);
    };

    const saveGroup = () => {
        const groupUpdate: Partial<GroupModelSend> = {
            id: group!.id,
            members: selectedMembers!,
        };

        updateGroup(groupUpdate);
    };

    return(
        <React.Fragment>
            {
                !group
                ? <Spin/>
                : (
                    <div>
                        <SubPageHeader title={group.name}/>
                        {
                            group.description
                            && <Paragraph ellipsis={{ expandable: true }} >{group.description}</Paragraph>
                        }
                        <Title level={4}>Host: {group.admins[0].name}</Title>
                        {
                            group.members && userList && (
                                <>
                            <SelectionList
                                header="Members"
                                listItems={(() => {
                                    return userList.filter(user => {
                                        return !group.members.some(member => user.id === member.id);
                                    });
                                })()}
                                defaultListItems={selectedMembers}
                                handleChange={handleMemberChange}
                            />
                            <Button onClick={saveGroup}>Add members</Button>
                            <List
                                header={<b>Group member list</b>}
                                dataSource={group.members}
                                renderItem={item => (
                                    <List.Item>
                                        {item.name}
                                    </List.Item>
                                )}
                            />
                            </>
                        )
                        }
                    </div>
                )
            }
        </React.Fragment>
    );
};

export { GroupDetails };
