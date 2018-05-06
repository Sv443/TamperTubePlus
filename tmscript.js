// ==UserScript==
// @name         TamperTubePlus
// @namespace    https://github.com/Sv443/TamperTubePlus
// @version      0.0.4
// @description  New YouTube features and general improvements
// @author       Sv443
// @match        *://www.youtube.com/*
// @grant        none
// @icon         http://sv443.net/favicons/tampertubeplusv4.ico
// @run-at       document-start
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      http://sv443.net/js/tampertubeplus.js
// @downloadURL  https://raw.githubusercontent.com/Sv443/TamperTubePlus/master/tmscript.js
// @updateURL    https://raw.githubusercontent.com/Sv443/TamperTubePlus/master/tmscript.js
// ==/UserScript==


// you can change these settings if you want to:
    var log_to_console = false; // log some debug info to the javascript console
    var disable_polymer_design = true; // disables the new ugly, unresponsive polymer design if set to true
    //var quick_bookmark_hotkey = 120; // hotkey for quick bookmark (default key: F9 (120)), to look up key codes go to this website: https://zeamedia.com/helper/javascript-key-codes-char-codes.php
    var download_hotkey = 119; // hotkey for quick video download (default key: F8 (119)), to look up key codes go to this website: https://zeamedia.com/helper/javascript-key-codes-char-codes.php











var URLhost = window.location.host;
var URLpath = window.location.pathname;
var curURL = URLhost + "" + URLpath;
var queryString = window.location.search;
queryString = queryString.substring(1);


if(log_to_console == true){console.log("--BEGIN TamperTubePlus");}

if(disable_polymer_design == true){
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

    document.addEventListener("DOMContentLoaded", function() {
        // from https://stackoverflow.com/a/12552017/4247209
        document.body.onclick = function(e){
            e = e || event;
            var from = findParent("a",e.target || e.srcElement);
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
    if(log_to_console == true){console.log("    Disabled Polymer Design");}
}

/* DISABLED
document.addEventListener("keyup", function(e){
	if(e.keyCode == quick_bookmark_hotkey) {
        if(log_to_console == true){console.log("    registered keystroke: " + quick_bookmark_hotkey);}
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
                var elem = document.createElement("a");
                elem.setAttribute("href",url);
                elem.setAttribute("title",title);
                elem.setAttribute("rel","sidebar");
                elem.click(); // this.title=document.title;
            }
        }
    }
});*/

document.addEventListener("keyup", function(f){
    if(f.keyCode == download_hotkey) {
        if(log_to_console == true){console.log("    registered keystroke: " + download_hotkey);}
        openc2mp3();
    }
});

function openc2mp3() {
    var dl_format = prompt("Download video - choose format\nAvailable Options: mp3,m4a,aac,flac,ogg,wma,mp4,avi,wmv,3gp");
    if(dl_format == "mp3" || dl_format == "m4a" || dl_format == "aac" || dl_format == "flac" || dl_format == "ogg" || dl_format == "wma" || dl_format == "mp4" || dl_format == "avi" || dl_format == "wmv" || dl_format == "3gp"){
        if(log_to_console == true){console.log("    download - entered correct file format: " + dl_format + ", downloading...");}
        window.open("http://convert2mp3.net/addon_call.php?format=" + dl_format + "&url=" + curURL + queryString);
    }
    else {
        if(dl_format == null || dl_format == "" || dl_format == "null"){
            if(log_to_console == true){console.log("    download - cancelled operation");}
            return null;
        }
        else{
            if(log_to_console == true){console.log("    download - entered wrong file format: " + dl_format);}
            var confirmretry = confirm("Entered value does not match available file formats (mp3,m4a,aac,flac,ogg,wma,mp4,avi,wmv,3gp)\nTry again?");
            if(confirmretry == true){
                openc2mp3();
            }
            else {
                if(log_to_console == true){console.log("    download - cancelled operation after retrying");}
            }
        }
    }
}

if(log_to_console == true){console.log("--END TamperTubePlus");}
