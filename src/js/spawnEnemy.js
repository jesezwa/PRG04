import { Vector } from "excalibur";
import { HarpyEnemy } from "./createEnemy";

const spawnLocations = [
    new Vector(1270, 50),
    new Vector(1270, 145),
    new Vector(1270, 245),
    new Vector(1270, 340),
    new Vector(1270, 435),
    new Vector(1270, 530),


]
export function spawnEnemy(engine) {
    const harpyEnemy = new HarpyEnemy(position)

    engine.add(harpyEnemy);
}

export class HarpyEnemySpawner {
    constructor(coins, engine, maxEnemies = 10) {
        this.engine = engine;
        this.coins = coins
        this.maxEnemies = maxEnemies;
        this.currentEnemies = 0;

        console.log(this.coins);

    }


    getRandomPosition() {
        const randomIndex = Math.floor(Math.random() * spawnLocations.length);
        return spawnLocations[randomIndex];
    }

    getRandomInterval() {
        return Math.floor(Math.random() * (15000 - 3000 + 1)) + 3000;
    }

    spawnEnemy(engine, game) {
        if (this.currentEnemies < this.maxEnemies) {
            const position = this.getRandomPosition();
            const enemy = new HarpyEnemy(position, this.coins);
            enemy.on('kill', () => {
                this.currentEnemies--;
            });
            this.engine.add(enemy);
            this.currentEnemies++;
        }
        this.scheduleNextSpawn();
    }

    scheduleNextSpawn() {
        const nextInterval = this.getRandomInterval();
        setTimeout(() => this.spawnEnemy(), nextInterval);
    }

    startSpawning() {
        this.scheduleNextSpawn();
    }
}
