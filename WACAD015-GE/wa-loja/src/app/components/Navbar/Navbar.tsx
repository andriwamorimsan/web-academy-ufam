'use client'

import Link from 'next/link'
import { useLogoutContext } from '@/app/context/LogoutContext/useLogoutContext'

export default function Navbar() {
  const { logout } = useLogoutContext()

  return (
    <nav className='navbar navbar-expand-md bg-light border-bottom border-body sticky-top'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='/'>
          Loja WA
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarCollapse'
          aria-controls='navbarCollapse'
          aria-expanded='false'
          aria-label='Abrir menu'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarCollapse'>
          <ul className='navbar-nav me-auto mb-2 mb-md-0 '>
            <li className='nav-item'>
              <Link className='nav-link' href='/'>
                Início
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' href='/favorites'>
                Lista de Favoritos
              </Link>
            </li>
          </ul>

          <button type='button' className='btn btn-secondary' onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </nav>
  )
}
