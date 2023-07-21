import { Outlet } from 'react-router-dom'
import css from './root.module.less'
import { ReactComponent as  Github } from '../assets/github.svg'

export default function Root() {
  const href = 'https://github.com/linround/three-explore'
  return (
    <>
      <div className={css.head}>
        <a href={href} target='_blank' rel="noreferrer">
          lin round
        </a>
      </div>
      <Outlet />
    </>
  )
}
