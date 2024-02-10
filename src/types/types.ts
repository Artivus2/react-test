// import * as buffer from "buffer";

export interface UserReg {
    login: string,
    email: string,
    password: string,
}

export interface UserLog {
    email: string,
    password: string,
}

export interface UserCode {
    email: string,
    password: string,
    code: string,
}

export interface UserProfile {
    email: string | null;
    first_name: string | null;
    id: number;
    image: string;
    last_name: string | null;
    login: string;
    patronymic: string | null;
    phone: string | null;
    status: number;
    telegram: string | null;
    two_factor: boolean;
    verify_status: number;
}

export interface UpdateProfile {
    login: string,
    telegram: string | null,
    last_name: string | null,
    first_name: string | null,
    patronymic: string | null,
}

export interface Payments {
    id: number,
    name: string,
    // payment_id: number,
    payment_receiver: string,
    value: string,
}

export interface OfferData {
    amount: number,
    canDelete: number,
    chart: string,
    chart_id: number,
    count_payments_order_type: number,
    course: number,
    currency: string,
    date: string,
    duration: string
    first_name: string | null,
    full_amount: number,
    history: any,
    image: string,
    last_name: string | null,
    max_limit: number,
    min_limit: number,
    order_id: number,
    patronymic: string | null,
    payments: Payments[],
    status: number,
    type: number,
    user: string,
    user_orders_count: number
    user_orders_count_complete_percent: number
    user_id: number,
    uuid: number,
    verify_status: number,
    description: string
}

export interface UserRating {
    created_at: string
    description: string
    first_name: string | null
    id: number
    image_rater: string
    last_name: string | null
    login: string
    patronymic: null
    type: number
    user_id_rater: number
}

export interface OrderHistory {
    amount: number,
    author: string,
    author_id: number,
    can_delete: number,
    chart: string,
    chart_id: number,
    course: number,
    creator_id: number,
    currency: string,
    date: string,
    duration: number,
    end_date: string,
    first_name: string | null,
    full_amount: number,
    image: string,
    image_author: string,
    last_name: string | null,
    max_limit: number,
    min_limit: number,
    order_id: number,
    b2b_ads_id: number,
    order_id_history: number,
    patronymic: string | null,
    payments_order: Payments[]
    payments_author: Payments[],
    payments_creator: Payments[],
    start_date: string,
    status: number,
    status_history: number,
    type: number,
    user: string,
    user_id: number,
    uuid: number,
    verify_status: number,
    volume: number,
    description: string,
}
export interface OrderB2bHistory {
    amount: number;
    author: string
    author_bank: string
    author_bik: string
    author_id: number
    author_ks: string
    author_phone: string
    author_rs: string
    b2b_ads_id: number
    can_delete: number
    chart: string
    chart_id: number
    company: string
    company_id: number
    course: number
    creator: string
    creator_bank: string
    creator_bik: string
    creator_id: number
    creator_ks: string
    creator_phone: string
    creator_rs: string
    currency: string
    currency_id: number
    date: string
    end_date: string
    first_name: string | null
    full_amount: number
    image_author: string
    image_creator: string
    last_name: null
    max_limit: number
    min_limit: number
    order_id_history: number
    patronymic: null
    start_date: string
    status: number
    status_history: number
    type: number
    uuid: string
    verify_status: number
    volume: number
}

export interface WalletBalance {
    id: number,
    name: string,
    symbol: string,
    price: number,
    balance: number,
    percent: number,
    wallet: string,
    icon: string,
    blocked: number | null,
}

export interface ICurrency {
    id: number;
    name: string;
    symbol: string;
    icon: string;
}

export interface IChart extends ICurrency {
}

export interface IChartFull extends IChart {
    price: string;
    lowPrice: string;
    hightPrice: string;
    percent: string;
    favorite: boolean;
    chart_image: string;
}

export enum OrderType {
    BUY = 2,
    SELL = 1,
}

export interface IChartPriceRequest {
    chartId: number;
    currencyId: number;
}

export interface ApealProps {
    order_id: number;
    tel: string;
    desc: string;
    check: string;
    photoList: string[];
    user: string;
}

export interface CompanyList {
    address: string
    bank: string
    bik: string
    fio: string
    id: number
    inn: string
    kpp: string
    ks: string
    main_okved: number
    name: string
    ogrn: string
    phone: string
    rs: string
    title?: string
}

export interface IStatusList {
    active: number;
    id: number;
    status_id: number;
    title: string;
}