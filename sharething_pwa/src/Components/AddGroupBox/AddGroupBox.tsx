import React, { useState } from 'react';
import './add-group.css';
import { AddGroupButton } from './AddGroupButton';
import 'antd/dist/antd.css';
import { Select } from 'antd';
const { Option } = Select;

const AddGroupBoxComponent = () => {

    const [modalShow, setModalShow] = useState(false);

    const handleChange = (value: string[]) => {

    };

    return(
      <Select
        mode="multiple"
        size="large"
        style={{ width: '100%' }}
        placeholder="select one country"
        defaultValue={['chin']}
        onChange={handleChange}
        optionLabelProp="label"
    >
      <Option value="china" label="China">
        <div className="demo-option-label-item">
          <span role="img" aria-label="China">
            🇨🇳
          </span>
          China (中国)
        </div>
      </Option>

    </Select>

    );
};

export const AddGroupBox = AddGroupBoxComponent;
