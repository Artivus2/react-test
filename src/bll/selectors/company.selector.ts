import {RootStateType} from "../store";
import {ICompany} from "../../types/Company.type";

export const getCompanyList = (state: RootStateType): ICompany[] => state.company.list;
