'use strict';

import * as LJS from 'littlejsengine';
import { vec2, hsl } from 'littlejsengine';
import Player from './gameObjects/player';
import Bug from './gameObjects/bug';
import Weapon from './gameObjects/weapon';
import { type Upgrade, upgradeOptions } from './upgrades';
import soundEffects from './sounds';
import settings from './settings';
import Wall from './gameObjects/wall';

const backgroundColor = hsl(1.27, 0.51, 0.17);

let player: Player;
let bugs: Bug[] = [];
let gameBus = new EventTarget();

let gameStarted = false;
let wave = 0;
let bugsSpawnedThisWave = 0;
let waveInProgress = false; // I know a wave is over if enemiesSpawnedThis wave === enemiesToSpawn() and the length of the bugs array is 0
let timeSinceBugSpawn = 0;
let spawnRate = 0.25;
let totalBugsKilled = 0;

// UI
let upgradeMenu: LJS.UIObject;
let upgrade1: LJS.UIButton;
let upgrade2: LJS.UIButton;
let upgrade3: LJS.UIButton;
let eventText = '';
let eventTextDisplayedTime = 0;

// calculate the number of enemies that should be spawned this wave 
function bugsToSpawn(): number {
    return wave * settings.baseEnemiesToSpawn;
}

// spawn count bugs at random spots on the edge of the screen
function spawnBugs(count: number) {
    for (let i = 0; i < count; i++) {
        let x;
        let y;

        if (LJS.randInt(2) === 0) {
            // spawn on top or bottom of screen
            x = LJS.randInt(LJS.canvasFixedSize.x / LJS.cameraScale / 2) * (LJS.randInt(2) === 0 ? -1 : 1);
            y = LJS.canvasFixedSize.y / LJS.cameraScale / 2 * (LJS.randInt(2) === 0 ? -1 : 1);
        }
        else {
            // spawn on left or right of screen
            x = LJS.canvasFixedSize.x / LJS.cameraScale / 2 * (LJS.randInt(2) === 0 ? -1 : 1);
            y = LJS.randInt(LJS.canvasFixedSize.y / LJS.cameraScale / 2) * (LJS.randInt(2) === 0 ? -1 : 1);
        }

        let isMegaBug = false;
        let size = vec2(0.75, 1);
        let health = settings.baseBugHealth;
        let killItemChance = settings.baseBugKillItemChance;
        let hitItemChance = settings.baseBugHitItemChance;
        let tileIndex = settings.baseBugTileIndex;

        if (wave > 5) {
            // TODO parameterize chance to spawn megabug so it gets greater as wave increases
            isMegaBug = LJS.rand(0, 1) < 0.1;

            if (isMegaBug) {
                size = vec2(3, 4);
                health = settings.baseBugHealth * wave;
                hitItemChance = 0.05;
                tileIndex = settings.megaBugTileIndex;
            }
        }

        bugs.push(
            new Bug(
                vec2(x, y),
                size,
                settings.baseBugSpeed,
                gameBus,
                health,
                tileIndex,
                killItemChance,
                hitItemChance,
            )
        );
    }
}

function startNextWave() {
    upgradeMenu.visible = false;
    waveInProgress = true;
    bugsSpawnedThisWave = 0;
    wave++;

    // pick three random options for the upgrade menu to show at the end of this wave
    const options: Upgrade[] = [];
    while (options.length < 3) {
        const randOption = upgradeOptions[Math.floor(Math.random() * upgradeOptions.length)];
        if (!options.includes(randOption)) {
            options.push(randOption);
        }
    }

    const onUpgradeSelect = (weapon: Weapon, upgradeFunc: (weapon: Weapon) => void) => {
        soundEffects.upgrade.play();
        upgradeFunc(weapon);
        startNextWave();
    }

    upgrade1.text = options[0].displayName;
    upgrade2.text = options[1].displayName;
    upgrade3.text = options[2].displayName;
    upgrade1.onClick = () => onUpgradeSelect(player.weapon, options[0].upgradeFunc);
    upgrade2.onClick = () => onUpgradeSelect(player.weapon, options[1].upgradeFunc);
    upgrade3.onClick = () => onUpgradeSelect(player.weapon, options[2].upgradeFunc);
}

function initializePlayer() {
    player = new Player(
        LJS.cameraPos,
        vec2(2, 1.5),
        new Weapon(
            settings.baseDamage,
            settings.baseRange,
            settings.baseFireRate,
            settings.baseProjectilesPerShot,
            settings.baseProjectileSpeed,
            settings.projectileColor,
        ),
        gameBus
    );
}

function restartGame() {
    bugs.forEach(b => b.destroy());
    bugs = [];
    initializePlayer();
    wave = 0;
    bugsSpawnedThisWave = 0;
    waveInProgress = false;
    timeSinceBugSpawn = 0;
    totalBugsKilled = 0;
    startNextWave();
}

gameBus.addEventListener('bugkill', () => {
    totalBugsKilled++;
});

gameBus.addEventListener('bomb', () => {
    eventText = 'Bug Bomb';
    eventTextDisplayedTime = 0;
    soundEffects.bombPickup.play();
    bugs.forEach(bug => bug.kill());
});

gameBus.addEventListener('pitchfork', () => {
    eventText = 'Mass Damage';
    eventTextDisplayedTime = 0;
    bugs.forEach(bug => bug.hit(settings.baseBugHealth / 2));
});

gameBus.addEventListener('scythe', () => {
    eventText = 'Reap What You Sow';
    eventTextDisplayedTime = 0;
    bugs.forEach(bug => bug.hit(totalBugsKilled));
});

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // called once after the engine starts up
    // setup the game
    LJS.setCanvasFixedSize(vec2(1920, 1080));
    LJS.setCanvasClearColor(backgroundColor);

    // draw wall on all four sides just off the screen - in order: top, bottom, left, right
    new Wall(vec2(0, (LJS.canvasFixedSize.y / LJS.cameraScale / 2) + 1), vec2(LJS.canvasFixedSize.x / LJS.cameraScale, 2));
    new Wall(vec2(0, -(LJS.canvasFixedSize.y / LJS.cameraScale / 2) - 1), vec2(LJS.canvasFixedSize.x / LJS.cameraScale, 2));
    new Wall(vec2(-(LJS.canvasFixedSize.x / LJS.cameraScale / 2) - 1, 0), vec2(2, LJS.canvasFixedSize.y / LJS.cameraScale));
    new Wall(vec2((LJS.canvasFixedSize.x / LJS.cameraScale / 2) + 1, 0), vec2(2, LJS.canvasFixedSize.y / LJS.cameraScale));

    initializePlayer();

    // create the upgrade menu and hide it, will show again at the end of the round
    new LJS.UISystemPlugin();
    LJS.uiSystem.defaultCornerRadius = 5;

    upgradeMenu = new LJS.UIObject(LJS.mainCanvasSize.scale(0.5), vec2(600, 450));
    upgradeMenu.addChild(new LJS.UIText(vec2(0, -120), vec2(500, 75), 'Choose an upgrade', undefined, 'GameFont'));

    upgrade1 = new LJS.UIButton(vec2(0, -10), vec2(300, 50));
    upgrade1.textHeight = 40;
    upgrade1.font = 'GameFont';
    upgradeMenu.addChild(upgrade1);

    upgrade2 = new LJS.UIButton(vec2(0, 50), vec2(300, 50));
    upgrade2.textHeight = 40;
    upgrade2.font = 'GameFont';
    upgradeMenu.addChild(upgrade2);

    upgrade3 = new LJS.UIButton(vec2(0, 110), vec2(300, 50));
    upgrade3.textHeight = 40;
    upgrade3.font = 'GameFont';
    upgradeMenu.addChild(upgrade3);

    upgradeMenu.visible = false;
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state
    if (!gameStarted) {
        if(LJS.keyWasPressed('Space')) {
            gameStarted = true;
            startNextWave();
        }

        return;
    }

    if (eventText !== '') {
        eventTextDisplayedTime += LJS.timeDelta;
    }

    if (player.health <= 0) {
        player.destroy();

        if(LJS.keyWasPressed('Space')) {
            restartGame();
        }

        return;
    }

    if (gameStarted && waveInProgress) {
        // spawn bugs
        timeSinceBugSpawn += LJS.timeDelta;

        if (timeSinceBugSpawn >= spawnRate && bugsSpawnedThisWave < bugsToSpawn()) {
            let bugsToSpawn = 2;
            spawnBugs(bugsToSpawn);
            bugsSpawnedThisWave += bugsToSpawn;
            timeSinceBugSpawn = 0;
        }

        // handle shooting
        if (LJS.mouseIsDown(0)) {
            player.fire(LJS.mousePos);
        }

        // set player move direction - wasd
        player.moveDirection = LJS.keyDirection();

        // remove bugs that have been destroyed
        for (let i = bugs.length - 1; i >= 0; i--) {
            if(bugs[i].destroyed) {
                bugs.splice(i, 1);
            }
        }

        // bugs move toward player
        bugs.forEach(bug => bug.targetPosition = player.pos);
    }
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{
    // called after physics and objects are updated
    // setup camera and prepare for render
}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
    // called before objects are rendered
    // draw any background effects that appear behind objects
    // LJS.drawTile(LJS.cameraPos, vec2(3), tile(0, 90))
    // LJS.drawTile(vec2(LJS.cameraPos.x + 2, LJS.cameraPos.y), vec2(3), tile(3, 90))
}

function displayText(text: string, pos: LJS.Vector2, size: number, textAlign: CanvasTextAlign = 'center') {
    LJS.drawTextScreen(text, pos, size, undefined, undefined, undefined, textAlign, 'GameFont');
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // called after objects are rendered
    // draw effects or hud that appear above all objects
    const screenCenter = LJS.mainCanvasSize.scale(0.5);

    if (!gameStarted) {
        LJS.drawRect(vec2(0, -3), vec2(30, 10), hsl(0, 0, 0));

        displayText('Press space to start', screenCenter, 70);
        displayText('WASD to move', vec2(screenCenter.x, screenCenter.y + 100), 50);
        displayText('Point and click to shoot', vec2(screenCenter.x, screenCenter.y + 160), 50);

        return;
    }

    if (player.health <= 0) {
        displayText('Game Over', screenCenter, 70);
        displayText(`You survived until wave ${wave}`, vec2(screenCenter.x, screenCenter.y + 100), 50);
        displayText('Press space to restart', vec2(screenCenter.x, screenCenter.y + 150), 50);
    }

    if (eventText !== '') {
        if (eventTextDisplayedTime <= 2) {
            displayText(eventText, vec2(screenCenter.x, screenCenter.y / 3), 60);
        }
        else {
            eventTextDisplayedTime = 0;
            eventText = '';
        }
    }


    // show the wave number and player health
    displayText(`Wave: ${wave}`, vec2(20, 40), 50, 'left');
    displayText(`Health: ${player.health}`, vec2(20, 90), 50, 'left');
    displayText(`Bugs Killed: ${totalBugsKilled}`, vec2(20, 140), 50, 'left');

    // check if wave is over and display upgrade menu
    if (wave > 0 && bugs.length === 0 && bugsSpawnedThisWave >= bugsToSpawn()) {
        waveInProgress = false;
        upgradeMenu.pos = screenCenter;
        upgradeMenu.visible = true;
    }
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
LJS.engineInit(
    gameInit,
    gameUpdate,
    gameUpdatePost,
    gameRender,
    gameRenderPost,
    [
        'Ants.png',
        'survivor1_machine.png',
        'items/bomb.png',
        'items/pitchfork.png',
        'items/scythe.png'
    ],
);
