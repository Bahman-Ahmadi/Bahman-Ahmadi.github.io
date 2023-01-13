var hasBookmarks = () => {
	// check for existing any bookmark then if returns false, insert 'sorry' text
	if (document.querySelectorAll('.bookmark').length == 0) {
		// todo: insert gif & 'sorry' text
		console.log("no bookmarks");
	}
};

hasBookmarks();

// DELETABLIZE BOOKMARKS
document.querySelectorAll(".bookmark-delete").forEach((el) => {
	el.onclick = (e) => {
		// todo: use XHR for unbookmarking current course by course-id
		var courseID = el.id.split("_")[1];
		var course = document.getElementById("course_" + courseID)
		course.remove();
		hasBookmarks();
		toast(
			[
				"var(--color-gray-strong)",
				"var(--color-white)",
				"var(--color-green)"
			],
			[
				"trash",
				"باموفقیت حذف شد!",
				"بازگردانی"
			],
			3000,
			() => {
				// todo: use XHR for save re-bookmarking current course by course-id in the db
				document.getElementsByClassName("bookmarks")[0].appendChild(course);
				console.log("re-bookmarking "+courseID);
			}
		);
	};
});