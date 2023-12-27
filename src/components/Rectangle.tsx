import React, { FC } from 'react'
import { Rect } from 'react-konva'

interface RectangleProps {
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    shadowBlur: number;
    draggable: boolean

}

const Rectangle: FC<RectangleProps> = ({ x, y, width, height, fill, shadowBlur, draggable }: RectangleProps) => {
    const [isDragging, setDragging] = React.useState(false);

    return <>
        <Rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={fill}
            shadowBlur={shadowBlur}
            draggable={draggable}
            onDragStart={() => {
                setDragging(true);
            }}
            onDragEnd={() => {
                setDragging(false);
            }}
        />
    </>
}

export default Rectangle