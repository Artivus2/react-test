import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../bll/store";

export const useAppDispatch = () => useDispatch<AppDispatchType>();