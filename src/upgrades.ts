import type Weapon from "./gameObjects/weapon";

export interface Upgrade {
    displayName: string;
    upgradeFunc: (weapon: Weapon) => void;
}

export const upgradeOptions: Upgrade[] = [
    {
        displayName: 'damage up',
        upgradeFunc: (weapon: Weapon) => weapon.damage += 10,
    },
    {
        displayName: 'fire rate up',
        upgradeFunc: (weapon: Weapon) => weapon.fireRate -= 0.1,
    },
    {
        displayName: 'range up',
        upgradeFunc: (weapon: Weapon) => weapon.range += 10,
    },
];
