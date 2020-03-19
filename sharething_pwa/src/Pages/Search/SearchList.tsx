import React from 'react';
import Search from 'antd/lib/input/Search';
import { AddGroupBox } from '../../Components/AddGroupBox/AddGroupBox';
import { List } from '../../Components/List/List';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';

const SearchList: React.FC = () => {
    const history = useHistory();

    const onItemClick = (id: string) => {
        history.push(`${ROUTES.SEARCH_ITEM_DETAILS}/${id}`);
    };

    const handleGroupChange = () => {

    };

    return(
        <div>
        <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: '100%' }}
            size="large"
        />
        <AddGroupBox itemGroups={[]} handleChange={handleGroupChange}/>
        <List itemList={} onClickItem={onItemClick} />
        </div>
    );
};

export { SearchList };
