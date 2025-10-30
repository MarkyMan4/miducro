import { drawTile, EngineObject, hsl, ParticleEmitter, rand, randInt, randSign, tile, vec2, Vector2 } from "littlejsengine";
import Projectile from "./projectile";
import soundEffects from "../sounds";
import { Powerup, BombPowerup, ShovelPowerup } from "./powerups";
import Wall from "./wall";

class Bug extends EngineObject {
    // position the bug is moving to, this gets updated to player position as the game is played
    public targetPosition: Vector2;
    public health: number;
    public speed: number;
    private powerupOptions = [BombPowerup, ShovelPowerup];

    constructor(pos: Vector2, size: Vector2, speed: number) {
        super(pos, size);
        this.setCollision();
        this.speed = speed;
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
        let moveVector = vec2(deltaX, deltaY).normalize(1).scale(this.speed);
        this.velocity = moveVector;

        // point in the direction of movement
        this.angle = -Math.atan2(this.pos.y - this.targetPosition.y, this.pos.x - this.targetPosition.x) + (Math.PI / 2);
    }

    render() {
        drawTile(this.pos, vec2(2, 2.5), tile(0, vec2(60, 80), 0, 15), undefined, this.angle);
    }

    hitEffect() {
        new ParticleEmitter(
            this.pos,
            undefined,
            1, 0.1, 100, Math.PI,
            undefined,
            hsl(0, 1, 0.6), 
            hsl(0, 1, 0.6), 
            hsl(0, 1, 0.6), 
            hsl(0, 1, 0.6), 
            undefined,
            0.25,
            0,
        );
    }

    hit(damage: number) {
        soundEffects.bugHit.play();
        this.health -= damage;

        this.hitEffect();

        if (this.health <= 0) {
            soundEffects.bugKilled.play();

            // randomly drop powerups
            if(rand(0, 1) < 0.1) {
                const powerup = this.powerupOptions[randInt(this.powerupOptions.length)];
                new powerup(this.pos, vec2(1));
            }
        
            this.kill();
        }
    }

    kill() {
        this.hitEffect();
        this.destroy();
    }

    collideWithObject(object: EngineObject): boolean {
        // don't collide with walls since bugs spawn offscreen
        if (object instanceof Wall || object instanceof Powerup) {
            return false;
        }

        if (object instanceof Projectile) {
            this.hit(object.damage);
            object.destroy();
        }

        return true;
    }
}

export default Bug;
