import React from 'react'
import Navbar from 'react-bootstrap/Navbar'

import HeaderLink from './HeaderLink'

type HeaderProps = {
   activeLink: string
   basketCount: number
}

const Header: React.FC<HeaderProps> = ({ activeLink, basketCount }) => {
   const links = [
      {
         path: '/stocks',
         title: 'Stock List',
      },
      {
         path: '/basket',
         title: `Orders Basket (${basketCount})`,
      },
   ]
   return (
      <Navbar bg="dark" variant="dark">
         <Navbar.Brand href="./">Execution System</Navbar.Brand>
         <Navbar.Collapse className="justify-content-end">
            {links.map((link) => (
               <HeaderLink
                  key={link.path}
                  active={activeLink === link.path}
                  to={link.path}
               >
                  {link.title}
               </HeaderLink>
            ))}
         </Navbar.Collapse>
      </Navbar>
   )
}

export default Header
