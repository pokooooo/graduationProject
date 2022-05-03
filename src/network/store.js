import {request} from "@/network/request";

export function buyWeapon(data) {
    return request({
        url: "/web/store/buyWeapon",
        method: "post",
        data: data,
    });
}

export function buyMaterial(data) {
    return request({
        url: "/web/store/buyMaterial",
        method: "post",
        data: data,
    });
}

export function buy(data) {
    return request({
        url: "/web/store/buy",
        method: "post",
        data: data,
    });
}

