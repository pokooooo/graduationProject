import {request} from "@/network/request";

export function selectRich(data:any) {
    return request({
        url: "/web/rich/search",
        method: "post",
        data: data,
    });
}
