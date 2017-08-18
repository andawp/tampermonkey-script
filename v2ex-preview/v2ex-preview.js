// ==UserScript==
// @name         v2ex-preview
// @namespace    http://tampermonkey.net/
// @version      0.2
// @updateURL    https://raw.githubusercontent.com/barrer/tampermonkey-script/master/v2ex-preview/v2ex-preview.js
// @downloadURL  https://raw.githubusercontent.com/barrer/tampermonkey-script/master/v2ex-preview/v2ex-preview.js
// @description  https://github.com/barrer
// @author       barrer
// @match        https://www.v2ex.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function gAjaxGet(url, fnSuccess, fnError, element) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    fnSuccess(xmlhttp.responseText, element);
                } else {
                    fnError(xmlhttp.responseText, element);
                }
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    function appendHtml(response, element) {
        // console.log(response, element);
        // 获取返回内容正文
        var result = '';
        var parser = new DOMParser();
        var resultDoc = parser.parseFromString(response, 'text/html');
        // 把正文插入标题后面
        var content = document.createElement('div');
        content.style.fontSize = '13px';
        content.style.marginTop = '1em';
        content.innerHTML = '<div>' + resultDoc.querySelector('#Main').innerHTML + '</div>';
        element.parentElement.append(content);
    }

    function triggerIterm(element) {
        var item = element.parentElement.querySelector('.item_title');
        var a = item.querySelector('a');
        gAjaxGet(a.getAttribute('href'), function(response, element) {
            // 隐藏预览按钮
            element.parentElement.querySelector('.v2ex-preview-btn').style.display = 'none';
            // 获取内容成功
            appendHtml(response, element);
        }, function(response, element) {
            // 获取内容出错（添加自定义错误提示）
            appendHtml('<div id="Main"><div class="box"><div class="cell"><div class="topic_content">暂未能获取内容！（' +
                       response +
                       '）</div></div></div></div>', element);
        }, item);
    }

    var list = document.querySelectorAll('.item_title');
    list.forEach(function(item, index) {
        var div = document.createElement('div');
        div.style.fontSize = '13px';
        div.style.marginTop = '1em';
        var button = document.createElement('button');
        button.innerHTML = '预览';
        button.setAttribute('class', 'v2ex-preview-btn');
        button.addEventListener('click', function() {
            triggerIterm(div);
        });
        div.append(button);
        item.parentElement.append(div);
    });
})();