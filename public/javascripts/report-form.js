document.addEventListener('DOMContentLoaded', function() {
	const fileInput = document.querySelector('[type="file"]');
	if (fileInput) {
		fileInput.addEventListener('change', function(e) {
			console.log(e);
		});
	}
});
