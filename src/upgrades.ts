type Upgrade = {
    displayName: string;
    damageIncrease?: number;
    fireRateIncrease?: number;
}
export const upgradeOptions: Upgrade[] = [
    {
        displayName: 'damage up',
        damageIncrease: 15
    },
    {
        displayName: 'fire rate up',
        fireRateIncrease: 0.25
    }
];
