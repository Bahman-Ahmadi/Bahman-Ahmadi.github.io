var args = document.location.search.replace("?", "").replace(/\+/g, " ").split("&");
var tab = args[0].split("=")[0] == "tab" ? args[0].split("=")[1] : "undefined";

// set page inaccessible if user is registered
if (localStorage.getItem("mluser") != null) {
	goto("user.html");
}

// set onClick event for form tabs
var setTabsOnClick = () => {
	document.querySelectorAll(".form-tab").forEach((tab) => {
		tab.onclick = () => {setTab(tab.id)};
	});
};
setTabsOnClick();

// set onClick event for help icon
document.getElementById("help").onclick = () => {
	infoDialog(
		"راهنما",
		`۱. ایمیل باید یک جیمیل شخصی باشد یعنی با gmail.com@ تمام شود <br>
۲. رمزعبور باید بین ۸ تا ۳۲ کاراکتر باشد<br>
۳. رمزعبور باید شامل علائم خاص لاتین ($,.,@,_,&) باشد<br>
۴. رمزعبور نباید شامل فاصله باشد<br>
۵. رمزعبور باید شامل حروف لاتین (a-z),(A-Z) باشد<br>
۶. رمزعبور باید شامل اعداد لاتین باشد (0-9)<br>
۷. رمزعبور در ورودی های دوم و سوم باید یکسان باشد<br>`
	);
};

// set onClick event for form-action buttons
async function FormAction (id) {
	var repass = document.getElementById("repassword");
	var pass = document.getElementById("password");
	var email = document.getElementById("email");
	
	// customize repass ok (repass is ok because that isn't exist in login)
	var ok = {
		"email": false,
		"pass": false,
		"repass": id != "signupbtn"
	};
	
	if (id == "signupbtn"){
		// check for that pass be equal with repass
		pass.value == repass.value ? ok.repass = true : await errorToast("رمزعبور در ورودی های دوم و سوم یکسان نیست");
	}
	
	if (ok.repass) {
		// check for that password chars be between 8 & 32
		if (8 <= pass.value.length && pass.value.length <= 32) {
			// check for that symbols be exist in password
			if (pass.value.match("@#$_&-+()/*\"':;!?£%~`|=[],.^".split()) == null) {
				// check for that numbers be exist in password
				if (pass.value.match("0123456789".split()) == null) {
					// check for that letters be exist in password
					if (pass.value.match("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split()) == null) {
						// check for that whitespaces don't be exist in password
						if (pass.value.match([" ","‌"]) == null) {
							ok.pass = true;
							// check for that email be a personal gmail
							if (email.value.indexOf("@gmail.com") != -1) {
								ok.email = true;
								if (ok.email && ok.pass && ok.repass) {
									// todo: send request for current mode
									if (true) {
										successToast("عملیات باموفقیت انجام شد");
										await sleep(3000);
										localStorage.setItem("mluser", "<GUID>"); // response.usertype == "user" ? localStorage.setItem("mluser", "<GUID>") : localStorage.setItem("mladmin", "<GUID>");
										goto("user.html"); // goto(`${response.usertype}.html`);
									} else if (responseCode == 404) {
										errorToast("حساب کاربری پیدا نشد");
									} else if (responseCode == 403) {
										errorToast("حساب کاربری شما مسدود است");
									} else if (responseCode == 400) {
										errorToast("اطلاعات وارد شده مطابقت ندارد");
									} else {
										errorToast(`این یک خطای فنی است (${responseCode})<br> لطفا آن را به پشتیبانی گزارش دهید`, () =>{
											// todo: use XHR for report unhandlable error
											successToast("ممنون از همکاری شما");
										}, "گزارش");
									}
								}
							} else {
								errorToast("ایمیل باید یک Gmail شخصی باشد");
							}
						} else {
							await errorToast("رمزعبور نباشد شامل فاصله باشد");
						}
					} else {
						await errorToast("رمزعبور باید شامل حروف لاتین هم باشد");
					}
				} else {
					await errorToast("رمزعبور باید دارای اعداد لاتین هم باشد");
				}
			} else {
				await errorToast("رمزعبور باید دارای علائم خاص لاتین هم باشد");
			}
		} else {
			await errorToast("رمزعبور باید بین ۸ تا ۳۲ کاراکتر داشته باشد");
		}
	}
}

// hide onlyon-login elements after loading page (because default tab is signup)
document.querySelectorAll('.onlyon-login').forEach((el) => {
	el.style.visibility = "hidden";
});

// setTab function for change tabs by click
var lastRepass = "";
var setTab = async (tabName) => {
	var repass = document.getElementById("repassword");
	var signupTab = document.getElementById("signup");
	var loginTab = document.getElementById("login");
	var email = document.getElementById("email");
	var form = document.getElementById("form");
	var pass = document.getElementById("password");
	//var submitBtn = document.getElementById("submit");
	var repassbox = document.getElementById("repassbox");

	if (repassbox != null) {
		lastRepass = repassbox.outerHTML;
	}

	if (tabName == "signup") {
		signupTab.className = "form-tab tab-selected";
		login.className = "form-tab";
		//submitBtn.remove();
		//form.innerHTML += lastRepass+`<button class="btn form-action" id="submit">ثبت‌نام</button>`;
		//submitBtn.innerHTML = "ثبت‌نام";
	} else {
		signupTab.className = "form-tab";
		login.className = "form-tab tab-selected";
		//repassbox.remove();
		//submitBtn.innerHTML = "ورود";
	}
	setTabsOnClick();
	document.querySelectorAll('.only-on').forEach((el) => {
		//console.log(el.classList[el.classList.length-1].split("-"), tabName, el.classList[el.classList.length-1].split("-") == tabName);
		if (el.classList[el.classList.length-1].split("-")[1] == tabName) {
			el.style.visibility = "visible";
		} else {
			el.style.visibility = "hidden";
		}
	});
};

// setting tab by url args
if (tab == "login") {
	setTab("login") ;
}

// showPass function for change password type inputs
var showPass = (el, field) => {
	field = document.getElementById(field);
	el.className == "bi bi-eye eye-ic" ? el.className = "bi bi-eye-slash eye-ic" : el.className = "bi bi-eye eye-ic";
	field.type == "password" ? field.type = "text" : field.type = "password";
};