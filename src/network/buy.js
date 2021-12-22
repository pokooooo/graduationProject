import {request} from "@/network/request";

export function getRich(id) {
    return request({
        url: "/web/rich/get",
        method: "post",
        data: {id},
    });
}

export function searchGoods(data) {
    return request({
        url: "/web/goods/search",
        method: "post",
        data: data,
    });
}

export function buyGoods(richId, goodsIds) {
    return request({
        url: "/web/order/commit",
        method: "post",
        data: {richId, goodsIds}
    });
}
