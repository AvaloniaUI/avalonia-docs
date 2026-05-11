import { useEffect, useState, lazy, Suspense } from 'react'

interface RiveArrowProps {
  variant: 'white' | 'black'
  hover?: boolean
  className?: string
}

const RiveArrowClient = lazy(() => import('./RiveArrowClient'))

export function RiveArrow(props: RiveArrowProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={props.className} />
  }

  return (
    <Suspense fallback={<div className={props.className} />}>
      <RiveArrowClient {...props} />
    </Suspense>
  )
}
