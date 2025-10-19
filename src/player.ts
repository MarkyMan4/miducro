import { drawTile, EngineObject, vec2, Vector2, tile } from "littlejsengine";

const MOVE_SPEED = 0.25;

class Player extends EngineObject {
    public moveDirection: Vector2;

    constructor(pos: Vector2, size: Vector2) {
        super(pos, size);

        this.moveDirection = vec2(0);
    }

    update() {
        // make move speed the same in all directions, otherwise player moves faster when going diagonal
        this.moveDirection = this.moveDirection.clampLength(MOVE_SPEED);
        console.log(this.moveDirection)
        this.pos = this.pos.add(this.moveDirection);
    }

    render() {
        drawTile(this.pos, this.size, tile(0, 90));
    }
}

export default Player;
