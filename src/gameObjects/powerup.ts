import { drawTile, EngineObject, tile, vec2, Vector2 } from "littlejsengine";
import Player from "./player";

// TODO add a timer so it self destructs after a few seconds
class Powerup extends EngineObject {
    constructor(pos: Vector2, size: Vector2) {
        super(pos, size);
        this.setCollision(true, false, false, false);
    }

    render() {
        drawTile(this.pos, vec2(2), tile(0, vec2(16, 16), 2));
    }

    collideWithObject(object: EngineObject): boolean {
        if (object instanceof Player) {
            return true
        }

        return false;
    }
}

export default Powerup;
