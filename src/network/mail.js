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


