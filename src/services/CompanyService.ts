import { ApiClientNew } from "./Client";
import { CreateCompanyRequest } from "../types/Company.type";
import { camelToSnakeDTO } from "../utils/fn/camelToSnakeCaseDTO";

export class CompanyService {

    static async findCompanyByINN(inn: string) {
        const token = localStorage.getItem("access_token") ?? '';

        return ApiClientNew({
            method: "GET",
            url: "/company/find",
            headers: {
                Authorization: `${token}`,
            },
            params: { inn }
        });
    }

    static async getAllCompanies() {
        const token = localStorage.getItem("access_token") ?? '';

        return ApiClientNew({
            method: "GET",
            url: "/company/list",
            headers: {
                Authorization: `${token}`,
            },
        });
    }

    static async createCompany(dataIn: CreateCompanyRequest) {
        const token = localStorage.getItem("access_token") ?? '';
        const data = camelToSnakeDTO(dataIn);
        return ApiClientNew({
            method: "POST",
            url: "/company/create",
            headers: {
                Authorization: `${token}`,
            },
            data,
        });
    }

}

export const GetCompanyByInfo = async (bik?: string, title?: string) => {
    const token = localStorage.getItem("access_token") ?? '';
    return await ApiClientNew({
        method: "GET",
        url: "/company/get-bank",
        headers: {
            Authorization: `${token}`,
        },
        params: {
            ...(bik && { bik: bik }),
            ...(title && { title: title }),
        }
    })
}