// ==UserScript==
// @name          TamperTubePlus
// @namespace     https://github.com/Sv443/TamperTubePlus
// @version       1.1.0
// @description   New YouTube features and general improvements
// @author        Sv443
// @match         *://www.youtube.com/*
// @grant         GM_addStyle
// @grant         unsafeWindow
// @icon          http://sv443.net/favicons/tampertubeplusv4.ico
// @run-at        document-start
// @require       https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @connect       self
// @connect       *
// @connect       sv443.net
// @downloadURL   https://raw.githubusercontent.com/Sv443/TamperTubePlus/master/TamperTubePlus.js
// @updateURL     https://raw.githubusercontent.com/Sv443/TamperTubePlus/master/TamperTubePlus.js
// ==/UserScript==

(function() {
    'use strict';


/*Settings                                                                Settings                                                                Settings*/

// you can change these settings if you want to:
    var log_to_console = true; // log some debug info to the javascript console if set to true (default: false)
    var disable_polymer_design = true; // disables the new forced polymer design if set to true (default: false)
    var download_hotkey = 119; // hotkey for quick video download (default key: F8 (119), 0 to disable), to look up key codes go to this website: https://zeamedia.de/helper/javascript-key-codes-char-codes.php
    var search_hotkey = 115; // hotkey for quick search (default key: F4 (115), 0 to disable), to look up key codes go to this website: https://zeamedia.de/helper/javascript-key-codes-char-codes.php
    var radio_hotkey = 113;
    var search_engine = 1; // change search engine for quick search (0 to disable, 1 for google, 2 for duckduckgo, 3 for bing or 4 for yahoo)
    var stylesheet = 1; // switch through stylesheets for YouTube (default: 0) (0: disabled) (1: AdvancedYT - improved design and bigger video player)











/*Init                                                                Init                                                                Init*/

var ttp_version = "1.1.0";
var URLhost = window.location.host;
var URLpath = window.location.pathname;
var curURL = URLhost + "" + URLpath;
var queryString = window.location.search;
queryString = queryString.substring(1);


console.log("TamperTubePlus v" + ttp_version + " by Sv443 / Sven Fehler - GitHub: https://github.com/sv443/");

if(log_to_console == true){console.log("--BEGIN TamperTubePlus Debug");}


/*Disable Polymer                                                                Disable Polymer                                                                Disable Polymer*/

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


/*Video Downloader                                                                Video Downloader                                                                Video Downloader*/

document.addEventListener("keyup", function(f){
    if(f.keyCode == download_hotkey && URLpath == "/watch") {
        if(log_to_console == true){console.log("    registered download keystroke: " + download_hotkey);}
        openc2mp3();
    }
    else if(f.keyCode == download_hotkey && URLpath == "/subscribe_embed") {
        if(log_to_console == true){console.log("    registered download keystroke: " + download_hotkey);}
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


/*Quick Search                                                                Quick Search                                                                Quick Search*/

document.addEventListener("keyup", function(g){
    if(g.keyCode == search_hotkey) {
        if(log_to_console == true){console.log("    registered search keystroke: " + search_hotkey);}
        var search_string = prompt("Enter search string:");
        if(search_string != null && search_string != "null" && search_string != ""){
            if(search_engine == 1){
                window.open("https://google.com/search?q=" + search_string);
                if(log_to_console == true){console.log("    searched for '" + search_string + "' in google");}
            }
            else if(search_engine == 2){
                window.open("https://duckduckgo.com/search?q=" + search_string);
                if(log_to_console == true){console.log("    searched for '" + search_string + "' in duckduckgo");}
            }
            else if(search_engine == 3){
                window.open("https://bing.com/search?q=" + search_string);
                if(log_to_console == true){console.log("    searched for '" + search_string + "' in bing");}
            }
            else if(search_engine == 4){
                window.open("https://search.yahoo.com/search?p=" + search_string);
                if(log_to_console == true){console.log("    searched for '" + search_string + "' in yahoo");}
            }
            else {
                alert("Wrong search engine chosen!\nPlease go to the TamperTubePlus script and change the settings at the top!");
                if(log_to_console == true){console.log("    wrong search engine chosen");}
            }
        }
    }
});


/*CSS Stylesheets                                                                CSS Stylesheets                                                                CSS Stylesheets*/

if(log_to_console == true){console.log("    applying stylesheet " + stylesheet);}

if(stylesheet == 1){
GM_addStyle(`
#eow-title {
font-family: "Ubuntu", sans-serif;
font-size: 20px;
}

.ytp-title-text {
font-family: "Ubuntu", sans-serif;
}

#eow-title:hover {
font-family: "Ubuntu", sans-serif;
font-size: 20px;
color: #787878;
}

.comment-section-header-renderer {
font-family: "Ubuntu", sans-serif;
}

#watch-description {
font-family: "Source Sans Pro", sans-serif;
}

#watch7-views-info {
font-family: "Ubuntu", sans-serif;
}

.yt-user-info {
font-family: "Ubuntu", sans-serif;
font-size: 15px;
}


/*       resize player       */


html .watch-stage-mode .player-width,
html .watch-stage-mode #player
  {
    width: 100% !important;
    width: calc(100vw - 18px) !important;
    margin-left: 0 !important;
    left: 0 !important;
  }

  html .watch-stage-mode #placeholder-player .player-width
  {
    width: 100% !important;
  }

  html .watch-stage-mode .player-height
  {
    height: 95vh !important;
    height: calc(100vh - 52px - 18px) !important;
  }

  html .watch-stage-mode .ad-container,
html .watch-stage-mode .html5-video-container,
html .watch-stage-mode video.video-stream.html5-main-video
  {
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }

  html .watch-stage-mode .html5-video-container > .video-ads > .ad-container
  {
    bottom: 30px !important;
    height: auto !important;
  }

  html .watch-stage-mode .ad-container.ad-overlay
  {
    top: auto !important;
    height: auto !important;
  }

  html .watch-stage-mode #player-playlist .watch-playlist
  {
    top: calc(100vh - 52px - 18px - 360px) !important;
    height: 480px !important;
  }

  html .watch-stage-mode .ytp-chrome-bottom
  {
    width: 100% !important;
    width: calc(100% - 24px) !important;
  }

  #masthead-positioner
  {
    position: fixed !important;
  }

  #movie_player > .html5-video-controls > .html5-player-chrome
  {
    background: linear-gradient(to bottom, rgba(27,27,27,0) 0%, rgba(27,27,27,0.5) 100%);
  }


/*       make scrollbar smaller       */


  ::-webkit-scrollbar
  {
    width: 7px;
    background-color: #f1f1f1;
  }

  body::-webkit-scrollbar
  {
    width: 8px!important;
    background-color: #EEEEEE;
  }

  ::-webkit-scrollbar-track
  {
    border: 7px;
  }

  body::-webkit-scrollbar-track
  {
    border: none;
  }

  ::-webkit-scrollbar-thumb
  {
    background-color: #424242!important;
    border-radius: 0px!important;
    border: none;
  }

  ::-webkit-scrollbar-thumb:hover
  {
    background-color: #333!important;
  }

  ::-webkit-scrollbar-thumb:active
  {
    background-color: #616161!important;
  }
`);
}


/*Start Radio                                                                Start Radio                                                                Start Radio*/

var finalmixplhref = "not retrieved yet";
document.addEventListener("DOMContentLoaded", function() {
    var mixpl = document.getElementsByClassName('mix-playlist');
    var mixplhref;
    for(var i = 0; i < mixpl.length; i++) {
        mixplhref = mixpl[i].href;
    }

    if(mixplhref == "undefined" || mixplhref == undefined || mixplhref == "null" || mixplhref == null){
        return;
    }
    else {
        finalmixplhref = mixplhref;
    }
    if(log_to_console == true){console.log("    href of mixplaylist: " + finalmixplhref);}
    document.addEventListener("keyup", function(h){
        if(h.keyCode == radio_hotkey) {
            if(log_to_console == true){console.log("    registered radio keystroke: " + radio_hotkey);}
            if(mixplhref == "undefined" || mixplhref == undefined || mixplhref == "null" || mixplhref == null){
                alert("This video doesn't have a mix playlist available");
            }
            else{
                window.location.replace(finalmixplhref);
            }
        }
    });
});


/*End                                                                End                                                                End*/

if(log_to_console == true){console.log("--END TamperTubePlus");}
})();
