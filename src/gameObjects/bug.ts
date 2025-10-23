import { drawTile, EngineObject, randInt, randSign, tile, vec2, Vector2 } from "littlejsengine";
import type Projectile from "./projectile";

const MOVE_SPEED = 0.1;

class Bug extends EngineObject {
    // position the bug is moving to, this gets updated to player position as the game is played
    public targetPosition: Vector2;
    public health: number;

    constructor(pos: Vector2, size: Vector2) {
        super(pos, size);
        this.setCollision(true, true, false);
        this.targetPosition = vec2(0, 0);
        this.health = 100;
    }

    update() {
        super.update();

        // add some randomness to movement so the bugs don't all clump up
        const distance = Math.sqrt(Math.pow(this.targetPosition.x - this.pos.x, 2) + Math.pow(this.targetPosition.y - this.pos.y, 2));
        let randomness = Math.min(distance, 25);

        // calculate direction to move based on target pos
        let deltaX = (this.targetPosition.x + (randInt(randomness) * randSign())) - this.pos.x;
        let deltaY = (this.targetPosition.y + (randInt(randomness) * randSign())) - this.pos.y;
        // let deltaX = this.targetPosition.x - this.pos.x;
        // let deltaY = this.targetPosition.y - this.pos.y;
        let moveVector = vec2(deltaX, deltaY).normalize(1).scale(MOVE_SPEED);
        this.velocity = moveVector;

        // point in the direction of movement
        this.angle = -Math.atan2(this.pos.y - this.targetPosition.y, this.pos.x - this.targetPosition.x) + (Math.PI / 2);
    }

    render() {
        drawTile(this.pos, vec2(2, 2.5), tile(0, vec2(60, 80), 0, 15), undefined, this.angle);
    }

    collideWithObject(object: EngineObject): boolean {
        if (object.constructor.name === 'Projectile') {
            let proj = object as Projectile;
            this.health -= proj.damage;
            proj.destroy();

            if (this.health <= 0) {
                this.destroy();
            }
            
        }
        return true;
    }
}

export default Bug;
