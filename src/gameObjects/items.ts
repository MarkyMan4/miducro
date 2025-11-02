import { drawTile, EngineObject, tile, timeDelta, vec2, Vector2 } from "littlejsengine";

const POWERUP_TIME = 3; // time in seconds before powerup disappears

export class Item extends EngineObject {
    private timeSinceDrop: number;

    constructor(pos: Vector2, size: Vector2) {
        super(pos, size);
        this.setCollision(true, false, false, false);
        this.timeSinceDrop = 0;
    }

    update() {
        super.update();
        
        this.timeSinceDrop += timeDelta;

        if (this.timeSinceDrop >= POWERUP_TIME) {
            this.destroy();
        }
    }
}

export class Bomb extends Item {
    render() {
        drawTile(this.pos, vec2(2), tile(0, vec2(16, 16), 2));
    }
}

export class PitchFork extends Item {
    render() {
        drawTile(this.pos, vec2(2), tile(0, vec2(16, 16), 3));
    }
}

export class Scythe extends Item {
    render() {
        drawTile(this.pos, vec2(2), tile(0, vec2(16, 16), 4));
    }
}
