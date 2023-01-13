var args = document.location.search.replace("?", "").replace(/\+/g, " ").split("&");
var courseID = args[0].split("=")[0] == "id" ? args[0].split("=")[1].replace(/\+/g, " ") : "undefined";
if (courseID == "undefined") {
	window.history.back();
}

// todo : use XHR for getting course info by courseID
var course = {
	"id": courseID,
	"thumb": "dist/assets/article.jpg",
	"name": "آموزش کاربردی گیت و گیت‌هاب",
	"master": "بهمن احمدی",
	"master_cv": "https://github.com/Bahman-Ahmadi",
	"price" : {
		"before_discount": persianizeNums(separatingNums("499000")),
		"after_discount": persianizeNums(separatingNums("259600"))
	},
	"students": 500,
	"videos": 10,
	"time": "6:37:00",
	"level": "پیشرفته",
	"status": "در حال برگزاری",
	"lastupdate": "1401/10/18",
	"shortlink": Links.shortlinks + courseID,
	"description": "لورم ایپسوم ".repeat(100)
};
var videos = [
	{
		"title": "معرفی دوره",
		"time": "0:10:20",
		"size": 136,
		"quality": 480,
		"isLocked": true
	},
	{
		"title": "معرفی دوره",
		"time": "0:10:20",
		"size": 136,
		"quality": 480,
		"isLocked": false
	},
	{
		"title": "معرفی دوره",
		"time": "0:10:20",
		"size": 136,
		"quality": 480,
		"isLocked": true
	},
	{
		"title": "معرفی دوره",
		"time": "0:10:20",
		"size": 136,
		"quality": 480,
		"isLocked": false
	},
	{
		"title": "معرفی دوره",
		"time": "0:10:20",
		"size": 136,
		"quality": 480,
		"isLocked": true
	},
];
var comments = [
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
];

var quizzes = [
	{
		"id": "1",
		"thumbnail": "dist/assets/user.png",
		"name": "بهمن احمدی",
		"type": "important",
		"date": "1401/10/22 17:33",
		"text": "لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم",
		"answers": [
			{
				"id": "1-1",
				"thumbnail": "dist/assets/admin.png",
				"name": "بهمن احمدی",
				"date": "1401/10/22 17:34",
				"likes": 10,
				"dislikes": 5,
				"text": "لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم",
				"answers": [
					{
						"id": "1-1-1",
						"thumbnail": "dist/assets/admin.png",
						"name": "بهمن احمدی",
						"date": "1401/10/22 17:34",
						"likes": 30,
						"dislikes": 5,
						"text": "لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم",
						"answers": []
					}
				]
			},
			{
				"id": "1-2",
				"thumbnail": "dist/assets/admin.png",
				"name": "بهمن احمدی",
				"date": "1401/10/22 17:34",
				"likes": 11,
				"dislikes": 4,
				"text": "لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم",
				"answers": []
			}
		],
	},
	{
		"id": "2",
		"thumbnail": "dist/assets/user.png",
		"name": "بهمن احمدی",
		"type": "middle",
		"date": "1401/10/22 17:40",
		"text": "لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم",
		"answers": []
	}
];


var setAttr = (className, attr, value) => {
	document.querySelectorAll(`.${className}`).forEach((el) => {
		eval(`el.${attr} = '${value}';`);
	});
};

// CREDIT
setAttr("course-thumbnail", "src", course.thumb);
setAttr("course-title", "innerHTML", course.name);
setAttr("course-master", "innerHTML", course.master);
if (course.price.before_discount != course.price.after_discount) {
	setAttr("cc-price-real", "innerHTML", course.price.before_discount);
}
setAttr("cc-price-off", "innerHTML", course.price.after_discount);
setAttr("cc-master-cv", "href", course.master_cv);
setAttr("course-students", "innerHTML", persianizeNums(separatingNums(course.students))+" نفر");
setAttr("course-videos", "innerHTML", persianizeNums(course.videos)+" ویدیو");
setAttr("course-time", "innerHTML", persianizeNums(course.time));
setAttr("course-level", "innerHTML", course.level);
setAttr("course-status", "innerHTML", course.status);
setAttr("course-lastupdate", "innerHTML", persianizeNums(course.lastupdate));
setAttr("course-link", "innerHTML", course.shortlink);
setAttr("course-description", "innerHTML", course.description.substr(0, Math.round(course.description.length/2)));

var showReport = () => {
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
<input type="text" id="report" placeholder="توضیحات بیشتری ارائه دهید..."/>
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
}

var shareCourse = async () => {
	const shareData = {
		title: course.name,
		text: `${course.name}\nبا تدریس استاد ${course.master} را در «مبی‌لرن» بیاموزید :\n${course.shortlink}`,
		url: course.shortlink
	};

	// Share must be triggered by "user activation"
	try {
		await navigator.share(shareData);
	} catch (err) {
		console.log(err);
	}
};

var copylink = () => {
	navigator.clipboard.writeText(course.shortlink);
};

var courseRegister = () => {
	if (user_guid != null) {
		// todo: send XHR for add this course to cart of user
		successToast("این دوره به سبد خرید شما افزوده شد", ()=>{goto(Links.register)}, "مشاهده");
	} else {
		errorToast("لطفا ابتدا به اکانت خود وارد شوید", ()=>{goto(Links.register)}, "ورود");
	}
};

var showFullDescription = (btn) => {
	setAttr("course-description", "innerHTML", course.description);
	btn.hidden = true;
};

// DOWNLOADS
document.querySelectorAll(".downloads").forEach((dls) => {
	var sumSize = 0;
	for (var video of videos) {
		sumSize += video.size;
		dls.innerHTML += `
<div class="download d-flex">
	<div class="download-rightside d-flex">
		<div class="download-number bold">${persianizeNums(videos.indexOf(video)+1)}</div>
		<div class="download-texts">
			<p class="download-title">${video.title}</p>
			<div class="download-info d-flex">
				<p class="download-time"><i class="bi bi-clock-fill"></i> ${persianizeNums(video.time)}</p>
				<p class="download-size"><i class="bi bi-arrow-down-up"></i> ${persianizeNums(video.size)} Mb</p>
				<p class="download-quality"><i class="bi bi-badghe-hd-fill"></i> ${persianizeNums(video.quality)} p</p>
				<p class="download-price-status">${video.isLocked ? '<i class="bi bi-unlock"></i>' : '<i class="bi bi-lock"></i>'}</p>
			</div>
		</div>
	</div>
	<div class="download-leftside d-flex">
		<button class="btn btn-watch" onclick="goto(Links.watch+'${courseID}&index=${videos.indexOf(video)}');"><i class="bi bi-eye"></i></button>
		<button class="btn btn-download" onclick="download(${videos.indexOf(video)});"><i class="bi bi-download"></i></button>
	</div>
</div>
		`;
	}
	setAttr("dlbox-subinfo", "innerHTML", `${persianizeNums(Math.round(sumSize/1024))} گیگابایت (${persianizeNums(sumSize)} مگابایت)`);
});

var download = (index) => {
	goto(Links.download + courseID + `&index=${index}`);
	// todo: send XHR for download if user has bought indexed session else show error toast
};

var downloadAll = () => {
	goto(Links.download + courseID);
	// todo: send XHR for download if user has bought indexed session else show error toast
};

// COMMENTS
function makeComment(comment) {
	comment.replies == undefined ? comment.replies = [] : null;
	var html = `
<div class="course-comment" id="c${comment.id}">
	<div class="course-comment-header d-flex">
		<div class="course-comment-header-rightside d-flex">
			<img src="${comment.thumbnail}" alt="[AVATAR]" class="course-comment-avatar">
			<div class="course-comment-user">
				<div class="d-flex course-comment-baseinfo">
					<p class="course-comment-user-name">${comment.name}</p>
					${comment.stars >= 1 ? `<p class="course-comment-date">( ${persianizeNums(comment.date)} )</p>` : ''}
				</div>
				<p class="course-comment-user-stars">${comment.stars >= 1 ? "<i class='bi bi-star-fill comment-star'></i>".repeat(comment.stars) : `<p class="course-comment-date">( ${persianizeNums(comment.date)} )</p>`}</p>
			</div>
		</div>
		<div class="course-comment-header-leftside d-flex">
			<div class="course-comment-reactions d-flex">
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
		<div class="course-comment-content">${comment.text}</div>
		<div class="course-replies d-flex">
			<button class="btn show-replies" onclick="showReplies('${comment.id}')"><i class="bi bi-caret-down"></i> مشاهده پاسخ‌ها (${persianizeNums(comment.replies.length)})</button>
			<button class="btn btn-reply" onclick="makeNewComment('${comment.id}');"><i class="bi bi-reply-fill"></i></button>
		</div>
		<div class="course-comment-replies" id="replies_${comment.id}" hidden>`;
		
		for (var reply of comment.replies) {
			html += makeComment(reply);
		}
	return html + "</div> </div> </div>";
}

// inserting json comments as html
var stars = 0;
document.getElementById("comments_count").innerHTML = `${persianizeNums(comments.length)} نظر`;
for (var comment of comments) {
	stars += comment.stars;
	document.getElementById("comments").innerHTML += makeComment(comment);
}

// inserting stars average
document.getElementById("stars").innerHTML = ` (${"<i class='bi bi-star-fill comment-star'></i>".repeat(stars/comments.length)}) `;

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
	comments = [];
	document.getElementById("comments").innerHTML = "";
	for (var comment of comments) {
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
		id = comments.length+1+"";
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

// QUIZZES
var qcount = 0;
var acount = 0;
var loadQuizzes = (node) => {
	node.answers == undefined ? node.answers = [] : null;
	qcount++;
	var HTML = `
<div class="course-comment" id="qa_${node.id}">
	<div class="course-comment-header d-flex">
		<div class="course-comment-header-rightside d-flex">
			<img src="${node.thumbnail}" alt="[AVATAR]" class="course-comment-avatar">
			<div class="course-comment-user">
				<div class="course-comment-baseinfo d-flex">
					<p class="course-comment-user-name">${node.name}</p>
					${node.id.split("-").length == 1 ? `<p class="course-comment-date"> (${persianizeNums(node.date)}) </p>` : `` }
				</div>
				${node.id.split("-").length != 1 ? `<p class="course-comment-date"> (${persianizeNums(node.date)}) </p>` : `<div class="course-comment-user-quiztype ${node.type}-quiztype">${node.type == "important" ? "فوری" : node.type == "middle" ? "متوسط" : "عادی"}</div>` }
			</div>
		</div>
		<div class="course-comment-header-leftside d-flex">
			${node.id.split("-").length == 1 ? `` : `
				<div class="course-comment-reactions d-flex">
					<div>
						<button class="btn btn-comment-like" onclick="likeAnswer(this.childNodes[0], '${node.id}');"><i class="bi bi-hand-thumbs-up"></i></button> <br>
						<span class="comment-likes" id="likes_qa${node.id}">${persianizeNums(node.likes)}</span>
					</div>
					<div>
						<button class="btn btn-comment-dislike" onclick="dislikeAnswer(this.childNodes[0], '${node.id}');"><i class="bi bi-hand-thumbs-down"></i></button> <br>
						<span class="comment-dislikes" id="dislikes_qa${node.id}">${persianizeNums(node.dislikes)}</span>
					</div>
				</div>
			`}
		</div>
	</div>
	<div class="course-comment-content">${node.text}</div>
	<div class="course-replies d-flex">
		<button class="btn show-replies" onclick="showAnswers('${node.id}');"><i class="bi bi-caret-down"></i> مشاهده پاسخ‌ها (${persianizeNums(node.answers.length)})</button>
		<button class="btn btn-reply open-quiz" onclick="makeNewQA('${node.id}');"><i class="bi bi-reply-fill"></i></button>
	</div>
	<div class="course-comment-replies" id="answers_${node.id}" hidden>`;
	
	// loading answers of current node
	for (var answer of node.answers) {
		acount++;
		HTML += loadQuizzes(answer);
	}

	return HTML + '</div></div>';
};
// nums & inserting loaded json into html
for (var quiz of quizzes) {
	document.getElementById("quizzes").innerHTML += loadQuizzes(quiz);
}
var percent = (acount * 100) / qcount;
document.getElementById("qa_nums").innerHTML = `${persianizeNums(qcount)} پرسش / ${persianizeNums(acount)} پاسخ`;
document.getElementById("qa_percent").innerHTML = ` (${persianizeNums(Math.round(percent))}٪)`;

// filter
var showFilterQuizzes = () => {
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
						"event": `filterQuizzes(document.getElementsByClassName("selected-filter")[0].id);`
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

var filterQuizzes = (criterion) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR to filter comments & valuing result into comment variable 
	quizzes = [];
	qcount = 0;
	acount = 0;
	document.getElementById("quizzes").innerHTML = "";
	for (var quiz of quizzes) {
		document.getElementById("quizzes").innerHTML += loadQuizzes(quiz);
	}
	percent = (acount * 100) / qcount;
	document.getElementById("qa_nums").innerHTML = `${persianizeNums(qcount)} پرسش / ${persianizeNums(acount)} پاسخ`;
	document.getElementById("qa_percent").innerHTML = ` (${persianizeNums(Math.round(percent < 0 ? percent : 0))}٪)`;
};

// new quiz
var makeNewQA = (replyid=null) => {
	if (replyid == null) {
		id = quizzes.length+1+"";
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
					"icon": "question-circle",
					"title": `ارسال ${replyid == null? 'پرسش' : 'پاسخ'}`
				},
				{
					"element": "<button class='bi bi-x btn' id='dialogbtn_hide'></button>"
				}
			],
			"content": {
				"html": `
<div class="new-comment">
	${replyid == null? '<div class="new-quiz-type d-flex"><div class="course-comment-user-quiztype addquiztype normal-quiztype selected-quiztype" id="normal">عادی</div><div class="course-comment-user-quiztype addquiztype middle-quiztype" id="middle">متوسط</div><div class="course-comment-user-quiztype addquiztype important-quiztype" id="important">فوری</div></div>' : ''}
	<textarea cols="30" id="newcomment" onpaste="calcChars(this.value);" onkeyup="calcChars(this.value);" placeholder="چیزی بنویسید..."></textarea>
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
						sendQuiz(
							document.getElementsByClassName("selected-quiztype")[0].id,
							document.getElementById("newcomment").value,
							"${replyid}"
						);`
					}
				]
			]
		}
	);
	document.querySelectorAll(".addquiztype").forEach((el) => {
		el.onclick = () => {
			var selected = document.getElementsByClassName("selected-quiztype")[0];
			selected.className = selected.className.replace(/ selected-quiztype/g, "");
			el.className += " selected-quiztype";
		};
	});
};

// sending quiz to the server
var sendQuiz = async (type, text, replyid) => {
	if (replyid == 'null') {
		// it's a parent comment
		console.log(type, text);
		// todo : send XHR for sending the quiz
	} else {
		// it's a reply
		console.log(text, replyid);
		// todo : send XHR for sending the reply
	}
	document.getElementById("dialogbtn_hide").click();
	await successToast("پرسش/پاسخ شما در دست بررسی است");
};

// show answers
var showAnswers = (id) => {
	document.getElementById(`answers_${id}`).hidden = !document.getElementById(`answers_${id}`).hidden;
};

// like/dislike answer
var likeAnswer = (ic, id) => {
	if (ic.className == "bi bi-hand-thumbs-up-fill") {
		// todo: send XHR to unlike indexed answer (diff by dislike)
		ic.className = "bi bi-hand-thumbs-up";
		document.getElementById(`likes_qa${id}`).innerHTML = persianizeNums(latinizeNums(document.getElementById(`likes_qa${id}`).innerHTML) - 1);
	} else {
		// todo: send XHR to like indexed answer
		ic.className = "bi bi-hand-thumbs-up-fill";
		document.getElementById(`likes_qa${id}`).innerHTML = persianizeNums(latinizeNums(document.getElementById(`likes_qa${id}`).innerHTML) + 1);
		var opposite = ic.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[0];
		if (opposite.className == "bi bi-hand-thumbs-down-fill") {
			dislikeAnswer(opposite, id);
		}
	}
};
var dislikeAnswer = (ic, id) => {
	if (ic.className == "bi bi-hand-thumbs-down-fill") {
		// todo: send XHR to undislike indexed answer (diff by like)
		ic.className = "bi bi-hand-thumbs-down";
		document.getElementById(`dislikes_qa${id}`).innerHTML = persianizeNums(latinizeNums(document.getElementById(`dislikes_qa${id}`).innerHTML) - 1);
	} else {
		// todo: send XHR to dislike indexed answer
		ic.className = "bi bi-hand-thumbs-down-fill";
		document.getElementById(`dislikes_qa${id}`).innerHTML = persianizeNums(latinizeNums(document.getElementById(`dislikes_qa${id}`).innerHTML) + 1);
		var opposite = ic.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[0];
		if (opposite.className == "bi bi-hand-thumbs-up-fill") {
			likeAnswer(opposite, id);
		}
	}
};

// FAB
function bookmark(fab) {
	if (fab.innerHTML == '<i class="bi bi-bookmark fab-ic"></i>') {
		// todo: use XHR for bookmarking the course
		fab.innerHTML = '<i class="bi bi-bookmark-fill fab-ic"></i>';
	} else {
		// todo: use XHR for unbookmarking the course
		fab.innerHTML = '<i class="bi bi-bookmark fab-ic"></i>';
	}
}