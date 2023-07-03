import classNames from 'classnames';
import { useAtom } from 'jotai';
import { themeAtom } from '../../atoms/themeAtom';
import Logo from '../shared/Logo';

const Footer = () => {
  const [theme,] = useAtom(themeAtom);

  return (
    <footer className="py-4 border-t mt-10 dark:border-gray-700">
      <div className="container text-center">
        <Logo className={classNames("w-40 inline-flex", {
          "text-white": theme === "dark",
          "text-black": theme === "light",
        })} />

        <p className="text-sm">
          This website is not assosciated with
          {" "}<a href="https://www.spacex.com/" target="_blank" rel="noreferrer" className="underline">SpaceX</a>{" "}
          in any way. It&apos;s fan made, with data from
          {" "}<a href="https://github.com/r-spacex/SpaceX-API" target="_blank" rel="noreferrer" className="underline">r/SpaceX Api</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
