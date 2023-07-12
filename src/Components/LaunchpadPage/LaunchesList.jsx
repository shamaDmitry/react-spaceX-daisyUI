import { Disclosure, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LaunchesList = ({ result }) => {
  return (
    <div>
      {Object.keys(result).reverse().map((keyName) => {
        return (
          <Disclosure
            key={keyName}
          >
            <Disclosure.Button
              className="border w-full dark:border-gray-700 dark:text-white py-2 first-of-type:mt-0 mt-3 font-bold"
            >
              {keyName}
            </Disclosure.Button>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"

              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel
                className="border border-t-0 max-h-52 overflow-auto dark:border-gray-700"
              >
                <ol className="py-2 px-3 list-inside list-decimal text-accent">
                  {result[keyName].map(item => {
                    return (
                      <li
                        key={item.id}
                        className=""
                      >
                        <Link
                          className="hover:text-accent-content"
                          to={`/launches/${item.id}`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ol>
              </Disclosure.Panel>
            </Transition>
          </Disclosure>
        )
      })}
    </div>
  );
}

LaunchesList.propTypes = {
  result: PropTypes.object.isRequired,
}

export default LaunchesList;
