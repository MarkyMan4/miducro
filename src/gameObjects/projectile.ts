import { Color, drawCircle, EngineObject, vec2, Vector2 } from "littlejsengine";

class Projectile extends EngineObject {
    private startPos: Vector2;
    public damage: number;
    public range: number;

    constructor(pos: Vector2, radius: number, targetPos: Vector2, damage: number, range: number, color: Color) {
        super(pos, vec2(radius));

        this.startPos = pos;
        this.damage = damage;
        this.range = range;
        this.color = color;
        this.velocity = targetPos.subtract(pos).normalize(0.5);
        this.setCollision();
    }

    update() {
        super.update()

        let distanceTraveled = Math.sqrt(
            Math.pow(this.pos.x - this.startPos.x, 2) + Math.pow(this.pos.y - this.startPos.y, 2)
        );

        if (distanceTraveled > this.range) {
            this.destroy();
        }
    }

    render() {
        drawCircle(this.pos, this.size.x, this.color);
    }
}

export default Projectile;
