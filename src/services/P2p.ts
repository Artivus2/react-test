import { ApiClient } from "./Client"

export const GetCharts = async (token: string) => {
  return await ApiClient({
    method: "GET",
    url: "/chart/list",
    params: {
      p2p: 1
    },
    headers: {
      Authorization: `${token}`,
    }
  })
}
export const GetB2bCharts = async (token: string) => {
  return await ApiClient({
    method: "GET",
    url: "/chart/list",
    params: {
      b2b: 1
    },
    headers: {
      Authorization: `${token}`,
    }
  })
}
export const GetCurrency = async (token: string) => {
  return await ApiClient({
    method: "GET",
    url: "/chart/currency",
    params: {
      p2p: 1
    },
    headers: {
      Authorization: `${token}`,
    }
  })
}

export const GetPayment = async (token: string, currency_id: number) => {
  return await ApiClient({
    method: "GET",
    url: "/payment/list",
    params: {
      currency_id: currency_id
    },
    headers: {
      Authorization: token
    }
  })
}

export const GetOffers = async (token: string, type?: number | undefined, currency_id?: number | undefined, chart_id?: number | undefined, payments?: number | undefined, uuid?: number) => {
  return await ApiClient({
    method: "GET",
    url: `/p2p/full-list`,
    headers: {
      Authorization: token
    },
    params: {
      ...(!uuid && { status: -1 }),
      type: uuid ? type : type === 1 ? 2 : 1,
      ...(currency_id && { currency_id: currency_id }),
      ...(chart_id && { chart_id: chart_id }),
      ...(payments && { payments: payments }),
      ...(uuid && { uuid: uuid }),
      status: -1
    },
  })
}

export const GetCompany = async (token: string, company_id: number) => {
  return await ApiClient({
    method: "GET",
    url: "/company/list",
    headers: {
      "Authorization": token
    },
    params: {
      company_id: company_id
    }
  })
}

export const GetRating = async (token: string, user_id: number) => {
  return await ApiClient({
    method: "GET",
    url: `/ratings/info`,
    params: {
      user_id: user_id
    },
    headers: {
      Authorization: token
    }
  })
}

export const AddRating = async (token: string, user_id: number, type: number, description: string) => {
  return await ApiClient({
    method: "POST",
    url: "/ratings/add-ratings",
    headers: {
      Authorization: token
    },
    data: { user_id: user_id, type: type, description: description }
  })
}

export const GetRate = async (token: string, currency_id: number, chart_id: number) => {
  return await ApiClient({
    method: "GET",
    url: "/chart/price",
    headers: {
      Authorization: token
    },
    params: { currency_id: currency_id, chart_id: chart_id }
  })
}

export const CreateBuyAdd = async (
  token: string,
  chart_id: number,
  currency_id: number,
  amount: number,
  course: number,
  min_limit: number,
  max_limit: number,
  payments: number,
  duration: number,
  description: string,
) => {
  return await ApiClient({
    method: "POST",
    url: "/p2p/create-buy",
    headers: {
      Authorization: token
    },
    data: {
      chart_id: chart_id,
      currency_id: currency_id,
      amount: amount,
      course: course,
      min_limit: min_limit,
      max_limit: max_limit,
      payments: payments,
      duration: duration,
      description: description
    }
  })
}

export const CreateSellAdd = async (
  token: string,
  chart_id: number,
  currency_id: number,
  amount: number,
  course: number,
  min_limit: number,
  max_limit: number,
  payments: number,
  duration: number,
  description: string,
) => {

  return await ApiClient({
    method: "POST",
    url: "/p2p/create-sell",
    headers: {
      Authorization: token
    },
    data: {
      chart_id: chart_id,
      currency_id: currency_id,
      amount: amount,
      course: course,
      min_limit: min_limit,
      max_limit: max_limit,
      payments: payments,
      duration: duration,
      description: description
    }
  })
}

export const GetCurrentOffer = async (token: string, user_id: number, id?: number) => {
  return await ApiClient({
    method: "GET",
    url: "/p2p/history",
    headers: {
      Authorization: token
    },
    params: {
      ...(id && { id: id }),
      user_id: user_id,
      status_history: `1,2,3,4,5`
    }
  })
}
export const GetCurrentB2bOffer = async (token: string, user_id: number, id?: number) => {
  return await ApiClient({
    method: "GET",
    url: "/b2b/history",
    headers: {
      Authorization: token
    },
    params: {
      ...(id && { id: id }),
      user_id: user_id,
      status_history: `1,2,3,4,5`
    }
  })
}
export const GetAllOffers = async (token: string, user_id: number, id?: number) => {
  return await ApiClient({
    method: "GET",
    url: "/p2p/history",
    headers: {
      Authorization: token
    },
    params: {
      ...(id && { id: id }),
      user_id: user_id,
    }
  })
}
export const GetAllB2bOffers = async (token: string, user_id: number, id?: number) => {
  return await ApiClient({
    method: "GET",
    url: "/b2b/history",
    headers: {
      Authorization: token
    },
    params: {
      ...(id && { id: id }),
      user_id: user_id,
    }
  })
}
export const GetActiveOffers = async (token: string, user_id: number, id?: number) => {
  return await ApiClient({
    method: "GET",
    url: "/p2p/history",
    headers: {
      Authorization: token
    },
    params: {
      ...(id && { id: id }),
      user_id: user_id,
      status_history: `1,2,3,5`
    }
  })
}
export const GetActiveB2bOffers = async (token: string, user_id: number, id?: number) => {
  return await ApiClient({
    method: "GET",
    url: "/b2b/history",
    headers: {
      Authorization: token
    },
    params: {
      ...(id && { id: id }),
      user_id: user_id,
      status_history: `1,2,3,5`
    }
  })
}
export const GetLastOffers = async (token: string, user_id: number, id?: number) => {
  return await ApiClient({
    method: "GET",
    url: "/p2p/history",
    headers: {
      Authorization: token
    },
    params: {
      ...(id && { id: id }),
      user_id: user_id,
      status_history: `4,6,7`
    }
  })
}
export const GetLastB2bOffers = async (token: string, user_id: number, id?: number) => {
  return await ApiClient({
    method: "GET",
    url: "/b2b/history",
    headers: {
      Authorization: token
    },
    params: {
      ...(id && { id: id }),
      user_id: user_id,
      status_history: `4,6,7`
    }
  })
}

export const GetMyOffers = async (token: string, user_id: number) => {
  return await ApiClient({
    method: "GET",
    url: "/p2p/full-list",
    headers: {
      Authorization: token
    },
    params: {
      status: '-1,6',
      user_id: user_id
    }
  })
}
export const GetMyB2bOffers = async (token: string, user_id: number) => {
  return await ApiClient({
    method: "GET",
    url: "/b2b/full-list",
    headers: {
      Authorization: token
    },
    params: {
      status: '-1,6',
      company_id: user_id,
    }
  })
}

export const StartOffer = async (token: string, p2p_ads_id: number, offer: number, payment?: number) => {
  return await ApiClient({
    method: "POST",
    url: "/p2p/confirm-trade",
    headers: {
      'Authorization': token
    },
    data: {
      p2p_ads_id: p2p_ads_id,
      offer: offer,
      ...(payment && { payment: payment })
    }
  })
}
export const StartB2bOffer = async (token: string, b2b_ads_id: number, offer: number) => {
  return await ApiClient({
    method: "POST",
    url: "/b2b/confirm-trade",
    headers: {
      'Authorization': token
    },
    data: {
      b2b_ads_id: b2b_ads_id,
      offer: offer,
    }
  })
}

export const CancelTrade = async (token: string, p2p_ads_id: number, description_id?: number) => {
  return await ApiClient({
    method: "POST",
    url: "/p2p/cancel-trade",
    headers: {
      'Authorization': token
    },
    data: {
      p2p_ads_id: p2p_ads_id,
      description_id: description_id
    }
  })
}
export const CancelB2bTrade = async (token: string, b2b_ads_id: number, description_id?: number) => {
  return await ApiClient({
    method: "POST",
    url: "/b2b/cancel-trade",
    headers: {
      'Authorization': token
    },
    data: {
      b2b_ads_id: b2b_ads_id,
      description_id: description_id
    }
  })
}

export const BuyerPay = async (token: string, p2p_ads_id: number) => {
  return await ApiClient({
    method: "POST",
    url: "/p2p/check-pay",
    headers: {
      "Authorization": token
    },
    data: {
      p2p_ads_id: p2p_ads_id
    }
  })
}
export const BuyerB2bPay = async (token: string, b2b_ads_id: number) => {
  return await ApiClient({
    method: "POST",
    url: "/b2b/check-pay",
    headers: {
      "Authorization": token,
    },
    data: {
      b2b_ads_id: b2b_ads_id
    }
  })
}

export const SellerConfirm = async (token: string, p2p_ads_id: number) => {
  return await ApiClient({
    method: "POST",
    url: "/p2p/confirm-payment",
    headers: {
      "Authorization": token
    },
    data: {
      p2p_ads_id: p2p_ads_id
    }
  })
}
export const SellerB2bConfirm = async (token: string, b2b_ads_id: number) => {
  return await ApiClient({
    method: "POST",
    url: "/b2b/confirm-payment",
    headers: {
      "Authorization": token
    },
    data: {
      b2b_ads_id: b2b_ads_id
    }
  })
}

export const SendApeal = async (token: string, p2p_ads_id: number) => {
  return await ApiClient({
    method: "POST",
    url: "/p2p/appeal",
    headers: {
      "Authorization": token
    },
    data: {
      p2p_ads_id: p2p_ads_id
    }
  })
}
export const SendB2bApeal = async (token: string, b2b_ads_id: number) => {
  return await ApiClient({
    method: "POST",
    url: "/b2b/appeal",
    headers: {
      "Authorization": token
    },
    data: {
      b2b_ads_id: b2b_ads_id
    }
  })
}