if (localStorage.getItem("mluser") == null && localStorage.getItem("mladmin") == null) {
	goto(Links.register);
}

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

var theme = () => {
	localStorage.setItem("theme", localStorage.getItem("theme") == "light" ? "dark" : "light");
	var theme = localStorage.getItem("theme") == null ? "light" : localStorage.getItem("theme");
	document.head.innerHTML += `<link rel="stylesheet" href="dist/css/vars-${theme}.css"/>`;
};

var args = document.location.search.replace("?", "").replace(/\+/g, " ").split("&");
var postId = args[0].split("=")[0] == "post" ? args[0].split("=")[1].replace(/\+/g, " ") : "undefined";
if (postId == "undefined") {
	var fall = document.getElementById("fall");
	var falc = document.getElementById("falc");
	var falr = document.getElementById("falr");
	
	fall.onclick = () => {
		goto(Links.profile + user_guid);
	};
	falc.onclick = () => {
		goto(Links.profile + user_guid);
	};
	falr.onclick = () => {
		goto(Links.blog.posts);
	};
} else {
	// todo: load post from XHR
	var falc = document.getElementById("falc");
	var post = {
		"id": postId,
		"thumbnail": "dist/assets/article.jpg",
		"title": "مفاهیم برنامه‌نویسی (۱)",
		"datetime": ["1401/10/27", "11:22"],
		"author": {
			"thumbnail": "dist/assets/user.png",
			"name": "بهمن احمدی",
			"id": "<USER-GUID>"
		},
		"likes": 20,
		"dislikes": 10,
		"shortlink": Links.blog.shortlinks + postId,
		"comments": [
			{
				"id": "1",
				"thumbnail": "dist/assets/user.png",
				"name": "بهمن احمدی",
				"date": "1401/10/18 02:00",
				"stars": 4,
				"likes": 18,
				"dislikes": 10,
				"text": "لورم ایپسوم ".repeat(40),
				"replies": [
					{
						"id": "1-1",
						"thumbnail": "dist/assets/admin.png",
						"name": "بهمن احمدی",
						"date": "1401/10/19 03:00",
						"likes": 10,
						"dislikes": 18,
						"text": "لورم ایپسوم ".repeat(20),
						"replies": [
							{
								"id": "1-1-1",
								"thumbnail": "dist/assets/user.png",
								"name": "بهمن احمدی",
								"date": "1401/10/20 04:00",
								"likes": 10,
								"dislikes": 18,
								"text": "لورم ایپسوم ".repeat(10),
								"replies": []
							}
						]
					}
				]
			},
			{
				"id": "2",
				"thumbnail": "dist/assets/user.png",
				"name": "بهمن احمدی",
				"date": "1401/10/21 05:00",
				"stars": 5,
				"likes": 18,
				"dislikes": 10,
				"text": "لورم ایپسوم ".repeat(40),
				"replies": []
			},
			{
				"id": "3",
				"thumbnail": "dist/assets/user.png",
				"name": "بهمن احمدی",
				"date": "1401/10/22 06:00",
				"stars": 1,
				"likes": 18,
				"dislikes": 10,
				"text": "لورم ایپسوم ".repeat(40),
				"replies": []
			},
		],
		"html": "تست ".repeat(400)
	};
	var isAuthorFollowed = false;
	var isLiked = false;

	document.getElementsByClassName("posts")[0].hidden = true;
	
	document.getElementById("fall").className = "bi bi-share fal-item fal-left";
	document.getElementById("falr").className = "bi bi-exclamation-triangle fal-item fal-right";
	
	document.getElementById("fall").onclick = async () => {
		// share
		const shareData = {
			title: post.title,
			text: `مقالهٔ ${post.title} نوشتهٔ ${post.author.name} را در مبی‌لرن بیاموزید:\n${post.shortlink}`,
			url: post.shortlink
		};
	
		// Share must be triggered by "user activation"
		try {
			await navigator.share(shareData);
		} catch (err) {
			console.log(err);
		}
	};
	document.getElementById("falr").onclick = async () => {
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
لطفا توضیح دهید که چرا این مورد را خلاف قوانین میدانید:<br>
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
	
	document.getElementsByClassName("posts")[0].outerHTML += `
<div class="article">
	<img class="article-thumbnail" src="${post.thumbnail}" alt="[THUMBANIL]"/>
	<div class="article-content-container">
		<div class="article-content-header d-flex">
			<div class="article-content-header-rightside">
				<p class="article-title bold">${post.title}</p>
				<p class="article-datetime">${persianizeNums(post.datetime[0])} ${persianizeNums(post.datetime[1])}</p>
			</div>
			<div class="article-content-header-leftside d-flex">
				<div>
					<button class="btn btn-article-like" onclick="${post.author.id == user_guid ? `errorToast('شما قادر به پسندیدن مقالهٔ خود نیستید');` : `likeArticle(this.childNodes[0], '${post.id}');`}"><i class="bi bi-hand-thumbs-up" id="likeic_a${post.id}"></i></button> <br>
					<span class="article-likes" id="likes_a${post.id}">${persianizeNums(post.likes)}</span>
				</div>
				<div>
					<button class="btn btn-article-dislike" onclick="${post.author.id == user_guid ? `errorToast('شما قادر به نپسندیدن مقالهٔ خودنیستید');` : `dislikeArticle(this.childNodes[0], '${post.id}');`}"><i class="bi bi-hand-thumbs-down" id="dislikeic_a${post.id}"></i></button> <br>
					<span class="article-dislikes" id="dislikes_a${post.id}">${persianizeNums(post.dislikes)}</span>
				</div>
			</div>
		</div>
		<div class="article-content">${post.html}</div>
	</div>
	<div class="article-author d-flex">
		<div class="article-author-rightside d-flex">
			<img class="author-thumbnail" src="${post.author.thumbnail}" alt="[AVATAR]"/>
			<div class="author-texts">
				<p class="author-name">${post.author.name}</p>
				<a href="${Links.profile + post.author.id}" class="author-link">مشاهدهٔ پروفایل</a>
			</div>
		</div>
		<div class="article-author-leftside">
			${isAuthorFollowed ? `<button class="btn btn-unfollow" onclick="unfollow('${post.author.id}');">لغو اشتراک</button>` : `<button class="btn btn-follow" onclick="follow('${post.author.id}');">دنبال کردن</button>`}
		</div>
	</div>
	
	<!-- COMMENTS -->
	<div class="article-session article-comments">
		<div class="article-session-header d-flex">
			<div class="article-session-header-rightside">
				<p class="article-session-title bold"><i class="bi bi-chat"></i> نظرات مقاله</p>
				<div class="article-session-details d-flex">
					<p class="article-comments-count" id="comments_count"></p>
					<p class="article-comments-stars" id="stars"></p>
				</div>
			</div>
			<div class="article-session-header-leftside">
				<button class="btn btn-sort" onclick="showFilterComments();"><i class="bi bi-funnel-fill"></i></button>
				<button class="btn btn-addComment" onclick="makeNewComment();"><i class="bi bi-plus"></i></button>
			</div>
		</div>
		<div class="comment-line"></div>
		<br>
		<div class="article-comments-container" id="comments"></div>
	</div>
</div>
	`;
	
	// COMMENTS
	function makeComment(comment) {
		comment.replies == undefined ? comment.replies = [] : null;
		var html = `
	<div class="article-comment" id="c${comment.id}">
		<div class="article-comment-header d-flex">
			<div class="article-comment-header-rightside d-flex">
				<img src="${comment.thumbnail}" alt="[AVATAR]" class="article-comment-avatar">
				<div class="article-comment-user">
					<div class="d-flex article-comment-baseinfo">
						<p class="article-comment-user-name">${comment.name}</p>
						${comment.stars >= 1 ? `<p class="article-comment-date">( ${persianizeNums(comment.date)} )</p>` : ''}
					</div>
					<p class="article-comment-user-stars">${comment.stars >= 1 ? "<i class='bi bi-star-fill comment-star'></i>".repeat(comment.stars) : `<p class="article-comment-date">( ${persianizeNums(comment.date)} )</p>`}</p>
				</div>
			</div>
			<div class="article-comment-header-leftside d-flex">
				<div class="article-comment-reactions d-flex">
					<div>
						<button class="btn btn-comment-like" onclick="likeComment(this.childNodes[0], '${comment.id}');"><i class="bi bi-hand-thumbs-up"></i></button> <br>
						<span class="comment-likes" id="likes_c${comment.id}">${persianizeNums(comment.likes)}</span>
					</div>
					<div>
						<button class="btn btn-comment-dislike" onclick="dislikeComment(this.childNodes[0], '${comment.id}');"><i class="bi bi-hand-thumbs-down"></i></button> <br>
						<span class="comment-dislikes" id="dislikes_c${comment.id}">${persianizeNums(comment.dislikes)}</span>
					</div>
				</div>
			</div>
			</div>
			<div class="article-comment-content">${comment.text}</div>
			<div class="article-replies d-flex">
				<button class="btn show-replies" onclick="showReplies('${comment.id}')"><i class="bi bi-caret-down"></i> مشاهده پاسخ‌ها (${persianizeNums(comment.replies.length)})</button>
				<button class="btn btn-reply" onclick="makeNewComment('${comment.id}');"><i class="bi bi-reply-fill"></i></button>
			</div>
			<div class="article-comment-replies" id="replies_${comment.id}" hidden>`;
			
			for (var reply of comment.replies) {
				html += makeComment(reply);
			}
		return html + "</div> </div> </div>";
	}
	
	// inserting json comments as html
	var stars = 0;
	document.getElementById("comments_count").innerHTML = `${persianizeNums(post.comments.length)} نظر`;
	for (var comment of post.comments) {
		stars += comment.stars;
		document.getElementById("comments").innerHTML += makeComment(comment);
	}
	
	// inserting stars average
	document.getElementById("stars").innerHTML = ` (${"<i class='bi bi-star-fill comment-star'></i>".repeat(stars/post.comments.length)}) `;
	
	// filtering comments based on some criterion
	var showFilterComments = () => {
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
						"icon": "funnel",
						"title": "فیلتر کردن"
					},
					{
						"element": "<button class='bi bi-x btn' id='dialogbtn_hide'></button>"
					}
				],
				"content": {
					"html": `
	<div class="comment-filters">
		<div class="comment-filter selected-filter" id="default">بدون فیلتر</div>
		<div class="comment-filter" id="most_popular">محبوب‌ترین ها</div>
		<div class="comment-filter" id="most_hated">منفورترین ها</div>
		<div class="comment-filter" id="newest">جدیدترین ها</div>
		<div class="comment-filter" id="oldest">قدیمی‌ترین ها</div>
	</div>
					`
				},
				"footer": [
					[],
					[
						{
							"type": "success",
							"id": "done",
							"text": "فیلتر کن",
							"event": `filterComments(document.getElementsByClassName("selected-filter")[0].id);`
						}
					]
				]
			}
		);
		document.querySelectorAll(".comment-filter").forEach((el) => {
			el.onclick = () => {
				document.querySelectorAll(".comment-filter").forEach((EL) => {
					EL.className = "comment-filter";
				});
				el.className = "comment-filter selected-filter";
			};
		});
	};
	
	var filterComments = (criterion) => {
		document.getElementById("dialogbtn_hide").click();
		// todo: use XHR to filter comments & valuing result into comment variable 
		post.comments = [];
		document.getElementById("comments").innerHTML = "";
		for (var comment of post.comments) {
			stars += comment.stars;
			document.getElementById("comments").innerHTML += makeComment(comment);
		}
	};
	
	// function to hide/show replies of every comment
	var showReplies = (id) => {
		document.getElementById(`replies_${id}`).hidden = !document.getElementById(`replies_${id}`).hidden;
	};
	
	// functions to like/unlike & dislike/undislike comments
	var likeComment = (ic, id) => {
		if (ic.className == "bi bi-hand-thumbs-up-fill") {
			// todo: send XHR to unlike indexed comment (diff by dislike)
			ic.className = "bi bi-hand-thumbs-up";
			document.getElementById(`likes_c${id}`).innerHTML = persianizeNums(latinizeNums(document.getElementById(`likes_c${id}`).innerHTML) - 1);
		} else {
			// todo: send XHR to like indexed comment
			ic.className = "bi bi-hand-thumbs-up-fill";
			document.getElementById(`likes_c${id}`).innerHTML = persianizeNums(latinizeNums(document.getElementById(`likes_c${id}`).innerHTML) + 1);
			var opposite = ic.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[0];
			if (opposite.className == "bi bi-hand-thumbs-down-fill") {
				dislikeComment(opposite, id);
			}
		}
	};
	var dislikeComment = (ic, id) => {
		if (ic.className == "bi bi-hand-thumbs-down-fill") {
			// todo: send XHR to undislike indexed comment (diff by like)
			ic.className = "bi bi-hand-thumbs-down";
			document.getElementById(`dislikes_c${id}`).innerHTML = persianizeNums(latinizeNums(document.getElementById(`dislikes_c${id}`).innerHTML) - 1);
		} else {
			// todo: send XHR to dislike indexed comment
			ic.className = "bi bi-hand-thumbs-down-fill";
			document.getElementById(`dislikes_c${id}`).innerHTML = persianizeNums(latinizeNums(document.getElementById(`dislikes_c${id}`).innerHTML) + 1);
			var opposite = ic.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[0];
			if (opposite.className == "bi bi-hand-thumbs-up-fill") {
				likeComment(opposite, id);
			}
		}
	};
	
	// reply and add comment
	var makeNewComment = (replyid=null) => {
		if (replyid == null) {
			id = post.comments.length+1+"";
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
						"icon": "chat-dots-fill",
						"title": "ارسال نظر"
					},
					{
						"element": "<button class='bi bi-x btn' id='dialogbtn_hide'></button>"
					}
				],
				"content": {
					"html": `
	<div class="new-comment">
		${replyid == null? '<div class="new-comment-stars"><i class="bi bi-star-fill rated star" id="star1"></i><i class="bi bi-star star" id="star2"></i><i class="bi bi-star star" id="star3"></i><i class="bi bi-star star" id="star4"></i><i class="bi bi-star star" id="star5"></i></div>' : ''}
		<textarea cols="30" id="newcomment" onpaste="calcChars(this.value);" onkeyup="calcChars(this.value);" placeholder="نظر خود را بنویسید..."></textarea>
		<div class="chars d-flex">
			<p id="charsleft">۳۰۰</p>
			<p id="allchars">/ ۳۰۰</p>
		</div>
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
							"event": `
							sendComment(
								document.querySelectorAll(".rated"),
								document.getElementById("newcomment").value,
								"${replyid}"
							);`
						}
					]
				]
			}
		);
		document.querySelectorAll(".star").forEach((el) => {
			el.onclick = () => {
				rating(el.id);
			};
		});
	};
	
	// calculating that value of field don't be upper than specified value
	var calcChars = (field) => {
		var left = document.getElementById("charsleft");
		var all = latinizeNums(document.getElementById("allchars").innerHTML.replace(/\/ /g, ""));
		var fieldEl = document.getElementById("newcomment");
		
		left.innerHTML = persianizeNums(all - field.length < 0 ? 0 : all - field.length);
		if (field.length > all) {
			fieldEl.value = field.substring(0, field.length-1);
			
			left.style = "color: var(--color-red);"
			fieldEl.style = "border: 1px solid var(--color-red); animation: shake 100ms;"
		} else {
			left.style = "color: var(--color-gray);"
			fieldEl.style = "border: 1px solid var(--color-gray-low);"
		}
	};
	
	// action on every star clicked (when rating new comment)
	var rating = (id) => {
		var stars = document.querySelectorAll(".star");
		stars.forEach((el) => {
			if (el.id[4]*1 > id[4]*1) {
				el.className = "bi bi-star star"
			} else {
				el.className = "bi bi-star-fill rated star"
			}
		});
	};
	
	// sending comment to the server
	var sendComment = async (stars, text, replyid) => {
		if (replyid == 'null') {
			// it's a parent comment
			stars = stars.length;
			console.log(stars, text);
			// todo : send XHR for sending the comment
		} else {
			// it's a reply
			console.log(text, replyid);
			// todo : send XHR for sending the reply
		}
		document.getElementById("dialogbtn_hide").click();
		await successToast("نظر شما در دست بررسی است");
	};
	
	var likeArticle = (ic, id) => {
		if (ic.className == "bi bi-hand-thumbs-up-fill") {
			// todo: send XHR to unlike indexed comment (diff by dislike)
			ic.className = "bi bi-hand-thumbs-up";
			document.getElementById(`likes_a${id}`).innerHTML = persianizeNums(latinizeNums(document.getElementById(`likes_a${id}`).innerHTML) - 1);
			falc.className = falc.className == "bi bi-heart fal-item fal-center post-falc" ? "bi bi-heart-fill fal-item fal-center post-falc" : "bi bi-heart fal-item fal-center post-falc";
		} else {
			// todo: send XHR to like indexed comment
			ic.className = "bi bi-hand-thumbs-up-fill";
			document.getElementById(`likes_a${id}`).innerHTML = persianizeNums(latinizeNums(document.getElementById(`likes_a${id}`).innerHTML) + 1);
			falc.className = falc.className == "bi bi-heart fal-item fal-center post-falc" ? "bi bi-heart-fill fal-item fal-center post-falc" : "bi bi-heart fal-item fal-center post-falc";
			var opposite = ic.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[0];
			if (opposite.className == "bi bi-hand-thumbs-down-fill") {
				dislikeArticle(opposite, id);
			}
		}
	};

	var dislikeArticle = (ic, id) => {
		if (ic.className == "bi bi-hand-thumbs-down-fill") {
			// todo: send XHR to undislike indexed comment (diff by like)
			ic.className = "bi bi-hand-thumbs-down";
			document.getElementById(`dislikes_a${id}`).innerHTML = persianizeNums(latinizeNums(document.getElementById(`dislikes_a${id}`).innerHTML) - 1);
		} else {
			// todo: send XHR to dislike indexed comment
			ic.className = "bi bi-hand-thumbs-down-fill";
			document.getElementById(`dislikes_a${id}`).innerHTML = persianizeNums(latinizeNums(document.getElementById(`dislikes_a${id}`).innerHTML) + 1);
			var opposite = ic.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[0];
			if (opposite.className == "bi bi-hand-thumbs-up-fill") {
				likeArticle(opposite, id);
			}
		}
	};
	
	var follow = (userId) => {
		// todo: use XHR
		successToast("کاربر باموفقیت دنبال شد");
		window.location.reload();
	};
	
	var unfollow = (userId) => {
		// todo: use XHR
		successToast("کاربر دیگر دنبال نمی‌شود");
		window.location.reload();
	}

	if (post.author.id == user_guid) {
		falc.onclick = () => {
			dialog(
				[
					"var(--color-white);",
					"var(--color-primary-strong);",
					"var(--color-gray-low);",
					"var(--color-contrast);"
				],
				{
					"header": [
						{
							"icon": "pencil",
							"title": "ویرایش مقاله"
						},
						{
							"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
						}
					],
					"content": {
						"html": `
<img src="${post.thumbnail}" alt="[THUMBNAIL]" class="thumbnail"/>
تصویر جدید: <input type="file" id="cover"/>
<br>
<input class="dialog-field article-title-field" id="title" value="${post.title}" placeholder="عنوان مقاله"/>
<textarea type="text" rows="5" class="dialog-field article-content-field" name="description" id="content" value="${post.html}" placeholder="چیزی بنویسید...">${post.html}</textarea>
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
								"id": "Done",
								"text": "ارسال",
								"event": `editArticle(
									"${post.id}",
									document.getElementById("cover").src == "" ? "${post.thumbnail}" : document.getElementById("cover").src,
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
		};
		var editArticle = (id, thumbnail, title, description) => {
			document.getElementById("dialogbtn_hide").click();
			console.log(id, thumbnail, title, description);
			// todo: use XHR
			successToast("مقالهٔ موردنظر با موفقیت ویرایش شد");
		};
	} else {
		falc.className = "bi bi-heart fal-item fal-center post-falc";
		falc.onclick = () => {
			likeArticle(document.getElementById(`likeic_a${post.id}`), post.id);
		};
		
		isLiked ? falc.click() : '';
	}
}