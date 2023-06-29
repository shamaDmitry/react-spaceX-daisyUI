import classNames from 'classnames';
import { useAtom } from 'jotai';
import { Link, NavLink } from 'react-router-dom';
import { themeAtom } from '../../atoms/themeAtom';
import Logo from '../shared/Logo';
import ThemeSwitcher from './ThemeSwitcher';

const menu = [
  {
    link: "/crew",
    title: "Crew",
  },
  {
    link: "/history",
    title: "History",
  },
  {
    link: "/launches",
    title: "Launches",
  },
]

const Navigation = () => {
  const [theme,] = useAtom(themeAtom);

  return (
    <>
      <div className="container">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                  </ul>
                </li>
                <li><a>Item 3</a></li>
              </ul>
            </div>

            <Link to="/">
              <Logo
                className={classNames("mx-auto w-52", {
                  "text-white": theme === "dark",
                  "text-black": theme === "light",
                })}
              />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 z-20">
              {menu.map((item) => {
                return (
                  <li key={JSON.stringify(item)}>
                    <NavLink to={item.link}>
                      {item.title}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="navbar-end">
            <ThemeSwitcher />
          </div>

        </div>
      </div>
    </>
  );
}

export default Navigation;
