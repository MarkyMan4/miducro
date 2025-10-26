import { Sound } from "littlejsengine";

const soundEffects = {
    shoot: new Sound([,,90,,.01,.03,4,,,,,,,9,50,.2,,.2,.02]),
    explosion: new Sound([,,90,,.01,.03,4,,,,,,,9,50,.2,,.2,2]),
    bugHit: new Sound([]),
    bugKilled: new Sound([]),
}

export default soundEffects;
