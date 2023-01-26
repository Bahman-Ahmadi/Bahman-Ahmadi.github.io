var usersProducts = () => {
	dialog(
		[
			"var(--color-white);",
			"var(--color-gray-strong);",
			"var(--color-gray-low);",
			"var(--color-gray-strong);"
		],
		{
			"header": [
				{
					"icon": "award",
					"title": "محصولات کاربران"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<div class="usersproducts-container">
	<div class="user-product d-flex">
		<div class="userproduct-rightside">
			<p class="product-title">محصول</p>
			<p class="product-author">بهمن احمدی</p>
		</div>
		<div class="userproduct-leftside">
			<button class="bi bi-caret-left btn btn-goto-product" onclick="goto('PRODUCT-URL');"></button>
		</div>
	</div>
	<div class="user-product d-flex">
		<div class="userproduct-rightside">
			<p class="product-title">محصول</p>
			<p class="product-author">بهمن احمدی</p>
		</div>
		<div class="userproduct-leftside">
			<button class="bi bi-caret-left btn btn-goto-product" onclick="goto('PRODUCT-URL');"></button>
		</div>
	</div>
	<div class="user-product d-flex">
		<div class="userproduct-rightside">
			<p class="product-title">محصول</p>
			<p class="product-author">بهمن احمدی</p>
		</div>
		<div class="userproduct-leftside">
			<button class="bi bi-caret-left btn btn-goto-product" onclick="goto('PRODUCT-URL');"></button>
		</div>
	</div>
	<div class="user-product d-flex">
		<div class="userproduct-rightside">
			<p class="product-title">محصول</p>
			<p class="product-author">بهمن احمدی</p>
		</div>
		<div class="userproduct-leftside">
			<button class="bi bi-caret-left btn btn-goto-product" onclick="goto('PRODUCT-URL');"></button>
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
						"text": "<i class='bi bi-check'></i>",
						"event": `document.getElementById("dialogbtn_hide").click();`
					}
				]
			]
		}
	);
};

var dailyDiscounts = () => {
	infoDialog(
		"تخفیفات روزانه",
		"توی پیج اینستاگرام و کانال تلگراممون هرروز تخفیف های ویژه‌ای میذاریم. پس این فرصت رو از دست نده، همین حالا به ما بپیوند تا از این تخفیف ها استفاده کنی.",
		[
			`document.getElementById("dialogbtn_hide").click();`,
			`goto(Links.instagram);`
		]
	);
};

var notAvailable = () => {
	errorToast(
		"این بخش فعلا آماده نیست",
		(toastBox)=>{toastBox.remove()},
		"فهمیدم"
	);
};

var rules = () => {
	// todo: load rules from XHR
	infoDialog(
		"قوانین",
		"للورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم ..............……………………………………لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم ..............……………………………………ورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم ..............……………………………………"
	);
};

var deleteAccount = () => {
	warnDialog(
		"حذف اکانت",
		"آیا مطمئنید که میخواهید حساب‌کاربری خود را پاک کنید؟<br>با این کار تمامی اطلاعات شما آرشیو و غیرقابل بازیابی خواهد شد، همچنین حساب‌کاربری شما غیرقابل دسترسی شده و قادر به استفاده و یا بازگردانی آن نخواهید بود. ادامه می‌دهید؟",
		"حذف کن",
		[
			`document.getElementById("dialogbtn_hide").click();`,
			`archiveAccount();`
		]
	);
};
var archiveAccount = () => {
	// todo: XHR for archiving the account
	localStorage.removeItem("mluser");
	localStorage.removeItem("mladmin");
	window.location.reload();
};

var requestCourse = () => {
	dialog(
		[
			"var(--color-white);",
			"var(--color-violet-strong);",
			"var(--color-gray-low);",
			"var(--color-gray-strong);"
		],
		{
			"header": [
				{
					"icon": "plus-circle-dotted",
					"title": "درخواست دوره"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<div class="request-course">
	<input type="text" id="request" placeholder="چه دوره‌ای نیاز دارید؟"/>
</div>
				`
			},
			"footer": [
				[],
				[
					{
						"type": "success",
						"id": "Done",
						"text": "ارسال",
						"event": `requestingCourse(document.getElementById("request").value);`
					}
				]
			]
		}
	);
};
var requestingCourse = (course) => {
	// todo: send XHR for announcing wanted course
	document.getElementById("dialogbtn_hide").click();
	successToast("درخواست شما ابلاغ شد");
	console.log(course);
};

var statistics = () => {
	if (localStorage.getItem("mladmin") != null) {
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
						"icon": "graph-up",
						"title": "آمار"
					},
					{
						"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
					}
				],
				"content": {
					"html": `
	<p class="chart-title">آمار مالی</p>
	<div class="ct-chart ct-perfect-fourth" id="chart1"></div>
	<p class="chart-title">آمار ثبت‌نام دوره‌ها</p>
	<div class="ct-chart ct-perfect-fourth" id="chart2"></div>
					`
				},
				"footer": [
					[],
					[
						{
							"type": "success",
							"id": "Done",
							"text": "تأیید",
							"event": `document.getElementById("dialogbtn_hide").click();`
						}
					]
				]
			}
		);
	
		new Chartist.Line('#chart1', {
			labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
			series: [
				[10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000]
			]
		});
		new Chartist.Line('#chart2', {
			labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
			series: [
				[20, 70, 100, 110, 150, 150, 280, 300, 310, 310, 312, 320]
			]
		});
	} else {
		errorToast("این عملیات تنها برای اساتید است", (toastbox)=>{toastbox.remove()}, "باشه");
	}
};

var reports = () => {
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
					"icon": "exclamation-octagon",
					"title": "گزارشات"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<div class="reports">
	<div class="report d-flex">
		<div class="report-rightside">
			<p class="report-title">آموزش کاربردی گیت و گیت‌هاب</p>
			<p class="report-text">۱۴۰۱/۱۰/۱۵</p>
		</div>
		<div class="report-leftside">
			<p class="report-status status-notchecked">بررسی نشده</p>
		</div>
	</div>
	<div class="report d-flex">
		<div class="report-rightside">
			<p class="report-title">آموزش کاربردی گیت و گیت‌هاب</p>
			<p class="report-text">۱۴۰۱/۱۰/۱۵</p>
		</div>
		<div class="report-leftside">
			<p class="report-status status-checked">بررسی شده</p>
		</div>
	</div>
	<div class="report d-flex">
		<div class="report-rightside">
			<p class="report-title">آموزش کاربردی گیت و گیت‌هاب</p>
			<p class="report-text">۱۴۰۱/۱۰/۱۵</p>
		</div>
		<div class="report-leftside">
			<p class="report-status status-notchecked">بررسی نشده</p>
		</div>
	</div>
	<div class="report d-flex">
		<div class="report-rightside">
			<p class="report-title">آموزش کاربردی گیت و گیت‌هاب</p>
			<p class="report-text">۱۴۰۱/۱۰/۱۵</p>
		</div>
		<div class="report-leftside">
			<p class="report-status status-checked">بررسی شده</p>
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
						"id": "Done",
						"text": "تأیید",
						"event": `document.getElementById("dialogbtn_hide").click();`
					}
				]
			]
		}
	);
};

var masters = () => {
	dialog(
		[
			"var(--color-white)",
			"var(--color-amber)",
			"var(--color-gray-low)",
			"var(--color-contrast)"
		],
		{
			"header": [
				{
					"icon": "person-square",
					"title": "اساتید"
				},
				{
					"element": "<button class='btn' id='dialogbtn_hide'><i class='bi bi-x'></i></button>"
				}
			],
			"content": {
				"html": `
<div class="masters">
	<div class="master" onclick="goto('http://cvlink.com');">
		<img src="dist/assets/admin.png" alt="[MASTER]" class="master-thumbnail"/>
		<p class="master-name">بهمن احمدی</p>
		<p class="master-job">برنامه‌نویسی وب</p>
	</div>
	<div class="master" onclick="goto('http://cvlink.com');">
		<img src="dist/assets/admin.png" alt="[MASTER]" class="master-thumbnail"/>
		<p class="master-name">بهمن احمدی</p>
		<p class="master-job">برنامه‌نویسی وب</p>
	</div>
	<div class="master" onclick="goto('http://cvlink.com');">
		<img src="dist/assets/admin.png" alt="[MASTER]" class="master-thumbnail"/>
		<p class="master-name">بهمن احمدی</p>
		<p class="master-job">برنامه‌نویسی وب</p>
	</div>
	<div class="master" onclick="goto('http://cvlink.com');">
		<img src="dist/assets/admin.png" alt="[MASTER]" class="master-thumbnail"/>
		<p class="master-name">بهمن احمدی</p>
		<p class="master-job">برنامه‌نویسی وب</p>
	</div>
	<div class="master" onclick="goto('http://cvlink.com');">
		<img src="dist/assets/admin.png" alt="[MASTER]" class="master-thumbnail"/>
		<p class="master-name">بهمن احمدی</p>
		<p class="master-job">برنامه‌نویسی وب</p>
	</div>
	<div class="master" onclick="goto('http://cvlink.com');">
		<img src="dist/assets/admin.png" alt="[MASTER]" class="master-thumbnail"/>
		<p class="master-name">بهمن احمدی</p>
		<p class="master-job">برنامه‌نویسی وب</p>
	</div>
	<div class="master" onclick="goto('http://cvlink.com');">
		<img src="dist/assets/admin.png" alt="[MASTER]" class="master-thumbnail"/>
		<p class="master-name">بهمن احمدی</p>
		<p class="master-job">برنامه‌نویسی وب</p>
	</div>
	<div class="master" onclick="goto('http://cvlink.com');">
		<img src="dist/assets/admin.png" alt="[MASTER]" class="master-thumbnail"/>
		<p class="master-name">بهمن احمدی</p>
		<p class="master-job">برنامه‌نویسی وب</p>
	</div>
	<div class="master" onclick="goto('http://cvlink.com');">
		<img src="dist/assets/admin.png" alt="[MASTER]" class="master-thumbnail"/>
		<p class="master-name">بهمن احمدی</p>
		<p class="master-job">برنامه‌نویسی وب</p>
	</div>
	<div class="master" onclick="goto('http://cvlink.com');">
		<img src="dist/assets/admin.png" alt="[MASTER]" class="master-thumbnail"/>
		<p class="master-name">بهمن احمدی</p>
		<p class="master-job">برنامه‌نویسی وب</p>
	</div>
	<div class="master" onclick="goto('http://cvlink.com');">
		<img src="dist/assets/admin.png" alt="[MASTER]" class="master-thumbnail"/>
		<p class="master-name">بهمن احمدی</p>
		<p class="master-job">برنامه‌نویسی وب</p>
	</div>
	<div class="master" onclick="goto('http://cvlink.com');">
		<img src="dist/assets/admin.png" alt="[MASTER]" class="master-thumbnail"/>
		<p class="master-name">بهمن احمدی</p>
		<p class="master-job">برنامه‌نویسی وب</p>
	</div>
	<div class="master" onclick="goto('http://cvlink.com');">
		<img src="dist/assets/admin.png" alt="[MASTER]" class="master-thumbnail"/>
		<p class="master-name">بهمن احمدی</p>
		<p class="master-job">برنامه‌نویسی وب</p>
	</div>
	<div class="master" onclick="goto('http://cvlink.com');">
		<img src="dist/assets/admin.png" alt="[MASTER]" class="master-thumbnail"/>
		<p class="master-name">بهمن احمدی</p>
		<p class="master-job">برنامه‌نویسی وب</p>
	</div>
</div>
				`
			},
			"footer": [
				[],
				[
					{
						"type": "success",
						"id": "Done",
						"text": "حله",
						"event": `document.getElementById("dialogbtn_hide").click();`
					}
				]
			]
		}
	);
};

var help = () => {
	infoDialog(
		"راهنما",
		"لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم لورم ایپسوم "
	);
};