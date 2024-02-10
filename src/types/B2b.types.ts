import { OrderType } from "./types";

export interface B2bFilters {
    type: OrderType;
    mainOkved: string | null;
    bank_id: string | null;
    chartId: number | null;
    currencyId: number | null;
    amount: number | null;
}

interface IPayment {
    id: number;
    name: string;
    payment_receiver: string;
    value: string;
}

export interface IB2bOffer {
    orderId: number;                            // приходит с сервера
    b2b_ads_id: number;
    uuid: string;
    type: OrderType;
    companyId: number;
    company: string;
    bStatus: number;                            // не приходит с сервера
    // verifyStatus: number;                    // приходит с сервера
    chart: string;                              // приходит с сервера
    chartId: number;
    currency: string;                           // приходит с сервера
    currencyId: number;                         // не приходит с сервера
    course: number;
    startAmount: number;                        // не приходит с сервера
    amount: number;
    // fullAmount: number;                      // приходит с сервера
    minLimit: number;
    maxLimit: number;
    duration: number;
    payments: IPayment[];                    // приходит с сервера
    // payments: number;                           // не приходит с сервера
    history: string;                            // не приходит с сервера - приходит null
    countPaymentsOrderType: number;
    userOrdersCount: number;
    // userOrdersOountCompletePercent: number;  // приходит с сервера
    date: string;
    status: number;
    // okved: string | null;                    // приходит с сервера
    mainOkved: string;                          // не приходит с сервера
    canDelete: number;
    image: string;
}

export interface CreateOfferRequest {
    chartId: number;
    currencyId: number;
    amount: number;
    course: number;
    minLimit: number;
    maxLimit?: number;
    duration?: number;
    payments?: number;
}

export interface B2bOfferHistoryParams {
    id?: number;
    user_id: number;
}

export interface IB2bHistory {
    b2bAdsId: number;
    offer: number;
    payment: number;
}

export interface ConfirmB2bTradeRequest {
    b2bAdsId: number;
    offer: number;
    // duration: number;
}

export interface IOkved {
    title: string;
    okved_id: string;
    id: string;
}
export interface IBank {
    // title: string;
    // bank_id: string;
    // id: string;
    active: number;
    address: string;
    bik: string;
    id: number;
    title: string;
}

export interface IB2bOfferHistory {
    amount: number
    can_delete: number
    chart: string
    chart_id: number
    company: string
    company_id: number
    course: number
    currency: string
    currency_id: number
    date: string
    full_amount: number
    history: any
    image: string
    max_limit: number
    min_limit: number
    okved: any
    order_id: number
    status: number
    type: number
    user_orders_count: number
    user_orders_oount_complete_percent: number
    uuid: number
    verify_status: number
}