import { Stage, Layer } from 'react-konva';
import CircleShape from './components/Circle';
import Rectangle from './components/Rectangle';
import ArrowShape from './components/Arrow';
import StraightLine from './components/StraightLine';
import Rhombus from './components/Rhombus';
import { useEffect } from 'react';
import DrawArrow from './components/DrawArrow';

const App = () => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      console.log("x: ", x, "y: ", y)
    }

    window.addEventListener("mousedown", handler);

    return () => {
      window.removeEventListener("mousedown", handler)
    }

  }, [])

  return (
    <Stage className='' width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <CircleShape x={200} y={100} radius={50} fill="green" draggable={true} />
        <Rectangle x={20}
          y={50}
          width={100}
          height={100}
          fill="red"
          shadowBlur={10}
          draggable={true} />
        <StraightLine length={500} draggable={true} />
        <Rhombus x={50} y={50} width={100} height={150} draggable={true} />
        {/* <ArrowShape /> */}
        <DrawArrow
          fromX={50}
          fromY={50}
          toX={200}
          toY={200}
          arrowWidth={3}
          color="black"
        />
      </Layer>
    </Stage>
  );
};

export default App;