import { colorToCss } from '@/lib/utils'
import { EllipseLayer } from '@/types/canvas'

interface EllipseProps {
  id: string
  layer: EllipseLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export function Ellipse({
  id,
  layer,
  onPointerDown,
  selectionColor
}: EllipseProps) {
  const { x, y, width, height, fill } = layer

  return (
    <ellipse
      cx={width / 2}
      rx={width / 2}
      cy={height / 2}
      ry={height / 2}
      strokeWidth={1}
      className="drop-shadow-md"
      stroke={selectionColor || 'transparent'}
      fill={fill ? colorToCss(fill) : '#CCC'}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`
      }}
    />
  )
}
