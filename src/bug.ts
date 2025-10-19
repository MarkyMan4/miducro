import { EngineObject, Vector2 } from "littlejsengine";

class Bug extends EngineObject {
    constructor(pos: Vector2, size: Vector2) {
        super(pos, size);
    }
}

export default Bug;
