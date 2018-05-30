// ==UserScript==
// @name          TamperTubePlus
// @namespace     https://github.com/Sv443/TamperTubePlus
// @version       1.4.0
// @description   New YouTube features and general improvements
// @author        Sv443
// @match         *://www.youtube.com/*
// @grant         GM_addStyle
// @grant         unsafeWindow
// @grant         GM_listValues
// @grant         GM_deleteValue
// @grant         GM_setValue
// @grant         GM_getValue
// @icon          https://sv443.github.io/code/resources/favicons/tampertubeplusv4.ico
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

/*===============================<------------------------------------------------------------------------------>===============================*/
/*===============================< TamperTubePlus - handwritten by Sv443/Sven Fehler (https://github.com/Sv443) >===============================*/
/*===============================<------------------------------------------------------------------------------>===============================*/


/*Settings                                Settings                                Settings                                Settings                                Settings*/

// you can change these settings if you want to:
    var ttp_language = "en"; // change TTP's language (default: "en" (english)), ("en" for english, "de" for german)

    var log_to_console = true; // log some debug info to the javascript console if set to true (default: false)

    var enable_version_watermark = true; // enable or disable the version watermark in the bottom left corner of your window, UI needs to be enabled for the watermark to show up (default: true)

    var disable_polymer_design = true; // disables the new forced polymer design if set to true (default: false)

    var enable_ui = true; // enable the user interface with buttons and additional information (default: true)

    var button_color = "blue"; // change the ui button colors (default: "red"), (possible: "red", "orange", "blue", "green")

    var button_size = "normal"; // change the size of the ui buttons (default: "normal"), (possible: "small" (20px * 20px), "normal" (25px * 25px), "large" (35px * 35px))

    var download_hotkey = 119; // hotkey for quick video download (default key: F8 (119), 0 to disable), to look up key codes go to this website: https://tinyurl.com/y73b8h3z

    var search_hotkey = 115; // hotkey for quick search (default key: F4 (115), 0 to disable), to look up key codes go to this website: https://tinyurl.com/y73b8h3z

    var radio_hotkey = 113; // hotkey to activate the video's radio mix playlist (default key: F2 (113), 0 to disable), to look up key codes go to this website: https://tinyurl.com/y73b8h3z

    var search_engine = "duckduckgo"; // change search engine for quick search (default: "google") (possible: "disable", "google", "duckduckgo", "bing", "yahoo")

    var stylesheet = 1; // switch through stylesheets for YouTube (default: 0) (0: disabled) (1: AdvancedYT - improved design and bigger video player for old youtube design)



/*Changelog                                Changelog                                Changelog                                Changelog                                Changelog*/

// what's new in this version:
// - changed ui button style
// - added ui button color setting
// - added ui button size setting
// - made the code more fluent and appealing
// - fixed bug of ui appearing on other youtube pages than /watch
// - added multiple language support
// - added more @grants
// - added menu button, will be adding function to it in the next version
// - fixed broken ui on new youtube design
// - added switch() error failsafes via the "default:" option
// - changed some of the settings to strings













(function() {
    'use strict';


/*Init                                                                Init                                                                Init*/

var curversion = "1.4.0";
var URLhost = window.location.host;
var URLpath = window.location.pathname;
var curURL = URLhost + "" + URLpath;
var queryString = window.location.search;
queryString = queryString.substring(1);
var watermarkcontent = "";

console.log("TamperTubePlus v" + curversion + " - by Sv443 / Sven Fehler - GitHub: https://github.com/sv443/"); //ttp_version is defined through the @require línk
console.log("Debug enabled: " + log_to_console);
if(log_to_console){console.log("--BEGIN TamperTubePlus Debug");}


/*Languages                                                                Languages                                                                Languages*/

var lang_dl_format;var lang_confirm_dl_retry;var lang_enter_search_string;var lang_no_mix_pl;
switch(ttp_language){
    case "en":
        lang_dl_format = "Download video - choose format\nAvailable Options: mp3,m4a,aac,flac,ogg,wma,mp4,avi,wmv,3gp";
        lang_confirm_dl_retry = "Entered value does not match available file formats (mp3,m4a,aac,flac,ogg,wma,mp4,avi,wmv,3gp)\nTry again?";
        lang_enter_search_string = "Enter search string:";
        lang_no_mix_pl = "This video doesn't have a mix playlist available";
        if(log_to_console){console.log("    loaded english language");}
        break;
    case "de":
        lang_dl_format = "Video herunterladen - Format auswählen\nVerfügbare Formate: mp3,m4a,aac,flac,ogg,wma,mp4,avi,wmv,3gp";
        lang_confirm_dl_retry = "Eingegebenes Format entspricht nicht den verfügbaren Formaten (mp3,m4a,aac,flac,ogg,wma,mp4,avi,wmv,3gp)\nTry again?";
        lang_enter_search_string = "Suchbegriff eingeben:";
        lang_no_mix_pl = "Dieses Video hat keine verfügbare Mix-Playlist";
        if(log_to_console){console.log("    loaded german language");}
        break;
    default:
        lang_dl_format = "Download video - choose format\nAvailable Options: mp3,m4a,aac,flac,ogg,wma,mp4,avi,wmv,3gp";
        lang_confirm_dl_retry = "Entered value does not match available file formats (mp3,m4a,aac,flac,ogg,wma,mp4,avi,wmv,3gp)\nTry again?";
        lang_enter_search_string = "Enter search string:";
        lang_no_mix_pl = "This video doesn't have a mix playlist available";
        if(log_to_console){console.log("    incorrect value was chosen in the settings - loading english language");}
        break;
}


/*Disable Polymer                                                                Disable Polymer                                                                Disable Polymer*/

if(disable_polymer_design){
    // this script is not made nor handwritten by me but by /u/ndogw and davidbailey95 (https://github.com/davidbailey95)
    function changeUrl(url, always) {
        if(url.indexOf("disable_polymer") === -1){
            if(url.indexOf("?") > 0){
                url += "&";
            }
            else {
                url += "?";
            }
            url += "disable_polymer=1";
            window.location.href = url;
        }
        if(always){
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
            if(from){
                var url = from.href;
                if(!(url.match("/embed/") || url === location.href)){
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

var imgpathmp3;var imgpathspacer;var imgpathmp4;var imgpathmenu;var buttonsize;
switch(button_size){ // (0 = small (20px * 20px), 1 = normal (25px * 25px), 2 = large (35px * 35px))
    case 0:
        buttonsize = 20;
        if(log_to_console){console.log("    loaded button size of 20px");}
        break;
    case 1:
        buttonsize = 25;
        if(log_to_console){console.log("    loaded button size of 25px");}
        break;
    case 2:
        buttonsize = 35;
        if(log_to_console){console.log("    loaded button size of 35px");}
        break;
    default:
        buttonsize = 25;
        if(log_to_console){console.log("    incorrect value was chosen in the settings - loading default button size of 25px");}
        break;
}
switch(button_color){
    case "orange":
        imgpathmp3 = "https://sv443.github.io/code/resources/images/buttonleftmp3.png";
        imgpathspacer = "https://sv443.github.io/code/resources/images/buttonmiddleraw.png";
        imgpathmp4 = "https://sv443.github.io/code/resources/images/buttonrightmp4.png";
        imgpathmenu = "https://sv443.github.io/code/resources/images/buttonmiddlemenu.png";
        if(log_to_console){console.log("    loaded default (orange) button design");}
        break;
    case "blue":
        imgpathmp3 = "https://sv443.github.io/code/resources/images/buttonleftmp3_blue.png";
        imgpathspacer = "https://sv443.github.io/code/resources/images/buttonmiddleraw_blue.png";
        imgpathmp4 = "https://sv443.github.io/code/resources/images/buttonrightmp4_blue.png";
        imgpathmenu = "https://sv443.github.io/code/resources/images/buttonmiddlemenu_blue.png";
        if(log_to_console){console.log("    loaded blue button design");}
        break;
    case "green":
        imgpathmp3 = "https://sv443.github.io/code/resources/images/buttonleftmp3_green.png";
        imgpathspacer = "https://sv443.github.io/code/resources/images/buttonmiddleraw_green.png";
        imgpathmp4 = "https://sv443.github.io/code/resources/images/buttonrightmp4_green.png";
        imgpathmenu = "https://sv443.github.io/code/resources/images/buttonmiddlemenu_green.png";
        if(log_to_console){console.log("    loaded green button design");}
        break;
    case "red":
        imgpathmp3 = "https://sv443.github.io/code/resources/images/buttonleftmp3_red.png";
        imgpathspacer = "https://sv443.github.io/code/resources/images/buttonmiddleraw_red.png";
        imgpathmp4 = "https://sv443.github.io/code/resources/images/buttonrightmp4_red.png";
        imgpathmenu = "https://sv443.github.io/code/resources/images/buttonmiddlemenu_red.png";
        if(log_to_console){console.log("    loaded red button design");}
        break;
    default:
        imgpathmp3 = "https://sv443.github.io/code/resources/images/buttonleftmp3.png";
        imgpathspacer = "https://sv443.github.io/code/resources/images/buttonmiddleraw.png";
        imgpathmp4 = "https://sv443.github.io/code/resources/images/buttonrightmp4.png";
        imgpathmenu = "https://sv443.github.io/code/resources/images/buttonmiddlemenu.png";
        if(log_to_console){console.log("    incorrect value was chosen in the settings - loading default (orange) button design");}
        break;
}
if(enable_version_watermark){
    watermarkcontent = '<span style="text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;font-size:13px;"><a href="https://github.com/sv443/tampertubeplus" target="_blank">TamperTubePlus</a>&nbsp;-&nbsp;'
    + 'v' + curversion;
}

if(enable_ui && disable_polymer_design && !URLpath.includes("embed") && URLpath.includes("watch")){
    document.addEventListener("DOMContentLoaded", function() {

        var dlbuttonelem = document.createElement('div');
        dlbuttonelem.innerHTML = '<div style="position:fixed;z-index:50000;left:4px;bottom:2px;">'
            + '<img style="cursor:pointer" width="' + buttonsize + 'px" height="' + buttonsize + 'px" src="' + imgpathmp3 + '" onclick="window.open(' + "'" + 'http://convert2mp3.net/addon_call.php?format=mp3&url=' + curURL + queryString + "'" + ')" title="Download as MP3"></img>' // concatenation errors can't be fixed
            + '<img width="10px" height="' + buttonsize + 'px" src="' + imgpathspacer + '"></img>'
            + '<img id="menubtn" style="cursor:pointer" width="' + buttonsize + 'px" height="' + buttonsize + 'px" src="' + imgpathmenu + '" title="Open the TamperTubePlus Menu"></img>' // concatenation errors can't be fixed
            + '<img width="10px" height="' + buttonsize + 'px" src="' + imgpathspacer + '"></img>'
            + '<img style="cursor:pointer" width="px' + buttonsize + '" height="' + buttonsize + 'px" src="' + imgpathmp4 + '" onclick="window.open(' + "'" + 'http://convert2mp3.net/addon_call.php?format=mp4&url=' + curURL + queryString + "'" + ')" title="Download as MP4"></img>' // concatenation errors can't be fixed
            + '</div><div style="position:fixed;z-index:50000;left:130px;bottom:5px;">' + watermarkcontent + '</div>';
        document.body.appendChild(dlbuttonelem);
        document.getElementById("menubtn").addEventListener("click", function(){togglemenu();});
        if(log_to_console){console.log("    loaded all ui elements for old youtube design");}
    });
}
else if(enable_ui && !disable_polymer_design && !URLpath.includes("embed") && URLpath.includes("watch")){
    document.addEventListener("DOMContentLoaded", function() {
        window.onload = function(){
            var dlbuttonelem = document.createElement('div');
            dlbuttonelem.innerHTML = '<div style="position:fixed;z-index:50000;left:2px;bottom:2px;">'
                + '<img style="cursor:pointer" width="' + buttonsize + 'px" height="' + buttonsize + 'px" src="' + imgpathmp3 + '" onclick="window.open(' + "'" + 'http://convert2mp3.net/addon_call.php?format=mp3&url=' + curURL + queryString + "'" + ')" title="Download as MP3"></img>' // concatenation errors can't be fixed
                + '<img width="10px" height="' + buttonsize + 'px" src="' + imgpathspacer + '"></img>'
                + '<img style="cursor:pointer" width="' + buttonsize + 'px" height="' + buttonsize + 'px" src="' + imgpathmenu + '" onclick="" title="Download as MP3"></img>' // concatenation errors can't be fixed
                + '<img width="10px" height="' + buttonsize + 'px" src="' + imgpathspacer + '"></img>'
                + '<img style="cursor:pointer" width="px' + buttonsize + '" height="' + buttonsize + 'px" src="' + imgpathmp4 + '" onclick="window.open(' + "'" + 'http://convert2mp3.net/addon_call.php?format=mp4&url=' + curURL + queryString + "'" + ')" title="Download as MP4"></img>' // concatenation errors can't be fixed
                + watermarkcontent + '</div>';
            document.body.appendChild(dlbuttonelem);
            document.getElementById("menubtn").addEventListener("click", function(){togglemenu();});
            if(log_to_console){console.log("    loaded all ui elements for new youtube design");}
        }
    });
}

function togglemenu() {
    if(log_to_console){console.log("    triggered the menu");}
    alert("Menu will be implemented in the next version!");
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
    var dl_format = prompt(lang_dl_format);
    if(dl_format == "mp3" || dl_format == "m4a" || dl_format == "aac" || dl_format == "flac" || dl_format == "ogg" || dl_format == "wma" || dl_format == "mp4" || dl_format == "avi" || dl_format == "wmv" || dl_format == "3gp"){
        if(log_to_console){console.log("    download - entered correct file format: " + dl_format + ", downloading...");}
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
            var confirmretry = confirm(lang_confirm_dl_retry);
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
        var search_string = prompt(lang_enter_search_string);
        if(search_string !== null && search_string !== "null" && search_string !== ""){
            switch(search_engine == 1){
                case "google":
                    window.open("https://google.com/search?q=" + search_string);
                    if(log_to_console){console.log("    searched for '" + search_string + "' in google");}
                    break;
                case "duckduckgo":
                    window.open("https://duckduckgo.com/?q=" + search_string);
                    if(log_to_console){console.log("    searched for '" + search_string + "' in duckduckgo");}
                    break;
                case "bing":
                    window.open("https://bing.com/search?q=" + search_string);
                    if(log_to_console){console.log("    searched for '" + search_string + "' in bing");}
                    break;
                case "yahoo":
                    window.open("https://search.yahoo.com/search?p=" + search_string);
                    if(log_to_console){console.log("    searched for '" + search_string + "' in yahoo");}
                    break;
                default:
                    alert("Wrong search engine chosen!\nPlease go to the TamperTubePlus script and change the settings at the top!");
                    if(log_to_console){console.log("    wrong search engine chosen");}
                    break;
            }
        }
    }
});


/*Start Radio                                                                Start Radio                                                                Start Radio*/

var finalmixplhref;
if(disable_polymer_design){
    finalmixplhref = "not retrieved yet";
    document.addEventListener("DOMContentLoaded", function() {if(document.getElementById('eow-title').innerHTML.includes("Avicii") || document.getElementById('eow-title').innerHTML.includes("avicii")){console.log("RIP Avicii");}});
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
                    alert(lang_no_mix_pl);
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

switch(stylesheet){
case 0:
    if(log_to_console){console.log("    stylesheet was disabled in the settings");}
break;
case 1:
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
break;
default:
    stylesheet = 0;
    console.log("incorrect value was chosen in the settings - disabling stylesheet");
break;
}


/*End                                                                End                                                                End*/

if(log_to_console){console.log("--END TamperTubePlus");}
})();
/* my temporary dev code storage

save and get values
  function GM_setValue(key, value);
  function GM_getValue(key, defaultValue);



*/
