import React from 'react';
import 'antd/dist/antd.css';
import { Select, Spin, Skeleton } from 'antd';
import { withUserGroups } from '../../Context/withUserGroup';
import { GroupNameAndId } from '../../Entities/Interfaces';

const { Option } = Select;

type UserGroupLookup = GroupNameAndId[];

interface AddGroupBoxProps {
    userGroups: UserGroupLookup;
    itemGroups: string[] | undefined;
    handleChange: (values: string[]) => void;
}

const AddGroupBoxComponent: React.FC<AddGroupBoxProps> = (props) => {
    const { userGroups, itemGroups, handleChange } = props;

    return(
      (itemGroups && userGroups) ?
      (
        <div>
          <h3>Groups</h3>
          <Select
            mode="multiple"
            size="large"
            style={{ width: '100%' }}
            placeholder="Select groups"
            defaultValue={itemGroups}
            onChange={handleChange}
            optionLabelProp="label"
          >
          {userGroups.map((group) => (
            <Option key={group.id} value={group.id} label={group.name} >
                {group.name}
            </Option>
          ),
          )}
          </Select>
      </div>
    )

    :
    (
      <Spin>
          <h3>Groups</h3>
          <Skeleton.Input style={{ width: '300px' }} active={true} size={'large'} />
      </Spin>
    )
    );
};

export const AddGroupBox = withUserGroups(AddGroupBoxComponent);
