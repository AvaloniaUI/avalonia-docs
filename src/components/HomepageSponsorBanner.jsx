import React from "react";
import Link from '@docusaurus/Link';

const Cta = () => {
  return (
    <>
      <div>
        <div className="w-full bg-gradient-to-r from-purple-500 to-purple-700 p-4 text-center font-medium text-white">
          Support the future of Avalonia by {' '}
          <Link
            to="https://github.com/sponsors/AvaloniaUI"
            className="text-white underline hover:text-white"
          >
            sponsoring.
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cta;
