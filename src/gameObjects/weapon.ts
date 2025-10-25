import { timeDelta, type Color, type Vector2 } from "littlejsengine";
import Projectile from "./projectile";

class Weapon {
    public damage: number;
    public range: number;
    public fireRate: number;
    public projectilesPerShot: number;
    public timeSinceLastShot: number;
    public projectileColor: Color;

    constructor(damage: number, range: number, fireRate: number, projectilesPerShot: number, projectileColor: Color) {
        this.damage = damage;
        this.range = range;
        this.fireRate = fireRate;
        this.projectilesPerShot = projectilesPerShot;
        this.projectileColor = projectileColor;
        this.timeSinceLastShot = 100;
    }

    fire(startPos: Vector2, targetPos: Vector2) {
        this.timeSinceLastShot += timeDelta;

        if (this.timeSinceLastShot >= this.fireRate) {
            new Projectile(startPos, this.damage / 100, targetPos, this.damage, this.range, this.projectileColor);
            this.timeSinceLastShot = 0;
        }
    }
}

export default Weapon;
