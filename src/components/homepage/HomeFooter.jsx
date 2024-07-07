import React, { useEffect, useState } from 'react';

const Footer = () => {

  const [backgroundColor, setBackgroundColor] = useState('rgb(241, 244, 248)');

    const styles = {
        logoBrand: {
          color: 'var(--ifm-footer-brand-color)'
        },
        footer: {
            paddingTop: '3rem',
            paddingBottom: '.75rem',
            backgroundColor: 'var(--ifm-footer-background-color)',
            fontfamily: 'Outfit'
        },
        container: {
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: 'calc(2.5rem * .5)',
            paddingRight: 'calc(2.5rem * .5)',
            width: '100%',
            maxWidth: '1200px',
        },
        row: {
            display: 'flex',
            flexWrap: 'wrap',
            marginLeft: 'calc(2.5rem * -.5)',
            marginRight: 'calc(2.5rem * -.5)',
            marginTop: 'calc(0 * -1)',
        },
        col: {
            flex: '0 0 auto',
            width: '100%',
            paddingLeft: 'calc(2.5rem * .5)',
            paddingRight: 'calc(2.5rem * .5)',
        },
        colMd4: {
            flex: '0 0 auto',
            width: '33.33333333%',
        },
        colLg3: {
            flex: '0 0 auto',
            width: '25%',
        },
        colLg2: {
            flex: '0 0 auto',
            width: '16.66666667%',
        },
        imgFluid: {
            height: 'auto',
            maxWidth: '100%',
        },
        textGray700: {
            color: 'rgba(80, 102, 144, 1)',
        },
        mb2: {
            marginBottom: '.5rem',
        },
        listUnstyled: {
            listStyle: 'none',
            paddingLeft: '0',
        },
        listInline: {
            listStyle: 'none',
            paddingLeft: '0',
        },
        listSocial: {
            display: 'inline-block',
            marginRight: '.75rem',
        },
        fwBold: {
            fontWeight: '600',
        },
        textUppercase: {
            textTransform: 'uppercase',
            letterSpacing: '.08em',
        },
        textReset: {
            color: 'inherit',
        },
        textDecorationNone: {
            textDecoration: 'none',
        },
        mb6: {
            marginBottom: '2rem',
        },
        mbMd0: {
            marginBottom: '0',
        },
        badge: {
            padding: '0.25rem 0.75rem',
            fontSize: '0.75em',
            fontWeight: '600',
            color: '#fff',
            borderRadius: '0.375rem',
            display: 'inline-block',
            lineHeight: '1',
            textAlign: 'center',
            verticalAlign: 'baseline',
            whiteSpace: 'nowrap',
            backgroundColor: 'rgba(139, 68, 172, 0.8)',
        },
        mb3: {
            marginBottom: '.75rem',
        },
        me3: {
            marginRight: '.75rem',
        },
        mt5: {
            marginTop: '1.5rem',
        },
        textCenter: {
            textAlign: 'center',
        },
        fwLight: {
            fontWeight: '200',
        },

        
    };

    return (
        <div className="hide-on-mobile">
            <footer style={styles.footer}>
                <div style={styles.container}>
                    <div style={styles.row}>
                        <div style={{ ...styles.col, ...styles.colMd4, ...styles.colLg3 }}>
                        <a className='logoBrand' href='https://avaloniaui.net'>
                            <svg width="163" height="24" viewBox="0 0 163 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_10_13)">
                                <path d="M26.184 22.216C25.736 22.216 25.368 22.112 25.08 21.904C24.808 21.696 24.632 21.416 24.552 21.064C24.488 20.712 24.56 20.32 24.768 19.888L30.912 6.424C31.168 5.88 31.472 5.488 31.824 5.248C32.176 4.992 32.584 4.864 33.048 4.864C33.512 4.864 33.92 4.992 34.272 5.248C34.624 5.488 34.92 5.88 35.16 6.424L41.352 19.888C41.56 20.32 41.632 20.72 41.568 21.088C41.52 21.44 41.36 21.72 41.088 21.928C40.816 22.12 40.464 22.216 40.032 22.216C39.488 22.216 39.064 22.088 38.76 21.832C38.472 21.576 38.216 21.176 37.992 20.632L36.552 17.296L38.04 18.328H28.032L29.52 17.296L28.104 20.632C27.864 21.192 27.608 21.6 27.336 21.856C27.08 22.096 26.696 22.216 26.184 22.216ZM33 9.04L29.928 16.36L29.28 15.424H36.792L36.144 16.36L33.048 9.04H33ZM47.7512 22.216C47.2872 22.216 46.8792 22.096 46.5272 21.856C46.1752 21.6 45.8952 21.224 45.6872 20.728L42.0632 12.376C41.8872 11.96 41.8232 11.576 41.8712 11.224C41.9192 10.856 42.0872 10.568 42.3752 10.36C42.6792 10.136 43.0952 10.024 43.6232 10.024C44.0552 10.024 44.4072 10.128 44.6792 10.336C44.9512 10.528 45.1912 10.904 45.3992 11.464L48.2312 18.664H47.4632L50.4152 11.44C50.6392 10.896 50.8872 10.528 51.1592 10.336C51.4312 10.128 51.8072 10.024 52.2872 10.024C52.7032 10.024 53.0312 10.136 53.2712 10.36C53.5272 10.568 53.6792 10.848 53.7272 11.2C53.7912 11.552 53.7272 11.936 53.5352 12.352L49.8392 20.728C49.6312 21.24 49.3512 21.616 48.9992 21.856C48.6632 22.096 48.2472 22.216 47.7512 22.216ZM59.3291 22.264C58.4651 22.264 57.6891 22.096 57.0011 21.76C56.3131 21.424 55.7771 20.968 55.3931 20.392C55.0091 19.816 54.8171 19.168 54.8171 18.448C54.8171 17.584 55.0411 16.904 55.4891 16.408C55.9371 15.896 56.6651 15.536 57.6731 15.328C58.6811 15.104 60.0171 14.992 61.6811 14.992H62.9531V16.864H61.7051C60.8891 16.864 60.2251 16.912 59.7131 17.008C59.2171 17.088 58.8571 17.232 58.6331 17.44C58.4251 17.648 58.3211 17.936 58.3211 18.304C58.3211 18.752 58.4731 19.12 58.7771 19.408C59.0971 19.696 59.5531 19.84 60.1451 19.84C60.6091 19.84 61.0171 19.736 61.3691 19.528C61.7371 19.304 62.0251 19.008 62.2331 18.64C62.4411 18.256 62.5451 17.824 62.5451 17.344V14.584C62.5451 13.88 62.3851 13.384 62.0651 13.096C61.7451 12.792 61.2011 12.64 60.4331 12.64C60.0011 12.64 59.5291 12.696 59.0171 12.808C58.5211 12.904 57.9691 13.072 57.3611 13.312C57.0091 13.472 56.6971 13.512 56.4251 13.432C56.1531 13.336 55.9451 13.176 55.8011 12.952C55.6571 12.712 55.5851 12.456 55.5851 12.184C55.5851 11.896 55.6651 11.624 55.8251 11.368C55.9851 11.096 56.2491 10.896 56.6171 10.768C57.3691 10.464 58.0731 10.256 58.7291 10.144C59.4011 10.032 60.0171 9.976 60.5771 9.976C61.8091 9.976 62.8171 10.16 63.6011 10.528C64.4011 10.88 65.0011 11.432 65.4011 12.184C65.8011 12.92 66.0011 13.872 66.0011 15.04V20.368C66.0011 20.96 65.8571 21.416 65.5691 21.736C65.2811 22.056 64.8651 22.216 64.3211 22.216C63.7771 22.216 63.3531 22.056 63.0491 21.736C62.7611 21.416 62.6171 20.96 62.6171 20.368V19.48L62.7851 19.624C62.6891 20.168 62.4811 20.64 62.1611 21.04C61.8571 21.424 61.4651 21.728 60.9851 21.952C60.5051 22.16 59.9531 22.264 59.3291 22.264ZM72.9525 22.264C71.5285 22.264 70.4645 21.872 69.7605 21.088C69.0565 20.288 68.7045 19.104 68.7045 17.536V6.712C68.7045 6.104 68.8565 5.648 69.1605 5.344C69.4805 5.024 69.9365 4.864 70.5285 4.864C71.1045 4.864 71.5445 5.024 71.8485 5.344C72.1685 5.648 72.3285 6.104 72.3285 6.712V17.392C72.3285 18.048 72.4645 18.536 72.7365 18.856C73.0245 19.16 73.4005 19.312 73.8645 19.312C73.9925 19.312 74.1125 19.304 74.2245 19.288C74.3365 19.272 74.4565 19.264 74.5845 19.264C74.8405 19.232 75.0165 19.312 75.1125 19.504C75.2245 19.68 75.2805 20.04 75.2805 20.584C75.2805 21.064 75.1845 21.432 74.9925 21.688C74.8005 21.928 74.5045 22.088 74.1045 22.168C73.9445 22.184 73.7605 22.2 73.5525 22.216C73.3445 22.248 73.1445 22.264 72.9525 22.264ZM82.2435 22.264C80.9795 22.264 79.8755 22.016 78.9315 21.52C78.0035 21.024 77.2835 20.312 76.7715 19.384C76.2595 18.456 76.0035 17.36 76.0035 16.096C76.0035 15.152 76.1475 14.304 76.4355 13.552C76.7235 12.8 77.1395 12.16 77.6835 11.632C78.2435 11.088 78.9075 10.68 79.6755 10.408C80.4435 10.12 81.2995 9.976 82.2435 9.976C83.5075 9.976 84.6035 10.224 85.5315 10.72C86.4755 11.216 87.2035 11.92 87.7155 12.832C88.2435 13.744 88.5075 14.832 88.5075 16.096C88.5075 17.056 88.3555 17.912 88.0515 18.664C87.7635 19.416 87.3475 20.064 86.8035 20.608C86.2595 21.152 85.5955 21.568 84.8115 21.856C84.0435 22.128 83.1875 22.264 82.2435 22.264ZM82.2435 19.552C82.7715 19.552 83.2275 19.424 83.6115 19.168C83.9955 18.912 84.2995 18.536 84.5235 18.04C84.7475 17.528 84.8595 16.88 84.8595 16.096C84.8595 14.928 84.6195 14.072 84.1395 13.528C83.6595 12.968 83.0275 12.688 82.2435 12.688C81.7315 12.688 81.2755 12.808 80.8755 13.048C80.4915 13.288 80.1875 13.664 79.9635 14.176C79.7555 14.672 79.6515 15.312 79.6515 16.096C79.6515 17.264 79.8915 18.136 80.3715 18.712C80.8515 19.272 81.4755 19.552 82.2435 19.552ZM92.5363 22.216C91.9443 22.216 91.4883 22.056 91.1683 21.736C90.8643 21.416 90.7123 20.96 90.7123 20.368V11.848C90.7123 11.256 90.8643 10.808 91.1683 10.504C91.4883 10.184 91.9283 10.024 92.4883 10.024C93.0643 10.024 93.5043 10.184 93.8083 10.504C94.1123 10.808 94.2643 11.256 94.2643 11.848V13.216L94.0003 12.424C94.3683 11.64 94.9123 11.04 95.6323 10.624C96.3683 10.192 97.2003 9.976 98.1283 9.976C99.0723 9.976 99.8483 10.16 100.456 10.528C101.064 10.88 101.52 11.424 101.824 12.16C102.128 12.88 102.28 13.8 102.28 14.92V20.368C102.28 20.96 102.12 21.416 101.8 21.736C101.496 22.056 101.048 22.216 100.456 22.216C99.8803 22.216 99.4323 22.056 99.1123 21.736C98.8083 21.416 98.6563 20.96 98.6563 20.368V15.088C98.6563 14.272 98.5043 13.688 98.2003 13.336C97.9123 12.968 97.4643 12.784 96.8563 12.784C96.0883 12.784 95.4723 13.024 95.0083 13.504C94.5603 13.984 94.3363 14.624 94.3363 15.424V20.368C94.3363 21.6 93.7363 22.216 92.5363 22.216ZM106.81 22.192C106.218 22.192 105.762 22.024 105.442 21.688C105.138 21.336 104.986 20.848 104.986 20.224V12.016C104.986 11.376 105.138 10.888 105.442 10.552C105.762 10.2 106.218 10.024 106.81 10.024C107.386 10.024 107.826 10.2 108.13 10.552C108.45 10.888 108.61 11.376 108.61 12.016V20.224C108.61 20.848 108.458 21.336 108.154 21.688C107.85 22.024 107.402 22.192 106.81 22.192ZM106.81 8.056C106.138 8.056 105.618 7.904 105.25 7.6C104.898 7.28 104.722 6.832 104.722 6.256C104.722 5.664 104.898 5.216 105.25 4.912C105.618 4.592 106.138 4.432 106.81 4.432C107.482 4.432 107.994 4.592 108.346 4.912C108.698 5.216 108.874 5.664 108.874 6.256C108.874 6.832 108.698 7.28 108.346 7.6C107.994 7.904 107.482 8.056 106.81 8.056ZM115.392 22.264C114.528 22.264 113.752 22.096 113.064 21.76C112.376 21.424 111.84 20.968 111.456 20.392C111.072 19.816 110.88 19.168 110.88 18.448C110.88 17.584 111.104 16.904 111.552 16.408C112 15.896 112.728 15.536 113.736 15.328C114.744 15.104 116.08 14.992 117.744 14.992H119.016V16.864H117.768C116.952 16.864 116.288 16.912 115.776 17.008C115.28 17.088 114.92 17.232 114.696 17.44C114.488 17.648 114.384 17.936 114.384 18.304C114.384 18.752 114.536 19.12 114.84 19.408C115.16 19.696 115.616 19.84 116.208 19.84C116.672 19.84 117.08 19.736 117.432 19.528C117.8 19.304 118.088 19.008 118.296 18.64C118.504 18.256 118.608 17.824 118.608 17.344V14.584C118.608 13.88 118.448 13.384 118.128 13.096C117.808 12.792 117.264 12.64 116.496 12.64C116.064 12.64 115.592 12.696 115.08 12.808C114.584 12.904 114.032 13.072 113.424 13.312C113.072 13.472 112.76 13.512 112.488 13.432C112.216 13.336 112.008 13.176 111.864 12.952C111.72 12.712 111.648 12.456 111.648 12.184C111.648 11.896 111.728 11.624 111.888 11.368C112.048 11.096 112.312 10.896 112.68 10.768C113.432 10.464 114.136 10.256 114.792 10.144C115.464 10.032 116.08 9.976 116.64 9.976C117.872 9.976 118.88 10.16 119.664 10.528C120.464 10.88 121.064 11.432 121.464 12.184C121.864 12.92 122.064 13.872 122.064 15.04V20.368C122.064 20.96 121.92 21.416 121.632 21.736C121.344 22.056 120.928 22.216 120.384 22.216C119.84 22.216 119.416 22.056 119.112 21.736C118.824 21.416 118.68 20.96 118.68 20.368V19.48L118.848 19.624C118.752 20.168 118.544 20.64 118.224 21.04C117.92 21.424 117.528 21.728 117.048 21.952C116.568 22.16 116.016 22.264 115.392 22.264ZM139.03 22.264C137.83 22.264 136.766 22.112 135.838 21.808C134.926 21.488 134.158 21.024 133.534 20.416C132.91 19.808 132.438 19.048 132.118 18.136C131.814 17.208 131.662 16.136 131.662 14.92V6.76C131.662 6.136 131.822 5.664 132.142 5.344C132.462 5.024 132.926 4.864 133.534 4.864C134.126 4.864 134.582 5.024 134.902 5.344C135.222 5.664 135.382 6.136 135.382 6.76V14.944C135.382 16.32 135.694 17.36 136.318 18.064C136.942 18.752 137.846 19.096 139.03 19.096C140.214 19.096 141.11 18.752 141.718 18.064C142.342 17.36 142.654 16.32 142.654 14.944V6.76C142.654 6.136 142.814 5.664 143.134 5.344C143.454 5.024 143.91 4.864 144.502 4.864C145.094 4.864 145.542 5.024 145.846 5.344C146.166 5.664 146.326 6.136 146.326 6.76V14.92C146.326 16.536 146.046 17.896 145.486 19C144.942 20.088 144.126 20.904 143.038 21.448C141.966 21.992 140.63 22.264 139.03 22.264ZM151.49 22.216C150.882 22.216 150.418 22.048 150.098 21.712C149.778 21.376 149.618 20.904 149.618 20.296V6.784C149.618 6.176 149.778 5.704 150.098 5.368C150.418 5.032 150.882 4.864 151.49 4.864C152.082 4.864 152.538 5.032 152.858 5.368C153.178 5.704 153.338 6.176 153.338 6.784V20.296C153.338 20.904 153.178 21.376 152.858 21.712C152.554 22.048 152.098 22.216 151.49 22.216Z" fill="currentColor"/>
                                <path d="M10.4739 9.83982C8.80757 9.83982 7.45672 11.2534 7.45672 12.9972C7.45672 14.741 8.80757 16.1546 10.4739 16.1546C12.1403 16.1546 13.4911 14.741 13.4911 12.9972C13.4911 11.2534 12.1403 9.83982 10.4739 9.83982Z" fill="currentColor"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6689 23L10.2783 23C5.0787 22.9056 0.891418 18.4637 0.891418 13C0.891418 7.47715 5.16977 3 10.4474 3C15.6393 3 19.8641 7.3329 20 12.7317L19.9835 20.8511C19.8459 22.0631 18.8641 23 17.6689 23ZM4.32475 11.5626C4.95054 8.61212 7.46601 6.40577 10.4739 6.40577C13.9526 6.40577 16.7727 9.35686 16.7727 12.9972C16.7727 13.0245 16.773 13.0541 16.7733 13.0845C16.774 13.1476 16.7747 13.2141 16.7727 13.2704V19.544H13.4956V18.7821C12.5986 19.2963 11.5689 19.5887 10.4739 19.5887C7.46601 19.5887 4.95054 17.3823 4.32475 14.4318C4.92387 14.256 5.36322 13.6803 5.36322 12.9972C5.36322 12.3141 4.92387 11.7384 4.32475 11.5626ZM3.90906 14.0477C4.46574 14.0477 4.91703 13.5754 4.91703 12.9929C4.91703 12.4103 4.46574 11.9381 3.90906 11.9381C3.35238 11.9381 2.90109 12.4103 2.90109 12.9929C2.90109 13.5754 3.35238 14.0477 3.90906 14.0477Z" fill="currentColor"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_10_13">
                                <rect width="163" height="24" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                            </a>

                            
                            <p style={{ ...styles.textGray700, ...styles.mb2 }}>One codebase. <br />Infinite possibilities.</p>
                            <ul style={{ ...styles.listUnstyled, ...styles.listInline }}>
                                <li style={styles.listSocial}>
                                    <a href="https://github.com/avaloniaui/avalonia" target="_blank" style={styles.textDecorationNone}>
                                        <img src="https://avaloniaui.net/img/icons/social/github.png" alt="GitHub" style={styles.imgFluid} />
                                    </a>
                                </li>
                                <li style={styles.listSocial}>
                                    <a href="https://twitter.com/avaloniaui" target="_blank" style={styles.textDecorationNone}>
                                        <img src="https://avaloniaui.net/img/icons/social/twitter.png" alt="Twitter" style={styles.imgFluid} />
                                    </a>
                                </li>
                                <li style={styles.listSocial}>
                                    <a href="https://www.linkedin.com/company/avaloniaui/" target="_blank" style={styles.textDecorationNone}>
                                        <img src="https://avaloniaui.net/img/icons/social/linkedin.png" alt="LinkedIn" style={styles.imgFluid} />
                                    </a>
                                </li>
                                <li style={styles.listSocial}>
                                    <a href="https://www.youtube.com/channel/UC54i4ILpN7JKUhP6liNYxkA" target="_blank" style={styles.textDecorationNone}>
                                        <img src="https://avaloniaui.net/img/icons/social/youtube.png" alt="YouTube" style={styles.imgFluid} />
                                    </a>
                                </li>
                            </ul>
                            
                        </div>

                    
                        <div className="hide-on-mobile">
                            <div style={{ ...styles.col, ...styles.colMd4, ...styles.colLg2 }}>
                                <h6 style={{ ...styles.fwBold, ...styles.textUppercase, ...styles.textGray700 }}>OSS Projects</h6>
                                <ul style={{ ...styles.listUnstyled, ...styles.textGray700, ...styles.mb6, ...styles.mbMd0 }}>
                                    <li style={styles.mb3}><a className="footer-text" href="https://github.com/avaloniaui/avalonia" target="_blank" style={styles.textReset}>Avalonia</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://github.com/avaloniaui/avaloniavs" target="_blank" style={styles.textReset}>Avalonia for Visual Studio</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://github.com/ForNeVeR/AvaloniaRider" target="_blank" style={styles.textReset}>Avalonia for Rider</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://github.com/avaloniaui/avalonia-dotnet-templates" target="_blank" style={styles.textReset}>.NET Templates</a></li>
                                </ul>
                            </div>

                            <div style={{ ...styles.col, ...styles.colMd4, ...styles.colLg2 }}>
                                <h6 style={{ ...styles.fwBold, ...styles.textUppercase, ...styles.textGray700 }}>Company</h6>
                                <ul style={{ ...styles.listUnstyled, ...styles.textGray700, ...styles.mb6, ...styles.mbMd0 }}>
                                    <li style={styles.mb3}><a className="footer-text" href="https://avaloniaui.net/xpf" style={styles.textReset}>Avalonia XPF</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://avaloniaui.net/support" style={styles.textReset}>Enhanced Support</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://avaloniaui.net/services" style={styles.textReset}>Development Services</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://avaloniaui.net/about" style={styles.textReset}>About Us</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://avaloniaui.net/careers" style={styles.textReset}>Careers <span style={styles.badge}>Hiring!</span></a></li>
                                </ul>
                            </div>

                            <div style={{ ...styles.col, ...styles.colMd4, ...styles.colLg2 }}>
                                <h6 style={{ ...styles.fwBold, ...styles.textUppercase, ...styles.textGray700 }}>Resources</h6>
                                <ul style={{ ...styles.listUnstyled, ...styles.textGray700 }}>
                                    <li style={styles.mb3}><a className="footer-text" href="https://avaloniaui.net/blog" style={styles.textReset}>Blog</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://docs.avaloniaui.net" target="_blank" style={styles.textReset}>Documentation</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://avaloniaui.net/faq" style={styles.textReset}>FAQs</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://avaloniaui.net/showcase" style={styles.textReset}>Showcase</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://drive.google.com/uc?id=1laynvVMvQn123I45q4EjexHpDBZcx6rk&export=download" target="_blank" style={styles.textReset}>Press Kit</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://avaloniaui.net/contact" style={styles.textReset}>Contact Us</a></li>
                                </ul>
                            </div>

                            <div style={{ ...styles.col, ...styles.colMd4, ...styles.colLg2 }}>
                                <h6 style={{ ...styles.fwBold, ...styles.textUppercase, ...styles.textGray700 }}>Other</h6>
                                <ul style={{ ...styles.listUnstyled, ...styles.textGray700 }}>
                                    <li style={styles.mb3}><a className="footer-text" href="https://avaloniaui.net/mvps" style={styles.textReset}>MVPs</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://avaloniaui.net/privacy" target="_blank" style={styles.textReset}>Privacy Policy</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://avaloniaui.net/tos" style={styles.textReset}>Terms of Service</a></li>
                                    <li style={styles.mb3}><a className="footer-text" href="https://t.me/Avalonia" style={styles.textReset}>Telegram Community</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </footer>
        </div>
);
}

export default Footer;