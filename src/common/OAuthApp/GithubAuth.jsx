import {
  clientID, getGithubAccessToken, getGithubUser
} from './developerSettings.js'
import styles from './GithubAuth.module.less'
import { parseLocation, SUCCESS_CODE } from '../utils.js'
import { useBearStore } from '../../store/index.js'
import { useNavigate } from 'react-router-dom'
import * as PropTypes from 'prop-types'
import { useState } from 'react'


export default  function GithubAuth() {
  const navigate = useNavigate()
  const params = parseLocation()
  const code = params.get('code')

  const {
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
      return
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
      navigate('/')
    })()
  }
  return (
    <div>
      {user ? <UserInfo user={user} /> : <LoginLink />}
    </div>
  )
}



function LoginLink() {
  const href = '/githubCode'
  return (

    <a className={styles.githubAuthLink}
      href={href}
      rel="noreferrer">{ 'Github账户登录'}</a>
  )
}

function UserInfo({ user, }) {
  const [showClear, setShowClear] = useState(false)
  const { handleClearStore, } = useBearStore()
  const handleClear = () => {
    setShowClear(false)
    handleClearStore()
  }
  const handleMouseOver = () => {
    setShowClear(true)
  }
  const handleMouseLeave = () => {
    setShowClear(false)
  }
  return (
    <span className={styles.useInfoContainer}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseOver}>
      <a href={user.html_url}
        target={'_blank'}
        className={styles.useInfoLink}
        rel="noreferrer">{user.name}</a>
      {showClear && (<button className={styles.logoutBtn} onClick={handleClear}>退出</button>)}
    </span>
  )
}

UserInfo.propTypes = { user: PropTypes.any, }
