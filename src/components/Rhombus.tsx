import { FC, useEffect, useRef } from 'react';
import { Shape, Transformer } from 'react-konva';

interface ShapeProps {
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    id: string; // assuming 'id' is part of the shape properties
}

interface RhombusProps {
    shapeProps: ShapeProps;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (updatedProps: ShapeProps) => void;
}

const Rhombus: FC<RhombusProps> = ({
    shapeProps,
    isSelected,
    onSelect,
    onChange,
}: RhombusProps) => {
    const { x, y, width, height } = shapeProps;

    const points = [x, y + height / 2, x + width / 2, y + height, x + width, y + height / 2, x + width / 2, y];
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

export default Rhombus;
