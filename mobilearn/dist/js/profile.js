(async function() {
	document.getElementsByClassName("posts")[0].hidden = false;
	await sleep(3000);
	document.querySelectorAll(".fakepost").forEach((el) => {
		el.remove();
	});
	document.querySelectorAll(".post").forEach((el) => {
		el.hidden = false;
		el.onclick = () => {
			goto(Links.blog.post + el.id.split("_")[1]);
		};
	});
}());

var fab = document.getElementById("fab");
var args = document.location.search.replace("?", "").replace(/\+/g, " ").split("&");
var id = args[0].split("=")[0] == "id" ? decodeURIComponent(args[0].split("=")[1].replace(/\+/g, " ")) : "undefined";
if (id != undefined) {
	// todo: load from XHR
	var user = {
		"id": id,
		"thumbnail": "dist/assets/user.png",
		"name": "بهمن احمدی",
		"type": "admin",
		"followers": [
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/user.png",
				"name": "بهمن احمدی"
			},
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/user.png",
				"name": "بهمن احمدی"
			},
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/user.png",
				"name": "بهمن احمدی"
			},
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/user.png",
				"name": "بهمن احمدی"
			},
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/user.png",
				"name": "بهمن احمدی"
			},
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/user.png",
				"name": "بهمن احمدی"
			},
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/user.png",
				"name": "بهمن احمدی"
			},
		],
		"following": [
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/admin.png",
				"name": "بهمن احمدی"
			},
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/user.png",
				"name": "بهمن احمدی"
			},
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/admin.png",
				"name": "بهمن احمدی"
			},
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/user.png",
				"name": "بهمن احمدی"
			},
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/admin.png",
				"name": "بهمن احمدی"
			},
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/user.png",
				"name": "بهمن احمدی"
			},
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/admin.png",
				"name": "بهمن احمدی"
			},
			{
				"id": "USER-GUID",
				"thumbnail": "dist/assets/admin.png",
				"name": "بهمن احمدی"
			},
		],
		"posts": [
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
		]
	};
	
	if (user_guid != user.id) {
		// todo: load from XHR
		var isFollowed = false;
		if (isFollowed) {
			fab.innerHTML = "<i class='bi bi-person-dash fab-ic'></i>";
		} else {
			fab.innerHTML = "<i class='bi bi-person-plus fab-ic'></i>";
		}
	} else {
		// releasing article
		var isFollowed = null;
		fab.innerHTML = "<i class='bi bi-pencil fab-ic'></i>";
	} 
	
	document.getElementById("userthumb").src = user.thumbnail;
	document.getElementById("usertype").innerHTML = user.type == "admin" ? "ادمین" : "کاربر";
	document.getElementById("username").innerHTML = user.name;
	document.getElementById("username").innerHTML += user.isVerified ? "<i class='bi bi-check-circle tik'></i>" : "";
	document.getElementById("following").innerHTML = persianizeNums(separatingNums(user.following.length));
	document.getElementById("followers").innerHTML = persianizeNums(separatingNums(user.followers.length));
	document.getElementById("posts").innerHTML = persianizeNums(separatingNums(user.posts.length));

	
	document.getElementById("report").onclick = async () => {
		// report
		dialog(
			[
				"var(--color-white);",
				"var(--color-amber);",
				"var(--color-gray-low);",
				"var(--color-gray-strong);"
			],
			{
				"header": [
					{
						"icon": "exclamation-triangle",
						"title": "گزارش"
					},
					{
						"element": "<button class='bi bi-x btn' id='dialogbtn_hide'></button>"
					}
				],
				"content": {
					"html": `
<div class="report">
لطفا توضیح دهید که چرا فعالیت این کاربر را خلاف قوانین میدانید:<br>
<input class="dialog-field" type="text" id="report" placeholder="توضیحات بیشتری ارائه دهید..."/>
</div>
				`
				},
				"footer": [
					[],
					[
						{
							"type": "success",
							"id": "done",
							"text": "ارسال",
							"event": `report(document.getElementById("report").value);`
						}
					]
				]
			}
		);
	};
	
	var report = (description) => {
		if (description != "") {
			document.getElementById("dialogbtn_hide").click();
			// todo: use XHR for send request
		} else {
			document.getElementById("dialogbtn_hide").click();
			errorToast("گزارش به علت نقص ورودی ارسال نشد");
		}
	};
	
	document.getElementById("share").onclick = async () => {
		// share
		const shareData = {
			title: user.name,
			text: `«${user.name}» را در مبی‌لرن دنبال کنید:\n${window.location.origin + root + Links.profile + user.id}`,
			url: Links.profile + user.id
		};
	
		// Share must be triggered by "user activation"
		try {
			await navigator.share(shareData);
		} catch (err) {
			console.log(err);
		}
	};
	
	var showFollowers = () => {
		html = "<div class='users'>";
		for (var follower of user.followers) {
			html += `
<div class="user" onclick="goto(Links.profile + '${follower.id}');">
	<img src="${follower.thumbnail}" alt="[AVATAR]" class="user-thumbnail"/>
	<p class="user-name">${follower.name}</p>
</div>
			`;
		}
		dialog(
			[
				"var(--color-white);",
				"var(--color-primary);",
				"var(--color-gray-low);",
				"var(--color-gray-strong);"
			],
			{
				"header": [
					{
						"icon": "person-fill",
						"title": "دنبال کنندگان شما"
					},
					{
						"element": "<button class='bi bi-x btn' id='dialogbtn_hide'></button>"
					}
				],
				"content": {
					"html": html + "</div>"
				},
				"footer": [
					[],
					[
						{
							"type": "success",
							"id": "done",
							"text": "حله",
							"event": `document.getElementById("dialogbtn_hide").click();`
						}
					]
				]
			}
		);
	};
	
	var showFollowings = () => {
		html = "<div class='users'>";
		for (var following of user.following) {
			html += `
<div class="user" onclick="goto(Links.profile + '${following.id}');">
	<img src="${following.thumbnail}" alt="[AVATAR]" class="user-thumbnail"/>
	<p class="user-name">${following.name}</p>
</div>
			`;
		}
		dialog(
			[
				"var(--color-white);",
				"var(--color-primary);",
				"var(--color-gray-low);",
				"var(--color-gray-strong);"
			],
			{
				"header": [
					{
						"icon": "people-fill",
						"title": "دنبال شوندگان شما"
					},
					{
						"element": "<button class='bi bi-x btn' id='dialogbtn_hide'></button>"
					}
				],
				"content": {
					"html": html + "</div>"
				},
				"footer": [
					[],
					[
						{
							"type": "success",
							"id": "done",
							"text": "حله",
							"event": `document.getElementById("dialogbtn_hide").click();`
						}
					]
				]
			}
		);
	};
	
	var fabAction = async () => {
		switch (isFollowed) {
			case null:
				dialog(
					[
						"var(--color-white);",
						"var(--color-primary);",
						"var(--color-gray-low);",
						"var(--color-gray-strong);"
					],
					{
						"header": [
							{
								"icon": "pencil",
								"title": "انتشار مقالهٔ جدید"
							},
							{
								"element": "<button class='bi bi-x btn' id='dialogbtn_hide'></button>"
							}
						],
						"content": {
							"html": `
<div class="new-article">
	کاور مقاله : <input type="file" id="cover"/>
	<input type="text" class="dialog-field article-title-field" id="title" placeholder="عنوان مقاله"/> <br>
	<textarea type="text" rows="5" class="dialog-field article-content-field" name="description" id="content" placeholder="چیزی بنویسید..."></textarea>
</div>
							`
						},
						"footer": [
							[],
							[
								{
									"type": "danger",
									"id": "cancel",
									"text": "لغو",
									"event": `document.getElementById("dialogbtn_hide").click();`
								},
								{
									"type": "success",
									"id": "done",
									"text": "انتشار",
									"event": `releaseArticle(
										document.getElementById("cover").src,
										document.getElementById("title").value,
										CKEDITOR.instances.content.getData()
									);`
								}
							]
						]
					}
				);
				CKEDITOR.replace('description');
				CKEDITOR.config.contentsLangDirection = "rtl";
				CKEDITOR.config.language = 'fa';
				break;
			
			case true:
				// todo: use XHR
				successToast("کاربر دیگر دنبال نمی‌شود");
				window.location.reload();
				break;

			default:
				// todo: use XHR
				successToast("کاربر باموفقیت دنبال شد");
				window.location.reload();
		}
	};
	
	var releaseArticle = (cover, title, content) => {
		document.getElementById("dialogbtn_hide").click();
		console.log(cover, title, content);
		// todo: use XHR
		successToast("مقاله در دست بررسی است");
	};
}
else {
	window.history.back();
}