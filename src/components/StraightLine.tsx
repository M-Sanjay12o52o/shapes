import React, { FC } from 'react';
import { Line } from 'react-konva';

interface StraightLineProps {
    length: number;
    draggable: boolean

}

const StraightLine: FC<StraightLineProps> = ({ length, draggable }) => {
    const [isDragging, setDragging] = React.useState(false);
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    return (
        <Line
            x={20}
            y={200}
            points={[0, 0, length, 0]} // Adjust the length here
            tension={0.5}
            closed
            stroke="black"
            fillLinearGradientStartPoint={{ x: -50, y: -50 }}
            fillLinearGradientEndPoint={{ x: 50, y: 50 }}
            fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
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

export default StraightLine;
