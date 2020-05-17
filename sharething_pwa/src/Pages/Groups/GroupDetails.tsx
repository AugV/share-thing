import React, { useEffect, useState } from 'react';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import { useParams } from 'react-router-dom';
import { GroupModel, User, GroupModelSend } from '../../Entities/Interfaces';
import { Spin, List, Button, Typography, Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import { SelectionList } from '../../Components/Selectors/SelectionList';
import i18n from 'i18next';

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

        updateGroup(groupUpdate)
        .then(() => window.location.reload());
    };

    return(
        <React.Fragment>
            {
                !group
                ? <Spin style={{ position: 'fixed', top: '50%', left: '50%' }}/>
                : (
                    <div>
                        <SubPageHeader title={group.name}/>
                        <div style={{ margin: '10px' }}>

                            <Row>
                                <Col>
                                    <Title level={4}>{i18n.t('host')}: {group.admins[0].name}</Title>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                <Typography.Title style={{ marginBottom: '0px', marginTop: '5px' }} level={4}>
                                    {i18n.t('groupDescription')}
                                </Typography.Title>
                                {
                                    group.description
                                    && <Paragraph ellipsis={{ expandable: true }} >{group.description}</Paragraph>
                                }
                                </Col>
                            </Row>

                            {
                                group.members && userList && (
                                <>
                                    <Row>
                                        <Col>
                                            <SelectionList
                                                header={i18n.t('addGroupMembers')}
                                                listItems={(() => {
                                                    return userList.filter(user => {
                                                        return !group.members.some(member => user.id === member.id);
                                                    });
                                                })()}
                                                defaultListItems={selectedMembers}
                                                handleChange={handleMemberChange}
                                            />
                                            <Button onClick={saveGroup}>{i18n.t('addMembers')}</Button>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                        <br/>
                                            <List
                                                header={<b>{i18n.t('groupMemberList')}</b>}
                                                dataSource={group.members}
                                                renderItem={item => (
                                                    <List.Item>
                                                        {item.name}
                                                    </List.Item>
                                                )}
                                            />
                                        </Col>
                                    </Row>
                                </>
                            )
                            }
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    );
};

export { GroupDetails };
