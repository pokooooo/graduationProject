import {request} from "@/network/request";

export function searchUsers(data) {
    return request({
        url: "/console/users/search",
        method: "post",
        data: data,
    });
}
