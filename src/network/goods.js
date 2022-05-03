import {request} from "@/network/request";

export function upGoods(data) {
    return request({
        url: "/web/goods/up",
        method: "post",
        data: data,
    });
}

export function getGoods() {
    return request({
        url: "/web/goods/get",
        method: "post",
        data: {}
    });
}

export function downGoods(data) {
    return request({
        url: "/web/goods/down",
        method: "post",
        data
    });
}

export function buyGoods(data) {
    return request({
        url: "/web/goods/buy",
        method: "post",
        data
    });
}


