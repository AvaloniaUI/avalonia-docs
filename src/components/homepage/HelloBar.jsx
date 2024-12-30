import React from 'react';
import Link from '@docusaurus/Link';
import { ChevronRight, GitHub } from 'react-feather';

function HelloBar() {
    return (
      <a
        href="https://avaloniaui.net/xpf?utm_source=docs&utm_medium=referral&utm_content=hellobar"
        target="_blank"
        className="hidden md:flex w-full items-center justify-center bg-blue-50 py-2 hover:bg-blue-100 transition-colors"
      >
        <div className="flex items-center justify-center gap-4 px-4">
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-blue-900">
              Introducing Avalonia XPF: A cross-platform fork of WPF 
            </div>
          </div>
          <div className="h-4 w-px bg-blue-200"></div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-blue-700">Try it today</div>
          </div>
        </div>
      </a>
    );
  }
  
export default HelloBar;