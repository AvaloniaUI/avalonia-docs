import React, { type ReactNode } from 'react'
import { CookieConsent } from '../components/CookieConsent'

export default function Root({ children }: { children: ReactNode }): ReactNode {
  return (
    <>
      {children}
      <CookieConsent />
    </>
  )
}
