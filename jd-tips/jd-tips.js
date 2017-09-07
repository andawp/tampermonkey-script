// ==UserScript==
// @name         jd-tips
// @namespace    http://tampermonkey.net/
// @version      0.1
// @updateURL    https://raw.githubusercontent.com/barrer/tampermonkey-script/master/jd-tips/jd-tips.js
// @downloadURL  https://raw.githubusercontent.com/barrer/tampermonkey-script/master/jd-tips/jd-tips.js
// @description  https://github.com/barrer
// @author       barrer
// @match        https://item.jd.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function addCss() {
        var css = '.jd-tips-red,.jd-tips-red *{color:red!important;font-size:26px!important}' +
            '.jd-tips-green,.jd-tips-green *{color:green!important;font-size:26px!important}',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    }

    function trigger(tips) {
        if(tips.innerText.indexOf('不支持7天无理由退货') != -1) {
            tips.classList.add('jd-tips-red');
        } else {
            tips.classList.add('jd-tips-green');
        }
    }

    function main() {
        var tips = document.querySelector('#summary-tips');
        if(!!tips) {
            // 引入css
            addCss();

            // 监听DOM变化
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    trigger(tips);
                });
            });
            var config = { childList: true, characterData: true, subtree: true };
            observer.observe(tips, config);
        }
    }

    main();
})();