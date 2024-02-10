import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getB2bFullListThunk } from "../api/b2b.thunk";
import { B2bFilters, IB2bOffer } from "../../types/B2b.types";
import { OrderType } from "../../types/types";

interface B2bState {
    isFetching: boolean;
    filters: B2bFilters;
    // sum: number | null;
    offers: IB2bOffer[];
    trade: IB2bOffer | null;
    error: string;
}

const initialState: B2bState = {
    isFetching: false,
    filters: {
        type: OrderType.BUY,
        chartId: null,
        currencyId: null,
        mainOkved: null,
        bank_id: null,
        amount: null,
    },
    // sum: null,
    offers: [],
    trade: null,
    error: '',
};

export const b2bSlice = createSlice({
    name: 'b2b',
    initialState,
    reducers: {

        setOfferType(state: B2bState, action: PayloadAction<OrderType>) {
            state.filters.type = action.payload;
        },

        setChartId(state: B2bState, action: PayloadAction<number | null>) {
            state.filters.chartId = action.payload;
        },

        setCurrencyId(state: B2bState, action: PayloadAction<number | null>) {
            state.filters.currencyId = action.payload;
        },

        setMainOkved(state: B2bState, action: PayloadAction<string | null>) {
            state.filters.mainOkved = action.payload;
        },
        setBank(state: B2bState, action: PayloadAction<string | null>) {
            state.filters.bank_id = action.payload;
        },

        setSum(state: B2bState, action: PayloadAction<number>) {
            state.filters.amount = action.payload;
        },

        setTrade(state: B2bState, action: PayloadAction<IB2bOffer | null>) {
            state.trade = action.payload;
        }


    },
    extraReducers: {
        [getB2bFullListThunk.pending.type]: (state) => {
            state.isFetching = true;
            state.error = '';
        },
        [getB2bFullListThunk.fulfilled.type]: (state, action: PayloadAction<IB2bOffer[]>) => {
            state.offers = action.payload;
            state.isFetching = false;
        },
        [getB2bFullListThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isFetching = false;
        },
    }
});

export const {
    setOfferType,
    setChartId,
    setCurrencyId,
    setSum,
    setMainOkved,
    setTrade,
    setBank
} = b2bSlice.actions;