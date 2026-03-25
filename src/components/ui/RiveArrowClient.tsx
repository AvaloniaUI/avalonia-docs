import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas'
import { useEffect } from 'react'

const ARROW_SOURCES = {
  white: 'https://public.rive.app/hosted/585281/229484/-8tMDLUvw0SgECqoafRvmw.riv',
  black: 'https://public.rive.app/hosted/585281/229481/CVK33X_jQEyUPjLG6Xp5OA.riv',
} as const

interface RiveArrowClientProps {
  variant: 'white' | 'black'
  hover?: boolean
  className?: string
}

export default function RiveArrowClient({ variant, hover = false, className }: RiveArrowClientProps) {
  const { rive, RiveComponent } = useRive({
    src: ARROW_SOURCES[variant],
    artboard: 'Artboard',
    stateMachines: 'State Machine 1',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  })

  const hoverInput = useStateMachineInput(rive, 'State Machine 1', 'Hover')

  useEffect(() => {
    if (hoverInput) {
      hoverInput.value = hover
    }
  }, [hover, hoverInput])

  return <RiveComponent className={className} />
}
