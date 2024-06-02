import '../css/style.css'
import { Engine, Vector } from "excalibur"
import { ResourceLoader } from './resources.js'
import { CreateTileMap, CreateMapGridOverlay } from './createWorld.js'
import { UI } from './ui.js'
import { HarpyEnemySpawner, } from './spawnEnemy.js'


export class Game extends Engine {

    buildMode; // Buildmode variabele voor bijhouden of er gebouwd kan worden
    typeOfTower; // Variabele voor het type toren
    coins; // Variabele voor het bijhouden van de valuta


    constructor() {
        super({
            // Grote van het scherm
            width: 1248,
            height: 704,
            // Maximale FPS
            maxFps: 60,
            //   displayMode: DisplayMode.FitScreen
        })
        this.buildMode = false; // Bouwmodus standaard op false zodat er niet gelijk gebouwd kan worden
        this.typeOfTower = null; // Type of tower leeg zetten
        this.coins = 1000; // Standaard waarde op 200 zetten

        this.start(ResourceLoader).then(() => this.startGame()) // Resources inladen en daarna pas de game starten

    }




    startGame() {

        // Tilemap inladen
        const createTileMap = new CreateTileMap();
        this.add(createTileMap);

        // UI inladen
        const ui = new UI(this);
        this.add(ui);

        // Gridmap + cellen inladen
        const cellPositions = [
            new Vector(208, 530), new Vector(304, 530), new Vector(400, 530), new Vector(496, 530), new Vector(592, 530), new Vector(688, 530),
            new Vector(208, 434), new Vector(304, 434), new Vector(400, 434), new Vector(496, 434), new Vector(592, 434), new Vector(688, 434),
            new Vector(208, 338), new Vector(304, 338), new Vector(400, 338), new Vector(496, 338), new Vector(592, 338), new Vector(688, 338),
            new Vector(208, 242), new Vector(304, 242), new Vector(400, 242), new Vector(496, 242), new Vector(592, 242), new Vector(688, 242),
            new Vector(208, 146), new Vector(304, 146), new Vector(400, 146), new Vector(496, 146), new Vector(592, 146), new Vector(688, 146),
            new Vector(208, 50), new Vector(304, 50), new Vector(400, 50), new Vector(496, 50), new Vector(592, 50), new Vector(688, 50)
        ]

        // Gridoverlay inladen
        const gridOverlay = new CreateMapGridOverlay(this, cellPositions, 96);
        this.add(gridOverlay);

        // Enemy inspawnen
        const harpySpawner = new HarpyEnemySpawner(this.coins, this)
        harpySpawner.startSpawning();

    }
}

new Game()

