// ==UserScript==
// @name         npr-autoplay
// @namespace    http://tampermonkey.net/
// @version      0.2
// @updateURL    https://raw.githubusercontent.com/barrer/tampermonkey-script/master/npr-autoplay/npr-autoplay.js
// @description  https://github.com/barrer
// @author       barrer
// @match        http://www.npr.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var i = 0;
    function trigger() {
        setTimeout(function() {
            console.log('trigger: ' + (++i));
            var button = document.querySelector('#npr-player button');
            if(!!button) {
                document.querySelector('#npr-player button').click();
            } else {
                trigger();
            }
        }, 1000);
    }
    trigger();
})();