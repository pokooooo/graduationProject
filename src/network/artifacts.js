
import {request} from "@/network/request";

export function addArtifact(data) {
    return request({
        url: "/console/artifacts/add",
        method: "post",
        data,
    });
}

export function selectArtifact(data) {
    return request({
        url: "/console/artifacts/search",
        method: "post",
        data,
    });
}

export function deleteArtifact(data) {
    return request({
        url: "/console/artifacts/delete",
        method: "post",
        data,
    });
}

export function downArtifact(data) {
    return request({
        url: "/console/artifacts/down",
        method: "post",
        data,
    });
}

export function upArtifact(data) {
    return request({
        url: "/console/artifacts/up",
        method: "post",
        data,
    });
}

export function setWeight(data) {
    return request({
        url: "/console/artifacts/setWeight",
        method: "post",
        data,
    });
}

export function setArtifact(data) {
    return request({
        url: "/console/artifacts/set",
        method: "post",
        data,
    });
}