import { request } from "@/network/request";

export function login(account, pwd) {
  return request({
    url: "/console/auth/login",
    method: "post",
    data: { account, pwd },
  });
}

export function register(account, pwd) {
  return request({
    url: "/console/auth/register",
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

export function logout1(data) {
  return request({
    url: "/web/user/logout",
    method: "post",
    data,
  });
}
