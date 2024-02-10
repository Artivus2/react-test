import { ApiClient } from "./Client";

export const payInMethod = async (token: string, chart_id: number, price: number) => {
  return await ApiClient({
    method: "POST",
    url: "/wallet/buy",
    headers: {
      Authorization: `${token}`,
    },
    data: {
      chart_id: chart_id,
      price: price,
    },
  });
};

export const payOutMethod = async (token: string, chart_id: number, price: number, payment_id: number) => {
  return await ApiClient({
    method: "POST",
    url: "/wallet/sell",
    headers: {
      Authorization: `${token}`,
    },
    data: {
      chart_id: chart_id,
      price: price,
      payment_id: payment_id
    },
  });
};