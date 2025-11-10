import { hsl } from "littlejsengine"

// TODO reorganize this into a hierarchy with nesting so I can group things
const settings = {
    baseEnemiesToSpawn: 5,
    baseDamage: 25,
    baseRange: 15,
    baseFireRate: 0.5,
    minFireRate: 0.1,
    baseProjectilesPerShot: 1,
    baseProjectileSpeed: 0.5,
    baseBugSpeed: 0.1,
    megaBugSpeed: 0.08,
    fastBugSpeed: 0.3,
    baseBugKillItemChance: 0.03,
    baseBugHealth: 100,
    baseBugSpawnRate: 0.25,
    minBugSpawnRate: 0.1,
    baseBugTileIndex: 0,
    megaBugTileIndex: 6,
    fastBugTileIndex: 9,
    basePlayerSpeed: 0.25,
    playerDamageCooldown: 2,
    playerItemCapacity: 1,
    projectileColor: hsl(0.175, 0.64, 0.6),
    itemLiveTime: 5,
    bombTextureIndex: 2,
    pitchforkTextureIndex: 3,
    scytheTextureIndex: 4,
    arrowTextureIndex: 5,
    waterTextureIndex: 6,
}

export default settings;
