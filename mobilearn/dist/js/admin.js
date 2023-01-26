if (localStorage.getItem("mladmin") != null) {
	// admin.html will load
} else if (localStorage.getItem("mluser") != null) {
	goto("user.html");
} else {
	goto("register.html");
}

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
document.getElementById("theme").onclick = changeTheme;

// liked posts
var showLikedPosts = () => {
	// todo: load liked posts from XHR then replace that instance of <dialog.contents.content.html>
	dialog(
		[
			"var(--color-white);",
			"var(--color-red-strong);",
			"var(--color-red-low);",
			"var(--color-gray-strong);"
		],
		{
			"header": [
				{
					"icon": "heart-fill",
					"title": "مطالب محبوب"
				},
				{
					"element": "<button class='btn bi bi-x' id='dialogbtn_hide'></button>"
				}
			],
			"content": {
				"html": `
<div class="liked-posts">
	<div class="liked-post d-flex">
		<div class="liked-post-rightside d-flex">
			<img class="liked-post-thumbnail" src="dist/assets/article.jpg" alt="thumbnail"/>
			<div class="liked-post-texts">
				<p class="liked-post-title">عنوان</p>
				<p class="bi bi-person liked-post-author"> بهمن احمدی</p>
			</div>
		</div>
		<div class="liked-post-leftside d-flex">
			<button class="bi bi-trash btn btn-unlike-likedpost" onclick="unlikePost(this, '<POST-ID>');"></button>
			<button class="bi bi-caret-left btn btn-goto-likedpost" onclick="goto(Links.blog.post+'<POST-ID>');"></button>
		</div>
	</div>
	<div class="liked-post d-flex">
		<div class="liked-post-rightside d-flex">
			<img class="liked-post-thumbnail" src="dist/assets/article.jpg" alt="thumbnail"/>
			<div class="liked-post-texts">
				<p class="liked-post-title">عنوان</p>
				<p class="bi bi-person liked-post-author"> بهمن احمدی</p>
			</div>
		</div>
		<div class="liked-post-leftside d-flex">
			<button class="bi bi-trash btn btn-unlike-likedpost" onclick="unlikePost(this, '<POST-ID>');"></button>
			<button class="bi bi-caret-left btn btn-goto-likedpost" onclick="goto(Links.blog.post+'<POST-ID>');"></button>
		</div>
	</div>
	<div class="liked-post d-flex">
		<div class="liked-post-rightside d-flex">
			<img class="liked-post-thumbnail" src="dist/assets/article.jpg" alt="thumbnail"/>
			<div class="liked-post-texts">
				<p class="liked-post-title">عنوان</p>
				<p class="bi bi-person liked-post-author"> بهمن احمدی</p>
			</div>
		</div>
		<div class="liked-post-leftside d-flex">
			<button class="bi bi-trash btn btn-unlike-likedpost" onclick="unlikePost(this, '<POST-ID>');"></button>
			<button class="bi bi-caret-left btn btn-goto-likedpost" onclick="goto(Links.blog.post+'<POST-ID>');"></button>
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
function unlikePost(el, postID) {
	// delete liked post from UI
	el.parentNode.parentNode.remove();
	// todo: send unlikePost request using XHR
	console.log(postID);
}

// wallet
var showWallet = () => {
	// load wallet reports from XHR then replace that instance of <dialog.contents.content.html>
	dialog(
		[
			"var(--color-white);",
			"var(--color-green-strong);",
			"var(--color-green-low);",
			"var(--color-gray-strong);"
		],
		{
			"header": [
				{
					"icon": "wallet2",
					"title": "کیف پول (۱۰,۰۰۰ تومان)"
				},
				{
					"element": "<button class='btn bi bi-x' id='dialogbtn_hide'></button>"
				}
			],
			"content": {
				"html": `
<div class="wallet-operations d-flex">
	<button class="btn wallet-operation-charge" onclick="chargingPage();"><i class="bi bi-plus"></i> شارژ</button>
	<button class="btn wallet-operation-cash" onclick="cashingPage();"><i class="bi bi-cash"></i> برداشت</button>
</div>
<div class="wallet-reports">
	<div class="wallet-report d-flex">
		<div class="walletreport-rightside d-flex">
			<div class="bi bi-arrow-up reporttype-ic reporttype-pay"></div>
			<div class="walletreport-info">
				<p class="walletreport-type reporttype-pay">پرداخت</p>
				<p class="walletreport-value">مقدار: ۲۰,۰۰۰ تومان</p>
				<p class="walletreport-leftover">باقی‌مانده: ۱۰,۰۰۰ تومان</p>
			</div>
		</div>
		<div class="walletreport-leftside">
			<p class="walletreport-datetime">۱۴۰۱/۱۰/۱۴ ۲۰:۱۲:۲۱</p>
		</div>
	</div>
	<div class="wallet-report d-flex">
		<div class="walletreport-rightside d-flex">
			<div class="bi bi-arrow-down reporttype-ic reporttype-charge"></div>
			<div class="walletreport-info">
				<p class="walletreport-type reporttype-charge">شارژ</p>
				<p class="walletreport-value">مقدار: ۱۰,۰۰۰ تومان</p>
				<p class="walletreport-leftover">باقی‌مانده: ۱۰,۰۰۰ تومان</p>
			</div>
		</div>
		<div class="walletreport-leftside">
			<p class="walletreport-datetime">۱۴۰۱/۱۰/۱۳ ۲۰:۱۲:۲۱</p>
		</div>
	</div>
	<div class="wallet-report d-flex">
		<div class="walletreport-rightside d-flex">
			<div class="bi bi-cash reporttype-ic reporttype-cash"></div>
			<div class="walletreport-info">
				<p class="walletreport-type reporttype-cash">برداشت</p>
				<p class="walletreport-value">مقدار: ۱۰۰,۰۰۰ تومان</p>
				<p class="walletreport-leftover">باقی‌مانده: ۱۰,۰۰۰ تومان</p>
			</div>
		</div>
		<div class="walletreport-leftside">
			<p class="walletreport-datetime">۱۴۰۱/۱۰/۱۲ ۲۰:۱۲:۲۱</p>
		</div>
	</div>
	<div class="wallet-report d-flex">
		<div class="walletreport-rightside d-flex">
			<div class="bi bi-arrow-up reporttype-ic reporttype-pay"></div>
			<div class="walletreport-info">
				<p class="walletreport-type reporttype-pay">پرداخت</p>
				<p class="walletreport-value">مقدار: ۲۰,۰۰۰ تومان</p>
				<p class="walletreport-leftover">باقی‌مانده: ۱۰,۰۰۰ تومان</p>
			</div>
		</div>
		<div class="walletreport-leftside">
			<p class="walletreport-datetime">۱۴۰۱/۱۰/۱۴ ۲۰:۱۲:۲۱</p>
		</div>
	</div>
	<div class="wallet-report d-flex">
		<div class="walletreport-rightside d-flex">
			<div class="bi bi-arrow-down reporttype-ic reporttype-charge"></div>
			<div class="walletreport-info">
				<p class="walletreport-type reporttype-charge">شارژ</p>
				<p class="walletreport-value">مقدار: ۱۰,۰۰۰ تومان</p>
				<p class="walletreport-leftover">باقی‌مانده: ۱۰,۰۰۰ تومان</p>
			</div>
		</div>
		<div class="walletreport-leftside">
			<p class="walletreport-datetime">۱۴۰۱/۱۰/۱۳ ۲۰:۱۲:۲۱</p>
		</div>
	</div>
	<div class="wallet-report d-flex">
		<div class="walletreport-rightside d-flex">
			<div class="bi bi-cash reporttype-ic reporttype-cash"></div>
			<div class="walletreport-info">
				<p class="walletreport-type reporttype-cash">برداشت</p>
				<p class="walletreport-value">مقدار: ۱۰۰,۰۰۰ تومان</p>
				<p class="walletreport-leftover">باقی‌مانده: ۱۰,۰۰۰ تومان</p>
			</div>
		</div>
		<div class="walletreport-leftside">
			<p class="walletreport-datetime">۱۴۰۱/۱۰/۱۲ ۲۰:۱۲:۲۱</p>
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
function chargingPage() {
	dialog(
		[
			"var(--color-white);",
			"var(--color-green-strong);",
			"var(--color-green-low);",
			"var(--color-gray-strong);"
		],
		{
			"header": [
				{
					"icon": "plus-circle",
					"title": "شارژ کیف‌پول"
				},
				{
					"element": "<button class='btn bi bi-x' id='dialogbtn_hide'></button>"
				}
			],
			"content": {
				"html": `
<div class="charge-container">
	<div class="charge-input-container d-flex">
		<input class="dialog-field" type="number" id="payvalue" onkeyup="payValueController(this.value);" value="10000" placeholder="مقدار شارژ موردنظر را وارد کنید"/>
		<div class="charge-controllers">
			<button class="bi bi-plus btn btn-increase-charge" onclick="payValueController(document.getElementById('payvalue').value*1 + 1000);"></button> <br>
			<button class="bi bi-dash btn btn-decrease-charge" onclick="payValueController(document.getElementById('payvalue').value*1 - 1000);"></button>
		</div>
	</div>
	<p class="bold" id="finalAmount">قابل پرداخت (%10+): 11,000 تومان</p>
</div>
				`
			},
			"footer": [
				[
					{
						"type": "info",
						"id": "help",
						"text": "راهنما",
						"event": `showPayHelp();`
					}
				],
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
						"text": "پرداخت",
						"event": `goto(Links.pay+document.getElementById("payvalue").value);document.getElementById("dialogbtn_hide").click();`
					}
				]
			]
		}
	);
}
function payValueController(value) {
	var input = document.getElementById("payvalue");
	var finalAmount = document.getElementById("finalAmount");
	value *= 1;
	value < 10000 ? input.value = "10000" : value > 1000000 ? input.value = "1000000" : input.value = value;
	value = input.value*1;
	finalAmount.innerHTML = "قابل پرداخت (%10+): "+ separatingNums(value + (value / 10)) + " تومان";
}
function showPayHelp() {
	infoDialog(
		"راهنما",
		"برای تعیین وجه شارژ لازم است که مقدار مورد نظر بین ۱۰ هزارتومان تا ۱ میلیون تومان باشد. همچنین ۱۰ درصد به عنوان کارمزد، به مقدار موردنظر افزوده می‌شود."
	);
}
function cashingPage() {
	dialog(
		[
			"var(--color-white);",
			"var(--color-bluegray);",
			"var(--color-gray-low);",
			"var(--color-gray-strong);"
		],
		{
			"header": [
				{
					"icon": "cash-stack",
					"title": "برداشت"
				},
				{
					"element": "<button class='btn bi bi-x' id='dialogbtn_hide'></button>"
				}
			],
			"content": {
				"html": `لطفا شماره‌کارت خود را وارد کنید<br>
<input class="dialog-field" type="number" id="cardnumber" placeholder="شماره کارت ۱۶ رقمی"/><br>
درخواست شما پس از وارد کردن شماره کارت و سپس لمس دکمه «تأیید» بررسی می‌شود.
درصورتی که موجودی کیف‌پول شما کمتر از ۱۰۰ هزارتومان نباشد مقدار موجودی منهای ۱۰ درصد کارمزد، به حساب بانکی شما با شماره کارتی که در بالا وارد کرده‌اید، پس از حداقل ۳ روز کاری واریز خواهد شد.<br>
<b>تذکر:</b> در وارد کردن شماره کارت دقت کنید در غیر این صورت مسئولیت هرگونه خطای احتمالی بر عهده ما نخواهد بود.`

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
						"text": "ارسال",
						"event": `cash(document.getElementById("cardnumber").value);document.getElementById("dialogbtn_hide").click();`
					}
				]
			]
		}
	);
}

function pay(value, to) {
	// todo: send XHR for deducting the desired money along with the fee from this user and adding money to the desired instructor
}
function cash(cardnumber) {
	// todo: send XHR for reduce the amount of wallet and put money transfer on the agenda
}

// show signed up courses
var showMyCourses = () => {
	// todo: load my courses from XHR then replace that instance of <dialog.contents.content.html>
	dialog(
		[
			"var(--color-white);",
			"var(--color-violet-strong);",
			"var(--color-violet-low);",
			"var(--color-gray-strong);"
		],
		{
			"header": [
				{
					"icon": "collection-play",
					"title": "دوره های من"
				},
				{
					"element": "<button class='btn bi bi-x' id='dialogbtn_hide'></button>"
				}
			],
			"content": {
				"html": `
<div class="my-courses">
	<div class="my-course d-flex">
		<div class="my-course-rightside d-flex">
			<img class="my-course-thumbnail" src="dist/assets/banner.jpg" alt="thumbnail"/>
			<div class="my-course-texts">
				<p class="my-course-title">عنوان</p>
				<p class="bi bi-person my-course-author"> بهمن احمدی</p>
			</div>
		</div>
		<div class="my-course-leftside d-flex">
			<button class="bi bi-download btn btn-unlike-mycourse" onclick="download('<COURSE-ID>');"></button>
			<button class="bi bi-caret-left btn btn-goto-mycourse" onclick="goto(Links.course+'<COURSE-ID>');"></button>
		</div>
	</div>
	<div class="my-course d-flex">
		<div class="my-course-rightside d-flex">
			<img class="my-course-thumbnail" src="dist/assets/banner.jpg" alt="thumbnail"/>
			<div class="my-course-texts">
				<p class="my-course-title">عنوان</p>
				<p class="bi bi-person my-course-author"> بهمن احمدی</p>
			</div>
		</div>
		<div class="my-course-leftside d-flex">
			<button class="bi bi-download btn btn-unlike-mycourse" onclick="download('<COURSE-ID>');"></button>
			<button class="bi bi-caret-left btn btn-goto-mycourse" onclick="goto(Links.course+'<COURSE-ID>');"></button>
		</div>
	</div>
	<div class="my-course d-flex">
		<div class="my-course-rightside d-flex">
			<img class="my-course-thumbnail" src="dist/assets/banner.jpg" alt="thumbnail"/>
			<div class="my-course-texts">
				<p class="my-course-title">عنوان</p>
				<p class="bi bi-person my-course-author"> بهمن احمدی</p>
			</div>
		</div>
		<div class="my-course-leftside d-flex">
			<button class="bi bi-download btn btn-unlike-mycourse" onclick="download('<COURSE-ID>');"></button>
			<button class="bi bi-caret-left btn btn-goto-mycourse" onclick="goto(Links.course+'<COURSE-ID>');"></button>
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

// show cart
var showCart = () => {
	dialog(
		[
			"var(--color-white);",
			"var(--color-primary);",
			"var(--color-gray-low);",
			"var(--color-contrast);",
		],
		{
			"header": [
				{
					"icon": "cart2",
					"title": "سبد خرید"
				},
				{
					"element": "<button class='btn bi bi-x' id='dialogbtn_hide'></button>"
				}
			],
			"content": {
				"html": `
<div class="cart">
	<div class="my-courses">
		<div class="my-course d-flex" id="course_COURSE-ID">
			<div class="my-course-rightside d-flex">
				<img class="my-course-thumbnail" src="dist/assets/banner.jpg" alt="thumbnail"/>
				<div class="my-course-texts">
					<p class="my-course-title">عنوان</p>
					<p class="bi bi-person my-course-author"> بهمن احمدی</p>
				</div>
			</div>
			<div class="my-course-leftside d-flex">
				<button class="bi bi-trash btn btn-delete-mycourse" onclick="deleteCart('COURSE-ID');"></button>
				<button class="bi bi-caret-left btn btn-goto-mycourse" onclick="buy('COURSE-ID');"></button>
			</div>
		</div>
		<div class="my-course d-flex" id="course_COURSE-ID2">
			<div class="my-course-rightside d-flex">
				<img class="my-course-thumbnail" src="dist/assets/banner.jpg" alt="thumbnail"/>
				<div class="my-course-texts">
					<p class="my-course-title">عنوان</p>
					<p class="bi bi-person my-course-author"> بهمن احمدی</p>
				</div>
			</div>
			<div class="my-course-leftside d-flex">
				<button class="bi bi-trash btn btn-delete-mycourse" onclick="deleteCart('COURSE-ID2');"></button>
				<button class="bi bi-caret-left btn btn-goto-mycourse" onclick="buy('COURSE-ID');"></button>
			</div>
		</div>
		<div class="my-course d-flex" id="course_COURSE-ID3">
			<div class="my-course-rightside d-flex">
				<img class="my-course-thumbnail" src="dist/assets/banner.jpg" alt="thumbnail"/>
				<div class="my-course-texts">
					<p class="my-course-title">عنوان</p>
					<p class="bi bi-person my-course-author"> بهمن احمدی</p>
				</div>
			</div>
			<div class="my-course-leftside d-flex">
				<button class="bi bi-trash btn btn-delete-mycourse" onclick="deleteCart('COURSE-ID3');"></button>
				<button class="bi bi-caret-left btn btn-goto-mycourse" onclick="buy('COURSE-ID');"></button>
			</div>
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

// delete from cart
var deleteCart = (id) => {
	console.log(id);
	document.getElementById(`course_${id}`).remove();
	// todo : send XHR for delete course from cart
};

// buy a course from cart
var buy = (id) => {
	// todo: send XHR for buy this course
	// todo: check if There was enough money in the wallet pay from the wallet, else Inventory increase
};

// statistics
var showStatistics = () => {
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
					"element": "<button class='btn bi bi-x' id='dialogbtn_hide'></button>"
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
};

var support = () => {
	// todo: set from righchat api
};


// Holding a new course
var newCourse = () => {
	dialog(
		[
			"var(--color-white);",
			"var(--color-bluegray);",
			"var(--color-gray-low);",
			"var(--color-contrast);",
		],
		{
			"header": [
				{
					"icon": "collection-play",
					"title": "دورهٔ جدید"
				},
				{
					"element": "<button class='btn bi bi-x' id='dialogbtn_hide'></button>"
				}
			],
			"content": {
				"html": `
<div class="new-course">
	<input class="dialog-field course-name" id="name" placeholder="نام دوره"/>
	<input class="dialog-field course-level" id="level" placeholder="سطح دوره (مقدماتی/پیشرفته)"/>
	<input type="number" class="dialog-field course-price" id="price" placeholder="قیمت دوره (در صورت رایگان بودن اینجا بنویسید 0)"/>
</div>
				`
			},
			"footer": [
				[
					{
						"type": "info",
						"id": "info",
						"text": "راهنما",
						"event": `showNewCourseHelp();`
					}
				],
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
						"text": "بررسی",
						"event": `makeCourse(document.getElementById("name").value, document.getElementById("level").value, document.getElementById("price").value);`
					}
				]
			]
		}
	);
};

var showNewCourseHelp = () => {
	infoDialog(
		"راهنما",
		`در قسمت نام دوره شما باید عنوان دوره‌ای که میخواهید برگزار کنید را به زبان فارسی بنویسید<br>
در قسمت سطح دوره باید یکی از دوکلمهٔ مقدماتی یا پیشرفته را بنویسید. دقت داشته باشید که نمی‌توان در یک دوره هردو سطح مقدماتی و پیشرفته را تدریس کنید.<br>
در قسمت قیمت دوره چنانچه میخواهید دوره را تماما رایگان برگزار کنید عدد 0 و در غیر این صورت مقدار قیمت موردنظر را به «تومان» وارد کنید. دقت داشته باشید که قیمتی منصفانه وارد کنید در غیر این صورت با برگزاری دوره شما مخالفت می‌شود.<br>
با احترام`
	);
};

var makeCourse = (name, level, price) => {
	if ((level == "مقدماتی"  ||level == "پیشرفته") && parseInt(price) >= 0) {
		document.getElementById("dialogbtn_hide").click();
		successToast("دوره شما در دست بررسی است");
		// todo: send XHR for submitting new course
	} else {
		errorToast("ورودی ها معتبر نیستند", (container) => {container.remove(); showNewCourseHelp()}, "راهنما");
	}
};

// upload new part
var showUpload = (id) => {
	dialog(
		[
			"var(--color-white);",
			"var(--color-primary);",
			"var(--color-gray-low);",
			"var(--color-contrast);",
		],
		{
			"header": [
				{
					"icon": "camera-video",
					"title": "قسمت جدید"
				},
				{
					"element": "<button class='btn bi bi-x' id='dialogbtn_hide'></button>"
				}
			],
			"content": {
				"html": `
<div class="new-part">
	<form action="/newpart" method="post" accept-charset="utf-8">
		<input type="hidden" name="course" value="${id}"/>
		<input type="file" name="file"/>
		<input class="dialog-field" name="title" placeholder="موضوع این قسمت چیست؟">
		<div class="parttypes d-flex">
			این قسمت رایگان است؟
			<input type="button" class="part-type part-type-selected" value="بله"/>
			<input type="button" class="part-type" value="نه"/>
		</div>
		<input type="hidden" id="lock" name="lock" value="yes"/>
		<button type="submit" id="send" hidden></button>
	</form>
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
						"id": "Done",
						"text": "بررسی",
						"event": `document.getElementById("send").click(); document.getElementById("dialogbtn_hide").click();`
					}
				]
			]
		}
	);
	document.querySelectorAll(".part-type").forEach((el) => {
		el.onclick = () => {
			el.className = "part-type part-type-selected";
			document.getElementsByClassName("part-type")[el.value == "بله" ? 1 : 0].className = "part-type";
			document.getElementById("lock").value = el.value == "بله" ? "yes" : "no";
		};
	});
};

var showDeleteCourse = (id) => {
	warnDialog(
		"حذف دوره",
		"آیا مطمئنید که می‌خواهید این دوره را حذف کنید؟<br>این عملیات غیرقابل بازگشت خواهد بود. ادامه می‌دهید؟",
		"حذف",
		[
			'document.getElementById("dialogbtn_hide").click();',
			`deleteCourse("${id}");`
		]
	);
};

var deleteCourse = (id) => {
	document.getElementById("dialogbtn_hide").click();
	// todo: send XHR to deleting the course
	successToast("درخواست شما جهت تصمیم‌گیری ابلاغ شد");
};

var shareCourse = async (name, master, shortlink) => {
	const shareData = {
		title: name,
		text: `${name}\nبا تدریس استاد ${master} را در «مبی‌لرن» بیاموزید :\n${shortlink}`,
		url: shortlink
	};

	// Share must be triggered by "user activation"
	try {
		await navigator.share(shareData);
	} catch (err) {
		console.log(err);
	}
};