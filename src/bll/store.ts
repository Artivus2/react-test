import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { b2bSlice } from "./slices/b2b.slice";
import { appSlice } from "./slices/app.slice";
import { companySlice } from "./slices/company.slice";


const reducer = combineReducers({
    app: appSlice.reducer,
    b2b: b2bSlice.reducer,
    company: companySlice.reducer,
});

export const store = configureStore({ reducer });

export type RootStateType = ReturnType<typeof reducer>;
export type AppStoreType = typeof store;
export type AppDispatchType = AppStoreType['dispatch'];