import React, { FC } from 'react';
import { Shape } from 'react-konva';

interface RhombusProps {
    x: number;
    y: number;
    width: number;
    height: number;
    draggable: boolean

}

const Rhombus: FC<RhombusProps> = ({ x, y, width, height, draggable }) => {
    const points = [x, y + height / 2, x + width / 2, y + height, x + width, y + height / 2, x + width / 2, y];
    const [isDragging, setDragging] = React.useState(false);
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    return (
        <Shape
            sceneFunc={(context, shape) => {
                context.beginPath();
                context.moveTo(points[0], points[1]);
                for (let i = 2; i < points.length; i += 2) {
                    context.lineTo(points[i], points[i + 1]);
                }
                context.closePath();
                context.fillStrokeShape(shape);
            }}
            fill="#00D2FF"
            stroke="black"
            strokeWidth={2}
            draggable={draggable}
            onDragStart={() => {
                setDragging(true);
            }}
            onDragEnd={() => {
                setDragging(false);
            }}
        />
    );
};

export default Rhombus;
