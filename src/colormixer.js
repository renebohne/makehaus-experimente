/*
This file is an example, using the MakeHaus API for Node.js, released under MIT license.
(c) 2020 René Bohne
This example updates the RGB-LEDs of the buttons with RGB colors mixed with three faders.
*/

const { hub, Tile, LedButtonEvents, MotorFaderEvents  } = require('@makeproaudio/makehaus-js');
const { randomColor } = require('randomcolor');

hub.init('192.168.178.175', '8192');

var tile8;
var tile12;
var fader4;

var r=0;
var g=0;
var b=0;

function updateLEDs(faderID, val) { 
    if(faderID==1)
    {
        r=Math.round((val/65536)*255);
    }
    else if(faderID==2)
    {
        g=Math.round((val/65536)*255);
    }
    else if(faderID==3)
    {
        b=Math.round((val/65536)*255);
    }
}

function tohexstring(decnumber)
{
    var s = decnumber.toString(16);
    if(s.length<2)
    {
        s= "0"+s;
    }
    return s;
}

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
    
    tile.widgets.forEach(w => {
        w.on(MotorFaderEvents.TOUCHED, motorfader => {
            //console.log(`${motorfader.widgetId} touched`);
        });

        w.on(MotorFaderEvents.UNTOUCHED, motorfader => {
            //console.log(`${motorfader.widgetId} untouched`);
            var hexcolor = "#"+tohexstring(r)+tohexstring(g)+tohexstring(b);
            //console.log(hexcolor);
            [...Array(12).keys()].forEach(windex => tile12.widgets[windex].setColor(hexcolor));
        });

        w.on(MotorFaderEvents.UPDATED, (motorfader, val) => {
            //console.log(`${motorfader.widgetId} updated to ${val}`);
            updateLEDs(motorfader.widgetId, val);
        });
    }); 

    fader4=tile;
});
