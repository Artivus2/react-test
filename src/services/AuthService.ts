import { UserReg, UserCode, UserLog } from "../types/types";
import { ApiClient } from "./Client";

export const RegMethod = async (data: UserReg) => {
  return await ApiClient({
    method: "POST",
    url: "/user/register",
    data: data
  })
}

export const CodeMethod = async (data: UserCode) => {
  return await ApiClient({
    method: "POST",
    url: "/user/code",
    data: data
  })
}

export const LogMethod = async (data: UserLog) => {
  return await ApiClient({
    method: "POST",
    url: "/user/login",
    data: data
  })
}

export const LogOutMethod = async (token: string) => {
  return await ApiClient({
    method: "GET",
    url: "/user/logout",
    headers: {
      Authorization: token
    }
  })
}