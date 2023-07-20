import { Outlet } from 'react-router-dom'
import css from './root.module.less'

export default function Root() {
  return (
    <>
      <div className={css.head}>
        lin round
      </div>
      <Outlet />
    </>
  )
}
