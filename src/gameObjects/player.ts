import { drawTile, EngineObject, vec2, Vector2, tile, mousePos, timeDelta, Timer, hsl } from "littlejsengine";
import type Weapon from "./weapon";
import settings from "../settings";
import soundEffects from "../sounds";
import Projectile from "./projectile";
import Bug from "./bug";
import { Item } from "./items";

class Player extends EngineObject {
    public moveDirection: Vector2;
    public weapon: Weapon;
    public health: number;
    public speed: number;
    public heldItems: Item[];
    public itemCapacity: number;
    private recoverTimer: Timer;
    private eventBus: EventTarget;

    constructor(pos: Vector2, size: Vector2, weapon: Weapon, eventBus: EventTarget) {
        super(pos, size);

        this.weapon = weapon;
        this.eventBus = eventBus;
        this.moveDirection = vec2(0);
        this.tileInfo = tile(0, vec2(51, 43), 1);
        this.health = 3;
        this.recoverTimer = new Timer(0);
        this.speed = settings.basePlayerSpeed;
        this.itemCapacity = settings.playerItemCapacity;
        this.heldItems = [];
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
            drawTile(this.pos, vec2(2, 1.5), this.tileInfo, undefined, this.angle);
        }
        else {
            drawTile(this.pos, vec2(2, 1.5), this.tileInfo, hsl(1, 1, 1, 0.5), this.angle);
        }
    }

    useItem() {
        if (this.heldItems.length === 0) {
            return;
        }

        const item = this.heldItems[0];
        const event = new CustomEvent('itempickup', {detail: item.itemInfo});
        this.eventBus.dispatchEvent(event);
        this.heldItems.splice(0, 1); // remove the item once it has been used
    }

    collideWithObject(object: EngineObject): boolean {
        if (object instanceof Projectile) {
            return false;
        }

        if (object instanceof Bug) {
            if (this.recoverTimer.elapsed()) {
                soundEffects.playerHit.play();
                this.health--;
                this.recoverTimer.set(settings.playerDamageCooldown);
            }
        }

        if (object instanceof Item) {
            // pickup item if we have room
            if (this.heldItems.length >= this.itemCapacity) {
                return false;
            }

            const item = object as Item;
            this.heldItems.push(item);
            object.destroy();
        }
    
        return true;
    }
}

export default Player;
