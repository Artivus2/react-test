import { createAsyncThunk } from "@reduxjs/toolkit";
import { B2bService } from "../../services/B2bService";
import { B2bFilters, ConfirmB2bTradeRequest, CreateOfferRequest, IB2bHistory, IB2bOffer } from "../../types/B2b.types";
import { snakeToCamelDTO } from "../../utils/fn/snakeToCamelCaseDTO";
import { errorProcessing } from "../../utils/fn/errorProcessing";

export const getB2bFullListThunk = createAsyncThunk(
    'b2b/full-list',
    async (filters: B2bFilters) => {
        try {
            const { data } = await B2bService.getB2bOffers(filters);
            const dto = (data as Array<Record<string, any>>)
                .map(snakeToCamelDTO<IB2bOffer, Record<string, any>>);
            return dto;
        } catch (e) {
            const message = errorProcessing(e);
            // MUST be FIX
            // alert(message);
        }
    }
);

export const createB2bBuyOfferThunk = createAsyncThunk(
    'b2b/create-buy',
    async (requestBody: CreateOfferRequest) => {
        try {
            const data = await B2bService.createB2bBuyOffer(requestBody);
            return data;
        } catch (e) {
            const message = errorProcessing(e);
            // MUST be FIX
            // alert(message);
        }
    }
);

export const createB2bSellOfferThunk = createAsyncThunk(
    'b2b/create-sell',
    async (requestBody: CreateOfferRequest) => {
        try {
            await B2bService.createB2bSellOffer(requestBody);
        } catch (e) {
            const message = errorProcessing(e);
            // MUST be FIX
            // alert(message);
        }
    }
);

export const confirmB2bTradeThunk = createAsyncThunk(
    'b2b/confirm-trade',
    async (requestBody: ConfirmB2bTradeRequest) => {
        try {

            const data = await B2bService.confirmB2bTrade(requestBody);
            const resData = snakeToCamelDTO<IB2bHistory, Record<string, any>>(data.data);
            return data;
        } catch (e) {
            const message = errorProcessing(e);
            // MUST be FIX
            // alert(message);
        }
    }
);