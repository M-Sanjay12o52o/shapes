import { FC, useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';

interface ShapeProps {
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    id: string; // assuming 'id' is part of the shape properties
}

interface RectangleProps {
    shapeProps: ShapeProps;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (updatedProps: ShapeProps) => void;
}

export const Rectangle: FC<RectangleProps> = ({
    shapeProps,
    isSelected,
    onSelect,
    onChange,
}: RectangleProps) => {
    const shapeRef = useRef<any>();
    const trRef = useRef<any>();

    useEffect(() => {
        if (isSelected) {
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <>
            <Rect
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={() => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(5, node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    flipEnabled={false}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
};


// import React, { FC } from 'react'
// import { Rect } from 'react-konva'

// interface RectangleProps {
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//     fill: string;
//     shadowBlur: number;
//     draggable: boolean
//     isSelected: boolean;
//     onSelect: () => void;
// }

// const Rectangle: FC<RectangleProps> = ({ x, y, width, height, fill, shadowBlur, draggable, isSelected, onSelect }: RectangleProps) => {
//     const [isDragging, setDragging] = React.useState(false);
//     const shapeRef = React.useRef();
//     const trRef = React.useRef();

//     React.useEffect(() => {
//         if (isSelected) {
//             trRef.current?.nodes([shapeRef.current]);
//             trRef.current?.getLayer().batchDraw();
//         }
//     }, [isSelected]);

//     return <>
//         <Rect
//             x={x}
//             y={y}
//             width={width}
//             height={height}
//             fill={fill}
//             shadowBlur={shadowBlur}
//             draggable={draggable}
//             onDragStart={() => {
//                 setDragging(true);
//             }}
//             onDragEnd={() => {
//                 setDragging(false);
//             }}
//         />
//     </>
// }

// export default Rectangle