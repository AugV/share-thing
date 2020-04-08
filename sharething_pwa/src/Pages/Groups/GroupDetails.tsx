import React, { useEffect, useState } from 'react';
import { SubPageHeader } from '../../Components/Headers/SubPageHeader';
import { useParams } from 'react-router-dom';
import { GroupModel } from '../../Entities/Interfaces';
import { Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';

interface GroupDetailsProps {
    fetchData: (id: string) => Promise<GroupModel>;
}

const GroupDetails: React.FC<GroupDetailsProps> = (props) => {
    const { fetchData } = props;
    const { id } = useParams();
    const [group, setGroup] = useState<GroupModel | undefined>(undefined);

    useEffect(() => {
        if (id) {
            fetchData(id).then(group => {
                setGroup(group);
            });
        } else {
            setGroup(undefined);
        }
    }, [id]);

    return(
        <React.Fragment>
            {
                !group
                ? <Spin/>
                : (
                    <div>
                        <SubPageHeader title={group.name}/>

                        <Title level={3}>{group.name}</Title>
                        <Paragraph ellipsis={{ expandable: true }} >{group.description}</Paragraph>
                        <Title level={4}>Owner: {group.admins![0]}</Title>
                    </div>
                )
            }
        </React.Fragment>
    );
};

export { GroupDetails };
