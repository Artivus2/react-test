import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { getBanksThunk, getChartListThunk, getCurrenciesThunk, getOkvedsThunk } from "../../bll/api/app.thunk";
import { setAppInit } from "../../bll/slices/app.slice";
import { getAllCompaniesThunk } from "../../bll/api/company.thunk";

export const useAppInit = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {

        Promise.all([
            dispatch(getAllCompaniesThunk()).unwrap(),
            dispatch(getCurrenciesThunk()).unwrap(),
            dispatch(getChartListThunk()).unwrap(),
            dispatch(getOkvedsThunk()).unwrap(),
            dispatch(getBanksThunk()).unwrap(),
        ])
            .catch(() => {
                // LOGOUT
            })
            .finally(() => {
                dispatch(setAppInit(true));
            });

    }, []);
};