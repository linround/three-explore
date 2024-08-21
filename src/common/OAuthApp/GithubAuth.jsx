import {
  clientID, getGithubAccessToken, getGithubUser
} from './developerSettings.js'
import styles from './GithubAuth.module.less'
import { parseLocation } from '../utils.js'

export default  function GithubAuth() {
  const href = 'https://github.com/login/oauth/authorize?client_id=' + clientID
  const params = parseLocation()
  const code = params.get('code')
  const handleGetToken = async () => {
    const data = await getGithubAccessToken({ code, })
    console.log('accessToken++++++++++++', data)
  }
  const handleGetUser = async () => {

    const {
      access_token: accessToken,
      token_type: tokenType,
    } = await getGithubAccessToken({ code, })
    const user = await getGithubUser({
      accessToken,
      tokenType,
    })
    console.log('user', user)
  }
  return (
    <>
      <a className={styles.githubAuthLink}
        href={href}
        rel="noreferrer">Github登录</a>
      <button onClick={handleGetToken}>getToken</button>
      <button onClick={handleGetUser}>getUser</button>
    </>
  )
}
