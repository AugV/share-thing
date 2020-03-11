import React, { useState } from 'react';
import './add-group.css';
import { AddGroupButton } from './AddGroupButton';
import 'antd/dist/antd.css';
import { Select } from 'antd';
const { Option } = Select;

const AddGroupBoxComponent = () => {

    const [modalShow, setModalShow] = useState(false);

    const MyVerticallyCenteredModal: React.FC = (props) => {

        const handleChange = (value: string[]) => {
            console.log(value);
            // console.log(value.);
        };

        return (
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
              <Option value="usa" label="USA">
                <div className="demo-option-label-item">
                  <span role="img" aria-label="USA">
                    🇺🇸
                  </span>
                  USA (美国)
                </div>
              </Option>
              <Option value="japan" label="Japan">
                <div className="demo-option-label-item">
                  <span role="img" aria-label="Japan">
                    🇯🇵
                  </span>
                  Japan (日本)
                </div>
              </Option>
              <Option value="korea" label="Korea">
                <div className="demo-option-label-item">
                  <span role="img" aria-label="Korea">
                    🇰🇷
                  </span>
                  Korea (韩国)
                </div>
              </Option>
            </Select>
        );
    };

    return(

          <MyVerticallyCenteredModal />

    );
};

export const AddGroupBox = AddGroupBoxComponent;
