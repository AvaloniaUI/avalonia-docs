import React, { useEffect, useState } from 'react';

const Shortcut = ({ windows, mac, linux }) => {
  const [os, setOs] = useState('windows');

  useEffect(() => {
    // Detect OS on client side
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('mac') !== -1) setOs('mac');
    else if (userAgent.indexOf('linux') !== -1) setOs('linux');
    else setOs('windows');
  }, []);

  // Get the appropriate shortcut based on OS
  const getShortcut = () => {
    if (os === 'mac' && mac) return mac;
    if (os === 'linux' && linux) return linux;
    return windows; // Default to Windows shortcut
  };

  // Split the shortcut string into parts
  const parts = getShortcut().split('+').map(part => part.trim());

  return (
    <span className="inline-flex items-center gap-2">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          <kbd className="px-2 py-1 text-sm font-semibold bg-gray-100 border border-gray-300 rounded shadow-sm dark:bg-gray-800 dark:border-gray-700">
            {part}
          </kbd>
          {index < parts.length - 1 && (
            <span className="text-gray-500">+</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
};

export default Shortcut;