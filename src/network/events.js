
import {request} from "@/network/request";

export function draw(data) {
    return request({
        url: "/console/events/draw",
        method: "post",
        data,
    });
}

export function addEvent(data) {
    return request({
        url: "/console/events/add",
        method: "post",
        data,
    });
}

export function selectEvent(data) {
    return request({
        url: "/console/events/search",
        method: "post",
        data,
    });
}

export function deleteEvent(data) {
    return request({
        url: "/console/events/delete",
        method: "post",
        data,
    });
}

export function downEvent(data) {
    return request({
        url: "/console/events/down",
        method: "post",
        data,
    });
}

export function upEvent(data) {
    return request({
        url: "/console/events/up",
        method: "post",
        data,
    });
}

export function setWeight(data) {
    return request({
        url: "/console/events/setWeight",
        method: "post",
        data,
    });
}

export function setEvent(data) {
    return request({
        url: "/console/events/set",
        method: "post",
        data,
    });
}