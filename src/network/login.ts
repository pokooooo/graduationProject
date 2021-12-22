import { request } from "@/network/request";

export function login(account: string, pwd: string) {
  return request({
    url: "/console/auth/login",
    method: "post",
    data: { account, pwd },
  });
}

export function logout(token:any) {
  return request({
    url: "/console/auth/logout",
    method: "post",
    data: { token },
  });
}
