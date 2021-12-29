import {request} from "@/network/request";

export function setUser(data) {
    return request({
        url: "/web/user/set",
        method: "post",
        data: data,
    });
}
