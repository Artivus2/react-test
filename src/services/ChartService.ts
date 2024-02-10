import { ApiClientNew } from "./Client";
import { IChartPriceRequest } from "../types/types";
import { camelToSnakeDTO } from "../utils/fn/camelToSnakeCaseDTO";

export class ChartService {

    static async getChartListItems() {
        const token = localStorage.getItem("access_token") ?? '';

        return ApiClientNew({
            method: "GET",
            url: "/chart/list",
            params: {
                b2b: 1
            },
            headers: {
                Authorization: `${token}`,
            },
        }
        );
    }

    static async getCurrencies() {
        const token = localStorage.getItem("access_token") ?? '';

        return ApiClientNew({
            method: "GET",
            url: "/chart/currency",
            params: {
                b2b: 1
            },
            headers: {
                Authorization: `${token}`,
            },
        }
        );
    }
    static async getOkveds() {
        const token = localStorage.getItem("access_token") ?? '';

        return ApiClientNew({
            method: "GET",
            url: "/company/get-okveds",
            headers: {
                Authorization: `${token}`,
            },
        }
        );
    }
    static async getBanks() {
        const token = localStorage.getItem("access_token") ?? '';

        return ApiClientNew({
            method: "GET",
            url: "/company/get-bank",
            params: {
                currency_id: 1
            },
            headers: {
                Authorization: `${token}`,
            },
        }
        );
    }

    static async getChartPrice(data: IChartPriceRequest) {
        const token = localStorage.getItem("access_token") ?? '';
        const params = camelToSnakeDTO(data);

        return ApiClientNew({
            method: "GET",
            url: "/chart/price",
            headers: {
                Authorization: `${token}`,
            },
            params,
        }
        );
    }

}