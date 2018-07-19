// ==UserScript==
// @name           TamperTubePlus
// @name:de        TamperTubePlus
// @version        1.5.1
// @description    New YouTube features and improvements
// @description:de Neue YouTube Funktionen und Verbesserungen
// @namespace      https://github.com/Sv443/TamperTubePlus
// @author         Sv443
// @license        MIT
// @copyright      2018, Sv443 (https://github.com/Sv443)
// @match          http*://www.youtube.com/*
// @grant          GM_addStyle
// @grant          GM_listValues
// @grant          GM_deleteValue
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_openInTab
// @grant          GM_notification
// @grant          GM_setClipboard
// @icon           https://raw.githubusercontent.com/Sv443/code/master/resources/images/tampertubeplusv5_200x200.png
// @run-at         document-start
// @require        https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @connect        self
// @connect        *
// @downloadURL    https://raw.githubusercontent.com/Sv443/TamperTubePlus/master/TamperTubePlus.js
// @updateURL      https://raw.githubusercontent.com/Sv443/TamperTubePlus/master/TamperTubePlus.js
// ==/UserScript==



/*===============================<------------------------------------------------------------------------------>===============================*/
/*===============================< TamperTubePlus - handwritten by Sv443/Sven Fehler (https://github.com/Sv443) >===============================*/
/*===============================<------------------------------------------------------------------------------>===============================*/
/*                                                /¯¯¯¯¯¯¯¯¯¯¯¯\    /¯¯¯¯¯¯¯¯¯¯¯¯\    /¯¯¯¯¯¯¯¯¯¯\
                                                  |            |    |            |    |   ___    |
                                                  \___      ___/    \___      ___/    |   | |    |
                                                      |    |            |    |        |   ¯¯¯    |
                                                      |    |            |    |        |     _____/
                                                      |    |            |    |        |    /
                                                      |    |            |    |        |    |
                                                      |    |            |    |        |    |
                                                      \____/            \____/        \____/
*/








/*\  \  \                          Settings                                Settings                                Settings                                Settings                      /  /  /*/
/* \  \  \   Settings                                Settings                                Settings                                Settings                                Settings   /  /  / */
/* /  /  /                         Settings                                Settings                                Settings                                Settings                     \  \  \ */
/*/  /  /    Settings                                Settings                                Settings                                Settings                                Settings    \  \  \*/



//  Other

var ttp_language = "en"; // change TTP's language (default: "en" (english)), ("en" for english, "de" for german)
var log_to_console = true; // log some debug info to the javascript console if set to true (default: false), (possible: true, false)
var enable_notifications = true; // enable notifications - these will not be spammed and will only contain important messages, so I don't recommend to turn them off (default: true), (possible: true, false)
var search_engine = "duckduckgo"; // change search engine for quick search (default: "google") (possible: "disable", "google", "ecosia" (plant trees through searches), "duckduckgo", "bing", "yahoo")
var disable_info_cards_if_annotations_are_disabled = true; // disables info cards if the annotations are disabled in the player settings (default: false), (possible: true, false)



//  Visual Stuff

//CURRENTLY DISABLED - var enable_version_watermark = false; // enable or disable the version watermark in the bottom left corner of your window, UI needs to be enabled for the watermark to show up (default: true), (possible: true, false)
var disable_polymer_design = true; // disables the new forced polymer design if set to true - to return to the new youtube design, disable this option and clear all cookies on youtube (default: false), (possible: true, false)
var show_tags_in_description = true; // shows the video's tags in the description (due to limitations you'll need to reload the page after you switch to a new video to see the correct tags) (default: true), (possible: true, false)
var enable_ui = true; // enable the user interface with buttons and additional information, menu can only be accessed if the ui is enabled (default: true), (possible: true, false)
var closemenu_button_position = "right"; // on which side at the top the menu close button should be (default: "right"), (possible: "left", "right")
var stylesheet = 1; // switch through stylesheets for YouTube (default: 0) (0: disabled) (1: AdvancedYT - improved design and bigger video player for old youtube design)
var accent_color = "blue"; // changes the pages accent color (default (disabled): "red"), (possible: "red", "orange", "blue", "green, "yellow")



//  Hotkeys

var download_hotkey = 119; // hotkey for quick video download (default key: F8 (119), 0 to disable), to look up key codes go to this website: https://tinyurl.com/y73b8h3z
var search_hotkey = 115; // hotkey for quick search (default key: F4 (115), 0 to disable), to look up key codes go to this website: https://tinyurl.com/y73b8h3z
var radio_hotkey = 113; // hotkey to activate the video's radio mix playlist (default key: F2 (113), 0 to disable), to look up key codes go to this website: https://tinyurl.com/y73b8h3z
var player_switch_hotkey = 107; // hotkey to switch between even bigger theater player or normal player (default key: [NUMPAD] ADD (107), 0 to disable), to look up key codes go to this website: https://tinyurl.com/y73b8h3z
var closemenu_hotkey = 27; // hotkey to close the TTP menu (default key: ESC (27), 0 to disable (you can still click on the X)), to look up key codes go to this website: https://tinyurl.com/y73b8h3z












/*Changelog                                Changelog                                Changelog                                Changelog                                Changelog*/

// what's new in this version:
//
// - removed grant "unsafeWindow" due to being obsolete and unsafe
// - added grant "notifications" to improve user experience
// - added grant "setClipboard" to make the tags copyable to clipboard quickly
// - removed radio mix playlist thingy due to incompatibility and also being obsolete
// - improved localization
// - adding cross (†) behind video title if it or description contains "avicii", "xxxtentacion" or "xxxternation", please tell me if I need to add more people to this list
// - added changeable accent color
// - reworked UI to be in the player control bar and not stand out as much
// - removed quick bookmark feature due to also being obsolete (cmon, just press CTRL and D)














(function () {
'use strict';

/*Init                                                                Init                                                                Init*/

var curversion = GM_info.script.version;
var error_content = "";
var URLhost = window.location.host;
var URLpath = window.location.pathname;
var curURL = URLhost + "" + URLpath;
var queryString = window.location.search;
queryString = queryString.substring(1);
var watermarkcontent = "";

console.log("TamperTubePlus v" + curversion + " - by Sv443 / Sven Fehler - GitHub: https://github.com/sv443/");
console.log("TamperTubePlus - Debug enabled: " + log_to_console);
if(log_to_console) {
    console.log("--BEGIN TamperTubePlus Debug");
}



/*Languages                                                                Languages                                                                Languages*/

var lang_dl_format, lang_confirm_dl_retry, lang_enter_search_string, lang_no_mix_pl, lang_copied_tags, lang_copy, lang_copy_title, lang_tag_reload_title, lang_reload_page, lang_to_show_new_tags, lang_open_ttp_menu;
var lang_download_mp3, lang_download_mp4;
switch (ttp_language) {
    case "en":
        chlang("en");
        break;
    case "de":
        chlang("de");
      break;
    default:
        chlang("en");
        break;
}

function chlang(lang){
    if(lang == "en"){
        lang_dl_format = "Download video - choose format\nAvailable Options: mp3,m4a,aac,flac,ogg,wma,mp4,avi,wmv,3gp";
        lang_confirm_dl_retry = "Entered value does not match available file formats (mp3,m4a,aac,flac,ogg,wma,mp4,avi,wmv,3gp)\nTry again?";
        lang_enter_search_string = "Enter search string:";
        lang_no_mix_pl = "This video doesn't have a mix playlist available";
        lang_copied_tags = "Copied video tags to clipboard";
        lang_copy = "Copy";
        lang_copy_title = "Copy tags to clipboard";
        lang_tag_reload_title = "YouTube limitation - page needs to be reloaded to show new tags";
        lang_reload_page = "Reload page";
        lang_to_show_new_tags = "to show new tags";
        lang_open_ttp_menu = "Open the TamperTubePlus menu";
        lang_download_mp3 = "Download as MP3";
        lang_download_mp4 = "Download as MP4";
        if(log_to_console) {
            console.log("    loaded english language");
        }
    }
    else if(lang == "de"){
        lang_dl_format = "Video herunterladen - Format auswählen\nVerfügbare Formate: mp3,m4a,aac,flac,ogg,wma,mp4,avi,wmv,3gp";
        lang_confirm_dl_retry = "Eingegebenes Format entspricht nicht den verfügbaren Formaten (mp3,m4a,aac,flac,ogg,wma,mp4,avi,wmv,3gp)\nErneut versuchen?";
        lang_enter_search_string = "Suchbegriff eingeben:";
        lang_no_mix_pl = "Dieses Video hat keine verfügbare Mix-Playlist";
        lang_copied_tags = "Die Video-Tags wurden in die Zwischenablage kopiert";
        lang_copy = "Kopieren";
        lang_copy_title = "Kopiere Video-Tags in die Zwischenablage";
        lang_tag_reload_title = "YouTube Limitation - Seite muss neu geladen werden, um neue Tags anzuzeigen";
        lang_reload_page = "Seite neu laden,";
        lang_to_show_new_tags = "um neue Tags anzuzeigen";
        lang_open_ttp_menu = "Öffne das TamperTubePlus Menü";
        lang_download_mp3 = "Lade als MP3 herunter";
        lang_download_mp4 = "Lade als MP4 herunter";
        if(log_to_console) {
            console.log("    loaded german language");
        }
    }
}

var accent_rotation;
switch(accent_color){
    case "red":
        accent_color = "ff0000";
        accent_rotation = "0deg";
        break;
    case "orange":
        accent_color = "ff7700";
        accent_rotation = "0deg";
        break;
    case "blue":
        accent_color = "0f57ff";
        accent_rotation = "-130deg";
        break;
    case "green":
        accent_color = "00840b";
        accent_rotation = "150deg";
        break;
    case "yellow":
        accent_color = "ffff00";
        accent_rotation = "0deg";
        break;
    default:
        accent_color = "ff0000";
        accent_rotation = "0deg";
        break;
}


/*Disable Polymer                                                                Disable Polymer                                                                Disable Polymer*/

if(disable_polymer_design) {
    // this script is not made nor handwritten by me but by Artain on GreasyFork (https://greasyfork.org/en/scripts/32906-get-me-old-youtube)
    function start() {
        var cookie = getPref(),
            pref = "f6=8";
        if(cookie === "fIsAlreadySet") {
            return;
        } else if(cookie !== "noPref"){
            for(var i = 0; i < cookie.length; ++i) {
                pref = pref + "&" + cookie[i].key + "=" + cookie[i].value;
            }
        }
        changePref(pref);
    }

    function changePref(values) {
        var d = new Date();
        d.setTime(d.getTime() + (100*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = "PREF=" + values + ";" + expires + ";domain=.youtube.com;hostonly=false;path=/";
        location.reload();
    }

    function getPref() {
        var cookie = document.cookie,
            splitC = cookie.split(";");
        for(var i = 0; i < splitC.length; ++i) {
            if(splitC[i].trim().indexOf("PREF") === 0) {
                if(splitC[i].trim().indexOf("f6=8") > -1) {
                    return "fIsAlreadySet";
                }
                var c = [],
                    splitValues = splitC[i].substring(5).split("&");
                for(var k = 0; k < splitValues.length; ++k) {
                    var splitV = splitValues[k].split("=");
                    if(splitV[0] !== "f6") {
                        var kv = {};
                        kv.key = splitV[0];
                        kv.value = splitV[1];
                        c.push(kv);
                    }
                }
                return c;
            }
        }
        return "noPref";
    }
    start();
}


/*UI Elements                                                                UI Elements                                                                UI Elements*/

if (enable_ui && disable_polymer_design && !URLpath.includes("embed") && URLpath.includes("watch")) {
    document.addEventListener("DOMContentLoaded", function(){//new ui design
        var y = document.createElement("span");
        y.id="ttp_download_mp3_span";
        y.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id="ttp_download_mp3" onclick="window.open(' + "'" + "http://convert2mp3.net/addon_call.php?format=mp3&url=" + curURL + "?" + queryString + "'" + ')" class="ytp-button" aria-pressed="false" title="' + lang_download_mp3 + '"><img style="padding:0.3vw;" src="https://raw.githubusercontent.com/Sv443/code/master/resources/images/newdlmp3.png" height="70%"></img></button>'
            + '<button id="ttp_menu" onclick="" class="ytp-button" aria-pressed="false" title="Open TamperTubePlus Menu"><img style="padding:0.3vw;" src="https://raw.githubusercontent.com/Sv443/code/master/resources/favicons/tampertubeplusv5.png" height="70%"></img></button>'
            + '<button id="ttp_download_mp4" onclick="window.open(' + "'" + "http://convert2mp3.net/addon_call.php?format=mp4&url=" + curURL + "?" + queryString + "'" + ')" class="ytp-button" aria-pressed="false" title="' + lang_download_mp4 + '"><img style="padding:0.3vw;" src="https://raw.githubusercontent.com/Sv443/code/master/resources/images/newdlmp4.png" height="70%"></img></button>';
        document.getElementsByClassName("ytp-chrome-controls")[0].appendChild(y);
        document.getElementById("ttp_menu").addEventListener("click", function () {
            openmenu();
        });
    });
}
else if(enable_ui && !disable_polymer_design && !URLpath.includes("embed") && URLpath.includes("watch")) {
    document.addEventListener("DOMContentLoaded", function(){//new ui design
        var y = document.createElement("span");
        y.id="ttp_download_mp3_span";
        y.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id="ttp_download_mp3" onclick="window.open(' + "'" + "http://convert2mp3.net/addon_call.php?format=mp3&url=" + curURL + "?" + queryString + "'" + ')" class="ytp-button" aria-pressed="false" title="' + lang_download_mp3 + '"><img style="padding:0.3vw;" src="https://raw.githubusercontent.com/Sv443/code/master/resources/images/newdlmp3.png" height="70%"></img></button>'
            + '<button id="ttp_menu" class="ytp-button" aria-pressed="false" title="Open TamperTubePlus Menu"><img style="padding:0.3vw;" src="https://raw.githubusercontent.com/Sv443/code/master/resources/favicons/tampertubeplusv5.png" height="70%"></img></button>'
            + '<button id="ttp_download_mp4" onclick="window.open(' + "'" + "http://convert2mp3.net/addon_call.php?format=mp4&url=" + curURL + "?" + queryString + "'" + ')" class="ytp-button" aria-pressed="false" title="' + lang_download_mp4 + '"><img style="padding:0.3vw;" src="https://raw.githubusercontent.com/Sv443/code/master/resources/images/newdlmp4.png" height="70%"></img></button>';
        document.getElementsByClassName("ytp-chrome-controls")[0].appendChild(y);
        document.getElementById("ttp_menu").addEventListener("click", function () {
            alert("Menu is currently not available for the new YouTube design");
        });
    });
}

if(disable_polymer_design){ // RIP
    document.addEventListener("DOMContentLoaded", function(){
        setInterval(function(){
            if(document.getElementById("eow-title").innerHTML.toLowerCase().includes("avicii") || document.getElementById("eow-title").innerHTML.toLowerCase().includes("xxxtentacion") || document.getElementById("eow-title").innerHTML.toLowerCase().includes("xxxternation") || document.getElementById("eow-description").innerHTML.toLowerCase().includes("avicii") || document.getElementById("eow-description").innerHTML.toLowerCase().includes("xxxtentacion") || document.getElementById("eow-description").innerHTML.toLowerCase().includes("xxxternation")){
                if(!document.body.innerHTML.includes("ttp_rip")){
                    console.log("RIP †");
                    var t = document.createElement("span");
                    t.innerHTML="&nbsp;<b>†</b>";
                    t.id="ttp_rip";
                    t.title="Rest In Peace ♥";
                    document.getElementById("eow-title").appendChild(t);
                }
            }
        }, 1000);
    });
}

var menuelem = document.createElement('div');
function openmenu() {
    if(log_to_console) {
        console.log("    triggered the menu");
    }
    if(disable_polymer_design && !document.body.innerHTML.includes("id='ttp_menu_box'") && closemenu_button_position.includes("left") || closemenu_button_position.includes("right")){
        menuelem.align="center";
        menuelem.innerHTML="<div id='ttp_menu_box' style='position:fixed;left:15vw;top:70px;z-index:1000;width:70vw;height:80vh;background-color:#dfdfdf;border-radius:15px;'>"
        + "<img title='Close' id='closemenuelem' width='30px'"
        + " height='30px' style='position:absolute;top:0px;" + closemenu_button_position + ":0px;border-radius:15px;z-index:1001;cursor:pointer;'"
        + " src='https://sv443.github.io/code/resources/images/buttonmiddleraw_red.png'"
        + " onclick='document.getElementById(" + '"' + "ttp_menu_box" + '"' + ").outerHTML=" + '""'// concatenation errors can't be fixed
        + ";document.getElementById(" + '"' + "ttp_menu_box" + '"' + ").innerHTML=" + '""' + ";'></img>"// concatenation errors can't be fixed
        + "<img title='Close' id='closemenuelem' width='30px'"
        + " height='30px' style='position:absolute;top:0px;" + closemenu_button_position + ":0px;border-radius:15px;z-index:1001;cursor:pointer;'"
        + " src='https://raw.githubusercontent.com/Sv443/code/master/resources/images/buttonwhitex.png'"
        + " onclick='document.getElementById(" + '"' + "ttp_menu_box" + '"' + ").outerHTML=" + '""'// concatenation errors can't be fixed
        + ";document.getElementById(" + '"' + "ttp_menu_box" + '"' + ").innerHTML=" + '""' + ";'></img>"// concatenation errors can't be fixed
        + "<div style='font-size:16px;width:90%;height:100%;text-align:left;z-index:1002;'><br>"
        + "<h1>Settings (Work in Progress):</h1><br>"
        + "<span id='menu_setting1'>Language</span>&nbsp;&nbsp;<span id='menu_setting1_output'>OUT</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<span id='menu_setting2'>Debug</span>&nbsp;&nbsp;<span id='menu_setting2_output'>OUT</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<span id='menu_setting3'>Watermark</span>&nbsp;&nbsp;<span id='menu_setting3_output'>OUT</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<span id='menu_submit'>Submit</span>"
        + "</div></div>";

        //ttp_language = "en/de";log_to_console = true/false;enable_version_watermark = true/false;disable_polymer_design = true/false;enable_ui = true/false;button_color = "blue/orange/green/red";button_size = "normal/small/large";
        //download_hotkey = 119;search_hotkey = 115;radio_hotkey = 113;closemenu_hotkey = 27;closemenu_button_position = "right/left";search_engine = "duckduckgo/google/ecosia/bing/yahoo";stylesheet = 0/1;

        document.addEventListener("DOMContentLoaded", function(){
            document.getElementById("menu_setting1").style="color:white;background-color:#8a8a8a;border-radius:3px;width:100px;text-align:center;cursor:pointer;";
            document.getElementById("menu_setting2").style="color:white;background-color:#8a8a8a;border-radius:3px;width:100px;text-align:center;cursor:pointer;";
            document.getElementById("menu_setting3").style="color:white;background-color:#8a8a8a;border-radius:3px;width:100px;text-align:center;cursor:pointer;";
            document.getElementById("menu_submit").style="position:absolute;left:40%;right:40%;bottom:2px;font-size:20px;color:white;background-color:#8a8a8a;border-radius:3px;width:150px;text-align:center;cursor:pointer;";

            document.getElementById("menu_setting1").addEventListener("click", function(){document.getElementById("menu_setting1_output").innerHTML="clicked";});
            document.getElementById("menu_setting2").addEventListener("click", function(){document.getElementById("menu_setting2_output").innerHTML="clicked";});
            document.getElementById("menu_setting3").addEventListener("click", function(){document.getElementById("menu_setting3_output").innerHTML="clicked";});
            document.getElementById("menu_submit").addEventListener("click", function(){if(enable_notifications){GM_notification("The menu is currently work in progress!", "WIP");}});
        });

        document.getElementById("masthead-positioner").appendChild(menuelem);
        document.addEventListener("keyup", function (e) {
            if(e.keyCode == closemenu_hotkey) {
                menuelem.innerHTML="";
                menuelem.outerHTML="";
                gettags();
            }
        });
    }
    else if(!closemenu_button_position.includes("left") || !closemenu_button_position.includes("right")){
        GM_notification("Incorrect menu close button position value was chosen in the settings - please go to the settings and correct it!", "Error:");
    }
}

var taglist;
window.onload = function(){
    if(show_tags_in_description){
       setInterval(function(){
           if(!document.body.innerHTML.includes('id="ttp_taglist"')){
               taglist="";
               gettags();
           }
       }, 500);
    }
};

function gettags(){
    taglist = "<br><br><span style='color:#" + accent_color + ";cursor:help;' title='TamperTubePlus (v" + curversion + ") (github.com/sv443/tampertubeplus)'>Video Tags (<a style='cursor:copy;' id='ttp_copy_taglist' title='" + lang_copy_title + "'>" + lang_copy + "</a>):</span><br>";
    var metas = document.getElementsByTagName('meta');
    var metanbr = 0;
    var rawtags;
    for(var ii = 0; ii < metas.length; ii++) {
        if(metas[ii].getAttribute("property") == "og:video:tag") {
            metanbr++;
            if(metanbr != 1){
                taglist += ", ";
                rawtags += ", ";
            }
            taglist += metas[ii].getAttribute("content");
            rawtags += metas[ii].getAttribute("content");
            var mlm = metas.length - 1;
        }
    }
    taglist += "<br><br><span style='color:#" + accent_color + ";cursor:help;' title='" + lang_tag_reload_title + "'><a onclick='window.location.reload();'>" + lang_reload_page + "</a> " + lang_to_show_new_tags + "</span>";
    var tagcontainer = document.createElement("div");
    tagcontainer.id = "ttp_taglist";
    tagcontainer.innerHTML = "<span id='ttp_tags'>" + taglist + "</span>";
    if(disable_polymer_design == true){
        document.getElementById("watch-description-extras").appendChild(tagcontainer);
    }
    document.getElementById("ttp_copy_taglist").addEventListener("click", function(){GM_setClipboard(rawtags);if(enable_notifications){GM_notification(lang_copied_tags, "TamperTubePlus");}});
}


/*Switch /watch and /embed                                                                Switch /watch and /embed                                                                Switch /watch and /embed*/

function getwatchid() {
    if(window.location.href.includes("/watch")){
        var w1 = window.location.href.split("?");
        var w2 = w1[1].split("&");
        for(var i = 0; i < w2.length; i++){
            if(w2[i].includes("v=")){
                var wd = w2[i].replace("v=","");
                if(log_to_console){console.log("    watch id: " + wd)}
                return wd;
            }
        }
    }
    else if(window.location.href.includes("/embed")){
        var pn = window.location.pathname.split("/");
        if(log_to_console){console.log("    watch id: " + pn[2])}
        return pn[2];
    }
}

function parsevideotime() {
    var rawvt = document.getElementsByClassName("ytp-time-current")[0].innerHTML;
    var vtsp = rawvt.split(":");
    var mins = vtsp[0];
    var secs = vtsp[1];
    if(log_to_console){console.log("    switching /watch and /embed with " + mins + " minutes and " + secs + " seconds");}
    if(mins > 0){
        return parseInt(mins) * parseInt(60) + parseInt(secs);
    }
    else {
        return secs;
    }
}

document.addEventListener("keydown", function (e) {
    if(e.keyCode == player_switch_hotkey){
        pressK();
        if(window.location.href.includes("/watch")){
            setTimeout(function(){window.location.replace("https://www.youtube.com/embed/" + getwatchid() + "?autoplay=1&start=" + parsevideotime());}, 400);
        }
        else if(window.location.href.includes("/embed")){
            setTimeout(function(){window.location.replace("https://www.youtube.com/watch?v=" + getwatchid() + "&t=" + parsevideotime() + "s");}, 400);
        }
    }
});

function pressK() {
    var presskevent = new KeyboardEvent("keypress", {key : "k", char : "k", ctrlKey: false, shiftKey: false});
    document.body.dispatchEvent(presskevent);
}


/*Video Downloader                                                                Video Downloader                                                                Video Downloader*/

document.addEventListener("keydown", function (e) {
    if(e.keyCode == download_hotkey && URLpath.includes("/watch")) {
        if(log_to_console) {
            console.log("    registered download keystroke: " + download_hotkey);
        }
        openc2mp3();
    }
    else if(e.keyCode == download_hotkey && URLpath.includes("/subscribe_embed")) {
        if(log_to_console) {
            console.log("    registered download keystroke: " + download_hotkey);
        }
        openc2mp3();
    }
});

function openc2mp3() {
    var dl_format = prompt(lang_dl_format);
    if(dl_format == "mp3" || dl_format == "m4a" || dl_format == "aac" || dl_format == "flac" || dl_format == "ogg" || dl_format == "wma" || dl_format == "mp4" || dl_format == "avi" || dl_format == "wmv" || dl_format == "3gp") {
        if(log_to_console) {
            console.log("    download - entered correct file format: " + dl_format + ", downloading...");
        }
        GM_openInTab("http://convert2mp3.net/addon_call.php?format=" + dl_format + "&url=" + curURL + queryString);
    }
    else {
        if(dl_format === null || dl_format === "") {
            if(log_to_console) {
                console.log("    download - cancelled operation");
            }
            return null;
        }
        else if (dl_format == "succ") {
            GM_openInTab("https://sv443.github.io/code/succ.html");
        }
        else {
            if(log_to_console) {
                console.log("    download - entered wrong file format: " + dl_format);
            }
            var confirmretry = confirm(lang_confirm_dl_retry);
            if(confirmretry) {}
            else {
                if(log_to_console) {
                    console.log("    download - cancelled operation after retrying");
                }
            }
        }
    }
}


/*Quick Search                                                                Quick Search                                                                Quick Search*/

document.addEventListener("keyup", function (e) {
    if(e.keyCode == search_hotkey) {
        if(log_to_console) {
            console.log("    registered search keystroke: " + search_hotkey);
        }
        var search_string = prompt(lang_enter_search_string);
        if(search_string !== null && search_string !== "null" && search_string !== "") {
            switch (search_engine) {
                case "google":
                    GM_openInTab("https://google.com/search?q=" + search_string);
                    if (log_to_console) {
                        console.log("    searched for '" + search_string + "' in google");
                    }
                    break;
                case "duckduckgo":
                    GM_openInTab("https://duckduckgo.com/?q=" + search_string);
                    if (log_to_console) {
                        console.log("    searched for '" + search_string + "' in duckduckgo");
                    }
                    break;
                case "bing":
                    GM_openInTab("https://bing.com/search?q=" + search_string);
                    if (log_to_console) {
                        console.log("    searched for '" + search_string + "' in bing");
                    }
                    break;
                case "yahoo":
                    GM_openInTab("https://search.yahoo.com/search?p=" + search_string);
                    if (log_to_console) {
                        console.log("    searched for '" + search_string + "' in yahoo");
                    }
                    break;
                case "ecosia":
                    GM_openInTab("https://www.ecosia.org/search?q=" + search_string);
                    if (log_to_console) {
                        console.log("    searched for '" + search_string + "' in ecosia");
                    }
                    break;
                case "disabled":
                    break;
                default:
                    GM_notification("You chose the wrong search engine in the settings! Opening Google as a default", "Error:");
                    GM_openInTab("https://google.com/search?q=" + search_string);
                    if (log_to_console) {
                          console.log("    wrong search engine chosen");
                    }
                    break;
            }
        }
    }
});


/*CSS Stylesheets                                                                CSS Stylesheets                                                                CSS Stylesheets*/
document.addEventListener("DOMContentLoaded", function() {
    new GM_addStyle(`
        .ytp-swatch-background-color{background-color:#` + accent_color + `;}
        .ytp-settings-button.ytp-hd-quality-badge::after{background-color:#` + accent_color + `;}
        sup.ytp-swatch-color{color:#` + accent_color + `;}
        .logo{filter:hue-rotate(`+ accent_rotation + `)}
        .yt-deemphasized-text{background-color:#` + accent_color + `;}
        .exp-invert-logo .resume-playback-progress-bar{background-color:#` + accent_color + `;}
        .exp-invert-logo .yt-uix-button-subscribe-branded{filter:hue-rotate(`+ accent_rotation + `)}
    `);
});
if(log_to_console) {
    console.log("    applying stylesheet " + stylesheet);
}

switch (stylesheet) {
    case 0:
        if (log_to_console) {
            console.log("    stylesheet was disabled in the settings");
        }
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
        error_content = "incorrect stylesheet value was chosen in the settings - disabling stylesheet instead";
        console.log("incorrect value was chosen in the settings - disabling stylesheet");
        break;
}


/*Info Cards                                                                Info Cards                                                                Info Cards*/

if(disable_info_cards_if_annotations_are_disabled){
    // script by q1k (https://greasyfork.org/de/scripts/23788-youtube-card-annotations-disable)
    var checkExist = setInterval(function() {
        if ( $('.playing-mode').length ) {
            $('.ytp-settings-button').click();
            $('.ytp-settings-button').click();
            $('<style> .ytp-ce-element { display: none; } </style>').appendTo(document.head);
            $('.ytp-menuitem').click(function() {
                if ($(this).text().trim() === "Annotations") {
                    if ($(this).attr('aria-checked') == 'true') {
                        $('.ytp-ce-element').css('display', 'block');
                    } else {
                        $('.ytp-ce-element').css('display', 'none');
                    }
                }
            });
            clearInterval(checkExist);
        }
    }, 1000);
}


/*End                                                                End                                                                End*/

if(log_to_console) {
    console.log("--END TamperTubePlus");
}
})();
/* my temporary dev code storage

save and get key's value
GM_setValue(key, value);
GM_getValue(key, defaultValue);

list all keys
GM_listValues();

delete key and value
GM_deleteValue(key);



google translate url format:
https://translate.google.com/translate?hl=en&sl=auto&tl=TWO_CHAR_LANG_CODE&u=URL_TO_TRANSLATE
*/
