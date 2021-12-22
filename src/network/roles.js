import {request} from "@/network/request";

export function selectRich(data) {
    return request({
        url: "/web/rich/search",
        method: "post",
        data: data,
    });
}
