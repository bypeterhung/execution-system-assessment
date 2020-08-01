import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

import css from './HeaderLink.module.css'

interface HeaderLinkProps extends LinkProps {
   active: boolean
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ active, children, to }) => {
   return (
      <Link to={to} className={css.link + (active ? ' ' + css.active : '')}>
         {children}
      </Link>
   )
}

export default HeaderLink
