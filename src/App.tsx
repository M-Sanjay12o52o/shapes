import { Layer, Stage } from "react-konva";
import { Rectangle } from "./components/Rectangle";
import React from "react";
import CircleShape from "./components/Circle";
import Rhombus from "./components/Rhombus";
import StraightLine from "./components/StraightLine";

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'white',
    stroke: "black",
    strokeWidth: 3,
    strokeScaleEnabled: false,
    id: 'rect1',
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: 'white',
    stroke: "black",
    strokeWidth: 3,
    strokeScaleEnabled: false,
    id: 'rect2',
  },
];

const initialCircles = [
  {
    x: 50,
    y: 50,
    radius: 50,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 3,
    strokeScaleEnabled: false,
    id: 'circle1',
  },
  {
    x: 200,
    y: 100,
    radius: 80,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 3,
    strokeScaleEnabled: false,
    id: 'circle2',
  },
];

const initialRhombuses = [
  {
    x: 300,
    y: 200,
    width: 80,
    height: 120,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 3,
    id: 'rhombus1',
  },
  {
    x: 500,
    y: 300,
    width: 100,
    height: 150,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 3,
    id: 'rhombus2',
  },
];


const App = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [circles, setCircles] = React.useState(initialCircles)
  const [rhombuses, setRhombuses] = React.useState(initialRhombuses)
  const [selectedId, selectShape] = React.useState<string | null>(null);

  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rhombuses.map((rhombus, i) => (
          <Rhombus
            key={i}
            shapeProps={rhombus}
            isSelected={rhombus.id === selectedId}
            onSelect={() => selectShape(rhombus.id)}
            onChange={(newAttrs: any) => {
              const rhombs = rhombuses.slice();
              rhombs[i] = newAttrs;
              setRhombuses(rhombs);
            }}
          />
        ))}

        {rectangles.map((rect, i) => {
          return (
            <Rectangle
              key={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => {
                console.log("rect.id: ", rect.id)
                selectShape(rect.id);
              }}
              onChange={(newAttrs: any) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
              }}
            />
          );
        })}{
          circles.map((circle, i) => {
            return (
              <CircleShape
                key={i}
                shapeProps={circle}
                isSelected={circle.id === selectedId}
                onSelect={() => {
                  console.log("circle.id: ", circle.id)
                  selectShape(circle.id)
                }}
                onChange={(newAttrs: any) => {
                  const circs = circles.slice();
                  circs[i] = newAttrs;
                  setCircles(circs);
                }}
              />
            )
          })
        }
        <StraightLine strokeWidth={5} length={100} draggable={true} />
      </Layer>
    </Stage>
  );
};

export default App;
