import { colorToCss } from '@/lib/utils'
import { RectangleLayer } from '@/types/canvas'

interface RectangleProps {
  id: string
  layer: RectangleLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export function Rectangle({
  id,
  layer,
  onPointerDown,
  selectionColor
}: RectangleProps) {
  const { x, y, width, height, fill } = layer

  return (
    <rect
      x={0}
      y={0}
      width={width}
      height={height}
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
