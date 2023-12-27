import React, { FC } from 'react';
import { Shape } from 'react-konva';

interface ArrowShapeProps { }

const ArrowShape: FC<ArrowShapeProps> = () => {
    const [isDragging, setDragging] = React.useState(false);
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    return (
        <Shape
            sceneFunc={(context, shape) => {
                context.beginPath();
                context.moveTo(20, 50);
                context.lineTo(200, 50);
                context.lineTo(180, 45);
                context.moveTo(200, 50);
                context.lineTo(180, 55);
                context.closePath();
                context.fillStrokeShape(shape);
            }}
            fill="black"
            stroke="black"
            strokeWidth={3}
            draggable
            onDragStart={() => {
                setDragging(true);
            }}
            onDragEnd={() => {
                setDragging(false);
            }}
        />
    );
};

export default ArrowShape;
