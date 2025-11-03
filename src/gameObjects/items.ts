import { drawTile, EngineObject, tile, timeDelta, vec2, Vector2 } from "littlejsengine";

const POWERUP_TIME = 3; // time in seconds before powerup disappears

// TODO make items an interface with the data I need to pass to this Item class
// then I can just have a list of items in a settings file or something 
// when a bug dies, instead of the bug spawning the item, emit an event which 
// I listen for in main. When the event happens, pick randomly from the list of items
// and create a new Item

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
