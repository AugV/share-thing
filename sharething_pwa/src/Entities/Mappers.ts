import { ItemQuery, ItemModel, SharegreementModel } from './Interfaces';
import { NameQueryParam, GroupsQueryParam, DateRange } from './Types';

export const toItemQuery = (name: NameQueryParam, groups: GroupsQueryParam): ItemQuery => {
    return { name, groups };
};

export const toSharegCreateReq = (itemData: ItemModel, dates: DateRange): Partial<SharegreementModel> => {
    return {
        itemId: itemData.id,
        itemName: itemData.name,
        itemImg: itemData.images[0],
        owner: itemData.owner,
        startDate: dates[0],
        endDate: dates[1],
    };
};
