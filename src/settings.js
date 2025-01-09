import React, { useEffect } from 'react';

function Settings() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((
        (e.ctrlKey || e.metaKey) &&
        (e.key === 'v' || e.key === 'c' || e.key === 'a' ))|| (e.key === 'F12')
      ) {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return <></>;
}

export default Settings;
