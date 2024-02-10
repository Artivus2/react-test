import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChartService } from "../../services/ChartService";
import { IChart, IChartPriceRequest, ICurrency } from "../../types/types";
import { errorProcessing } from "../../utils/fn/errorProcessing";
import { IBank, IOkved } from "../../types/B2b.types";


export const getCurrenciesThunk = createAsyncThunk(
    'chart/currency',
    async () => {
        try {
            const { data } = await ChartService.getCurrencies();
            return data as ICurrency[];
        } catch (e) {
            const message = errorProcessing(e);
            // MUST be FIX
            // alert(message);
        }
    }
);
export const getOkvedsThunk = createAsyncThunk(
    'company/get-okveds',

    async () => {
        try {
            const { data } = await ChartService.getOkveds();
            return data as IOkved[];

        } catch (e) {
            const message = errorProcessing(e);
            // MUST be FIX
            // alert(message);
        }
    }
);
export const getBanksThunk = createAsyncThunk(
    'company/get-bank',

    async () => {
        try {
            const { data } = await ChartService.getBanks();
            return data as IBank[];

        } catch (e) {
            const message = errorProcessing(e);
            // MUST be FIX
            // alert(message);
        }
    }
);

export const getChartListThunk = createAsyncThunk(
    'chart/list',
    async () => {
        try {
            const { data } = await ChartService.getChartListItems();
            return data as IChart[];
        } catch (e) {
            const message = errorProcessing(e);
            // MUST be FIX
            // alert(message);
        }
    }
);

export const getChartPriceThunk = createAsyncThunk(
    'chart/price',
    async (body: IChartPriceRequest) => {
        try {
            const { data } = await ChartService.getChartPrice(body);
            return data.price as number;
        } catch (e) {
            const message = errorProcessing(e);
            // MUST be FIX
            // alert(message);
        }
    }
);