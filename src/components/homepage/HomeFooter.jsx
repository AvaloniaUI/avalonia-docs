import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { GitHubIcon, Icons, LinkedInIcon, TwitterIcon, YouTubeIcon } from '@site/src/icons';

const projects = [
    {
      name: 'Avalonia UI',
      href: 'https://github.com/avaloniaui/avalonia',
    },
    {
      name: 'Avalonia UI for Visual Studio',
      href: 'https://github.com/avaloniaui/avaloniavs',
    },
    {
      name: 'Avalonia UI for Rider',
      href: 'https://github.com/ForNeVeR/AvaloniaRider',
    },
    {
      name: '.NET Templates',
      href: 'https://github.com/avaloniaui/avalonia-dotnet-templates',
    },
  ];

const services = [
    {
      name: 'Avalonia XPF',
      href: 'https://www.avaloniaui.net/xpf',
    },
    {
      name: 'Developer Support',
      href: 'https://www.avaloniaui.net/support',
    },
    {
      name: 'Software Development',
      href: 'https://www.avaloniaui.net/Services',
    },
  ];

  const resources = [
    {
      name: 'Blog',
      href: 'https://avaloniaui.net/Blog',
    },
    {
      name: 'Samples',
      href: 'https://github.com/AvaloniaUI/Avalonia.Samples',
    },
    {
      name: 'FAQs',
      href: 'https://avaloniaui.net/FAQ',
    },
    {
       name: 'Showcase',
       href: 'https://avaloniaui.net/Showcase',
    },
    {
        name: 'Press Kit',
        href: 'https://drive.google.com/uc?id=1laynvVMvQn123I45q4EjexHpDBZcx6rk&export=download',
     },
     {
        name: 'Contact Us',
        href: 'https://avaloniaui.net/ContactUs',
     },
  ];

  const other = [
    {
      name: 'About Us',
      href: 'https://avaloniaui.net/about',
    },
    {
      name: 'Careers',
      href: 'https://avaloniaui.net/Careers',
    },
    {
      name: 'MVPs',
      href: 'https://avaloniaui.net/MVPs',
    },
    {
       name: 'Privacy Policy',
       href: 'https://avaloniaui.net/Privacy',
    },
    {
        name: 'Terms of Service',
        href: 'https://avaloniaui.net/TOS',
     },
     {
        name: 'Telegram Community Chat',
        href: 'https://t.me/Avalonia',
     },
  ];



  function Links({ name, links }) {
    return (
        <div class="col-6 col-md-4 col-lg-2">
      
        
        <h6 class="fw-bold text-uppercase text-gray-700">
          {name}
        </h6>

 
        <ul class="list-unstyled text-muted mb-6 mb-md-8 mb-lg-0">
            {links.map(({ name, href }) => (
                <li class="mb-3">
                    <Link
                        href={href}
                        className="text-reset">
                        {name}
                    </Link>
                </li>
            ))}          
        </ul>

      </div>
    );
  }


export default function Footer() {
    return (
        <footer class="py-8 py-md-8 bg-dark mt-auto">
        <div class="container" style={{ maxWidth: '1600px' }}>
          <div class="row">
            <div class="col-12 col-md-4 col-lg-2">
              
              <h4 class="text-white"><b>Avalonia UI</b></h4>
              
              <p class="text-gray-700 mb-2">
                Your App. Everywhere.
              </p>
      

              <ul class="list-unstyled list-inline list-social mb-6 mb-md-0">    
                <li class="list-inline-item list-social-item me-3">
                  <a href="https://github.com/avaloniaui/avalonia" class="text-decoration-none">
                    <GitHubIcon class="list-social-icon"/>
                  </a>
                </li>
                <li class="list-inline-item list-social-item me-3">
                  <a href="https://twitter.com/avaloniaui" class="text-decoration-none">
                    <TwitterIcon class="list-social-icon"/>
                  </a>
                </li>
                <li class="list-inline-item list-social-item me-3">
                    <a href="https://www.linkedin.com/company/avaloniaui/" class="text-decoration-none">
                    <LinkedInIcon class="list-social-icon"/>
                    </a>
                </li>
              <li class="list-inline-item list-social-item me-3">
                    <a href="https://www.youtube.com/channel/UC54i4ILpN7JKUhP6liNYxkA" class="text-decoration-none">
                          <YouTubeIcon class="list-social-icon"/>
                  </a>
              </li>
                
              </ul>
      
            </div>
  
    
            <Links name="Product" links={projects} />
  
            <Links name="Services" links={services} />
       
            <Links name="Resources" links={resources} />
  
            <Links name="Other" links={other} />

  
          </div> 
        </div> 
  
        <div class="container mt-5 text-gray-700 text-center">
          &copy; {new Date().getFullYear()} - AvaloniaUI OÜ (14839404). 
        </div>
        <div class="container text-gray-700 text-center">
          Avalonia™ is a registered trademark of AvaloniaUI OÜ. 
        </div>
  
      </footer>
    );
  }