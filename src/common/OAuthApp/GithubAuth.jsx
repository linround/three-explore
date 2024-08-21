import {
  clientID, getGithubAccessToken, getGithubUser
} from './developerSettings.js'
import styles from './GithubAuth.module.less'
import { parseLocation, SUCCESS_CODE } from '../utils.js'
import { useBearStore } from '../../store/index.js'

export default  function GithubAuth() {
  const href = 'https://github.com/login/oauth/authorize?client_id=' + clientID
  const params = parseLocation()
  const code = params.get('code')

  const {
    bears,
    addABear,
    accessToken,
    setAccessToken,
    tokenType,
    setTokenType,
    user,
    setUser,
  } = useBearStore()

  const handleGetUser = async () => {
    if (!accessToken) {
      const {
        access_token: accessToken,
        token_type: tokenType,
      } = await getGithubAccessToken({ code, })
      setAccessToken(accessToken)
      setTokenType(tokenType)
    }

    const { data, status, } = await getGithubUser({
      accessToken,
      tokenType,
    })
    if (status === SUCCESS_CODE) {
      setUser(data)
      return
    }
  }
  if (code) {
    (async () => {
      await handleGetUser()
    })()
  }
  return (
    <>
      <a className={styles.githubAuthLink}
        href={href}
        rel="noreferrer">{user ? user.name : 'github登录'}</a>
      <span>{user && user.name}</span>
      <button onClick={addABear}>addABear:{bears}</button>
      <button onClick={handleGetUser}>getUser</button>
    </>
  )
}
