import { drawTile, EngineObject, Sound, tile, timeDelta, vec2, Vector2 } from "littlejsengine";
import type { IGame } from "../game";
import settings from "../settings";
import soundEffects from "../sounds";

export interface IItemInfo {
    name: string,
    description?: string,
    textureIndex: number;
    eventText: string,
    soundEffect?: Sound,
    effect: (game: IGame) => void,
}

export const items: IItemInfo[] = [
    {
        name: 'bomb',
        textureIndex: settings.bombTextureIndex,
        eventText: 'Bug Bomb',
        soundEffect: soundEffects.bombPickup,
        effect: (game: IGame) => {
            soundEffects.bombPickup.play();
            game.bugs.forEach(bug => bug.kill());
        },
    },
    {
        name: 'pitchfork',
        textureIndex: settings.pitchforkTextureIndex,
        eventText: 'Mass Damage',
        effect: (game: IGame) => {
            game.bugs.forEach(bug => bug.hit(settings.baseBugHealth / 2));
        },
    },
    {
        name: 'scythe',
        textureIndex: settings.scytheTextureIndex,
        eventText: 'Reap What You Sow',
        effect: (game: IGame) => {
            game.bugs.forEach(bug => bug.hit(game.totalBugsKilled));
        },
    },
]

export class Item extends EngineObject {
    private timeSinceDrop: number;
    public itemInfo: IItemInfo;

    constructor(pos: Vector2, size: Vector2, itemInfo: IItemInfo) {
        super(pos, size);
        this.itemInfo = itemInfo;
        this.tileInfo = tile(0, vec2(16), this.itemInfo.textureIndex);
        this.setCollision(true, false, false, false);
        this.timeSinceDrop = 0;
    }

    update() {
        super.update();
        
        this.timeSinceDrop += timeDelta;

        if (this.timeSinceDrop >= settings.itemLiveTime) {
            this.destroy();
        }
    }

    render() {
        drawTile(this.pos, vec2(2), this.tileInfo);
    }
}
