import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChart, ICurrency } from "../../types/types";
import usdtIcon from "../../assets/icons/tokens/usdt.svg";
import btcIcon from "../../assets/icons/tokens/btc.svg";
import ethIcon from "../../assets/icons/tokens/eth.svg";
import usdcIcon from "../../assets/icons/tokens/usdc.svg";
import rubIcon from "../../assets/icons/money/RUB.svg";
import { getBanksThunk, getChartListThunk, getCurrenciesThunk, getOkvedsThunk } from "../api/app.thunk";
import { IBank, IOkved } from "../../types/B2b.types";

// HARDCORE
const initValues = {
    chartsB2b: {
        ['1']: {
            id: 1,
            name: 'USDT',
            symbol: 'USDT',
            icon: usdtIcon,
        },
        ['2']: {
            id: 2,
            name: 'BTC',
            symbol: 'BTC',
            icon: btcIcon,
        },
        ['3']: {
            id: 3,
            name: 'ETH',
            symbol: 'ETH',
            icon: ethIcon,
        },
        ['4']: {
            id: 4,
            name: 'USDC',
            symbol: 'USDC',
            icon: usdcIcon,
        },
    },
    chartsP2p: {
        ['1']: {
            id: 1,
            name: 'USDT',
            symbol: 'USDT',
            icon: usdtIcon,
        },
        ['2']: {
            id: 2,
            name: 'BTC',
            symbol: 'BTC',
            icon: btcIcon,
        },
        ['3']: {
            id: 3,
            name: 'ETH',
            symbol: 'ETH',
            icon: ethIcon,
        },
        ['4']: {
            id: 4,
            name: 'USDC',
            symbol: 'USDC',
            icon: usdcIcon,
        },
    },
    currencies: {
        ['11']: {
            id: 11,
            name: 'USD',
            symbol: 'USD',
            icon: rubIcon,
        },
        ['22']: {
            id: 22,
            name: 'RUB',
            symbol: 'RUB',
            icon: rubIcon,
        },
        ['33']: {
            id: 33,
            name: 'BYN',
            symbol: 'BYN',
            icon: rubIcon,
        },
    },
    okved: {
        ['11']: {
            title: '',
            okved_id: ''
        },
    }
};

interface AppState {
    isInit: boolean;

    charts: Record<string, IChart>;
    currencies: Record<string, ICurrency>;
    okved: Record<string, IOkved>;
    bank: Record<string, IBank>;

    error: string;
}

const initialState: AppState = {
    isInit: false,

    charts: {},
    currencies: {},
    okved: {},
    bank: {},

    error: '',
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {

        setAppInit: (state, action: PayloadAction<boolean>) => {
            state.isInit = action.payload;
        }

    },
    extraReducers: {
        // GET CURRENCIES
        [getCurrenciesThunk.pending.type]: (state) => {
            state.error = '';
        },
        [getCurrenciesThunk.fulfilled.type]: (state, action: PayloadAction<ICurrency[]>) => {
            const currencies: Record<string, ICurrency> = {};
            action.payload?.forEach(c => {
                currencies[c.id] = c;
            });
            state.currencies = currencies;
        },
        [getCurrenciesThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        // GET OKVEDS
        [getOkvedsThunk.pending.type]: (state) => {
            state.error = '';
        },
        [getOkvedsThunk.fulfilled.type]: (state, action: PayloadAction<IOkved[]>) => {
            const okveds: Record<string, IOkved> = { '0': { title: 'Все', okved_id: '', id: '' } };
            action.payload?.forEach(c => {
                okveds[c.okved_id] = c;
            });
            state.okved = okveds;
        },
        [getOkvedsThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        // GET BANKS
        [getBanksThunk.pending.type]: (state) => {
            state.error = '';
        },
        [getBanksThunk.fulfilled.type]: (state, action: PayloadAction<IBank[]>) => {
            const banks: Record<string, IBank> = { '0': { title: 'Все', id: 0, active: 0, address: '', bik: '' } };
            action.payload?.forEach(c => {
                banks[c.id] = c;
            });
            state.bank = banks;
        },
        [getBanksThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

        // GET CHARTS
        [getChartListThunk.pending.type]: (state) => {
            state.error = '';
        },
        [getChartListThunk.fulfilled.type]: (state, action: PayloadAction<IChart[]>) => {
            const charts: Record<string, IChart> = {};
            action.payload?.forEach(ch => {
                charts[ch.id] = ch;
            });
            state.charts = charts;
        },
        [getChartListThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

    }
});

export const {
    setAppInit,
} = appSlice.actions;