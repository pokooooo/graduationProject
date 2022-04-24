
import {request} from "@/network/request";

export function addWeapon(data) {
    return request({
        url: "/console/weapons/add",
        method: "post",
        data,
    });
}

export function selectWeapon(data) {
    return request({
        url: "/console/weapons/search",
        method: "post",
        data,
    });
}

export function deleteWeapon(data) {
    return request({
        url: "/console/weapons/delete",
        method: "post",
        data,
    });
}

export function downWeapon(data) {
    return request({
        url: "/console/weapons/down",
        method: "post",
        data,
    });
}

export function upWeapon(data) {
    return request({
        url: "/console/weapons/up",
        method: "post",
        data,
    });
}

export function setWeight(data) {
    return request({
        url: "/console/weapons/setWeight",
        method: "post",
        data,
    });
}

export function setWeapon(data) {
    return request({
        url: "/console/weapons/set",
        method: "post",
        data,
    });
}