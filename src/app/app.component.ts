import { Component, ElementRef, HostListener, NgZone, ViewChild } from '@angular/core';
import { Square } from './models/square';
import { Vector2D } from './utils/Vector2D';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  keyboardState: Map<KEY_CODE, KEY_STATE>;

  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    switch (event.code) {
      case KEY_CODE.RIGHT_ARROW:
        this.keyboardState[KEY_CODE.RIGHT_ARROW] = KEY_STATE.DOWN;
        break;
      case KEY_CODE.LEFT_ARROW:
        this.keyboardState[KEY_CODE.LEFT_ARROW] = KEY_STATE.DOWN;
        break;
      case KEY_CODE.DOWN_ARROW:
        this.keyboardState[KEY_CODE.DOWN_ARROW] = KEY_STATE.DOWN;
        break;
      case KEY_CODE.UP_ARROW:
        this.keyboardState[KEY_CODE.UP_ARROW] = KEY_STATE.DOWN;
        break;
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    switch (event.code) {
      case KEY_CODE.RIGHT_ARROW:
        this.keyboardState[KEY_CODE.RIGHT_ARROW] = KEY_STATE.UP;
        break;
      case KEY_CODE.LEFT_ARROW:
        this.keyboardState[KEY_CODE.LEFT_ARROW] = KEY_STATE.UP;
        break;
      case KEY_CODE.DOWN_ARROW:
        this.keyboardState[KEY_CODE.DOWN_ARROW] = KEY_STATE.UP;
        break;
      case KEY_CODE.UP_ARROW:
        this.keyboardState[KEY_CODE.UP_ARROW] = KEY_STATE.UP;
        break;
    }
  }

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private mySquare: Square;
  private candy: Square;

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    this.keyboardState = new Map<KEY_CODE, KEY_STATE>();
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = window.innerWidth - 15;
    this.ctx.canvas.height = window.innerHeight - 15;
    this.mySquare = new Square(this.ctx);
    this.candy = new Square(this.ctx);
    this.candy.setPosition = new Vector2D().byCoodinates(200, 200);
    this.ngZone.runOutsideAngular(() => this.loop());
  }

  loop() {
    this.mySquare.update();
    this.keyBoardUpdate();


    if (this.mySquare.intersect(this.candy.getPosition, this.candy.getSize)) {
      this.mySquare.appendSize(5);
      this.candy.setPosition = new Vector2D().byCoodinates(
        randomIntFromInterval(0, this.ctx.canvas.width), randomIntFromInterval(0, this.ctx.canvas.height));
    }


    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.mySquare.draw();
    this.candy.draw();
    requestAnimationFrame(this.loop.bind(this));
  }

  keyBoardUpdate() {

    if (this.keyboardState[KEY_CODE.LEFT_ARROW] === KEY_STATE.DOWN) {
      this.mySquare.rotate(degsToRads(-3))
    }

    if (this.keyboardState[KEY_CODE.RIGHT_ARROW] === KEY_STATE.DOWN) {
      this.mySquare.rotate(degsToRads(3))
    }

    if (this.keyboardState[KEY_CODE.UP_ARROW] === KEY_STATE.DOWN && this.mySquare.getSpeed < 3) {
      this.mySquare.accelerate(0.5);
    }

    if (this.keyboardState[KEY_CODE.UP_ARROW] === KEY_STATE.UP && this.mySquare.getSpeed > 0) {
      this.mySquare.accelerate(-0.5);
    }

  }

  getDirection(): Vector2D {

    const dir = new Vector2D().byCoodinates(0, 0);

    for (const [key, value] of Object.entries(this.keyboardState)) {
      if (key === KEY_CODE.LEFT_ARROW || key === KEY_CODE.RIGHT_ARROW) {
        dir.x += this.keyToDir(key);
      }
      else if (key === KEY_CODE.UP_ARROW || key === KEY_CODE.DOWN_ARROW) {
        dir.y += this.keyToDir(key);
      }
    }

    return dir;
  }

  keyToDir(key: KEY_CODE): number {
    switch (key) {
      case KEY_CODE.LEFT_ARROW:
        return this.keyboardState[key] == KEY_STATE.DOWN ? -1 : 1;
      case KEY_CODE.RIGHT_ARROW:
        return this.keyboardState[key] == KEY_STATE.DOWN ? 1 : -1;
      case KEY_CODE.UP_ARROW:
        return this.keyboardState[key] == KEY_STATE.DOWN ? -1 : 1;
      case KEY_CODE.DOWN_ARROW:
        return this.keyboardState[key] == KEY_STATE.DOWN ? 1 : -1;
    }
  }

}

export enum KEY_CODE {
  UP_ARROW = "ArrowUp",
  DOWN_ARROW = "ArrowDown",
  RIGHT_ARROW = "ArrowRight",
  LEFT_ARROW = "ArrowLeft"
}

export enum KEY_STATE {
  UP,
  DOWN
}

const degsToRads = deg => (deg * Math.PI) / 180.0;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}