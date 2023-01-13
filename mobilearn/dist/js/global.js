var user_guid = localStorage.getItem("mluser");

var root = "mobilearn/"

var Links = {
	"register": root+"register.html",
	"login": root+"register.html?tab=login",
	"signup": root+"register.html?tab=signup",
	"search": root+"search.html?q=",
	"search_cat": root+"search.html?c=",
	"course": root+"course.html?id=",
	"blog": {
		"posts": root+"blog.html",
		"post": root+"blog.html?post="
	},
	"pay": root+"pay?count=",
	"instagram": "https://instagram.com/mobi.learn",
	"telegram": "https://t.me/mobi_learn",
	"github": "https://github.com/mobi_learn",
	"community": "https://t.me/mobilearn_community",
	"shortlinks": "https://l.bit.ir/ml?id=",
	"watch": root+`watch?user=${user_guid}&course=`,
	"download": root+`download?user=${user_guid}&course=`
};

var theme = localStorage.getItem("theme") == null ? "light" : localStorage.getItem("theme");
document.head.innerHTML += `<link rel="stylesheet" href="dist/css/vars-${theme}.css"/>`;

var goto = (URL, download=false) => {
	var a = document.getElementById("goto");
	if (a != null) {
		a.href = URL.indexOf('http') != -1 ? URL : URL != '' ? window.location.origin+'/'+URL : '';
		a.target = download ? "_blank" : "";
		download ? a.download = "" : "";
	} else {
		document.body.innerHTML += `<a href="${URL.indexOf('http') != -1 ? URL : URL != '' ? window.location.origin+'/'+URL : ''}" id="goto" ${download ? 'target="_blank" download' : ''}></a>`; 
		a = document.getElementById("goto");
	}
	a.click();
};

var sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

// Clickablization bottomnav items
if (document.getElementsByClassName("item") != null) {
	document.querySelectorAll('.item').forEach((el) => {
		el.onclick = () => { goto(root+el.id+".html") };
	});
}

var persianizeNums = (num) => {
	num += "";
	return num.replace(/0/g, "۰").replace(/1/g, "۱").replace(/2/g, "۲").replace(/3/g, "۳").replace(/4/g, "۴").replace(/5/g, "۵").replace(/6/g, "۶").replace(/7/g, "۷").replace(/8/g, "۸").replace(/9/g, "۹");
};
var latinizeNums = (num) => {
	num += "";
	return parseInt(num.replace(/۰/g, "0").replace(/۱/g, "1").replace(/۲/g, "2").replace(/۳/g, "3").replace(/۴/g, "4").replace(/۵/g, "5").replace(/۶/g, "6").replace(/۷/g, "7").replace(/۸/g, "8").replace(/۹/g, "9"));
};

var separatingNums = (num) => {
	var str = num.toString().split('.');
	if (str[0].length >= 5) {
		str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	}
	if (str[1] && str[1].length >= 5) {
		str[1] = str[1].replace(/(\d{3})/g, '$1 ');
	}
	return str.join('.');
};

// TOAST
var toast = async (colors, texts, time, event) => {
	// colors: [BG_Color, Text_Color, Accent_Color] (note: accent_color uses for button, timerline, icon)
	// texts: [icon, mainText, buttonText]
	// icon: an icon from Bootstrap-Icons. this value is that icon but with everything after bi-<...>
	// time: (ms)
	// event: what to do when user clicked button of the toast
	
	if (document.getElementById("toast") != null) {
		document.getElementById("toast").remove();
	} else {
		// make toast box
		document.body.innerHTML += `
			<div id="toast" class="toast-hide">
				<div class="toast-real-container d-flex">
					<div class="toast-rightside">
						<div id="toast_icon" class=""></div>
						<div id="toast_text"></div>
					</div>
					<div class="toast-leftside">
						<button id="toast_btn"></button>
					</div>
				</div>
				<div id="toast_timerline"></div>
			</div>
		`;
	}
	
	// find toast guys
	var btn = document.getElementById("toast_btn");
	var box = document.getElementById("toast");
	var icon_div = document.getElementById("toast_icon");
	var text_div = document.getElementById("toast_text");
	var timerline = document.getElementById("toast_timerline");

	// visiblizition toast
	box.className = "toast-show";

	// style elements base of <colors> parameter
	btn.style = `color: ${colors[2]};`;
	box.style = `background: ${colors[0]};`;
	icon_div.style = `color: ${colors[2]};`;
	text_div.style = `color: ${colors[1]};`;
	timerline.style = `background-color: ${colors[2]};`;

	// set values for icon and text
	icon_div.className = `bi bi-${texts[0]}`;
	text_div.innerHTML = texts[1];
	btn.innerHTML = texts[2];
	
	// set btn click event
	btn.onclick = () => {
		event(box);
	};

	// sleep for reading message by user
	await sleep(time);
	
	// remove the toast box
	box.remove();
};

// DIALOG
var dialog = (colors, contents) => {
	// colors: [BG_Color, Title_Color, Line_Color, Text_Color]
	// contents : {"header": [{"icon": "exclamation-circle", "title": "something"}, [{"element": "HTML"}]], "content": {"text": "something", "html": "<h1>something</h1>"}, "footer": [[{"type": "danger", "text": "something", "event": function}], [{"type": "danger", "text": "something", "event": function},{"type": "danger", "text": "something", "event": function}]]}

	if (document.getElementById("dialog") != null) {
		document.getElementById("dialog").parentNode.remove();
	}

	// make dialog
	document.body.innerHTML += `
		<div class="dialog-container">
			<div id="dialog" class="hide">
				<div id="dialog_header">
					<div id="dh_rightside">
						<p class="bi bi-exclamation-circle" id="dialog_icon"></p>
						<p id="dialog_title" class="bold"></p>
					</div>
					<div id="dh_leftside">
						<button class="btn" id="dialogbtn_hide"><i class="bi bi-x"></i></button>
					</div>
				</div>
				<div id="dialog_line"></div>
				<div id="dialog_content">
					<p id="dialog_text"></p>
				</div>
				<div id="dialog_footer">
					<div id="df_rightside"></div>
					<div id="df_leftside"></div>
				</div>
			</div>
		</div>
	`;
	
	// find dialog guys
	var container = document.getElementById("dialog");
	var header = [document.getElementById("dh_rightside"), document.getElementById("dh_leftside")];
	var icon = document.getElementById("dialog_icon");
	var title = document.getElementById("dialog_title");
	var line = document.getElementById("dialog_line");
	var content = document.getElementById("dialog_content");
	var text = document.getElementById("dialog_text");
	var footer = [document.getElementById("df_rightside"), document.getElementById("df_leftside")];

	// show dialog
	container.className = "show";
	
	// style elements
	container.style = `background: ${colors[0]}; color: ${colors[1]}`;
	line.style = `background: ${colors[2]};`;
	text.style = `color: ${colors[3]};`;
	content.style = `color: ${colors[3]};`;

	// set values for dialog parts
	//
	// header
	icon.className = "bi bi-"+contents.header[0].icon;
	title.innerHTML = contents.header[0].title;
	header[1].innerHTML = contents.header[1].element;
	var cancelBtn = document.getElementById("dialogbtn_hide");
	cancelBtn.style = `background: ${colors[1]}!important; color: ${colors[0]}!important`;
	//
	// content
	contents.content.text != undefined ? text.innerHTML = contents.content.text : content.innerHTML = contents.content.html ;
	//
	// footer
	contents.footer[0].forEach((i) => {footer[0].innerHTML += `<button class="btn btn-dialog btn-dialog-${i.type}" id="dialogbtn_${i.id}" onclick='${i.event}'>${i.text}</button>`;});
	contents.footer[1].forEach((j) => {footer[1].innerHTML += `<button class="btn btn-dialog btn-dialog-${j.type}" id="dialogbtn_${j.id}" onclick='${j.event}'>${j.text}</button>`;});

	// hide dialog
	document.getElementById("dialogbtn_hide").onclick = () => {container.parentNode.remove();};
};

// TOAST SAMPLES
var errorToast = async (text, event=()=>{}, button="تلاش مجدد") => {
	await toast(
		[
			"var(--color-white);",
			"var(--color-contrast);",
			"var(--color-red);"
		],
		[
			"emoji-dizzy-fill",
			text,
			button
		],
		4000,
		event
	);
};

var successToast = async (text, event=()=>{}, button="باشه") => {
	await toast(
		[
			"var(--color-white)",
			"var(--color-contrast)",
			"var(--color-green)"
		],
		[
			"emoji-laughing-fill",
			text,
			button
		],
		3000,
		event
	);
};

// DIALOG SAMPLES
var infoDialog = (title, text, events=['document.getElementById("dialogbtn_hide").click();', 'document.getElementById("dialogbtn_hide").click();']) => {
	dialog(
		[
			"var(--color-white);",
			"var(--color-primary);",
			"var(--color-gray-low);",
			"var(--color-contrast);"
		],
		{
			"header" : [
				{
					"icon": "info",
					"title": title
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"text": text
			},
			"footer": [
				[],
				[
					{
						"type": "danger",
						"id": "cancel",
						"text": "لغو",
						"event": events[0]
					},
					{
						"type": "success",
						"id": "done",
						"text": "حله",
						"event": events[1]
					}
				]
			]
		}
	);
};
var warnDialog = (title, text, actionBtn="تأیید", events=['document.getElementById("dialogbtn_hide").click();', 'document.getElementById("dialogbtn_hide").click();']) => {
	dialog(
		[
			"var(--color-white);",
			"var(--color-amber);",
			"var(--color-amber-low);",
			"var(--color-contrast);"
		],
		{
			"header" : [
				{
					"icon": "exclamation-circle",
					"title": title
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"text": text
			},
			"footer": [
				[],
				[
					{
						"type": "danger",
						"id": "cancel",
						"text": "لغو",
						"event": events[0]
					},
					{
						"type": "success",
						"id": "done",
						"text": actionBtn,
						"event": events[1]
					}
				]
			]
		}
	);
};
