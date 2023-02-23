try {
    var app = Android;
} catch (e) { console.log(e) }

var root = "";

// HTTP GET
var GET = (url) => {
	var result;
	try {
		$.ajax({
			type: "GET",
			url: url,
			datatype: "json",
			async: false,
			success: function(data){
				result = data
			}
		});
	} catch (e) {
		var script = document.createElement('script');
		script.setAttribute('src','../static/lib/jQuery/jquery-3.6.3.min.js');
		document.head.appendChild(script);
		return GET(url);
	}
	return result;
};

// HTTP POST
var POST = (url, data, isFile=false) => {
	var result;
	try {
	    if (isFile) {
    	    $.ajaxSetup({
                async: false,
                processData: false, // important
                contentType: false, // important
            });
	    } else {
	        $.ajaxSetup({
                async: false
	        });
	    }
	    $.post(url, data).done((data) => {result = data});
	} catch (e) {
		var script = document.createElement('script');
		script.setAttribute('src','../static/lib/jQuery/jquery-3.6.3.min.js');
		document.head.appendChild(script);
		return POST(url, data);
	}
	return result;
};

// link diverter
var goto = (URL, download=false, target="") => {
    var a = document.getElementById("goto");
	if (a != null) {
		a.href = URL.indexOf('http') != -1 ? URL : URL != '' ? window.location.origin+'/'+root+URL : '';
		a.target = download || target == "_blank" ? "_blank" : "";
		download ? a.download = "" : "";
	} else {
		document.body.innerHTML += `<a href="${URL.indexOf('http') != -1 ? URL : URL != '' ? window.location.origin+'/'+root+URL : ''}" id="goto" ${download ? 'target="_blank" download' : target == '_blank' ? 'target="_blank"' : ''}></a>`; 
		a = document.getElementById("goto");
	}
	a.click();
};

