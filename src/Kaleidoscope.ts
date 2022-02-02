/// <reference path="../node_modules/@types/p5/global.d.ts" />
import * as P5 from "p5";
export class Kaleidoscope {
  static p5: P5;
  vertexes: { x: number; y: number }[] = [];

  constructor(
    private readonly size = 300,
    private readonly kaleidoRepeates = 8
  ) {
    this.generateCurve();
  }

  drawK() {
    const p5 = Kaleidoscope.p5;

    //p5.push();
    const curve = p5.random() > 0.5;
    const c = p5.random(230, 180);
    const c2 =
      p5.random() > 0.5
        ? p5.random() > 0.9
          ? p5.random(130, 150)
          : p5.random(200, 255)
        : p5.random(20, 30);
    if (p5.random() > 0.3)
      //p5.noFill();
      //else
      p5.fill(c2, c / 3, 122, p5.random(0, 0.36));
    p5.stroke(255, 200, 0, p5.random(0.2, 0.77));
    p5.strokeWeight(p5.random(0.3, 2));

    for (let i = 1; i <= this.kaleidoRepeates; i++) {
      p5.rotate(p5.TWO_PI / this.kaleidoRepeates);
      this.drawCurves(curve);
    }

    //p5.pop();
  }

  drawCurves(curve) {
    const p5 = Kaleidoscope.p5;

    p5.beginShape();
    // p5.beginContour();
    for (const vertex of this.vertexes) {
      if (curve) {
        p5.curveVertex(vertex.x, vertex.y);
      } else {
        p5.vertex(vertex.x, vertex.y);
        //p5.curveVertex(vertex.x, vertex.y);
      }
    }
    // p5.endContour();
    p5.endShape(p5.CLOSE);
    //p5.endShape();
  }

  generateCurve() {
    const p5 = Kaleidoscope.p5;
    while (this.vertexes.length) this.vertexes.pop();

    this.vertexes.push({
      x: p5.random(this.size / 2, this.size / 3),
      y: p5.random(this.size / 2, this.size / 3)
    });
    // this.vertexes.push({
    //   x: p5.random(0, this.size / 4),
    //   y: p5.random(this.size / 4, this.size)
    // });
    this.vertexes.push({
      x: p5.random(0, this.size / 2.4),
      y: p5.random(this.size / 2, this.size)
    });
    this.vertexes.push({
      x: p5.random(this.size / 2, this.size),
      y: p5.random(this.size / 2, this.size)
    });
  }
}
