import React, { FC } from 'react';
import { Arrow } from 'react-konva';

interface DrawArrowProps {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    arrowWidth: number;
    color: string;
}

const DrawArrow: FC<DrawArrowProps> = ({
    fromX,
    fromY,
    toX,
    toY,
    arrowWidth,
    color,
}: DrawArrowProps) => {
    // Calculate the angle for the arrow
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const [isDragging, setDragging] = React.useState(false);
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    return (
        <Arrow
            x={fromX}
            y={fromY}
            points={[0, 0, toX - fromX, toY - fromY]}
            pointerLength={10}
            pointerWidth={10}
            fill={color}
            stroke={color}
            strokeWidth={arrowWidth}
            draggable
            onDragStart={() => {
                setDragging(true);
            }}
            onDragEnd={() => {
                setDragging(false);
            }}
        // rotation={(angle * 180) / Math.PI}
        />
    );
};

export default DrawArrow;
