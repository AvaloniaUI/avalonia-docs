import { useState } from 'react'
import Link from '@docusaurus/Link'
import BrowserOnly from '@docusaurus/BrowserOnly'

interface PrimaryButtonProps {
  to: string
  variant?: 'dark' | 'white' | 'ghost' | 'ghost-dark'
  size?: 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const paddings = {
  md: { idle: '8px 14px', hover: '8px 16px 8px 12px' },
  lg: { idle: '12px 12px 12px 20px', hover: '12px 16px 12px 18px' },
}

const variantColors: Record<string, { bg: string; hoverBg: string; color: string }> = {
  dark: { bg: '#05051E', hoverBg: 'rgb(34, 40, 74)', color: '#F3F1F0' },
  white: { bg: '#F3F1F0', hoverBg: '#E3DFDC', color: '#05051E' },
  ghost: { bg: 'transparent', hoverBg: 'rgba(255, 255, 255, 0.24)', color: '#FFFFFF' },
  'ghost-dark': { bg: 'transparent', hoverBg: 'rgba(0, 0, 0, 0.06)', color: '#05051E' },
}

function isExternal(url: string) {
  return url.startsWith('http://') || url.startsWith('https://')
}

function RiveArrowLazy({ variant, hover }: { variant: 'white' | 'black'; hover: boolean }) {
  return (
    <BrowserOnly fallback={<span className="inline-block w-[18px] h-[18px]" />}>
      {() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const RiveArrowClient = require('./RiveArrowClient').default
        return <RiveArrowClient variant={variant} hover={hover} className="w-[18px] h-[18px]" />
      }}
    </BrowserOnly>
  )
}

export function PrimaryButton({ to, variant = 'dark', size = 'md', children, className = '', onClick }: PrimaryButtonProps) {
  const [hovered, setHovered] = useState(false)

  const p = paddings[size]
  const v = variantColors[variant]
  const arrowVariant = variant === 'white' || variant === 'ghost-dark' ? 'black' : 'white'

  const style: React.CSSProperties = {
    padding: hovered ? p.hover : p.idle,
    backgroundColor: hovered ? v.hoverBg : v.bg,
    color: v.color,
    borderRadius: '9999px',
    textDecoration: 'none',
    transition: 'all 150ms ease',
  }

  const sharedClassName = `relative inline-flex items-center gap-2 whitespace-nowrap no-underline hover:no-underline ${className}`

  const content = (
    <>
      {children}
      <RiveArrowLazy variant={arrowVariant} hover={hovered} />
    </>
  )

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick,
  }

  if (isExternal(to)) {
    return (
      <a href={to} className={sharedClassName} style={style} {...handlers}>
        {content}
      </a>
    )
  }

  return (
    <Link to={to} className={sharedClassName} style={style} {...handlers}>
      {content}
    </Link>
  )
}
