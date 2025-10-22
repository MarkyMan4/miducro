import { drawCircle, EngineObject, hsl, vec2, Vector2 } from "littlejsengine";

class Projectile extends EngineObject {
    private startPos: Vector2;

    constructor(pos: Vector2, targetPos: Vector2) {
        super(pos, vec2(0.5));

        this.startPos = pos;
        this.velocity = targetPos.subtract(pos).normalize(0.5);
        this.setCollision()
    }

    update() {
        super.update()

        let distanceTraveled = Math.sqrt(
            Math.pow(this.pos.x - this.startPos.x, 2) + Math.pow(this.pos.y - this.startPos.y, 2)
        );

        if (distanceTraveled > 40) {
            this.destroy();
        }
    }

    render() {
        drawCircle(this.pos, this.size.x, hsl(0.175, 0.64, 0.6));
    }
}

export default Projectile;
