import {request} from "@/network/request";

export function newChat(data) {
    return request({
        url: "/web/chat/new",
        method: "post",
        data: data,
    });
}

export function getChatByAccount(data) {
    return request({
        url: "/web/chat/get",
        method: "post",
        data: data,
    });
}

export function sendChat(data) {
    return request({
        url: "/web/chat/send",
        method: "post",
        data: data,
    });
}

export function deleteChat(data) {
    return request({
        url: "/web/chat/delete",
        method: "post",
        data: data,
    });
}

export function clearChat(data) {
    return request({
        url: "/web/chat/clear",
        method: "post",
        data: data,
    });
}




