// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*.md
// @grant        none
//@require  https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function($){
    'use strict';
    window.obj = {
        debug: false,
        dhlI: null,
        $catalog: $('.entry-content').find('ul')[0],
        checkUrlInterval: 500,
        showDhlInterval: 3000,// ajax页面加载缓冲时间
    }
    let obj = window.obj
    debug('dhl', obj)
    let i = setInterval(() =>{
        let isChange = checkUrlIsChange()
        debug('url is change:', isChange)
        if (isChange) {
            if (obj.dhlI) {
                debug('clear::', obj.dhlI)
                clearInterval(obj.dhlI)
            }
            obj.dhlI = setInterval(() =>{
                clearInterval(obj.dhlI)
                showDhl()
            }, obj.showDhlInterval)
        }
    }, obj.checkUrlInterval)

    function checkUrlIsChange() {
        if (window.location.href != window.last_url) {
            debug('new href:', window.location.href)
            window.last_url = window.location.href
            return true
        }

        return false
    }


    function showDhl() {
        let $dhl = $('.entry-content').find('ul');
        if ($('#dhl').length  == 1) {
            debug('#dhl:', obj.$catalog)
            $('#dhl').html(obj.$catalog)
            return
        }

        let $dhlDiv = $('<div id="dhl" style="width:300px; height:800px; position:fixed; top: 0px; right: 0px; padding-top:60px; overflow:auto;" ></div>')
        $dhlDiv.append(obj.$catalog)
        $('body').append($dhlDiv);
    }

    function debug(...info) {
        if (obj.debug) {
             console.log(JSON.parse(JSON.stringify(info)))
        }
    }
    

    // Your code here...
})(jQuery)