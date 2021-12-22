import {request} from "@/network/request";

export function getRich(id:string) {
    return request({
        url: "/web/rich/get",
        method: "post",
        data: {id},
    });
}

export function searchGoods(data:any) {
    return request({
        url: "/web/goods/search",
        method: "post",
        data: data,
    });
}

export function buyGoods(richId:string, goodsIds:any) {
    return request({
        url: "/web/order/commit",
        method: "post",
        data: {richId, goodsIds}
    });
}
