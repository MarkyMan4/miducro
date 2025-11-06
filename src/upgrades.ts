import type Player from "./gameObjects/player";

export interface IUpgrade {
    displayName: string;
    upgradeFunc: (player: Player) => void;
}

// TODO have rare end legendary upgrades
// when determing upgrades to show in the menu, pick from this list like normal, then have a 10% chance to 
// swap one out with a rare upgrade and 5% chance to swap one out with a legendary
export const upgradeOptions: IUpgrade[] = [
    {
        displayName: 'damage up',
        upgradeFunc: (player: Player) => player.weapon.damage += 10,
    },
    {
        displayName: 'fire rate up',
        upgradeFunc: (player: Player) => player.weapon.fireRate -= 0.05,
    },
    {
        displayName: 'range up',
        upgradeFunc: (player: Player) => player.weapon.range += 10,
    },
    {
        displayName: 'shot speed up',
        upgradeFunc: (player: Player) => player.weapon.projectileSpeed += 0.1,
    },
    {
        displayName: 'more bullets',
        upgradeFunc: (player: Player) => player.weapon.projectilesPerShot++,
    },
    {
        displayName: 'move speed up',
        upgradeFunc: (player: Player) => player.speed += 0.1,
    },
    {
        displayName: 'item capacity up',
        upgradeFunc: (player: Player) => player.itemCapacity++,
    },
];
