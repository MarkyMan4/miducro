import { drawTile, EngineObject, vec2, Vector2, tile, mousePos } from "littlejsengine";

const MOVE_SPEED = 0.25;

class Player extends EngineObject {
    public moveDirection: Vector2;

    constructor(pos: Vector2, size: Vector2) {
        super(pos, size);

        this.moveDirection = vec2(0);
        this.tileInfo = tile(0, vec2(51, 43), 1);
        this.setCollision();
    }

    update() {
        // make move speed the same in all directions, otherwise player moves faster when going diagonal
        this.moveDirection = this.moveDirection.clampLength(1).scale(MOVE_SPEED);
        this.pos = this.pos.add(this.moveDirection);

        this.angle = -Math.atan2(this.pos.y - mousePos.y, this.pos.x - mousePos.x) + Math.PI;
    }

    render() {
        drawTile(this.pos, this.size, this.tileInfo, undefined, this.angle);
    }

    collideWithObject(object: EngineObject): boolean {
        return true;
    }
}

export default Player;
