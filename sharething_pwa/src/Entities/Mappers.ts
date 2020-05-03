import { ItemQuery, ItemModel, CreateSharegRequest } from './Interfaces';
import { NameQueryParam, GroupsQueryParam, DateRange } from './Types';

export const toItemQuery = (name: NameQueryParam, groups: GroupsQueryParam): ItemQuery => {
    return { name, groups };
};

export const toSharegCreateReq = (itemData: ItemModel, dates: DateRange): CreateSharegRequest => {
    return {
        itemId: itemData.id,
        itemName: itemData.name,
        itemImg: itemData.images[0],
        owner: itemData.owner,
        startDate: dates[0],
        endDate: dates[1],
    };
};
