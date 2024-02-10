import { RootStateType } from "../store";
import { IChart, ICurrency } from "../../types/types";
import { IBank, IOkved } from "../../types/B2b.types";

export const getIsAppInit = (state: RootStateType): boolean => state.app.isInit;
export const getCharts = (state: RootStateType): Record<string, IChart> => state.app.charts;
export const getCurrencies = (state: RootStateType): Record<string, ICurrency> => state.app.currencies;
export const getOkved = (state: RootStateType): Record<string, IOkved> => state.app.okved;
export const getBank = (state: RootStateType): Record<string, IBank> => state.app.bank;