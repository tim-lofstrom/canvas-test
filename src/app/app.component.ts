import { Component, ElementRef, HostListener, NgZone, ViewChild } from '@angular/core';
import { Square } from './models/square';

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
  private squares: Square[] = [];
  private mySquare: Square;

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    this.keyboardState = new Map<KEY_CODE, KEY_STATE>();
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = window.innerWidth - 15;
    this.ctx.canvas.height = window.innerHeight - 100;
    this.mySquare = new Square(this.ctx);
    this.mySquare.draw();
    this.ngZone.runOutsideAngular(() => this.loop());
  }

  animate(): void {
    this.ctx.fillStyle = 'red';
    const square = new Square(this.ctx);
    this.squares.push(square);
  }

  loop() {
    const dirVector = this.getDirection();
    this.mySquare.append(dirVector);
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.mySquare.draw();
    requestAnimationFrame(this.loop.bind(this));
  }

  getDirection(): [number, number] {

    const dir: [number, number] = [0, 0];

    for (const [key, value] of Object.entries(this.keyboardState)) {
      if (key === KEY_CODE.LEFT_ARROW || key === KEY_CODE.RIGHT_ARROW) {
        dir[0] += this.keyToDir(key);
      }
      else if (key === KEY_CODE.UP_ARROW || key === KEY_CODE.DOWN_ARROW) {
        dir[1] += this.keyToDir(key);
      }
    }

    return dir;
  }

  keyToDir(key: KEY_CODE): number {

    switch (key) {
      case KEY_CODE.LEFT_ARROW:
        return this.keyboardState[key] == KEY_STATE.DOWN ? -1 : 1;
        break;
      case KEY_CODE.RIGHT_ARROW:
        return this.keyboardState[key] == KEY_STATE.DOWN ? 1 : -1;
        break;
      case KEY_CODE.UP_ARROW:
        return this.keyboardState[key] == KEY_STATE.DOWN ? -1 : 1;
        break;
      case KEY_CODE.DOWN_ARROW:
        return this.keyboardState[key] == KEY_STATE.DOWN ? 1 : -1;
        break;

    }

    return 1;

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
