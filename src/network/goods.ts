import {request} from "@/network/request";

export function addGoods(form:any) {
    return request({
        url: "/console/goods/add",
        method: "post",
        data: form,
    });
}


export function selectGoods(data:any) {
    return request({
        url: "/console/goods/search",
        method: "post",
        data: data,
    });
}

export function deleteGoods(id:string) {
    return request({
        url: "/console/goods/delete",
        method: "post",
        data: {id},
    });
}

export function downGoods(id:string) {
    return request({
        url: "/console/goods/down",
        method: "post",
        data: {id},
    });
}

export function upGoods(id:string) {
    return request({
        url: "/console/goods/up",
        method: "post",
        data: {id},
    });
}

export function setweight(id:string,weight:number) {
    return request({
        url: "/console/goods/setweight",
        method: "post",
        data: {id,weight},
    });
}

export function setGoods(form:any) {
    return request({
        url: "/console/goods/set",
        method: "post",
        data: form,
    });
}
