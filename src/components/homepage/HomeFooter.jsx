import React from 'react';

const Footer = () => {
    const styles = {
        footer: {
            paddingTop: '3rem',
            paddingBottom: '.75rem',
            backgroundColor: 'rgba(241, 244, 248, 1)',
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
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.row}>
                    <div style={{ ...styles.col, ...styles.colMd4, ...styles.colLg3 }}>
                        <img src="https://avaloniaui.net/img/brand.svg" alt="..." style={{ ...styles.imgFluid, ...styles.mb2 }} />
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
          </footer>
);
}

export default Footer;