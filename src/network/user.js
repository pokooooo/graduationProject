import {request} from "@/network/request";

export function getUser(data) {
    return request({
        url: "/web/user/get",
        method: "post",
        data: data,
    });
}


export function setUser(data) {
    return request({
        url: "/web/user/set",
        method: "post",
        data: data,
    });
}
