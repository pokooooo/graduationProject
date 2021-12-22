import {request} from "@/network/request";

export function addGoods(form) {
    return request({
        url: "/console/goods/add",
        method: "post",
        data: form,
    });
}


export function selectGoods(data) {
    return request({
        url: "/console/goods/search",
        method: "post",
        data: data,
    });
}

export function deleteGoods(id) {
    return request({
        url: "/console/goods/delete",
        method: "post",
        data: {id},
    });
}

export function downGoods(id) {
    return request({
        url: "/console/goods/down",
        method: "post",
        data: {id},
    });
}

export function upGoods(id) {
    return request({
        url: "/console/goods/up",
        method: "post",
        data: {id},
    });
}

export function setweight(id,weight) {
    return request({
        url: "/console/goods/setweight",
        method: "post",
        data: {id,weight},
    });
}

export function setGoods(form) {
    return request({
        url: "/console/goods/set",
        method: "post",
        data: form,
    });
}
