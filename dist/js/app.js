/* ONLY DEV MODE
(function () { var script = document.createElement('script'); script.src="https://cdn.jsdelivr.net/npm/eruda"; document.body.append(script); script.onload = function () { eruda.init(); } })(); */

new fullpage('#fullpage', {
    //options here
    autoScrolling: true,
    scrollBar: false
});
document.querySelectorAll("a").forEach((el) => {
    if (el.href == "https://alvarotrigo.com/fullPage/") {
        el.remove();
    }
});
particlesJS.load('c1', 'dist/assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
});

var db = {}
$.ajax({
	type: "GET",
	url: "dist/db.json",
	datatype: "json",
	async: false,
	success: function(data){
		db = data;
	}
});

document.querySelectorAll(".avatar").forEach((el) => {
    el.src = db.details.avatar;
});

document.querySelectorAll(".fname").forEach((el) => {
    el.innerHTML = db.details.firstname;
});

document.querySelectorAll(".name").forEach((el) => {
    el.innerHTML = db.details.firstname + " " + db.details.lastname;
});

document.querySelectorAll(".name").forEach((el) => {
    el.innerHTML = db.details.firstname + " " + db.details.lastname;
});

document.querySelectorAll(".bio").forEach((el) => {
    el.innerHTML = db.details.bio;
});

document.querySelectorAll(".about-me").forEach((el) => {
    el.innerHTML = db.details.about;
});

document.querySelectorAll(".coffeebede").forEach((el) => {
    el.href += db.details.coffeebede;
});

document.querySelectorAll(".cntct-mail").forEach((el) => {
    el.href = `mailto: ${db.contact.mail}`;
    el.innerHTML = db.contact.mail;
});

document.querySelectorAll(".cntct-phone").forEach((el) => {
    el.href = `tel: ${db.contact.phone}`;
    el.innerHTML = db.contact.phone;
});

document.querySelectorAll(".cntct-loc").forEach((el) => {
    el.href = `https://maps.google.com/maps?client=ms-android-huawei-rev1&um=1&ie=UTF-8&fb=1&gl=ir&entry=s&sa=X&ftid=0x3f6c911abe4131d7:0xc9c57e3a9318753b&q=${db.contact.city}&ved=2ahUKEwiusYqg6eX9AhWJKewKHY_dDfgQ8gF6BAgrEAE`;
    el.innerHTML = `<img class="iran-flag" src="dist/assets/irflag.png" alt="IRI Flag"> ایران، ${db.contact.city_fa}`;
});

document.querySelectorAll(".cntct-link").forEach((el) => {
    el.href = el.innerHTML = db.contact.social_link;
});

document.querySelectorAll(".floatimg").forEach((el) => {
    el.src = db.floatBtn.img;
});document.querySelectorAll(".floatimg").forEach((el) => {
    el.src = db.floatBtn.img;
});

document.querySelectorAll(".floatlink").forEach((el) => {
    el.href = db.floatBtn.link;
});


db.skills.forEach((skill) => {
	$(".skills-list")[0].innerHTML += `
<div class="skill col-xs-3 col-sm-3 col-md-4 col-md-4">
	<div class="skill-logo"><img src="${skill.logo}" alt="skill" class="skill-logo"></div>
	<div class="skill-name">${skill.name}</div>
	<div class="skill-col d-flex">
		<p class="skill-label">میزان مهارت: </p><p class="skill-percent">${skill.percent}%</p>
	</div>
</div>
	`;
});

db.projects.forEach((project) => {
    $(".projects-list")[0].innerHTML += `
<div class="project col-xs-12 col-sm-12 col-md-5 col-md-5">
    <div class="project-header d-flex">
        <img src="${project.logo}" alt="project" class="project-logo">
        <div class="project-header-texts">
            <p class="project-name">${project.name}</p>
            <p class="project-lang">${project.lang}</p>
        </div>
    </div>
    <div class="project-content">
        <p class="project-date">ساخته شده در ${project.date}</p>
    </div>
    <div class="project-line"></div>
    <a href="${project.link}"><button class="project-view">اطلاعات بیشتر</button></a>
</div>
    `;
});
