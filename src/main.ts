import P5 from "p5";

// DEMO: A sample class implementation
import Hexagon from "./hexagon.ts";

const gridOptions = {
  numRows: 8,
  numCols: 17,
  hexSize: 30,
};
const xOffset = gridOptions.hexSize * 1.5;
const yOffset = gridOptions.hexSize * Math.sqrt(3);

const canvaWidth = 800;
const canvaHeight = 450;

const mainIndex = 76;

// Creating the sketch itself
const sketch = (p5: P5) => {
  const grid: Hexagon[] = [];

  for (let row = 0; row < gridOptions.numRows; row++) {
    for (let col = 0; col < gridOptions.numCols; col++) {
      const x = col * xOffset;
      const y = row * yOffset + (col % 2) * (yOffset / 2);
      const index = row * gridOptions.numCols + col;
      grid.push(
        new Hexagon(
          p5,
          p5.createVector(x + gridOptions.hexSize, y + gridOptions.hexSize),
          gridOptions.hexSize,
          index,
          gridOptions
        )
      );
    }
  }

  // Setting starting point
  grid[mainIndex].isActive = true;

  p5.setup = () => {
    const canvas = p5.createCanvas(canvaWidth, canvaHeight);
    canvas.parent("app");
  };

  p5.draw = () => {
    p5.background("black");
    grid.forEach((hexagon) => {
      // hexagon.draw();
      grid[mainIndex].draw();
      if (hexagon.isHovered()) {
        if (hexagon.isCloseTo(mainIndex)) {
          hexagon.draw();
          hexagon.color = "red";
        }
      }
    });
  };
};

new P5(sketch);
