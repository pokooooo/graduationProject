
import {request} from "@/network/request";

export function addEnemies(data) {
    return request({
        url: "/console/enemies/add",
        method: "post",
        data,
    });
}

export function selectEnemies(data) {
    return request({
        url: "/console/enemies/search",
        method: "post",
        data,
    });
}

export function deleteEnemies(data) {
    return request({
        url: "/console/enemies/delete",
        method: "post",
        data,
    });
}

export function downEnemies(data) {
    return request({
        url: "/console/enemies/down",
        method: "post",
        data,
    });
}

export function upEnemies(data) {
    return request({
        url: "/console/enemies/up",
        method: "post",
        data,
    });
}

export function setWeight(data) {
    return request({
        url: "/console/enemies/setWeight",
        method: "post",
        data,
    });
}

export function setEnemies(data) {
    return request({
        url: "/console/enemies/set",
        method: "post",
        data,
    });
}