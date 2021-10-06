export class Vector2D {

    x: number;
    y: number;

    byCoodinates(x: number, y: number): Vector2D {
        this.x = x;
        this.y = y;
        return this;
    }

    byRadian(radian: number): Vector2D {
        this.x = Math.cos(radian);
        this.y = Math.sin(radian);
        return this;
    }

    dotScalar(scalar: number): Vector2D {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    addVector(v: Vector2D): Vector2D {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    dotVector(v: Vector2D): Vector2D {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

}
