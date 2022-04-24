
import {request} from "@/network/request";

export function addDomain(data) {
    return request({
        url: "/console/domains/add",
        method: "post",
        data,
    });
}

export function selectDomain(data) {
    return request({
        url: "/console/domains/search",
        method: "post",
        data,
    });
}

export function deleteDomain(data) {
    return request({
        url: "/console/domains/delete",
        method: "post",
        data,
    });
}

export function downDomain(data) {
    return request({
        url: "/console/domains/down",
        method: "post",
        data,
    });
}

export function upDomain(data) {
    return request({
        url: "/console/domains/up",
        method: "post",
        data,
    });
}

export function setWeight(data) {
    return request({
        url: "/console/domains/setWeight",
        method: "post",
        data,
    });
}

export function setDomain(data) {
    return request({
        url: "/console/domains/set",
        method: "post",
        data,
    });
}