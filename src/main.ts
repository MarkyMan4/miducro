'use strict';

import * as LJS from 'littlejsengine';
import { vec2, hsl } from 'littlejsengine';
import Player from './player';

const backgroundColor = hsl(1.27, 0.51, 0.17);
let player: Player;

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // called once after the engine starts up
    // setup the game
    LJS.setCanvasFixedSize(vec2(1920, 1080));
    LJS.setCanvasClearColor(backgroundColor);

    // levelSize = vec2(20, 20);
    // LJS.setCameraPos(levelSize.scale(0.5))
    player = new Player(LJS.cameraPos, vec2(2));
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state
    // if(LJS.keyWasPressed("Space")) {
    //     console.log("space pressed")
    // }

    // set player move direction - wasd
    player.moveDirection = LJS.keyDirection();
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
    // LJS.drawTextScreen('Hello World!', LJS.mainCanvasSize.scale(.5), 80);
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
LJS.engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['Ants.png']);
