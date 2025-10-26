import type Weapon from "./gameObjects/weapon";

export interface Upgrade {
    displayName: string;
    upgradeFunc: (weapon: Weapon) => void;
}

// TODO have rare end legendary upgrades
// when determing upgrades to show in the menu, pick from this list like normal, then have a 10% chance to 
// swap one out with a rare upgrade and 5% chance to swap one out with a legendary
export const upgradeOptions: Upgrade[] = [
    {
        displayName: 'damage up',
        upgradeFunc: (weapon: Weapon) => weapon.damage += 10,
    },
    {
        displayName: 'fire rate up',
        upgradeFunc: (weapon: Weapon) => weapon.fireRate -= 0.05,
    },
    {
        displayName: 'range up',
        upgradeFunc: (weapon: Weapon) => weapon.range += 10,
    },
    {
        displayName: 'shot speed up',
        upgradeFunc: (weapon: Weapon) => weapon.projectileSpeed += 0.1,
    },
    {
        displayName: 'more bullets',
        upgradeFunc: (weapon: Weapon) => weapon.projectilesPerShot++,
    },
];
