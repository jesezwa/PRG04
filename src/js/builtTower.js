import { Actor, Vector, CollisionType, Timer } from "excalibur";
import { Resources } from "./resources.js";
import { Projectile } from "./projectile.js"


// Klasse voor het bouwen van een toren
export class BuiltTower extends Actor {
    constructor(x, y, width, height, sprite, hp) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed // Collisiontype meegeven
        });
        this.z = 10;
        this.hp = hp; // HP meegeven
        this.graphics.use(sprite);


    }

    onInitialize(engine) {
        engine.addTimer(this.shootingTimer); // Timer toevoegen aan de game wanneer de toren gebouwd is
        this.shootingTimer.start(); // Timer aanzetten
    }


    takeDamage(amount) {
        this.hp -= amount; // Wanneer damage, HP eraf
        console.log(this.hp)
        if (this.hp <= 0) {
            this.kill(); // Verwijder de toren als HP op is
        }
    }


}



// Hier worden hardcoded alle torens ingezet
export class AthenaTower extends BuiltTower {
    constructor(x, y, width, height, sprite) {

        super(x, y, width, height, Resources.AthenaTower.toSprite(), 200);
        this.shootingTimer = new Timer(() => {
            this.shootProjectile();
        }, 1000, true);
    }
    shootProjectile() {
        if (!this.scene) {

            return; // Stop de functie als er geen scène beschikbaar is.
        }
        let projectile = new Projectile(this.pos.x + this.width, this.pos.y + this.height / 5, 500, 10, Resources.AthenaProjectile.toSprite());
        this.scene.add(projectile);
    }

}

export class PoseidonTower extends BuiltTower {
    constructor(x, y, width, height,) {

        super(x, y, width, height, Resources.PoseidonTower.toSprite(), 500);
        this.shootingTimer = new Timer(() => {
            this.shootProjectile();
        }, 2500, true);
    }

    shootProjectile() {
        if (!this.scene) {

            return; // Stop de functie als er geen scène beschikbaar is.
        }
        let projectile = new Projectile(this.pos.x + this.width, this.pos.y + this.height / 5, 200, 150, Resources.PoseidonProjectile.toSprite());
        this.scene.add(projectile);
    }
}








// Functie voor het plaatsen van een toren
export function placeTower(engine, x, y, width, height, typeOfTower) {


    let tower; // Variabel waarin het torentype wordt gemaakt

    if (typeOfTower === 'athenaTower') {
        if (engine.coins >= 100) {
            tower = new AthenaTower(x, y, width, height);
            engine.coins -= 100;

        }
    } else if (typeOfTower === 'poseidonTower') {
        if (engine.coins > 150) {
            tower = new PoseidonTower(x, y, width, height);
            engine.coins -= 150;

        }
    }
    engine.add(tower);
}