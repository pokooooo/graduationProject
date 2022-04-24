
import {request} from "@/network/request";

export function addMaterial(data) {
    return request({
        url: "/console/materials/add",
        method: "post",
        data,
    });
}

export function selectMaterial(data) {
    return request({
        url: "/console/materials/search",
        method: "post",
        data,
    });
}

export function deleteMaterial(data) {
    return request({
        url: "/console/materials/delete",
        method: "post",
        data,
    });
}

export function downMaterial(data) {
    return request({
        url: "/console/materials/down",
        method: "post",
        data,
    });
}

export function upMaterial(data) {
    return request({
        url: "/console/materials/up",
        method: "post",
        data,
    });
}

export function setWeight(data) {
    return request({
        url: "/console/materials/setWeight",
        method: "post",
        data,
    });
}

export function setMaterial(data) {
    return request({
        url: "/console/materials/set",
        method: "post",
        data,
    });
}