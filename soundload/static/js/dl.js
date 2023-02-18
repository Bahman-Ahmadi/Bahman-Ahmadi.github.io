// share a music url
var share = (link) => {
    app.shareLink(link);
}

// download a music from the server
var download = (link) => {
    goto(link, true, '_blank');
}