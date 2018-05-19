document.addEventListener('DOMContentLoaded', function() {
	const loginForm = document.querySelector('.form--type-login');

	if (loginForm) {
		loginForm.addEventListener('submit', function(event) {
			event.preventDefault();
			const username = event.target.login.value;
			const password = event.target.password.value;
			if (username && password) {
				fetch(`${HOST}`, {
					method: 'POST',
					body: JSON.stringify({
						username,
						password,
					}),
					headers: {
						'content-type': 'application/json',
					},
				}).then(function(response) {
					if (response.status === 200) {
						return response.json();
					}
				}).then(function(data) {
					console.log(data);
					if (data.redirect) {
						window.location.pathname = data.redirect;
					}
				}).catch(function(error) {
					console.log(error);
				});
			}
		});
	}
});
