// ==UserScript==
// @name         TamperTubePlus
// @namespace    https://github.com/Sv443/TamperTubePlus
// @version      0.2
// @description  New YouTube features and general improvements
// @author       Sv443
// @match        *://www.youtube.com/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/Sv443/TamperTubePlus/master/tmscript.js
// @updateURL    https://raw.githubusercontent.com/Sv443/TamperTubePlus/master/tmscript.js
// ==/UserScript==

var disable_polymer_design = true; // disables the new ugly polymer design if set to true
//var quick_bookmark_hotkey = 120; // hotkey for quick bookmark (default key: F9 (120)), to look up key codes go to this website: https://zeamedia.com/helper/javascript-key-codes-char-codes.php

//test












var URLhost = window.location.host;
var URLpath = window.location.pathname;
var curURL = URLhost + "" + URLpath;


if(disable_polymer_design = true){
    // this script is not made by me but by /u/ndogw and davidbailey95 (https://github.com/davidbailey95)
    function changeUrl(url, always) {
        if (url.indexOf("disable_polymer") === -1) {
            if (url.indexOf("?") > 0) {
                url += "&";
            } else {
                url += "?";
            }
            url += "disable_polymer=1";
            window.location.href = url;
        }
        if (always) {
            window.location.href = url;
        }
    }

    var url = window.location.href;
    changeUrl(url);

    document.addEventListener('DOMContentLoaded', function() {
        // from https://stackoverflow.com/a/12552017/4247209
        document.body.onclick = function(e){
            e = e || event;
            var from = findParent('a',e.target || e.srcElement);
            if (from) {
                var url = from.href;
                if (!(url.match("/embed/") || url === location.href)) {
                    changeUrl(url, true);
                    return false;
                }
            }
        };
        //find first parent with tagName [tagname]
        function findParent(tagname,el){
            while (el){
                if ((el.nodeName || el.tagName).toLowerCase()===tagname.toLowerCase()){
                    return el;
                }
                el = el.parentNode;
            }
            return null;
        }
    });
}


/* DISABLED - doesn't work

document.addEventListener('keyup', function(e){
	if(e.keyCode == quick_bookmark_hotkey) {
        var title = prompt("Bookmark Title");
        var url = curURL;
        function bookmark(title, url) {
            if(document.all) { // ie
                window.external.AddFavorite(url, title);
            }
            else if(window.sidebar) { // firefox
                window.sidebar.addPanel(title, url, "");
            }
            else if(window.opera && window.print) { // opera
                var elem = document.createElement('a');
                elem.setAttribute('href',url);
                elem.setAttribute('title',title);
                elem.setAttribute('rel','sidebar');
                elem.click(); // this.title=document.title;
            }
        }
    }
});
*/
