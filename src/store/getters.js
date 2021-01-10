const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  id: state => state.user.id,
  name: state => state.user.name,
  mobile: state => state.user.mobile,
  tel: state => state.user.tel,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  email: state => state.user.email,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}

export default getters
