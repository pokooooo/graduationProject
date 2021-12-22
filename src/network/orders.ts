import {request} from "@/network/request";

export function selectOrders(data:any) {
    return request({
        url: "/console/order/search",
        method: "post",
        data: data,
    });
}

export function getDetail(id:string) {
    return request({
        url: "/console/order/get",
        method: "post",
        data: {id},
    });
}