var args = document.location.search.replace("?", "").replace(/\+/g, " ").split("&");
var field = document.getElementById("field");
var btn = document.getElementById("searcher");

// Search event
btn.onclick = () => {
	goto(Links.search+field.value.replace(/ /g, "+"));
};

// search favorite searchs on click
document.querySelectorAll(".fav-search").forEach((el) => {
	el.onclick = () => {
		goto(Links.search+el.innerHTML.replace(/ /g, "+"));
	};
});

var showSearchResult = (result) => {
	var html = ``;
	for (var i of result) {
		html += `
<div class="search d-flex">
	<div class="search-rightside d-flex">
		<img class="search-thumbnail" src="${i.thumbnail}" alt="[THUMBNAIL]"/>
		<div class="search-texts">
			<p class="search-title">${i.title}</p>
			<p class="bi bi-person search-author"> ${i.author}</p>
		</div>
	</div>
	<div class="search-leftside">
		<button class="bi bi-caret-left btn btn-goto-search" onclick="goto('${i.link}');"></button>
	</div>
</div>
		`;
	}
	dialog(
		[
			"var(--color-white);",
			"var(--color-primary);",
			"var(--color-gray-low);",
			"var(--color-contrast);"
		],
		{
			"header": [
				{
					"icon": "search",
					"title": `نتایج جستجو (${result.length})`
				},
				{
					"element": "<button class='bi bi-x btn' id='dialogbtn_hide'></button>"
				}
			],
			"content": {
				"html": `<div class="searchs">${html}</div>`
			},
			"footer": [
				[],
				[
					{
						"type": "success",
						"id": "done",
						"text": "<i class='bi bi-check'></i>",
						"event": `document.getElementById("dialogbtn_hide").click();`
					}
				]
			]
		}
	);
};

// search by course name
var q = args[0].split("=")[0] == "q" ? decodeURIComponent(args[0].split("=")[1]).replace(/\+/g, " ") : "undefined";
if (q != "undefined") {
	// todo: load from XHR
	showSearchResult([
		{
			"thumbnail": "dist/assets/banner.jpg",
			"title": "آموزش کاربردی گیت و گیت‌هاب",
			"author": "بهمن احمدی",
			"link": "course.html?id=123456"
		},
		{
			"thumbnail": "dist/assets/banner.jpg",
			"title": "آموزش کاربردی گیت و گیت‌هاب",
			"author": "بهمن احمدی",
			"link": "course.html?id=123456"
		},
		{
			"thumbnail": "dist/assets/banner.jpg",
			"title": "آموزش کاربردی گیت و گیت‌هاب",
			"author": "بهمن احمدی",
			"link": "course.html?id=123456"
		},
		{
			"thumbnail": "dist/assets/banner.jpg",
			"title": "آموزش کاربردی گیت و گیت‌هاب",
			"author": "بهمن احمدی",
			"link": "course.html?id=123456"
		},
		{
			"thumbnail": "dist/assets/banner.jpg",
			"title": "آموزش کاربردی گیت و گیت‌هاب",
			"author": "بهمن احمدی",
			"link": "course.html?id=123456"
		},
	]);
}

// search by category
var c = args[0].split("=")[0] == "c" ? decodeURIComponent(args[0].split("=")[1]) : "undefined";
if (c != "undefined") {
	// todo: load from XHR
	showSearchResult([
		{
			"thumbnail": "dist/assets/banner.jpg",
			"title": "آموزش کاربردی گیت و گیت‌هاب",
			"author": "بهمن احمدی",
			"link": "course.html?id=123456"
		},
		{
			"thumbnail": "dist/assets/banner.jpg",
			"title": "آموزش کاربردی گیت و گیت‌هاب",
			"author": "بهمن احمدی",
			"link": "course.html?id=123456"
		},
		{
			"thumbnail": "dist/assets/banner.jpg",
			"title": "آموزش کاربردی گیت و گیت‌هاب",
			"author": "بهمن احمدی",
			"link": "course.html?id=123456"
		},
		{
			"thumbnail": "dist/assets/banner.jpg",
			"title": "آموزش کاربردی گیت و گیت‌هاب",
			"author": "بهمن احمدی",
			"link": "course.html?id=123456"
		},
		{
			"thumbnail": "dist/assets/banner.jpg",
			"title": "آموزش کاربردی گیت و گیت‌هاب",
			"author": "بهمن احمدی",
			"link": "course.html?id=123456"
		},
	]);
}