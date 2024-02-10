import axios from "axios"
import { UpdateProfile } from "../types/types"
import { ApiClient } from "./Client"

export const ProfileInfo = async (token: string) => {
  return await ApiClient({
    method: "GET",
    url: "/user/profile",
    headers: {
      Authorization: `${token}`
    }
  })
}

export const BalanceInfo = async (token: string) => {
  return await ApiClient({
    method: "GET",
    url: "/wallet/list",
    params: {
      wallettype: 0
    },
    headers: {
      Authorization: `${token}`
    }
  })
}
export const TwoFactorNew = async (token: string) => {
  return await ApiClient({
    method: "GET",
    url: "/user/two-factor-new",
    headers: {
      Authorization: `${token}`
    }
  })
}
export const TwoFactor = async (token: string, secret: string, code: string) => {
  return await ApiClient({
    method: "POST",
    url: "/user/two-factor",
    data: { secret: secret, code: code },
    headers: {
      Authorization: `${token}`
    }
  })
}


export const ChangePassword = async (token: string, oldPass: string, newPass: string) => {
  return await ApiClient({
    method: "POST",
    url: "/user/change-password",
    data: { old_password: oldPass, password: newPass },
    headers: {
      Authorization: `${token}`
    }
  })
}

export const ChangeAvatar = async (token: string, image: any) => {
  return await ApiClient({
    method: "POST",
    url: "/user/upload-photo",
    data: { image: image },
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const ChangeProfile = async (token: string, newProfile: UpdateProfile) => {
  return await ApiClient({
    method: "POST",
    url: "/user/update",
    data: newProfile,
    headers: {
      Authorization: `${token}`
    }
  })
}

export const GetPayments = async (token: string, currency_id = 1) => {
  return await ApiClient({
    method: "GET",
    url: "/payment/my-list",
    headers: {
      'Authorization': token
    },
    data: {
      currency_id: currency_id
    }
  })
}

export const AddPayment = async (token: string, payment_id: number, value: string, payment_receiver: string) => {
  return await ApiClient({
    method: "POST",
    url: "/payment/create",
    headers: {
      'Authorization': token
    },
    data: {
      payment_id: payment_id,
      value: value,
      payment_receiver: payment_receiver
    }
  })
}
export const DelPayment = async (token: string, id: number) => {
  return await ApiClient({
    method: "POST",
    url: "/payment/delete",
    headers: {
      'Authorization': token
    },
    data: {
      id: id,
    }
  })
}

export const GetAllRates = async (token: string, urlList: string[]) => {
  const BASE_URL = 'https://greenavi.com/api';
  return axios.all(urlList.map(url => axios.get(BASE_URL + url, { headers: { "Authorization": token } })))
    .then((res: any) => {
      return ({ data: res, status: res.length ? 200 : undefined })
    })
    .catch((err: any) => {
      return { data: err.response?.data.message, status: err.response?.data.status };
    });
}

export const ChangeP2pOffer = async (
  token: string,
  p2p_ads_id: number,
  amount?: number,
  currency_id?: number,
  chart_id?: number,
  course?: number,
  min_limit?: number,
  max_limit?: number,
  payments?: number[]
) => {
  return await ApiClient({
    url: "/p2p/edit-order",
    method: "POST",
    headers: {
      "Authorization": token
    },
    data: {
      p2p_ads_id: p2p_ads_id,
      ...(amount && { amount: amount }),
      ...(currency_id && { currency_id: currency_id }),
      ...(chart_id && { chart_id: chart_id }),
      ...(course && { course: course }),
      ...(min_limit && { min_limit: min_limit }),
      ...(max_limit && { max_limit: max_limit }),
      ...(payments && { payments: payments }),
    }
  })
}

export const DeleteP2pOffer = async (token: string, p2p_ads_id: number) => {
  return await ApiClient({
    url: "/p2p/remove-order",
    method: "DELETE",
    headers: {
      "Authorization": token
    },
    data: {
      p2p_ads_id: p2p_ads_id
    }
  })
}

export const CancelP2pOrder = async (token: string, p2p_ads_id: number) => {
  return await ApiClient({
    url: "/p2p/cancel-order",
    method: "POST",
    headers: {
      "Authorization": token
    },
    data: {
      p2p_ads_id: p2p_ads_id
    }
  })
}

export const ChangeB2bOffer = async (
  token: string,
  b2b_ads_id: number,
  amount?: number,
  currency_id?: number,
  chart_id?: number,
  course?: number,
  min_limit?: number,
  max_limit?: number,
  payments?: number[]
) => {
  return await ApiClient({
    url: "/b2b/edit-order",
    method: "POST",
    headers: {
      "Authorization": token
    },
    data: {
      b2b_ads_id: b2b_ads_id,
      ...(amount && { amount: amount }),
      ...(currency_id && { currency_id: currency_id }),
      ...(chart_id && { chart_id: chart_id }),
      ...(course && { course: course }),
      ...(min_limit && { min_limit: min_limit }),
      ...(max_limit && { max_limit: max_limit }),
      ...(payments && { payments: payments }),
    }
  })
}

export const DeleteB2bOffer = async (token: string, b2b_ads_id: number) => {
  return await ApiClient({
    url: "/b2b/remove-order",
    method: "DELETE",
    headers: {
      "Authorization": token
    },
    data: {
      b2b_ads_id: b2b_ads_id
    }
  })
}

export const CancelB2bOrder = async (token: string, b2b_ads_id: number) => {
  return await ApiClient({
    url: "/b2b/cancel-order",
    method: "POST",
    headers: {
      "Authorization": token
    },
    data: {
      b2b_ads_id: b2b_ads_id
    }
  })
}

export const GetStatusList = async (token: string) => {
  return await ApiClient({
    url: "/p2p/get-status-list",
    method: "GET",
    headers: {
      "Authorization": token
    }
  })
}