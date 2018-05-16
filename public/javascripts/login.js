document.addEventListener('DOMContentLoaded', function() {
	const loginForm = document.querySelector('.form--type-login');

	if (loginForm) {
		loginForm.addEventListener('submit', function(event) {
			fetch(`${HOST}`, {
				method: 'POST',
			}).then(function(response) {
				console.log(response);
				if (response.status === 200) {
					return response.json();
				}
			}).then(function(data) {
				window.location.pathname = data.redirect;
			});
			event.preventDefault();
		});
	}
});
