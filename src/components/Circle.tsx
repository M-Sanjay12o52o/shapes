import { useEffect, useRef } from 'react';
import { Circle, Transformer } from 'react-konva';

interface ShapeProps {
  x: number;
  y: number;
  radius: number;
  fill: string;
  id: string;
}

interface CircleProps {
  shapeProps: ShapeProps;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (updatedProps: ShapeProps) => void;
}

const CircleShape = ({ shapeProps, isSelected, onSelect, onChange }: CircleProps) => {
  const shapeRef = useRef<any>(); // Use Circle type for better type safety
  const trRef = useRef<any>();

  useEffect(() => {
    if (isSelected) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Circle
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={true}
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

          const newRadius = Math.max(5, node.radius() * Math.max(scaleX, scaleY));

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            radius: newRadius
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          keepRatio={true} // Preserve circle proportions during scaling
          boundBoxFunc={(oldBox, newBox) => {
            const minRadius = 5; // Enforce minimum radius
            console.log("minRadius: ", minRadius)
            const newRadius = Math.max(minRadius, newBox.width / 2);
            console.log("newRadius: ", newRadius)

            return {
              x: oldBox.x + (oldBox.width - newRadius * 2) / 2,
              y: oldBox.y + (oldBox.height - newRadius * 2) / 2,
              width: newRadius * 2,
              height: newRadius * 2,
              rotation: oldBox.rotation,
            };
          }}
        />
      )}
    </>
  );
};

export default CircleShape;
