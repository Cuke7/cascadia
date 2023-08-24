import P5 from "p5";

type Grid = {
  numRows: number;
  numCols: number;
  hexSize: number;
};

export default class Hexagon {
  p5: P5;
  pos: P5.Vector;
  radius: number;
  index: number;
  isActive: boolean;
  color: string;
  gridOption: Grid;

  constructor(
    p5: P5,
    atPosition: P5.Vector,
    radius: number,
    index: number,
    grid: Grid
  ) {
    this.p5 = p5;
    this.pos = atPosition;
    this.radius = radius;
    this.index = index;
    this.isActive = false;
    this.color = "black";
    this.gridOption = grid;
  }

  draw() {
    const p5 = this.p5;
    p5.push();
    p5.fill(this.color);
    if (this.isActive) p5.fill("white");
    p5.stroke("white");
    p5.beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = (p5.TWO_PI / 6) * i;
      let xOffset = this.radius * p5.cos(angle);
      let yOffset = this.radius * p5.sin(angle);
      p5.vertex(this.pos.x + xOffset, this.pos.y + yOffset);
    }
    p5.endShape(p5.CLOSE);
    p5.stroke("red");
    p5.fill("red");
    p5.text(this.index, this.pos.x, this.pos.y);
    p5.pop();
  }

  isHovered() {
    const p5 = this.p5;
    const distance = p5.dist(p5.mouseX, p5.mouseY, this.pos.x, this.pos.y);
    if (distance < this.radius * 0.9) return true;
    return false;
  }

  isCloseTo(index: number) {
    if (this.index == index - this.gridOption.numCols) return true;
    if (this.index == index - this.gridOption.numCols + 1) return true;
    if (this.index == index + 1) return true;
    if (this.index == index + this.gridOption.numCols) return true;
    if (this.index == index - 1) return true;
    if (this.index == index - this.gridOption.numCols - 1) return true;
    return false;
  }
}
