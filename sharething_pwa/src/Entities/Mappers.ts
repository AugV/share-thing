import { ItemQuery } from './Interfaces';

export const toItemQuery = (name: string, groups: string[]): ItemQuery => {
    return { name, groups };
};
