document.addEventListener('DOMContentLoaded', function() {
	const links = document.querySelectorAll('.dashboard-menu_link');
	links.forEach(function(link) {
		link.addEventListener('click', function(event) {
			if (!event.target.classList.contains('link__selected')) {
				const currentlySelected = document.querySelector('.link__selected');
				currentlySelected.classList.remove('link__selected');
				event.target.classList.add('link__selected');
			}
		});
	});
});
