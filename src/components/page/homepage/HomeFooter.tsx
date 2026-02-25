import React from 'react';

export default function HomeFooter(): JSX.Element {
  return (
    <footer
      style={{
        paddingTop: '4rem',
        paddingBottom: '2rem',
        backgroundColor: 'var(--ifm-footer-background-color)',
        fontFamily: 'Open-Sans',
        position: 'relative'
      }}
    >
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Logo centered at top */}
        <div className="flex justify-center mb-12">
          <a
            href='https://avaloniaui.net'
            style={{ color: 'var(--ifm-footer-brand-color)' }}
          >
            <svg width="163" height="24" viewBox="0 0 163 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_10_13)">
                <path d="M10.4739 9.83982C8.80757 9.83982 7.45672 11.2534 7.45672 12.9972C7.45672 14.741 8.80757 16.1546 10.4739 16.1546C12.1403 16.1546 13.4911 14.741 13.4911 12.9972C13.4911 11.2534 12.1403 9.83982 10.4739 9.83982Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M17.6689 23L10.2783 23C5.0787 22.9056 0.891418 18.4637 0.891418 13C0.891418 7.47715 5.16977 3 10.4474 3C15.6393 3 19.8641 7.3329 20 12.7317L19.9835 20.8511C19.8459 22.0631 18.8641 23 17.6689 23ZM4.32475 11.5626C4.95054 8.61212 7.46601 6.40577 10.4739 6.40577C13.9526 6.40577 16.7727 9.35686 16.7727 12.9972C16.7727 13.0245 16.773 13.0541 16.7733 13.0845C16.774 13.1476 16.7747 13.2141 16.7727 13.2704V19.544H13.4956V18.7821C12.5986 19.2963 11.5689 19.5887 10.4739 19.5887C7.46601 19.5887 4.95054 17.3823 4.32475 14.4318C4.92387 14.256 5.36322 13.6803 5.36322 12.9972C5.36322 12.3141 4.92387 11.7384 4.32475 11.5626ZM3.90906 14.0477C4.46574 14.0477 4.91703 13.5754 4.91703 12.9929C4.91703 12.4103 4.46574 11.9381 3.90906 11.9381C3.35238 11.9381 2.90109 12.4103 2.90109 12.9929C2.90109 13.5754 3.35238 14.0477 3.90906 14.0477Z" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip0_10_13">
                  <rect width="163" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>

        {/* Main footer content - 5 columns on desktop, responsive on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold  text-darkblue dark:text-white mb-6">Products</h3>
            <nav className="flex flex-col space-y-3">
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/platforms">Avalonia</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/xpf">Avalonia XPF</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/accelerate">Avalonia Accelerate</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/support">Enhanced support</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/services">Development services</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/organisations">Orgs using Avalonia</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/startups">For startups</a>
            </nav>
          </div>

          {/* For Developers */}
          <div>
            <h3 className="text-lg font-semibold  text-darkblue dark:text-white mb-6">For Developers</h3>
            <nav className="flex flex-col space-y-3">
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://docs.avaloniaui.net/">Documentation</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://github.com/avaloniaui/avalonia/tree/master/samples">Samples</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://github.com/avaloniaui/avalonia">GitHub</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/mvps">MVPs</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/showcase">App showcase</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.community">Community hub</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://portal.avaloniaui.net">Customer portal</a>
            </nav>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-lg font-semibold  text-darkblue dark:text-white mb-6">Platforms</h3>
            <nav className="flex flex-col space-y-3">
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/platforms/windows">Windows</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/platforms/macos">macOS</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/platforms/linux">Linux</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/platforms/mobile">iOS & Android</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/platforms/wasm">WebAssembly</a>
            </nav>
          </div>

          {/* Handbook */}
          <div>
            <h3 className="text-lg font-semibold  text-darkblue dark:text-white mb-6">Handbook</h3>
            <nav className="flex flex-col space-y-3">
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/handbook/why-does-avalonia-ui-exist">Why we exist</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/handbook/oss-philosophy">Our OSS philosophy</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/handbook/our-values">Values</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/handbook/who-we-are-building-for">Who we're building for</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/handbook/marketing-overview">Marketing</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/handbook/value-proposition">Value proposition</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/handbook/how-we-sell">How we "sell"</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/handbook/pricing-principles">Pricing principles</a>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold  text-darkblue dark:text-white mb-6">Company</h3>
            <nav className="flex flex-col space-y-3">
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/about">About</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/about#team">Team</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/blog">Blog</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/faq">FAQ</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/brand">Brand guidelines</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/legal">Legal center</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/contact">Contact</a>
              <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://avaloniaui.net/careers">Careers</a>
            </nav>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex justify-center space-x-6 mb-8">
          <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://twitter.com/avaloniaui" target="_blank" rel="noreferrer">
            <span className="sr-only">X (Twitter)</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_22_133)">
                <path d="M14.2856 10.1635L23.2216 0H21.1048L13.3424 8.82302L7.1472 0H0L9.3704 13.3432L0 23.9999H2.1168L10.3088 14.6805L16.8528 23.9999H24M2.8808 1.56189H6.1328L21.1032 22.5148H17.8504" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip0_22_133">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </a>

          <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://www.linkedin.com/company/avaloniaui/" target="_blank" rel="noreferrer">
            <span className="sr-only">LinkedIn</span>
            <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="m19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476z" fill="currentColor"/>
            </svg>
          </a>

          <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://www.youtube.com/channel/UC54i4ILpN7JKUhP6liNYxkA" target="_blank" rel="noreferrer">
            <span className="sr-only">YouTube</span>
            <svg fill="none" height="20" viewBox="0 0 24 20" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="m23.4984 2.6232c-.276-1.032-1.0896-1.8456-2.1216-2.1216-1.872-.50159975-9.3768-.5016-9.3768-.5016s-7.5048.00000025-9.3768.5016c-1.032.276-1.8456 1.0896-2.1216 2.1216-.50160004 1.872-.5016 6.9768-.5016 6.9768s-.00000004 5.1048.5016 6.9768c.276 1.032 1.0896 1.8456 2.1216 2.1216 1.872.5016 9.3768.5016 9.3768.5016s7.5048 0 9.3768-.5016c1.0332-.276 1.8456-1.0896 2.1216-2.1216.5016-1.872.5016-6.9768.5016-6.9768s0-5.1048-.5016-6.9768zm-13.8984 11.1336v-8.3136l7.2 4.1568z" fill="currentColor"/>
            </svg>
          </a>

          <a className=" text-darkblue dark:text-gray-200 hover: text-darkblue dark:text-gray-200 transition-colors" href="https://github.com/avaloniaui/avalonia" target="_blank" rel="noreferrer">
            <span className="sr-only">GitHub</span>
            <svg fill="none" height="20" viewBox="0 0 25 24" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="m10.8836.0848867c-5.64152.6132083-10.179262 5.1509433-10.7924705 10.6698133-.7358495 6.1321 3.0660405 11.4057 8.4622705 13.1227v-2.8208s-.49057.1226-1.10377.1226c-1.71699 0-2.45284-1.4717-2.57548-2.3301-.12264-.4906-.36792-.8585-.73585-1.2265-.36792-.1226-.49056-.1226-.49056-.2452 0-.2453.36792-.2453.49056-.2453.73585 0 1.34906.8585 1.59434 1.2264.61321.9811 1.34906 1.2264 1.71699 1.2264.49056 0 .85849-.1226 1.10377-.2453.12264-.8585.49057-1.717 1.22642-2.2075-2.82076-.6132-4.90567-2.2076-4.90567-4.9057 0-1.3491.61321-2.69811 1.4717-3.67924-.12264-.24529-.24528-.85849-.24528-1.71699 0-.49056 0-1.22641.36792-1.96226 0 0 1.71699 0 3.43397 1.59434.61324-.24528 1.47174-.36792 2.33014-.36792.8585 0 1.717.12264 2.4529.36792 1.5943-1.59434 3.4339-1.59434 3.4339-1.59434.2453.73585.2453 1.4717.2453 1.96226 0 .98114-.1226 1.4717-.2453 1.71699.8585.98113 1.4717 2.20754 1.4717 3.67924 0 2.6981-2.0849 4.2925-4.9056 4.9057.7358.6132 1.2264 1.717 1.2264 2.8207v4.0472c5.0283-1.5943 8.5849-6.2547 8.5849-11.651 0-7.35845-6.2547-13.122604-13.6132-12.2641133z" fill="currentColor"/>
            </svg>
          </a>
        </div>

        {/* Bottom section - Copyright and Cookie Settings */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <p className="text-sm  text-darkblue dark:text-gray-200 mb-4 md:mb-0 font-sans">
            © 2026 AvaloniaUI OÜ
          </p>

        </div>
      </div>
    </footer>
  );
}
