import Bug from "./gameObjects/bug";
import Player from "./gameObjects/player";

export interface IGame {
    player: Player;
    bugs: Bug[];
    gameStarted: boolean;
    wave: number;
    bugsSpawnedThisWave: number;
    waveInProgress: boolean;
    timeSinceBugSpawn: number;
    spawnRate: number;
    totalBugsKilled: number;
}
