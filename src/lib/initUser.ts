import {login} from 'src/api/service/auth'
import {getUserInfo} from 'src/api/service/user'
import {idToken, setUserInfo} from 'src/store/user'
import {get} from 'svelte/store'
import {userInfo} from 'src/store/user'

export const initUser = async () => {
  if (!get(idToken)) return

  const result = await login({idToken: get(idToken)})

  // 토큰이 만료되어 로그인 실패
  if (!result) {
    idToken.set(null)
    userInfo.set(null)
    return
  }

  // 토큰이 유효하면 유저 정보를 가져옴
  const newUserInfo = await getUserInfo()
  setUserInfo(newUserInfo)
}
