import P5 from "p5";
import "p5/lib/addons/p5.dom";
import "./styles.scss";
import { Kaleidoscope } from "./Kaleidoscope";

const sketch = (p5: P5) => {
  let kaleidos: Kaleidoscope[] = [];
  let curIndex = 0;
  let circles = 20;
  let curLoop = 0;
  let elements = 24;
  // The sketch setup method
  p5.setup = () => {
    const canvas = p5.createCanvas(700, 700);
    canvas.parent("app");
    Kaleidoscope.p5 = p5;
    p5.background(255, 255, 255);

    p5.colorMode(p5.HSB);

    //p5.rectMode(p5.CORNER);
    // p5.noStroke();
    //p5.noLoop();
    // Configuring the canvas
    //p5.frameRate(50);
  };

  function gen() {
    let kaleidos2: Kaleidoscope[] = [];
    for (let i = 1; i < circles; i++) {
      kaleidos2.push(
        new Kaleidoscope(((circles - i) * (p5.height / circles)) / 2, elements)
      );
    }
    kaleidos = kaleidos2;
    //setTimeout(()=>p5.redraw(), 1100);
  }
  p5.mouseClicked = () => {
    circles = p5.map(p5.mouseY, 0, p5.height, 3, 45);
    elements = p5.map(p5.mouseX, 0, p5.width, 1, 48);
    if (p5.random() > 0.4) p5.background(0, 0, 0);
    else p5.background(255, 0, 255);
  };
  // The sketch draw method
  p5.draw = () => {
    // console.log(p5.noise(p5.frameCount) * 100 + 100);
    // console.log(p5.noise(p5.frameCount));
    // console.log(p5.frameCount);
    p5.translate(p5.width / 2, p5.height / 2);
    //p5.rotate(p5.PI / 6);
    if (curIndex === 0) {
      curIndex = 1;
      curLoop++;
      p5.noLoop();

      setTimeout(() => {
        gen();

        //p5.background(0, 0, p5.noise(curLoop));

        p5.loop();
      }, 250);
      return;
    }

    kaleidos[curIndex].drawK();
    curIndex++;
    if (p5.random() < 0.004) {
      p5.textSize(p5.random(4, 140));
      p5.stroke(40, 40, 40, 0.7);
      // p5.fill(0, 0, 0, .1);
      let hw = p5.width / 2;
      let hh = p5.height / 2;
      p5.rotate(p5.random(-p5.HALF_PI, p5.HALF_PI));
      p5.text(
        "BLURED!",
        p5.random(hw / -2, hw / 2),
        p5.random(hh / -2, hh / 2),
        p5.width,
        p5.height
      );
      p5.rotate(p5.random(-0.4, 0.6));
      p5.filter(p5.BLUR, p5.random() * 1);
    }

    if (curIndex === kaleidos.length) {
      curIndex = 0;
    }
    p5.stroke(0, 0, 0, 1);
  };
};

new P5(sketch);
