var user_guid = window.location.search.split("=")[1];
if (user_guid == "undefined") {
    app.setItem("guid", GET("/api/user?action=add").data.object.id);
    goto(`/?id=${app.getItem("guid")}`);
}

function showAndroidToast(toast) {
    if(typeof app !== "undefined" && app !== null) {
        app.showToast(toast);
    } else {
        alert("Not viewing in webview");
    }
}

// play a downloaded music
var play = (filename) => {
    app.playMusic(filename);
}

// share a music url
var share = (link) => {
    app.shareLink(link);
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