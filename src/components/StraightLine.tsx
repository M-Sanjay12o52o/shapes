import React, { FC, useRef, useEffect, useState } from 'react';
import { Line, Transformer } from 'react-konva';

interface StraightLineProps {
    length: number;
    strokeWidth: number;
    draggable: boolean;
}

const StraightLine: FC<StraightLineProps> = ({ length, draggable, strokeWidth }) => {
    const shapeRef = useRef<any>();
    const trRef = useRef<any>();
    const [isSelected, setSelected] = useState(false);

    useEffect(() => {
        if (isSelected) {
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Line
                x={20}
                y={200}
                points={[0, 0, length, 0]}
                tension={0.5}
                closed
                stroke="black"
                strokeWidth={1}
                fillLinearGradientStartPoint={{ x: -50, y: -50 }}
                fillLinearGradientEndPoint={{ x: 50, y: 50 }}
                fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
                draggable={draggable}
                ref={shapeRef}
                onClick={() => setSelected(!isSelected)}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // Your bound box function logic here
                        return newBox;
                    }}
                />
            )}
        </>
    );
};

export default StraightLine;
