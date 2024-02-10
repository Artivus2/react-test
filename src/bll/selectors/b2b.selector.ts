import { RootStateType } from "../store";
import { B2bFilters, IB2bOffer } from "../../types/B2b.types";

export const getB2bLoading = (state: RootStateType): boolean => state.b2b.isFetching;
export const getB2bFilters = (state: RootStateType): B2bFilters => state.b2b.filters;
export const getB2bOffers = (state: RootStateType): IB2bOffer[] => state.b2b.offers;
export const getB2bOrder = (state: RootStateType): IB2bOffer | null => state.b2b.trade;
export const getB2bSum = (state: RootStateType): number | null => state.b2b.filters.amount;
