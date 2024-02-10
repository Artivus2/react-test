import {RootStateType} from "../../bll/store";
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const useAppSelector:TypedUseSelectorHook<RootStateType> = useSelector;