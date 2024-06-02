import { Actor, Color, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources";
import { HarpyEnemy } from "./createEnemy";



export class Projectile extends Actor {
    constructor(x, y, speed, damage, projectileSprite) {
        super({
            pos: new Vector(x, y),
            width: 5,
            height: 5,
            collisionType: CollisionType.Passive,
        });
        this.projectileSprite = projectileSprite;
        this.graphics.use(projectileSprite)
        this.vel = new Vector(speed, 0); // Beweegt horizontaal naar rechts
        this.damage = damage;
        this.speed = speed

    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.onCollision(event));
    }

    onCollision(event) {
        if (event.other instanceof HarpyEnemy) {
            event.other.takeDamage(this.damage);
            this.kill();
        }
    }
}