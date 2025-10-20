import { drawTile, EngineObject, tile, vec2, Vector2 } from "littlejsengine";

const MOVE_SPEED = 0.1;

class Bug extends EngineObject {
    // position the bug is moving to, this gets updated to player position as the game is played
    public targetPosition: Vector2;

    constructor(pos: Vector2, size: Vector2) {
        super(pos, size);
        this.setCollision(true, true, false);
        this.targetPosition = vec2(0, 0);
    }

    update() {
        super.update();

        // this.velocity = vec2(0);

        // calculate direction to move based on target pos
        let deltaX = this.targetPosition.x - this.pos.x;
        let deltaY = this.targetPosition.y - this.pos.y;
        let moveVector = vec2(deltaX, deltaY).normalize(1).scale(MOVE_SPEED);
        this.velocity = moveVector;

        // this.pos = this.pos.add(moveVector);
    }

    render() {
        drawTile(this.pos, this.size, tile(0, vec2(60, 80), 0, 15));
    }

    collideWithObject(object: EngineObject): boolean {
        if (object.constructor.name === 'Bug') {
            // do something here to prevent bugs from completely overlapping
            // let deltaX = object.pos.x - this.pos.x;
            // let deltaY = object.pos.y - this.pos.y;
            // this.pos = 
            return false;
        }
        return true;
    }
}

export default Bug;
