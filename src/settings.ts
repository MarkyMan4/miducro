import { hsl } from "littlejsengine"

// TODO reorganize this into a hierarchy with nesting so I can group things
const settings = {
    baseEnemiesToSpawn: 5,
    baseDamage: 25,
    baseRange: 15,
    baseFireRate: 0.5,
    baseProjectilesPerShot: 1,
    baseProjectileSpeed: 0.5,
    baseBugSpeed: 0.1,
    baseBugKillItemChance: 0.05,
    baseBugHealth: 100,
    baseBugSpawnRate: 0.25,
    baseBugTileIndex: 0,
    megaBugTileIndex: 6,
    basePlayerSpeed: 0.25,
    playerDamageCooldown: 2,
    projectileColor: hsl(0.175, 0.64, 0.6),
    itemLiveTime: 3,
    bombTextureIndex: 2,
    pitchforkTextureIndex: 3,
    scytheTextureIndex: 4,
}

export default settings;
