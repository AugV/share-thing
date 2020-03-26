import React, { useState, useRef } from 'react';
import Search from 'antd/lib/input/Search';
import { AddGroupBox } from '../../Components/AddGroupBox/AddGroupBox';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import { toItemQuery } from '../../Entities/Mappers';
import { GroupsQueryParam } from '../../Entities/Types';
import { ItemQuery, ItemPreview } from '../../Entities/Interfaces';
import { List } from '../../Components/List/List';

interface SearchListProps {
    items: ItemPreview[] | undefined;
    onSearch: (query: ItemQuery) => void;
}

const SearchPage: React.FC<SearchListProps> = (props) => {
    const history = useHistory();

    const selectedGroups = useRef<GroupsQueryParam>(null);

    const onItemClick = (id: string) => {
        history.push(`${ROUTES.BORROW_DETAILS}/${id}`);
    };

    const handleGroupChange = (groups: string[]) => {
        selectedGroups.current = groups;
    };

    const search = (searchValue: string) => {
        const query = toItemQuery(searchValue, selectedGroups.current);
        props.onSearch(query);
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

        {props.items && <List itemList={props.items} onClickItem={onItemClick} />}
        </div>
    );
};

export { SearchPage };
