import React from 'react';
import { Circle } from 'react-konva';

interface CircleShapeProps {
  x: number;
  y: number;
  radius: number;
  fill: string;
  draggable: boolean
}

const CircleShape = ({ x, y, radius, fill, draggable }: CircleShapeProps) => {
  const [isDragging, setDragging] = React.useState(false);

  return (
    <>
      <Circle x={x} y={y} radius={radius} fill={fill} draggable={draggable} onDragStart={() => {
        setDragging(true);
      }}
        onDragEnd={() => {
          setDragging(false);
        }} />
    </>
  )
}

export default CircleShape