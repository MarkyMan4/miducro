import { EngineObject, Vector2 } from "littlejsengine";

class Wall extends EngineObject {
    constructor(pos: Vector2, size: Vector2) {
        super(pos, size);
        this.setCollision();
        this.mass = 0;
    }
}

export default Wall;
