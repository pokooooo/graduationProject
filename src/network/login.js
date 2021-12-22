import { request } from "@/network/request";

export function login(account, pwd) {
  return request({
    url: "/console/auth/login",
    method: "post",
    data: { account, pwd },
  });
}

export function logout(token) {
  return request({
    url: "/console/auth/logout",
    method: "post",
    data: { token },
  });
}