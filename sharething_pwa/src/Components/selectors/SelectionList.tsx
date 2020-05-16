import React from 'react';
import 'antd/dist/antd.css';
import { Select, Spin, Skeleton } from 'antd';
import { ListItem } from '../../Entities/Interfaces';
import i18n from 'i18next';

const { Option } = Select;

interface SelectionListProps {
    header: string;
    listItems: Required<ListItem>[] | undefined;
    defaultListItems?: string[] | undefined;
    handleChange: (values: string[]) => void;
}

const SelectionList: React.FC<SelectionListProps> = (props) => {
    const {
        listItems,
        defaultListItems,
        handleChange,
        header,
    } = props;

    return(
      (listItems) ?
      (
        <div>
          <h3>{header}</h3>
          <Select
            mode="multiple"
            size="large"
            style={{ width: '100%' }}
            placeholder={`${i18n.t('select')} ${header}`}
            defaultValue={defaultListItems}
            onChange={handleChange}
            optionLabelProp="label"
          >
          {listItems.map((item) => (
            <Option key={item.id} value={item.id} label={item.name} >
                {item.name}
            </Option>
          ),
          )}
          </Select>
        </div>
    )

    :
    (
      <Spin>
          <h3>{header}</h3>
          <Skeleton.Input style={{ width: '300px' }} active={true} size={'large'} />
      </Spin>
    )
    );
};

export { SelectionList };
