import { Layer, Stage } from "react-konva";
import { Rectangle } from "./components/Rectangle";
import React from "react";
import CircleShape from "./components/Circle";

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


const App = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [circles, setCircles] = React.useState(initialCircles)
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
      </Layer>
    </Stage>
  );
};

export default App;

// import { Stage, Layer } from 'react-konva';
// import CircleShape from './components/Circle';
// import Rectangle from './components/Rectangle';
// // import ArrowShape from './components/Arrow';
// import StraightLine from './components/StraightLine';
// import Rhombus from './components/Rhombus';
// import React, { useEffect } from 'react';
// import DrawArrow from './components/DrawArrow';

// const initialRectangles = [
//   {
//     x: 10,
//     y: 10,
//     width: 100,
//     height: 100,
//     fill: 'red',
//     id: 'rect1',
//   },
//   {
//     x: 150,
//     y: 150,
//     width: 100,
//     height: 100,
//     fill: 'green',
//     id: 'rect2',
//   },
// ];

// const App = () => {
//   const [rectangles, setRectangles] = React.useState(initialRectangles);
//   const [selectedId, selectShape] = React.useState(null);

//   const checkDeselect = (e: any) => {
//     // deselect when clicked on empty area
//     const clickedOnEmpty = e.target === e.target.getStage();
//     if (clickedOnEmpty) {
//       selectShape(null);
//     }
//   };

//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       const x = e.clientX
//       const y = e.clientY

//       console.log("x: ", x, "y: ", y)
//     }

//     window.addEventListener("mousedown", handler);

//     return () => {
//       window.removeEventListener("mousedown", handler)
//     }

//   }, [])

//   return (
//     <Stage className='' width={window.innerWidth} height={window.innerHeight}>
//       <Layer>
//         {/* <CircleShape x={200} y={100} radius={50} fill="green" draggable={true} /> */}

//         {rectangles.map((rect, i) => {
//           return (
//             <Rectangle
//               key={i}
//               shapeProps={rect}
//               isSelected={rect.id === selectedId}
//               onSelect={() => {
//                 selectShape(rect.id);
//               }}
//               onChange={(newAttrs) => {
//                 const rects = rectangles.slice();
//                 rects[i] = newAttrs;
//                 setRectangles(rects);
//               }}
//             />
//           );
//         })}

//         {/* <Rectangle
//           x={20}
//           y={50}
//           width={100}
//           height={100}
//           fill="red"
//           shadowBlur={10}
//           draggable={true} /> */}
//         {/* <StraightLine length={500} draggable={true} />
//         <Rhombus x={50} y={50} width={100} height={150} draggable={true} /> */}
//         {/* <ArrowShape /> */}
//         {/* <DrawArrow
//           fromX={50}
//           fromY={50}
//           toX={200}
//           toY={200}
//           arrowWidth={3}
//           color="black"
//         /> */}
//       </Layer>
//     </Stage>
//   );
// };

// export default App;