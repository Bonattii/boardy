'use client'

import { memo } from 'react'

import { colorToCss } from '@/lib/utils'
import { LayerType } from '@/types/canvas'
import { useStorage } from '@/liveblocks.config'

import { Path } from './path'
import { Note } from './note'
import { Text } from './text'
import { Ellipse } from './ellipse'
import { Rectangle } from './rectangle'

interface LayerPreviewProps {
  id: string
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
  selectionColor?: string
}

export const LayerPreview = memo(function ({
  id,
  onLayerPointerDown,
  selectionColor
}: LayerPreviewProps) {
  const layer = useStorage((root) => root.layers.get(id))

  if (!layer) {
    return null
  }

  switch (layer.type) {
    case LayerType.Path:
      return (
        <Path
          key={id}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : '#000'}
          points={layer.points}
          stroke={selectionColor}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
        />
      )
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    case LayerType.Ellipse:
      return (
        <Ellipse
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    case LayerType.Text:
      return (
        <Text
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    case LayerType.Note:
      return (
        <Note
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    default:
      console.warn('Unknown layer type')
      return null
  }
})

LayerPreview.displayName = 'LayerPreview'
