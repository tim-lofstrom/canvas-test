export class Square {
    
    private color = 'red';
    private pos: [number, number] = [1,1];
    private width = 30;
    private height = 30;
    
    constructor(private ctx: CanvasRenderingContext2D) { }
    
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
    }

    append(dirVector: [number, number]) {
        console.log(this.pos);
        const newX = this.pos[0] + (this.pos[0] * dirVector[0]);
        const newY = this.pos[1] + (this.pos[1] * dirVector[1]);
        this.pos = [newX, newY]
    }

    // moveRight() {
    //     if (this.x < this.ctx.canvas.width - 100) {
    //         this.x++;
    //     }
    // }

    // moveLeft() {
    //     if (this.x > 0) {
    //         this.x--;
    //     }
    // }

    // moveDown() {
    //     if (this.y < 50) {
    //         this.y++;
    //     }
    // }

    // moveUp() {
    //     if (this.y > 0) {
    //         this.y--;
    //     }
    // }

}