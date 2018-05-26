// ==UserScript==
// @name          TamperTubePlus
// @namespace     https://github.com/Sv443/TamperTubePlus
// @version       1.3.0
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
// @license       MIT
// @copyright     2018, Sv443 (https://github.com/Sv443)
// ==/UserScript==

/*===============================<---------------------------------------------------------------->===============================*/
/*===============================< TamperTubePlus by Sv443/Sven Fehler (https://github.com/Sv443) >===============================*/
/*===============================<---------------------------------------------------------------->===============================*/


/*Settings                                Settings                                Settings                                Settings                                Settings*/

// you can change these settings if you want to:
    var log_to_console = false; // log some debug info to the javascript console if set to true (default: false)
    var enable_version_watermark = true; // enable or disable the version watermark in the top right of the video description (default: true), UI needs to be enabled for the watermark to show up
    var disable_polymer_design = false; // disables the new forced polymer design if set to true (default: false)
    var enable_ui = true; // enable the user interface with buttons and additional information (default: true)
    var download_hotkey = 119; // hotkey for quick video download (default key: F8 (119), 0 to disable), to look up key codes go to this website: https://tinyurl.com/y73b8h3z
    var search_hotkey = 115; // hotkey for quick search (default key: F4 (115), 0 to disable), to look up key codes go to this website: https://tinyurl.com/y73b8h3z
    var radio_hotkey = 113; // hotkey to activate the video's radio mix playlist (default key: F2 (113), 0 to disable), to look up key codes go to this website: https://tinyurl.com/y73b8h3z
    var search_engine = 1; // change search engine for quick search (0 to disable, 1 for google, 2 for duckduckgo, 3 for bing or 4 for yahoo)
    var stylesheet = 0; // switch through stylesheets for YouTube (default: 0) (0: disabled) (1: AdvancedYT - improved design and bigger video player for old youtube design)











(function() {
    'use strict';
 
/*Init                                                                Init                                                                Init*/

var curversion = "1.2.1";
var URLhost = window.location.host;
var URLpath = window.location.pathname;
var curURL = URLhost + "" + URLpath;
var queryString = window.location.search;
queryString = queryString.substring(1);
var watermarkcontent = "";

console.log("TamperTubePlus v" + curversion + " - by Sv443 / Sven Fehler - GitHub: https://github.com/sv443/"); //ttp_version is defined through the @require línk
console.log("Debug enabled: " + log_to_console);
if(log_to_console){console.log("--BEGIN TamperTubePlus Debug");}


/*Disable Polymer                                                                Disable Polymer                                                                Disable Polymer*/

if(disable_polymer_design){
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
    if(log_to_console){console.log("    Disabled Polymer Design");}
}


/*UI Elements                                                                UI Elements                                                                UI Elements*/

if(enable_ui && disable_polymer_design){
    document.addEventListener("DOMContentLoaded", function() {
        if(enable_version_watermark){
            var versiondisplayelem = document.createElement ('div');
            versiondisplayelem.innerHTML = '<div id="versiondisplay" style="text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;'
            + 'font-size:12px;text-align:right;position:absolute;top:10px;right:5px;"><span style="color:#aa0000;">TamperTubePlus by Sv443</span><br>'
            + 'v' + curversion + '<br>'
            + '<a href="https://github.com/sv443/tampertubeplus">GitHub</a></div>';

            document.body.appendChild(versiondisplayelem);
            document.getElementById("watch-uploader-info").appendChild(versiondisplayelem);
        }


        var dlbuttonelem = document.createElement ('div');
        dlbuttonelem.innerHTML = '<div style="position:absolute;left:50%;top:0px;"><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity" type="button" onclick="window.open(' + "'" + 'http://convert2mp3.net/addon_call.php?format=mp3&url=' + curURL + queryString + "'" + ')" title="Download as MP3" role="button" data-tooltip-text="Download as MP3"><span style="font-size:15px;" class="yt-uix-button-content">MP3</span></button>'
        + '<img style="position:relative;top:8px;" src="http://sv443.net/images/qdl.png" width="25px" height="25px"></img>'
        + '<button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity" type="button" onclick="window.open(' + "'" + 'http://convert2mp3.net/addon_call.php?format=mp4&url=' + curURL + queryString + "'" + ')" title="Download as MP4" role="button" data-tooltip-text="Download as MP4"><span style="font-size:15px;" class="yt-uix-button-content">MP4</span></button></div>';

        document.body.appendChild(dlbuttonelem);
        document.getElementById("watch8-action-buttons").appendChild(dlbuttonelem);


        var footerelem = document.createElement ('div');
        footerelem.innerHTML = '&nbsp;&nbsp;&nbsp;TamperTubePlus v' + curversion + ' - &copy; 2018 <a href="https://github.com/sv443" target="_blank">Sven Fehler / Sv443</a>';

        document.body.appendChild(footerelem);
        if(log_to_console){console.log("    loaded all ui elements for old youtube design");}
    });
}
else if(!disable_polymer_design){
    document.addEventListener("DOMContentLoaded", function() {
        window.onload = function(){
            if(enable_version_watermark){
                watermarkcontent = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:15px;"><span style="color:#aa0000;">TamperTubePlus by Sv443</span>&nbsp;-&nbsp;'
                + 'v' + curversion + '&nbsp;-&nbsp;'
                + '<a href="https://github.com/sv443/tampertubeplus">GitHub</a></span>';
            }


            var dlbuttonelem = document.createElement('div');
            dlbuttonelem.innerHTML = '<div style="position:fixed;z-index:50000;left:2px;bottom:2px;"><img style="position:relative;top:8px;" src="http://sv443.net/images/qdl.png" width="25px" height="25px"></img>'
            + '<button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity" type="button" onclick="window.open(' + "'" + 'http://convert2mp3.net/addon_call.php?format=mp3&url=' + curURL + queryString + "'" + ')" title="Download as MP3" role="button" data-tooltip-text="Download as MP3"><span style="font-size:15px;" class="yt-uix-button-content">MP3</span></button>'
            + '<button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity" type="button" onclick="window.open(' + "'" + 'http://convert2mp3.net/addon_call.php?format=mp4&url=' + curURL + queryString + "'" + ')" title="Download as MP4" role="button" data-tooltip-text="Download as MP4"><span style="font-size:15px;" class="yt-uix-button-content">MP4</span></button>'
            + watermarkcontent + '</div>';
            document.body.appendChild(dlbuttonelem);
            if(log_to_console){console.log("    loaded all ui elements for new youtube design");}
        }
    });
}


/*Video Downloader                                                                Video Downloader                                                                Video Downloader*/

document.addEventListener("keyup", function(f){
    if(f.keyCode == download_hotkey && URLpath.includes("/watch")) {
        if(log_to_console){console.log("    registered download keystroke: " + download_hotkey);}
        openc2mp3();
    }
    else if(f.keyCode == download_hotkey && URLpath.includes("/subscribe_embed")) {
        if(log_to_console){console.log("    registered download keystroke: " + download_hotkey);}
        openc2mp3();
    }
});

function openc2mp3() {
    var dl_format = prompt("Download video - choose format\nAvailable Options: mp3,m4a,aac,flac,ogg,wma,mp4,avi,wmv,3gp");
    if(dl_format == "mp3" || dl_format == "m4a" || dl_format == "aac" || dl_format == "flac" || dl_format == "ogg" || dl_format == "wma" || dl_format == "mp4" || dl_format == "avi" || dl_format == "wmv" || dl_format == "3gp"){
        if(log_to_console){console.log("    download - entered correct file format: " + dl_format + ", downloading...");}
        windowname = "Download as " + dl_format;
        window.open("http://convert2mp3.net/addon_call.php?format=" + dl_format + "&url=" + curURL + queryString);
    }
    else {
        if(dl_format === null || dl_format === "" || dl_format == "null"){
            if(log_to_console){console.log("    download - cancelled operation");}
            return null;
        }
        else if(dl_format == "succ"){
            if(log_to_console){console.log("SUCC");console.log("SUCC");console.log("SUCC");console.log("SUCC");console.log("SUCC");console.log("SUCC");console.log("SUCC");console.log("SUCC");console.log("SUCC");}
            window.open("http://sv443.net/succ");
        }
        else{
            if(log_to_console){console.log("    download - entered wrong file format: " + dl_format);}
            var confirmretry = confirm("Entered value does not match available file formats (mp3,m4a,aac,flac,ogg,wma,mp4,avi,wmv,3gp)\nTry again?");
            if(confirmretry){
            }
            else {
                if(log_to_console){console.log("    download - cancelled operation after retrying");}
            }
        }
    }
}


/*Quick Search                                                                Quick Search                                                                Quick Search*/

document.addEventListener("keyup", function(g){
    if(g.keyCode == search_hotkey) {
        if(log_to_console){console.log("    registered search keystroke: " + search_hotkey);}
        var search_string = prompt("Enter search string:");
        if(search_string !== null && search_string !== "null" && search_string !== ""){
            if(search_engine == 1){
                window.open("https://google.com/search?q=" + search_string);
                if(log_to_console){console.log("    searched for '" + search_string + "' in google");}
            }
            else if(search_engine == 2){
                window.open("https://duckduckgo.com/?q=" + search_string);
                if(log_to_console){console.log("    searched for '" + search_string + "' in duckduckgo");}
            }
            else if(search_engine == 3){
                window.open("https://bing.com/search?q=" + search_string);
                if(log_to_console){console.log("    searched for '" + search_string + "' in bing");}
            }
            else if(search_engine == 4){
                window.open("https://search.yahoo.com/search?p=" + search_string);
                if(log_to_console){console.log("    searched for '" + search_string + "' in yahoo");}
            }
            else {
                alert("Wrong search engine chosen!\nPlease go to the TamperTubePlus script and change the settings at the top!");
                if(log_to_console){console.log("    wrong search engine chosen");}
            }
        }
    }
});


/*Start Radio                                                                Start Radio                                                                Start Radio*/

var finalmixplhref;
if(disable_polymer_design){
    finalmixplhref = "not retrieved yet";
    document.addEventListener("DOMContentLoaded", function() {
        var mixpl = document.getElementsByClassName('mix-playlist');
        var mixplhref;
        for(var i = 0; i < mixpl.length; i++) {
            mixplhref = mixpl[i].href;
        }

        if(mixplhref == "undefined" || mixplhref === undefined || mixplhref == "null" || mixplhref === null){
            return;
        }
        else {
            finalmixplhref = mixplhref;
        }
        if(log_to_console){console.log("    href of mixplaylist: " + finalmixplhref);}
        document.addEventListener("keyup", function(h){
            if(h.keyCode == radio_hotkey) {
                if(log_to_console){console.log("    registered radio keystroke: " + radio_hotkey);}
                if(mixplhref == "undefined" || mixplhref === undefined || mixplhref == "null" || mixplhref === null){
                    alert("This video doesn't have a mix playlist available");
                }
                else{
                    window.location.replace(finalmixplhref);
                }
            }
        });
    });
}
else if(disable_polymer_design === false){
    if(log_to_console){console.log("    quick radio mix playlist feature disabled for new design");}
}

/*CSS Stylesheets                                                                CSS Stylesheets                                                                CSS Stylesheets*/

if(log_to_console){console.log("    applying stylesheet " + stylesheet);}

if(stylesheet == 1){
new GM_addStyle(`
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


/*End                                                                End                                                                End*/

if(log_to_console){console.log("--END TamperTubePlus");}
})();
