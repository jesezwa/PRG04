import { TiledResource } from '@excaliburjs/plugin-tiled'
import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    AthenaUI: new ImageSource('images/Sprites/Athena_UI_Element.png'),
    PoseidonUI: new ImageSource('images/Sprites/Poseidon_UI_Element.png'),
    AthenaTower: new ImageSource('images/Sprites/Athena_Tower.png'),
    PoseidonTower: new ImageSource('images/Sprites/Poseidon_Tower.png'),
    HarpyEnemy: new ImageSource('images/Sprites/harpij_Enemy.png'),
    AthenaProjectile: new ImageSource('images/projectiles/Athena_Projectile.png'),
    PoseidonProjectile: new ImageSource('images/projectiles/poseidon_projectile.png'),

    TiledMapResource: new TiledResource('images/Backgrounds/tilemap3.tmx'),

}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }