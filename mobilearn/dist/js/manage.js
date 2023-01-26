function toggleShow(btn, box) {
	box = document.getElementById(box);
	var isVisible = box.hidden == true;
	box.hidden = !isVisible;
	btn.className = isVisible ? "bi bi-caret-up btn btn-show" : "bi bi-caret-down btn btn-show";
}

function loadStatistics() {
	new Chartist.Line('#searchs', {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		series: [
			[10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 11000, 10000]
		]
	});
	new Chartist.Line('#signups', {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		series: [
			[10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]
		]
	});
	new Chartist.Line('#delete_accounts', {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		series: [
			[10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]
		]
	});
	new Chartist.Line('#paies', {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		series: [
			[10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]
		]
	});
	new Chartist.Line('#cashs', {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		series: [
			[10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]
		]
	});
	new Chartist.Line('#charges', {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		series: [
			[10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]
		]
	});
	new Chartist.Line('#courses', {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		series: [
			[10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]
		]
	});
	new Chartist.Line('#articles', {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		series: [
			[10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]
		]
	});
}
loadStatistics();
// show different welcome messages by every load
const welcomes = ["وقت بخیر،", "سلام و درود،", "خوش اومدی،", "خوشحالم از دیدنت،"];
document.getElementById("welcome").innerHTML = welcomes[Math.floor(Math.random()*welcomes.length)];

// edit information (name/pass/avatar)
var showEditProfile = () => {
	dialog(
		[
			"var(--color-white);",
			"var(--color-primary-strong);",
			"var(--color-gray-low);",
			"var(--color-gray-strong);"
		],
		{
			"header": [
				{
					"icon": "pencil",
					"title": "ویرایش نمایه"
				},
				{
					"element": "<button class='btn bi bi-x' id='dialogbtn_hide'></button>"
				}
			],
			"content": {
				"html": `
<div class="edit-profile">
	<p class="editprofile-info">مواردی را که می‌خواهید، تغییر دهید</p>
	<div class="avatars">
		<img src="dist/assets/admin.png" class="avatar selected-avatar"/>
		<img src="dist/assets/admin.png" class="avatar"/>
		<img src="dist/assets/admin.png" class="avatar"/>
		<img src="dist/assets/admin.png" class="avatar"/>
		<img src="dist/assets/admin.png" class="avatar"/>
		<img src="dist/assets/admin.png" class="avatar"/>
		<img src="dist/assets/admin.png" class="avatar"/>
		<form method="post" action="/upload" enctype="multipart/form-data">
			<label class="add-avatar" for="myavatar"><i class="bi bi-plus-circle-dotted"></i></label>
			<input type="file" name="myavatar" id="myavatar" hidden/>
		</form>
	</div>
	<div class="inputs">
		<input type="text" class="dialog-field name-input" id="name" placeholder="نام و نام خانوادگی خود را وارد کنید"/><br>
		<input type="password" class="dialog-field oldpass-input" id="oldpass" placeholder="رمزعبور قدیمی"/>
		<input type="password" class="dialog-field newpass-input" id="newpass" placeholder="رمزعبور جدید"/>
	</div>
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
						"text": "اعمال تغییرات",
						"event": `editProfile(
							document.getElementById("name").value,
							document.getElementById("oldpass").value,
							document.getElementById("newpass").value,
							document.getElementsByClassName("selected-avatar").src,
						);
						document.getElementById("dialogbtn_hide").click();`
					}
				]
			]
		}
	);
	document.querySelectorAll(".avatar").forEach((el) => {
		el.onclick = () => {
			document.querySelectorAll(".avatar").forEach((other) => {
				other.className = "avatar";
			});
			el.className = "avatar selected-avatar";
		};
	});
};
function editProfile(name, oldpass, newpass, avatar) {
	// todo: use XHR to send editProfile request
}

// show notifications
var showNotifs = () => {
	// todo: load notif from XHR then replace that instance of <dialog.contents.content.html>
	dialog(
		[
			"var(--color-white);",
			"var(--color-amber-strong);",
			"var(--color-gray-low);",
			"var(--color-gray-strong);"
		],
		{
			"header": [
				{
					"icon": "bell",
					"title": "اعلانات"
				},
				{
					"element": "<button class='btn bi bi-x' id='dialogbtn_hide'></button>"
				}
			],
			"content": {
				"html": `
<div class="notifs">
	<div class="notif">
		<div class="notif-topside d-flex">
			<div class="notif-toprightside">
				پیام سیستم (۱۴۰۱/۱۰/۱۲ ۱۷:۳۸)
			</div>
			<div class="notif-topleftside">
				<button class="btn btn-deletenotif bi bi-trash" onclick="deleteNotif(this, 'NOTIF-ID');"></button>
			</div>
		</div>
		<div class="notif-bottomside">
			${"لورم ایپسوم ".repeat(20)}
		</div>
	</div>
	<div class="notif">
		<div class="notif-topside d-flex">
			<div class="notif-toprightside">
				پیام سیستم (۱۴۰۱/۱۰/۱۲ ۱۷:۳۸)
			</div>
			<div class="notif-topleftside">
				<button class="btn btn-deletenotif bi bi-trash" onclick="deleteNotif(this, 'NOTIF-ID');"></button>
			</div>
		</div>
		<div class="notif-bottomside">
			${"لورم ایپسوم ".repeat(20)}
		</div>
	</div>
	<div class="notif">
		<div class="notif-topside d-flex">
			<div class="notif-toprightside">
				پیام سیستم (۱۴۰۱/۱۰/۱۲ ۱۷:۳۸)
			</div>
			<div class="notif-topleftside">
				<button class="btn btn-deletenotif bi bi-trash" onclick="deleteNotif(this, 'NOTIF-ID');"></button>
			</div>
		</div>
		<div class="notif-bottomside">
			${"لورم ایپسوم ".repeat(20)}
		</div>
	</div>
	<div class="notif">
		<div class="notif-topside d-flex">
			<div class="notif-toprightside">
				پیام سیستم (۱۴۰۱/۱۰/۱۲ ۱۷:۳۸)
			</div>
			<div class="notif-topleftside">
				<button class="btn btn-deletenotif bi bi-trash" onclick="deleteNotif(this, 'NOTIF-ID');"></button>
			</div>
		</div>
		<div class="notif-bottomside">
			${"لورم ایپسوم ".repeat(20)}
		</div>
	</div>
	<div class="notif">
		<div class="notif-topside d-flex">
			<div class="notif-toprightside">
				پیام سیستم (۱۴۰۱/۱۰/۱۲ ۱۷:۳۸)
			</div>
			<div class="notif-topleftside">
				<button class="btn btn-deletenotif bi bi-trash" onclick="deleteNotif(this, 'NOTIF-ID');"></button>
			</div>
		</div>
		<div class="notif-bottomside">
			${"لورم ایپسوم ".repeat(20)}
		</div>
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
						"text": "حله",
						"event": `document.getElementById("dialogbtn_hide").click();`
					}
				]
			]
		}
	);
};
function deleteNotif(el, notifID) {
	// delete liked post from UI
	el.parentNode.parentNode.parentNode.remove();
	// todo: send deleteNotif request using XHR
	console.log(notifID);
}

// change theme
var changeTheme = () => {
	localStorage.setItem("theme", localStorage.getItem("theme") == "light" ? "dark" : "light");
	var theme = localStorage.getItem("theme") == null ? "light" : localStorage.getItem("theme");
	document.head.innerHTML += `<link rel="stylesheet" href="dist/css/vars-${theme}.css"/>`;
};

// verifying new course
var showVerifyNewCourse = (id, master, level, price) => {
	infoDialog(
		"اطلاعات دوره",
		`مدرس: ${master}<br>سطح دوره: ${level}<br>قیمت دوره: ${price == 0 ? 'رایگان' : price}`,
		[
			'document.getElementById("dialogbtn_hide").click();',
			`verifyNewCourse("${id}");`
		]
	);
};

var verifyNewCourse = (id) => {
	// todo: use XHR
	document.getElementById("dialogbtn_hide").click();
	successToast("دوره باموفقیت تأیید شد");
};

// verifying new part
var showVerifyNewPart = (course_id, part_index, size, quality, isFree) => {
	infoDialog(
		"اطلاعات قسمت",
		`حجم: ${size} مگابایت<br>کیفیت: ${quality}<br>رایگان است؟ ${isFree ? 'بله' : 'خیر'}`,
		[
			'document.getElementById("dialogbtn_hide").click();',
			`verifyNewCourse("${course_id}", ${part_index});`
		]
	);
};

var verifyNewPart = (course_id, part_index) => {
	// todo: use XHR
	document.getElementById("dialogbtn_hide").click();
	successToast("دوره باموفقیت تأیید شد");
};

// verifying new article
var previewArticle = (article_id, thumbnail, title, html) => {
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
					"icon": "pencil",
					"title": "پیش‌نمایش مقاله"
				},
				{
					"element": "<button class='btn bi bi-x' id='dialogbtn_hide'></button>"
				}
			],
			"content": {
				"html": `
<img class="article-thumbnail" src="${thumbnail}" alt="THUMBNAIL"/>
<p class="article-titr">${title}</p>
${html}`
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
						"text": "تأیید",
						"event": `verifyArticle("${article_id}");`
					}
				]
			]
		}
	);
};

var verifyArticle = (article_id) => {
	// todo: use XHR
	document.getElementById("dialogbtn_hide").click();
	successToast("مقاله با موفقیت تأیید شد");
};

// verifying delete course
var showVerifyDeleteCourse = (course_id) => {
	warnDialog(
		"حذف دوره",
		"مطمئنید که می‌خواهید این دوره را برای همیشه حذف کنید؟",
		"حذف",
		[
			'document.getElementById("dialogbtn_hide").click();',
			`verifyDeleteCourse("${course_id}");`
		]
	);
};

var verifyDeleteCourse = (course_id) => {
	// todo: use XHR
	document.getElementById("dialogbtn_hide").click();
	successToast("دوره با موفقیت حذف شد");
};

// verifying report
var showVerifyReport = (id, description) => {
	// todo: use XHR for setting status of current report to 'checked'
	warnDialog(
		"گزارش",
		description,
		"ثبت گزارش",
		[
			'document.getElementById("dialogbtn_hide").click();',
			`verifyReport("${id}");`
		]
	);
};

var verifyReport = (id) => {
	// todo: use XHR for saving report to verified reports
	document.getElementById("dialogbtn_hide").click();
	successToast("گزارش با موفقیت ثبت شد");
};

// verifying comment
var showVerifyComment = (id, text) => {
	warnDialog(
		"تأیید نظر",
		text,
		"تأیید",
		[
			'document.getElementById("dialogbtn_hide").click();',
			`verifyComment("${id}");`
		]
	);
};

var verifyComment = (id) => {
	// todo: use XHR for saving report to verified reports
	document.getElementById("dialogbtn_hide").click();
	successToast("نظر با موفقیت تأیید شد");
};

// controlling databases

/// Delete
var showUserDelete = (id) => {
	warnDialog(
		"حذف کاربر",
		"مطمئنید که میخواهید این کاربر حذف شود؟",
		"حذف",
		[
			'document.getElementById("dialogbtn_hide").click();',
			`deleteUser("${id}");`
		]
	);
};
var deleteUser = (id) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("کاربر موردنظر با موفقیت حذف شد");
};

var showMasterDelete = (id) => {
	warnDialog(
		"حذف مدرس",
		"مطمئنید که میخواهید این مدرس حذف شود؟",
		"حذف",
		[
			'document.getElementById("dialogbtn_hide").click();',
			`deleteMaster("${id}");`
		]
	);
};
var deleteMaster = (id) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("مدرس موردنظر با موفقیت حذف شد");
};

var showAdminDelete = (id) => {
	warnDialog(
		"حذف ادمین",
		"مطمئنید که میخواهید این ادمین حذف شود؟",
		"حذف",
		[
			'document.getElementById("dialogbtn_hide").click();',
			`deleteAdmin("${id}");`
		]
	);
};
var deleteAdmin = (id) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("مدیر موردنظر با موفقیت حذف شد");
};

var showArticleDelete = (id) => {
	warnDialog(
		"حذف مقاله",
		"مطمئنید که میخواهید این مقاله حذف شود؟",
		"حذف",
		[
			'document.getElementById("dialogbtn_hide").click();',
			`deleteArticle("${id}");`
		]
	);
};
var deleteArticle = (id) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("مقالهٔ موردنظر با موفقیت حذف شد");
};

var showCourseDelete = (id) => {
	warnDialog(
		"حذف دوره",
		"مطمئنید که میخواهید این دوره حذف شود؟",
		"حذف",
		[
			'document.getElementById("dialogbtn_hide").click();',
			`deleteCourse("${id}");`
		]
	);
};
var deleteCourse = (id) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("دورهٔ موردنظر با موفقیت حذف شد");
};

var showUserProductDelete = (id) => {
	warnDialog(
		"حذف محصول",
		"مطمئنید که میخواهید این محصول حذف شود؟",
		"حذف",
		[
			'document.getElementById("dialogbtn_hide").click();',
			`deleteUserProduct("${id}");`
		]
	);
};
var deleteUserProduct = (id) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("محصول موردنظر با موفقیت حذف شد");
};

/// Add
var showAddUser = () => {
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
					"icon": "plus-circle",
					"title": "افزودن کاربر"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<input type="text" class="dialog-field" id="name" placeholder="نام و نام‌خانوادگی"/>
<input type="email" class="dialog-field" id="email" placeholder="ایمیل"/>
<input type="password" class="dialog-field" id="password" placeholder="رمزعبور"/>
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
						"event": `addUser(
							document.getElementById("email").value,
							document.getElementById("password").value,
							document.getElementById("name").value
						);`
					}
				]
			]
		}
	);
};
var addUser = (email, password, name) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("کاربر موردنظر با موفقیت اضافه شد");
};

var showAddMaster = () => {
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
					"icon": "plus-circle",
					"title": "افزودن مدرس"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<input type="text" class="dialog-field left-input" id="guid" placeholder="شناسهٔ کاربری"/>
<input type="url" class="dialog-field left-input" id="cv" placeholder="لینک رزومه"/>
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
						"event": `addMaster(document.getElementById("guid").value, document.getElementById("cv").value);`
					}
				]
			]
		}
	);
};
var addMaster = (id, cvlink) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("مدرس موردنظر با موفقیت اضافه شد");
};

var showAddAdmin = () => {
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
					"icon": "plus-circle",
					"title": "افزودن مدیر"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<input type="text" class="dialog-field left-input" id="guid" placeholder="شناسهٔ کاربری"/>
<br>
<br>
<h5>دسترسی ها</h5>
<input type="checkbox" class="form-check-input access" id="a_statistics" checked/> مشاهدهٔ آمار <br>
<input type="checkbox" class="form-check-input access" id="a_verify" checked/> تأیید درخواست‌ها <br>
<input type="checkbox" class="form-check-input access" id="a_records"/> تغییر دیتابیس‌ها <br>
<input type="checkbox" class="form-check-input access" id="a_notifs"/> ارسال اعلان
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
						"event": `addAdmin(
							document.getElementById("guid").value,
							document.querySelectorAll(".access")
						);`
					}
				]
			]
		}
	);
};
var addAdmin = (id, accesses) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	var Accesses = [];
	accesses.forEach((access) => {
		access.checked ? Accesses.push(access.id.split("_")[1]) : null ;
	});
	console.log(id, Accesses);
	successToast("مدیر موردنظر با موفقیت اضافه شد");
};

var showAddUserProduct = () => {
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
					"icon": "plus-circle",
					"title": "افزودن محصول"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
لوگو: <input type="file" id="thumbnail"/>
<input type="text" class="dialog-field" id="name" placeholder="نام محصول"/>
<input type="text" class="dialog-field left-input" id="guid" placeholder="شناسهٔ کاربری توسعه‌دهنده"/>
<input type="url" class="dialog-field left-input" id="link" placeholder="لینک مستقیم محصول"/>
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
						"event": `addUserProduct(
							document.getElementById("thumbnail"),
							document.getElementById("name").value,
							document.getElementById("guid").value,
							document.getElementById("link").value
						);`
					}
				]
			]
		}
	);
};
var addUserProduct = (thumbnail, name, developer, link) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("محصول موردنظر با موفقیت اضافه شد");
};

/// Edit
var showEditUser = (id) => {
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
					"title": "ویرایش کاربر"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<input type="text" class="dialog-field left-input" id="guid" placeholder="شناسهٔ کاربری"/>
<input type="text" class="dialog-field left-input" id="key" placeholder="مؤلفه"/>
<input type="text" class="dialog-field left-input" id="value" placeholder="مقدار"/>
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
						"event": `editUser(
							document.getElementById("guid").value,
							document.getElementById("key").value,
							document.getElementById("value").value
						);`
					}
				]
			]
		}
	);
};
var editUser = (id, key, value) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("کاربر موردنظر با موفقیت ویرایش شد");
};

var showEditMaster = (id) => {
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
					"title": "ویرایش مدرس"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<input type="text" class="dialog-field left-input" id="guid" placeholder="شناسهٔ کاربری"/>
<input type="text" class="dialog-field left-input" id="key" placeholder="مؤلفه"/>
<input type="text" class="dialog-field left-input" id="value" placeholder="مقدار"/>
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
						"event": `editMaster(
							document.getElementById("guid").value,
							document.getElementById("key").value,
							document.getElementById("value").value
						);`
					}
				]
			]
		}
	);
};
var editMaster = (id, key, value) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("مدرس موردنظر با موفقیت ویرایش شد");
};

var showEditAdmin = (id) => {
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
					"title": "ویرایش مدیر"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<input type="text" class="dialog-field left-input" id="guid" placeholder="شناسهٔ کاربری"/>
<input type="text" class="dialog-field left-input" id="key" placeholder="مؤلفه"/>
<input type="text" class="dialog-field left-input" id="value" placeholder="مقدار"/>
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
						"event": `editAdmin(
							document.getElementById("guid").value,
							document.getElementById("key").value,
							document.getElementById("value").value
						);`
					}
				]
			]
		}
	);
};
var editAdmin = (id, key, value) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("مدیر موردنظر با موفقیت ویرایش شد");
};

var showEditArticle = (id, thumbnail, title, description) => {
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
<img src="${thumbnail}" alt="[THUMBNAIL]" class="thumbnail"/>
تصویر جدید: <input type="file" id="cover"/>
<br>
<input class="dialog-field article-title-field" id="title" value="${title}" placeholder="عنوان مقاله"/>
<textarea type="text" rows="5" class="dialog-field article-content-field" name="description" id="content" value="${description}" placeholder="چیزی بنویسید...">${description}</textarea>
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
							"${id}",
							document.getElementById("cover").src == "" ? "${thumbnail}" : document.getElementById("cover").src,
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
	// todo: use XHR
	successToast("مقالهٔ موردنظر با موفقیت ویرایش شد");
};

var showEditCourse = (id, thumbnail, title, description) => {
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
					"title": "ویرایش دوره"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<img src="${thumbnail}" alt="[THUMBNAIL]" class="thumbnail"/>
تصویر جدید: <input type="file" id="cover"/>
<br>
<input class="dialog-field article-title-field" id="title" value="${title}" placeholder="عنوان دوره"/>
<textarea type="text" rows="5" class="dialog-field article-content-field" name="description" id="content" value="${description}" placeholder="چیزی بنویسید...">${description}</textarea>
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
						"event": `editCourse(
							"${id}",
							document.getElementById("cover").src == "" ? "${thumbnail}" : document.getElementById("cover").src,
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
var editCourse = (id, thumbnail, title, description) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("دورهٔ موردنظر با موفقیت ویرایش شد");
};

var showEditRules = () => {
	var textEl = document.getElementById("rules-records");
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
					"title": "ویرایش قوانین"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<textarea style="width: 100%; height: 250px;" class="dialog-field" id="content" placeholder="چیزی بنویسید...">${textEl.innerHTML.replace(/\<br\>/g, "\n")}</textarea>
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
						"event": `editRules(document.getElementById("content").value);`
					}
				]
			]
		}
	);
};
var editRules = (html) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("قوانین با موفقیت ویرایش شد");
	document.getElementById("rules-records").innerHTML = html.replace(/\n/g, "<br>");
};

var showEditHelp = () => {
	var textEl = document.getElementById('help-records');
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
					"title": "ویرایش راهنما"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<textarea style="width: 100%; height: 250px;" class="dialog-field" id="content" placeholder="چیزی بنویسید...">${textEl.innerHTML.replace(/\<br\>/g, "\n")}</textarea>
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
						"event": `editHelp(document.getElementById("content").value);`
					}
				]
			]
		}
	);
};
var editHelp = (html) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	successToast("راهنما با موفقیت ویرایش شد");
	document.getElementById("help-records").innerHTML = html.replace(/\n/g, "<br>");
};

/// Search
var usersInitial = document.getElementById("users-container").innerHTML;
var mastersInitial = document.getElementById("masters-container").innerHTML;
var adminsInitial = document.getElementById("admins-container").innerHTML;
var articlesInitial = document.getElementById("articles-container").innerHTML;
var coursesInitial = document.getElementById("courses-container").innerHTML;

var searchUser = (query) => {
	var container = document.getElementById("users-container");
	if (query.length >= 3) {
		// todo: send XHR
		var result = [
			{
				"id": "u0876543211234567890",
				"name": "بهمن احمدی",
			}
		]
		
		container.innerHTML = "";
		for (var user of result) {
			container.innerHTML += `
<div class="record user outer-neumorphism d-flex">
	<div class="verify-rightside">
		<p class="bi bi-person part-name course-name" onclick="goto(Links.profile + '${user.id}', false, '_blank');"> ${user.name}</p>
	</div>
	<div class="verify-leftside">
		<button class="bi bi-pencil btn btn-view-admin" onclick="showEditUser('${user.id}');"></button>
		<button class="bi bi-trash btn btn-delete" onclick="showUserDelete('${user.id}');"></button>
	</div>
</div>
			`;
		}
	} else if (usersInitial != container.innerHTML) {
		container.innerHTML = usersInitial;
	}
};
var searchMaster = (query) => {
	var container = document.getElementById("masters-container");
	if (query.length >= 3) {
		// todo: send XHR
		var result = [
			{
				"id": "m0876543211234567890",
				"name": "بهمن احمدی",
			}
		]
		
		container.innerHTML = "";
		for (var master of result) {
			container.innerHTML += `
<div class="record master outer-neumorphism d-flex">
	<div class="verify-rightside">
		<p class="bi bi-person-square part-name course-name" onclick="goto(Links.profile + '${master.id}', false, '_blank');"> ${master.name}</p>
	</div>
	<div class="verify-leftside">
		<button class="bi bi-pencil btn btn-view-admin" onclick="showEditMaster('${master.id}');"></button>
		<button class="bi bi-trash btn btn-delete" onclick="showMasterDelete('${master.id}');"></button>
	</div>
</div>
			`;
		}
	} else if (mastersInitial != container.innerHTML) {
		container.innerHTML = mastersInitial;
	}
};
var searchAdmin = (query) => {
	var container = document.getElementById("admins-container");
	if (query.length >= 3) {
		// todo: send XHR
		var result = [
			{
				"id": "a0876543211234567890",
				"name": "بهمن احمدی",
			}
		]
		
		container.innerHTML = "";
		for (var admin of result) {
			container.innerHTML += `
<div class="record admin outer-neumorphism d-flex">
	<div class="verify-rightside">
		<p class="bi bi-person-circle part-name course-name" onclick="goto(Links.profile + '${admin.id}', false, '_blank');"> ${admin.name}</p>
	</div>
	<div class="verify-leftside">
		<button class="bi bi-pencil btn btn-view-admin" onclick="showEditAdmin('${admin.id}');"></button>
		<button class="bi bi-trash btn btn-delete" onclick="showAdminDelete('${admin.id}');"></button>
	</div>
</div>
			`;
		}
	} else if (adminsInitial != container.innerHTML) {
		container.innerHTML = adminsInitial;
	}
};
var searchArticle = (query) => {
	var container = document.getElementById("articles-container");
	if (query.length >= 3) {
		// todo: send XHR
		var result = [
			{
				"id": "A0876543211234567890",
				"title": "آموزش برنامه‌نویسی",
				"thumbnail": "dist/assets/article.jpg",
				"html": "lorem Ipsum ".repeat(100),
				"author": "بهمن احمدی",
			},
			{
				"id": "A0876543211234567890",
				"title": "آموزش برنامه‌نویسی",
				"thumbnail": "dist/assets/article.jpg",
				"html": "lorem Ipsum ".repeat(100),
				"author": "بهمن احمدی",
			},
		]
		
		container.innerHTML = "";
		for (var article of result) {
			container.innerHTML += `
<div class="record article outer-neumorphism d-flex">
	<div class="verify-rightside">
		<p class="bi bi-file-text part-name course-name" onclick="goto(Links.blog.post + '${article.id}', false, '_blank');"> ${article.title}</p>
		<p class="part-coursename course-master author">${article.author}</p>
	</div>
	<div class="verify-leftside">
		<button class="bi bi-pencil btn btn-view-admin" onclick="showEditArticle('${article.id}', '${article.thumbnail}' ,'${article.title}', '${article.html}');"></button>
		<button class="bi bi-trash btn btn-delete" onclick="showArticleDelete('${article.id}');"></button>
	</div>
</div>
			`;
		}
	} else if (articlesInitial != container.innerHTML) {
		container.innerHTML = articlesInitial;
	}
};
var searchCourse = (query) => {
	var container = document.getElementById("courses-container");
	if (query.length >= 3) {
		// todo: send XHR
		var result = [
			{
				"id": "c0876543211234567890",
				"title": "آموزش گیت و گیت‌هاب",
				"thumbnail": "dist/assets/banner.jpg",
				"description": "lorem Ipsum ".repeat(70),
				"master": "بهمن احمدی",
			}
		]
		
		container.innerHTML = "";
		for (var course of result) {
			container.innerHTML += `
<div class="record course outer-neumorphism d-flex">
	<div class="verify-rightside">
		<p class="bi bi-collection-play part-name course-name" onclick="goto(Links.course + '${course.id}', false, '_blank');"> ${course.title}</p>
		<p class="part-coursename course-master author">بهمن احمدی</p>
	</div>
	<div class="verify-leftside">
		<button class="bi bi-pencil btn btn-view-admin" onclick="showEditCourse('${course.id}', '${course.thumbnail}' ,'${course.title}', '${course.description}');"></button>
		<button class="bi bi-trash btn btn-delete" onclick="showCourseDelete('${course.id}');"></button>
	</div>
</div>
			`;
		}
	} else if (coursesInitial != container.innerHTML) {
		container.innerHTML = coursesInitial;
	}
};

// sending notifications
var showSendNotif = () => {
	dialog(
		[
			"var(--color-white);",
			"var(--color-amber-strong);",
			"var(--color-gray-low);",
			"var(--color-contrast);"
		],
		{
			"header": [
				{
					"icon": "bell",
					"title": "ارسال اعلان برای کاربر"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<input type="text" class="dialog-field left-input" id="notifguid" placeholder="شناسهٔ کاربری"/>
<textarea style="width: 100%; height: 250px;" class="dialog-field" id="notiftext" placeholder="چیزی بنویسید..."></textarea>
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
						"event": `sendNotif("user", document.getElementById("notifguid").value, document.getElementById("notiftext").value);`
					}
				]
			]
		}
	);
};

var showSendUsersNotif = () => {
	dialog(
		[
			"var(--color-white);",
			"var(--color-amber-strong);",
			"var(--color-gray-low);",
			"var(--color-contrast);"
		],
		{
			"header": [
				{
					"icon": "bell",
					"title": "ارسال اعلان برای کاربران"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<textarea style="width: 100%; height: 250px;" class="dialog-field" id="notiftext" placeholder="چیزی بنویسید..."></textarea>
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
						"event": `sendNotif("users", "", document.getElementById("notiftext").value);`
					}
				]
			]
		}
	);
};

var showSendMastersNotif = () => {
	dialog(
		[
			"var(--color-white);",
			"var(--color-amber-strong);",
			"var(--color-gray-low);",
			"var(--color-contrast);"
		],
		{
			"header": [
				{
					"icon": "bell",
					"title": "ارسال اعلان برای اساتید"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<textarea style="width: 100%; height: 250px;" class="dialog-field" id="notiftext" placeholder="چیزی بنویسید..."></textarea>
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
						"event": `sendNotif("masters", "", document.getElementById("notiftext").value);`
					}
				]
			]
		}
	);
};

var sendNotif = (type, guid, text) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: use XHR
	console.log(type, guid, text);
	successToast("اعلان با موفقیت ارسال شد");
};