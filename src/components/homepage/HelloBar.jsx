import React from 'react';
import Link from '@docusaurus/Link';
import { ChevronRight, GitHub } from 'react-feather';
import clsx from 'clsx';

function HelloBar() {
    return (
      <a
        href="https://avaloniaui.net/xpf?utm_source=docs&utm_medium=referral&utm_content=hellobar"
        target="_blank"
        className="hello-bar u-hflex-center-center w-inline-block"
      >
        <div className="hello_bar_contents u-hflex-center-center u-gap-10">
          <div className="ph_cat_nd_txt-wrapper u-hflex-left-center u-gap-10">
            <div className="ph_banner_txt">
              Introducing Avalonia XPF: A cross-platform fork of WPF 
            </div>
          </div>
          <div className="banner_separator"></div>
          <div className="hello_bar_cta u-hflex-left-center u-gap-8">
            <div className="text-block-98">Try it today</div>
          </div>
        </div>
      </a>
    );
  }
  
  export default HelloBar;