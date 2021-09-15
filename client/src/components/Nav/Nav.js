import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import logoStaticWhite from '../video/split-my-bill-4.gif';
import Food from '../Food/Food';

const Nav = () => {
  const user = useSelector((state) => state.user);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <div className="container-fluid d-flex">
          <Link className="navbar-brand" to="/">
            <img style={{ height: 50 }} src={logoStaticWhite} alt="logo" />
          </Link>
          <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <Food />
          </button>
          <div className="collapse navbar-collapse navber-fix" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {user ? (
                <>
                  <li className="nav-item fs-5">
                    <NavLink
                      exact
                      to="/auth/signout"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Выход
                    </NavLink>
                  </li>
                  <li className="nav-item fs-5">
                    <NavLink
                      exact
                      to={`/users/${user.id}`}
                      className="nav-link"
                      activeClassName="active"
                    >
                      Личный кабинет
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  kkk
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
