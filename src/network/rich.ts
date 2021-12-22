import {request} from "@/network/request";

export function addRich(form:any) {
    return request({
        url: "/console/rich/add",
        method: "post",
        data: form,
    });
}

export function selectRich(data:any) {
    return request({
        url: "/console/rich/search",
        method: "post",
        data: data,
    });
}

export function setRich(form:any) {
    return request({
        url: "/console/rich/set",
        method: "post",
        data: form,
    });
}

export function deleteRich(id:string) {
    return request({
        url: "/console/rich/delete",
        method: "post",
        data: { id },
    });
}