import {request} from "@/network/request";


export function friendRequest(data) {
    return request({
        url: "/web/user/friendRequest",
        method: "post",
        data: data,
    });
}

export function friendAccepted(data) {
    return request({
        url: "/web/user/friendAccepted",
        method: "post",
        data: data,
    });
}

export function getFriendData(data) {
    return request({
        url: "/web/user/getFriendData",
        method: "post",
        data: data,
    });
}

export function deleteFriend(data) {
    return request({
        url: "/web/user/deleteFriend",
        method: "post",
        data: data,
    });
}
