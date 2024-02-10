import { ApiClient, ApiClientNew } from "./Client";
import { B2bFilters, B2bOfferHistoryParams, ConfirmB2bTradeRequest, CreateOfferRequest } from "../types/B2b.types";
import { camelToSnakeDTO } from "../utils/fn/camelToSnakeCaseDTO";



export class B2bService {

    static async getB2bOffers(filters: B2bFilters) {
        let params = camelToSnakeDTO(filters);
        const token = localStorage.getItem("access_token") ?? '';
        //@ts-ignore
        params = { ...params, status: -1 }

        return ApiClientNew({
            url: "/b2b/full-list",
            method: "GET",
            params,
            headers: {
                Authorization: `${token}`,
            },
        });
    }

    static async createB2bBuyOffer(requestBody: CreateOfferRequest) {
        const data = camelToSnakeDTO(requestBody);
        const token = localStorage.getItem("access_token") ?? '';

        return ApiClientNew({
            url: "/b2b/create-buy",
            method: "POST",
            data,
            headers: {
                Authorization: `${token}`,
            },
        });
    }

    static async createB2bSellOffer(requestBody: CreateOfferRequest) {
        const data = camelToSnakeDTO(requestBody);
        const token = localStorage.getItem("access_token") ?? '';

        return ApiClientNew({
            url: "/b2b/create-sell",
            method: "POST",
            data,
            headers: {
                Authorization: `${token}`,
            },
        });
    }

    static async confirmB2bTrade(requestBody: ConfirmB2bTradeRequest) {
        const data = camelToSnakeDTO(requestBody);
        const token = localStorage.getItem("access_token") ?? '';
        console.log(data);

        return ApiClientNew({
            url: "/b2b/confirm-trade",
            method: "POST",
            data,
            headers: {
                Authorization: `${token}`,
            },
        });
    }
}

export const getActiveB2bOffers = async (filters: B2bOfferHistoryParams) => {
    // const params = camelToSnakeDTO(filters);
    const token = localStorage.getItem("access_token") ?? '';

    return ApiClient({
        url: "/b2b/history",
        method: "GET",
        params: filters,
        headers: {
            Authorization: `${token}`,
        },
    });
}

export const createB2bBuyOffer = async (
    token: string,
    chart_id: number,
    currency_id: number,
    amount: number,
    course: number,
    min_limit: number,
    max_limit: number,
    main_okved: number,
    description: string,
) => {


    return ApiClient({
        url: "/b2b/create-buy",
        method: "POST",
        data: {
            chart_id: chart_id,
            currency_id: currency_id,
            amount: amount,
            course: course,
            min_limit: min_limit,
            max_limit: max_limit,
            main_okved: main_okved,
            description: description,
        },
        headers: {
            Authorization: `${token}`,
        },
    });
}

export const createB2bSellOffer = async (
    token: string,
    chart_id: number,
    currency_id: number,
    amount: number,
    course: number,
    min_limit: number,
    max_limit: number,
    main_okved: number,
    description: string,
) => {

    return ApiClient({
        url: "/b2b/create-sell",
        method: "POST",
        data: {
            chart_id: chart_id,
            currency_id: currency_id,
            amount: amount,
            course: course,
            min_limit: min_limit,
            max_limit: max_limit,
            main_okved: main_okved,
            description: description
        },
        headers: {
            Authorization: `${token}`,
        },
    });
}