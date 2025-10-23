'use strict';

import * as LJS from 'littlejsengine';
import { vec2, hsl } from 'littlejsengine';
import Player from './gameObjects/player';
import Bug from './gameObjects/bug';
import Projectile from './gameObjects/projectile';

const backgroundColor = hsl(1.27, 0.51, 0.17);

let player: Player;
let bugs: Bug[] = [];

let timeSinceLastShot = 0;
let fireRate = 0.25;

let gameStarted = false;
let wave = 1;
let baseEnemiesToSpawn = 10; // multiply by wave number to get enemies per wave
let enemiesKilled = 0; // resets each wave, know it's a new wave when this reaches zero

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // called once after the engine starts up
    // setup the game
    LJS.setCanvasFixedSize(vec2(1920, 1080));
    LJS.setCanvasClearColor(backgroundColor);

    // levelSize = vec2(20, 20);
    // LJS.setCameraPos(levelSize.scale(0.5))
    player = new Player(LJS.cameraPos, vec2(2, 1.5));

    for(let i = 0; i < 20; i++) {
        let bug = new Bug(vec2(i, LJS.mainCanvasSize.y / LJS.cameraScale / 2), vec2(0.75, 1));
        bugs.push(bug)
    }
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state
    // if(LJS.keyWasPressed("Space")) {
    //     console.log("space pressed")
    // }
    if (!gameStarted) {
        if(LJS.keyWasPressed("Space")) {
            gameStarted = true;
        }

        return;
    }

    timeSinceLastShot += LJS.timeDelta;

    if (LJS.mouseIsDown(0) && timeSinceLastShot >= fireRate) {
        // spawn projectiles
        new Projectile(player.pos, vec2(0.5), LJS.mousePos, 33);
        timeSinceLastShot = 0;
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
    // player.ren
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // called after objects are rendered
    // draw effects or hud that appear above all objects
    if (!gameStarted) {
        LJS.drawRect(vec2(0, -3), vec2(30, 10), hsl(0, 0, 0));

        const screenCenter = LJS.mainCanvasSize.scale(0.5);
        LJS.drawTextScreen('Press space to start', screenCenter, 80);
        LJS.drawTextScreen('WASD to move', vec2(screenCenter.x, screenCenter.y + 100), 40);
        LJS.drawTextScreen('Point and click to shoot', vec2(screenCenter.x, screenCenter.y + 150), 40);
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
    ['Ants.png', 'survivor1_machine.png'],
);
