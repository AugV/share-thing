import { ItemQuery, ItemModel, Sharegreement } from './Interfaces';
import { NameQueryParam, GroupsQueryParam, DateRange } from './Types';

export const toItemQuery = (name: NameQueryParam, groups: GroupsQueryParam): ItemQuery => {
    return { name, groups };
};

export const toSharegCreateReq = (itemData: ItemModel, dates: DateRange): Partial<Sharegreement> => {
    return {
        itemId: itemData.id,
        itemName: itemData.name,
        owner: itemData.owner,
        startDate: dates[0],
        endDate: dates[1],
    };
};
