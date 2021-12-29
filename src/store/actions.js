import {setUser} from '../network/user'

export default {
    updata({commit, state},data) {
        return new Promise(resolve => {
            setUser(data).then(res => {
                commit('updata',res.data.data.data)
                resolve('修改成功！')
            })
        })
    }
}