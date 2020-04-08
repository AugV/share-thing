import { ItemQuery } from './Interfaces';
import { NameQueryParam, GroupsQueryParam } from './Types';

export const toItemQuery = (name: NameQueryParam, groups: GroupsQueryParam): ItemQuery => {
    return { name, groups };
};

