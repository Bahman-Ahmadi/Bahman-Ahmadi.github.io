// share a music url
var share = (link) => {
    Android.shareLink(link);
}

// download a music from the server
var download = (links) => {
    Android.showAD();
    links.forEach((link) => {
        if (Android.isAdShown()) {
            Android.download(window.location.origin+"/"+link, link.split("/")[link.split("/").length - 1]);
        } else {
            //Android.showToast("برای دانلود باید یک تبلیغ ببینید");
        }
    });
}