import { drawTile, EngineObject, vec2, Vector2, tile, mousePos, timeDelta, Timer, hsl } from "littlejsengine";
import type Weapon from "./weapon";
import settings from "../settings";

class Player extends EngineObject {
    public moveDirection: Vector2;
    public weapon: Weapon;
    public health: number;
    public speed: number;
    private recoverTimer: Timer;

    constructor(pos: Vector2, size: Vector2, weapon: Weapon) {
        super(pos, size);

        this.weapon = weapon;
        this.moveDirection = vec2(0);
        this.tileInfo = tile(0, vec2(51, 43), 1);
        this.health = 3;
        this.recoverTimer = new Timer(0);
        this.speed = settings.basePlayerSpeed;
        this.setCollision();
    }

    update() {
        super.update();

        // make move speed the same in all directions, otherwise player moves faster when going diagonal
        this.moveDirection = this.moveDirection.clampLength(1).scale(this.speed);
        this.velocity = this.moveDirection;

        this.angle = -Math.atan2(this.pos.y - mousePos.y, this.pos.x - mousePos.x) + Math.PI;

        // update weapon
        this.weapon.timeSinceLastShot += timeDelta;
    }

    fire(target: Vector2) {
        this.weapon.fire(this.pos, target);
    }

    render() {
        if (this.recoverTimer.elapsed()) {
            drawTile(this.pos, this.size, this.tileInfo, undefined, this.angle);
        }
        else {
            drawTile(this.pos, this.size, this.tileInfo, hsl(1, 1, 1, 0.5), this.angle);
        }
    }

    collideWithObject(object: EngineObject): boolean {
        if (object.constructor.name === 'Projectile') {
            return false;
        }

        if (object.constructor.name === 'Bug') {
            if (this.recoverTimer.elapsed()) {
                this.health--;
                this.recoverTimer.set(settings.playerDamageCooldown);
            }
        }
    
        return true;
    }
}

export default Player;
