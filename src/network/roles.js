import {request} from "@/network/request";

export function addRole(form) {
    return request({
        url: "/console/roles/add",
        method: "post",
        data: form,
    });
}

export function selectRole(data) {
    return request({
        url: "/console/roles/search",
        method: "post",
        data: data,
    });
}

export function setRole(form) {
    return request({
        url: "/console/roles/set",
        method: "post",
        data: form,
    });
}

export function downRole(data) {
    return request({
        url: "/console/roles/down",
        method: "post",
        data,
    });
}

export function upRole(data) {
    return request({
        url: "/console/roles/up",
        method: "post",
        data,
    });
}

export function setWeight(data) {
    return request({
        url: "/console/roles/setWeight",
        method: "post",
        data,
    });
}
export function deleteRole(id) {
    return request({
        url: "/console/roles/delete",
        method: "post",
        data: { id },
    });
}