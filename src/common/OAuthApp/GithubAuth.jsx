import { clientID, getGithubAccessToken } from './developerSettings.js'
import styles from './GithubAuth.module.less'
import { parseLocation } from '../utils.js'

export default  function GithubAuth() {
  const href = 'https://github.com/login/oauth/authorize?client_id=' + clientID
  const params = parseLocation()
  const code = params.get('code')
  if (code) {
    getGithubAccessToken({ code, })


    return (
      <div>
        <p>code: {code}</p>
      </div>
    )
  }
  console.log('code', code)
  return (
    <a className={styles.githubAuthLink}
      href={href}
      rel="noreferrer">Github登录</a>
  )
}
