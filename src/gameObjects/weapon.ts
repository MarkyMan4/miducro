import { rand, randSign, timeDelta, vec2, type Color, type Vector2 } from "littlejsengine";
import Projectile from "./projectile";
import soundEffects from "../sounds";

class Weapon {
    public damage: number;
    public range: number;
    public fireRate: number;
    public projectilesPerShot: number;
    public timeSinceLastShot: number;
    public projectileSpeed: number;
    public projectileColor: Color;

    constructor(
        damage: number,
        range: number,
        fireRate: number,
        projectilesPerShot: number,
        projectileSpeed: number,
        projectileColor: Color
    ) {
        this.damage = damage;
        this.range = range;
        this.fireRate = fireRate;
        this.projectilesPerShot = projectilesPerShot;
        this.projectileSpeed = projectileSpeed;
        this.projectileColor = projectileColor;
        this.timeSinceLastShot = 100;
    }

    fire(startPos: Vector2, targetPos: Vector2) {
        this.timeSinceLastShot += timeDelta;

        // normalize the rise and run from start to target then add that to start pos 
        // to get the target to be used. This way when adding randomness to bullet direction, 
        // it's not affected by the distance from the player to the mouse
        let target = startPos.add(targetPos.subtract(startPos).normalize(2));

        if (this.timeSinceLastShot >= this.fireRate) {
            soundEffects.shoot.play();
            for (let i = 0; i < this.projectilesPerShot; i++) {
                // for each additional projectile, add some randomization so the bullets aren't all stacked up
                if (i > 0) {
                    let randX = rand(0.1 * randSign(), 0.2 * randSign());
                    let randY = rand(0.1 * randSign(), 0.2 * randSign());
                    target = target.copy().add(vec2(randX, randY));
                }
                new Projectile(
                    startPos,
                    this.damage / 100,
                    target,
                    this.damage,
                    this.range,
                    this.projectileSpeed,
                    this.projectileColor
                );
            }
            this.timeSinceLastShot = 0;
        }
    }
}

export default Weapon;
