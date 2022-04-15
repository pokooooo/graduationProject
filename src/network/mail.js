import {request} from "@/network/request";

export function sendMail(data) {
    return request({
        url: "/web/mail/send",
        method: "post",
        data: data,
    });
}

export function getMailByAccount(data) {
    return request({
        url: "/web/mail/get",
        method: "post",
        data: data,
    });
}

export function readMail(data) {
    return request({
        url: "/web/mail/read",
        method: "post",
        data: data,
    });
}

export function receiveMail(data) {
    return request({
        url: "/web/mail/receive",
        method: "post",
        data: data,
    });
}

export function deleteMail(data) {
    return request({
        url: "/web/mail/delete",
        method: "post",
        data: data,
    });
}



