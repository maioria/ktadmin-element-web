import { checkEmailExist as innerCheckEmailExist,
  checkMobileExist as innerCheckMobileExist } from '@/api/modules/sys/user'

export function checkEmailExist(id, rule, value, callback) {
  innerCheckEmailExist({ email: value, id: id }).then(data => {
    const user = data.data
    if (user) {
      callback(new Error(`手机号与${user.name}-${user.depName}重复`))
    } else {
      callback()
    }
  })
}

export function checkMobileExist(id, rule, value, callback) {
  innerCheckMobileExist({ mobile: value, id: id }).then(data => {
    const user = data.data
    if (user) {
      callback(new Error(`邮箱与${user.name}-${user.depName}重复`))
    } else {
      callback()
    }
  })
}
