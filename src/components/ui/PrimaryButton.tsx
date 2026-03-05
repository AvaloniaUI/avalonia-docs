import { useState } from 'react'
import Link from '@docusaurus/Link'
import { RiveArrow } from './RiveArrow'

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

const variantClasses: Record<string, string> = {
  dark: 'bg-[#05051E] text-[#F3F1F0]',
  white: 'bg-[#F3F1F0] text-[#05051E]',
  ghost: 'bg-transparent text-white',
  'ghost-dark': 'bg-transparent text-[#05051E]',
}

function isExternal(url: string) {
  return url.startsWith('http://') || url.startsWith('https://')
}

export function PrimaryButton({ to, variant = 'dark', size = 'md', children, className = '', onClick }: PrimaryButtonProps) {
  const [hovered, setHovered] = useState(false)

  const p = paddings[size]
  const arrowVariant = variant === 'white' || variant === 'ghost-dark' ? 'black' : 'white'

  const sharedProps = {
    className: `relative inline-flex items-center gap-2 rounded-full whitespace-nowrap transition-all no-underline hover:no-underline ${variantClasses[variant]} ${className}`,
    style: {
      padding: hovered ? p.hover : p.idle,
      ...(variant === 'ghost' && hovered ? { backgroundColor: 'rgba(255, 255, 255, 0.24)' } : {}),
      ...(variant === 'ghost-dark' && hovered ? { backgroundColor: 'rgba(0, 0, 0, 0.06)' } : {}),
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick,
  }

  const content = (
    <>
      {children}
      <RiveArrow
        variant={arrowVariant}
        hover={hovered}
        className="w-[18px] h-[18px]"
      />
    </>
  )

  if (isExternal(to)) {
    return (
      <a href={to} {...sharedProps}>
        {content}
      </a>
    )
  }

  return (
    <Link to={to} {...sharedProps}>
      {content}
    </Link>
  )
}
