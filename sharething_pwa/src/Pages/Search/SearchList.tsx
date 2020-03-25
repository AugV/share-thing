import React from 'react';
import Search from 'antd/lib/input/Search';
import { AddGroupBox } from '../../Components/AddGroupBox/AddGroupBox';
import { List } from '../../Components/List/List';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';

interface SearchListProps {
    onSearch: (name: string, groups: string[]) => void;
}

const SearchList: React.FC<SearchListProps> = (props) => {
    const history = useHistory();

    const onItemClick = (id: string) => {
        history.push(`${ROUTES.SEARCH_ITEM_DETAILS}/${id}`);
    };

    const handleGroupChange = () => {

    };

    const search = () => {
        console.log('searchinit');
        props.onSearch('User 1 Item 1', ['group_3']);
    };

    return(
        <div>
        <Search
            placeholder="input search text"
            onSearch={search}
            style={{ width: '100%' }}
            size="large"
        />
        <AddGroupBox itemGroups={[]} handleChange={handleGroupChange}/>
        {/* <List itemList={} onClickItem={onItemClick} /> */}
        </div>
    );
};

export { SearchList };
