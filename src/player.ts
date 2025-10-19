import { EngineObject, Vector2 } from "littlejsengine";

class Player extends EngineObject {
    constructor(pos: Vector2, size: Vector2) {
        super(pos, size);
    }
}

export default Player;
