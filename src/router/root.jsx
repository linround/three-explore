import { Outlet } from 'react-router-dom'
import css from './root.module.less'
import { addRecords, getRecords } from '@linround/commonapi'
import GithubAuth from '../common/OAuthApp/GithubAuth.jsx'
import { useEffect } from 'react'

export default function Root() {
  const href = 'https://github.com/linround/three-explore'

  useEffect(() => {
    addRecords()
      .then((response) => {
        console.log('addRecords', response)
        getRecords()
          .then((response) => {
            console.log('getRecords', response)
          })
      })
  }, [])
  return (
    <div className={css.main}>
      <div className={css.head}>
        <a href={href} target='_blank' rel="noreferrer">
          lin round
        </a>
        <GithubAuth/>
      </div>
      <Outlet />
    </div>
  )
}
