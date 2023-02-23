var user_guid = window.location.search.substr(1).split("&")[0].split("=")[1];
try {
    var togo = window.location.search.match("https\\:\\/\\/soundcloud\\.com\\/.+\\?")[0];
} catch (e) {
    var togo = "";
}

if (user_guid == "undefined" && Android.getItem("guid") == "undefined") {
    Android.setItem("guid", GET("/api/user?action=add").data.object.id);
    window.location = `/?id=${Android.getItem("guid")}&link=${togo}`;
} else if (user_guid == "undefined" && Android.getItem("guid") != "undefined") {
    window.location = `/?id=${Android.getItem("guid")}&link=${togo}`;
}

function showAndroidToast(toast) {
    if(typeof Android !== "undefined" && Android !== null) {
        Android.showToast(toast);
    } else {
        alert("Not viewing in webview");
    }
}

if (togo != "") {
    window.location = `/dl?id=${user_guid}&link=${togo}`;
}

var dl = (btn) => {
    btn.innerHTML = `<img src="https://bayanbox.ir/view/1141850153390227556/ajax-loader.gif" class="loader"/>`;
    goto(`dl?user=${user_guid}&link=${document.getElementById('url').value}`);
}

// play a downloaded music
var play = (filename) => {
    Android.playMusic(filename);
}

// share a music url
var share = (link) => {
    Android.shareLink(link);
}

var seeAllDownloads = () => {
    var downloads = GET(`/api/user?action=get&id=${user_guid}`).data.object.downloads;
    var parent = document.getElementById("dls");
    parent.innerHTML = "";
    downloads.forEach((download) => {
        parent.innerHTML += `
<div class="recent-dl">
    <div class="recent-dl-rightside" onclick="goto('${download.link}');">
        <img class="recent-dl-cover" src="${download.cover}" alt="[TRACK]">
        <div class="recent-dl-rightside-texts">
            <p class="recent-dl-title">${download.name.substr(0, 14)}...</p>
            <p class="bi bi-person-fill recent-dl-artist"> ${download.artist}</p>
        </div>
    </div>
    <div class="recent-dl-leftside">
        <button class="bi bi-play-fill btn-play" onclick='play("${download.artist} - ${download.name}.mp3");'></button>
        <button class="bi bi-share-fill btn-share" onclick='share("${download.link}");'></button>
    </div>
</div>
        `;
    });
}