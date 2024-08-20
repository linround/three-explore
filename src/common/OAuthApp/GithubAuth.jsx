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
    await getGithubAccessToken({ code, })
  }
  const handleGetUser = async () => {
    await getGithubUser({
      accessToken: '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',
      tokenType: 'bearer',
    })
  }
  console.log('code', code)
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
