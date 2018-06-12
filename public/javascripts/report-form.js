document.addEventListener('DOMContentLoaded', function() {
	console.log('hello jopta');
	const fileInput = document.querySelector('[type="file"]');

	console.log(fileInput);

	fileInput.addEventListener('change', function(e) {
		console.log(e);
	});
});
