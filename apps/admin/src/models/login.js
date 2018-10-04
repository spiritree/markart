import { notification } from 'antd'
import { routerRedux } from 'dva/router'
import { authLogin } from '../services/api'
import { setAuthority } from '../utils/authority'
import { reloadAuthorized } from '../utils/Authorized'

export default {
  namespace: 'login',

  state: {
    status: undefined,
    code: -1
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(authLogin, payload)
      // Login successfully
      if (response.code === 1) {
        window.localStorage.setItem('TOKEN', JSON.stringify(response.result))
        yield put({
          type: 'changeLoginInStatus',
          payload: {
            response,
            currentAuthority: 'admin'
          }
        })
        reloadAuthorized()
        yield put(routerRedux.push('/'))
        notification.success({
          duration: 2,
          message: '登陆成功'
        })
      } else {
        yield put({
          type: 'changeLoginInStatus',
          payload: {
            response,
            currentAuthority: 'guest'
          }
        })
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href)
        const pathname = yield select(state => state.routing.location.pathname)
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname)
        window.history.replaceState(null, 'login', urlParams.href)
      } finally {
        // yield put(routerRedux.push('/user/login'));
        // Login out after permission changes to admin or user
        // The refresh will automatically redirect to the login page
        yield put({
          type: 'changeLoginOutStatus',
          payload: {
            status: false,
            currentAuthority: 'guest'
          }
        })
        reloadAuthorized()
        yield put(routerRedux.push('/user/login'))
      }
    }
  },

  reducers: {
    // 对返回后的请求结果进行计算生成新的返回值
    changeLoginInStatus(state, { payload }) {
      setAuthority(payload.currentAuthority)
      return {
        status: state.status,
        code: payload.response.code
      }
    },
    changeLoginOutStatus(state, { payload }) {
      setAuthority(payload.currentAuthority)
      return {
        ...state
      }
    }
  }
}
