import { Vector2D } from "../utils/Vector2D";

export class Square {

    private color = 'red';
    private position: Vector2D;
    private direction: Vector2D;
    private velocity: Vector2D;
    private rotation: number;
    private width = 30;
    private height = 30;

    private scale = 0.1;
    private speed = 0;

    constructor(private ctx: CanvasRenderingContext2D) {
        this.position = new Vector2D().byCoodinates(100, 100);
        this.direction = new Vector2D().byCoodinates(0, 0);
        this.velocity = new Vector2D().byCoodinates(0, 0);
        this.rotation = 0;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        this.ctx.rotate(this.rotation);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        this.ctx.restore();
    }

    update() {
        this.direction = new Vector2D().byRadian(this.rotation);
        this.velocity = (this.direction.dotScalar(this.scale * this.speed).addVector(this.velocity)).dotScalar(0.98);
        this.position = this.position.addVector(this.velocity);

        if (this.position.x > this.ctx.canvas.width) {
            this.position.x = 0 - this.width;
        }
        if (this.position.x + this.width < 0) {
            this.position.x = this.ctx.canvas.width;
        }
        if (this.position.y > this.ctx.canvas.height) {
            this.position.y = 0 - this.height;
        }
        if (this.position.y + this.height < 0) {
            this.position.y = this.ctx.canvas.height;
        }

    }

    rotate(rad: number) {
        this.rotation += rad;

        if (this.rotation > Math.PI * 2) {
            this.rotation = 0;
        }
        if (this.rotation < 0) {
            this.rotation = Math.PI * 2;
        }
    }

    accelerate(speed: number) {
        this.speed += speed;
    }

    get getSpeed(): number {
        return this.speed;
    }

    get getPosition(): Vector2D {
        return this.position;
    }

    get getSize(): Vector2D {
        return new Vector2D().byCoodinates(this.width, this.height);
    }

    set setPosition(position: Vector2D) {
        this.position = position;
    }

    appendSize(scale: number){
        this.width += scale;
        this.height += scale;
    }

    intersect(position: Vector2D, size: Vector2D): boolean {
        return (!(this.position.x > position.x + size.x ||
            this.position.x + this.width < position.x ||
            this.position.y > position.y + size.y ||
            this.position.y + this.height < position.y));
    }

}