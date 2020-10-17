/*
This file is an example, using the MakeHaus API for Node.js, released under MIT license.
(c) 2020 René Bohne
This example updates the RGB-LEDs of the buttons with random colors.
*/

const { hub, Tile, LedButtonEvents }  = require('@makeproaudio/makehaus-js');
const { randomColor } = require('randomcolor');

hub.init('192.168.178.175', '8192');

var tile8;
var tile12;
var fader4;

hub.on(Tile.LEDBUTTON8, tile => {
    console.log('New 8 LedButton tile found.');
    tile8=tile;
});

hub.on(Tile.LEDBUTTON12, tile => {
    console.log('New 12 LedButton tile found.');
    tile12=tile;
});

hub.on(Tile.MOTORFADER4, tile => {
    console.log('New 4 Motorfader tile found.');
    fader4=tile;
});



function myFunc() {  
    [...Array(8).keys()].forEach(windex => tile8.widgets[windex].setColor(randomColor()));
    [...Array(12).keys()].forEach(windex => tile12.widgets[windex].setColor(randomColor()));
    [...Array(4).keys()].forEach(windex => fader4.widgets[windex].setValue(Math.floor(Math.random() * Math.floor(65536))));

    

  }

setInterval(myFunc, 1500);