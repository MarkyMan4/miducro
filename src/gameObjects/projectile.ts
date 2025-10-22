import { drawCircle, EngineObject, hsl, vec2, Vector2 } from "littlejsengine";

class Projectile extends EngineObject {
    constructor(pos: Vector2, targetPos: Vector2) {
        super(pos, vec2(1));
    
        // calculate the velocity
        this.velocity = targetPos.subtract(pos).normalize(1);
    }

    render() {
        drawCircle(this.pos, 1, hsl(335, 1, 0.6));
    }
}

export default Projectile;
