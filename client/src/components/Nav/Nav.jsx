import useNavigate from '@hooks/useNavigate'

import './Nav.css'

const Nav = () => {
  const { page, navigate, isLoggedIn } = useNavigate()

  const handleClick = (e, newPath) => {
    e.preventDefault();
    navigate(newPath);
  }

  return (
    <nav>
      <ul className="nav-list">
        {isLoggedIn ? (
          <>
            <h2 className={page === '/' ? 'active' : ''}>
              <a href="/" onClick={(e) => handleClick(e, '/')}>Home</a>
            </h2>
            <h2 className={page === '/admin' ? 'active' : ''}>
              <a href="/admin" onClick={(e) => handleClick(e, '/admin')}>Admin</a>
            </h2>
            <li>
              <a href="/logout" onClick={(e) => {
                localStorage.removeItem('access_token');
                handleClick(e, '/');
              }}>Logout</a>
            </li>
          </>
        ) : (
          <>
            <h2 className={page === '/' ? 'active' : ''}>
              <a href="/" onClick={(e) => handleClick(e, '/')}>--Home</a>
            </h2>
            <h2 className={page === '/login' ? 'active' : ''}>
              <a href="/login" onClick={(e) => handleClick(e, '/login')}>--Login</a>
            </h2>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Nav
