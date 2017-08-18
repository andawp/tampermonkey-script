// ==UserScript==
// @name         pdawiki-orderby-dateline
// @namespace    http://tampermonkey.net/
// @version      0.2
// @updateURL    https://raw.githubusercontent.com/barrer/tampermonkey-script/master/pdawiki-orderby-dateline/pdawiki-orderby-dateline.js
// @description  https://github.com/barrer
// @author       barrer
// @match        http://www.pdawiki.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    if(window.location.href.indexOf('orderby=dateline') == -1) {
        var sortBtn = document.querySelector('.pop_moremenu a[href$="&orderby=dateline"]');
        if(sortBtn) {
            sortBtn = sortBtn.click();
        }else {
            var msg = document.createElement('div');
            msg.innerHTML = '<h1 style="font-size:5em">未找到排序按钮！</h1>';
            document.body.prepend(msg);
        }

    }
})();