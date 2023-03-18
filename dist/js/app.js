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

document.querySelectorAll(".bio").forEach((el) => {
    el.innerHTML = db.bio;
});

document.querySelectorAll(".about-me").forEach((el) => {
    el.innerHTML = db.about;
});

db.projects.forEach((project) => {
    $(".projects-list")[0].innerHTML = `
<div class="project col-xs-12 col-sm-12 col-md-5 col-md-5">
    <div class="project-header d-flex">
        <img src="${project.logo}" alt="rubika" class="project-logo">
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