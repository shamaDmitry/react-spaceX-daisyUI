import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const Navigation = () => {
  return (
    <nav className="py-4 mb-4 border-b">
      <div className="flex container">
        <div className="ml-auto">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
