import {validateName} from './user-validator';


exports.enableEditing = function(event) {
	const [firstName, lastName] = getEditInputs();
	firstName.removeAttribute('disabled');
	lastName.removeAttribute('disabled');

	const editButton = document.querySelector('.edit-button');
	editButton.style.display = 'none';

	if (!document.querySelector('.approve-button')) {
		addApproveButton(createApproveButton());
	} else {
		document.querySelector('.approve-button')
			.style.display = 'block';
	}

	event.preventDefault();
};

function getEditInputs() {
	return [
		document.querySelector('input[name=firstName]'),
		document.querySelector('input[name=lastName]'),
	];
}

function addApproveButton(btn) {
	const addUserForm = document.querySelector('.manager-container');
	addUserForm.appendChild(btn);
}

function createApproveButton() {
	const approveBtn = document.createElement('button');
	approveBtn.classList.add(
		'pure-button', 'button-success', 'approve-button');
	approveBtn.innerHTML = 'Підтвердити';
	approveBtn.addEventListener('click', handleApprovement);
	return approveBtn;
}

function handleApprovement(event) {
	const [firstName, lastName] = getEditInputs();
	const isNamesValid = 
		!validateName(firstName.value) &&
		!validateName(lastName.value);
	if (isNamesValid) {
		requestForChanges({
			firstName: firstName.value,
			lastName: lastName.value,
		}).then(succeedRequest)
			.catch(failedRequest);
	}
}

function succeedRequest(data) {
	const approveBtn = document.querySelector('.approve-button');
	approveBtn.style.display = 'none';
	const editButton = document.querySelector('.edit-button');
	editButton.style.display = 'block';
	const firstName = document.querySelector('input[name=firstName]');
	const lastName = document.querySelector('input[name=lastName]');
	firstName.setAttribute('disabled', true);
	lastName.setAttribute('disabled', true);
};

function failedRequest(errors) {
	console.log('this is errors: ', errors);
};

/**
 * @param {JSON} body
 * @return {Promise}
 */
function requestForChanges(body) {
	const username = getCurrentUsername();
	return fetch(`/dashboard/managers/${username}`, {
		method: 'PUT',
		headers: {
			'accept': 'application/json',
			'content-type': 'application/json',
		},
		body: JSON.stringify(body),
	}).then(function(res) {
		if (res.ok) {
			return res.json();
		}
		throw new Error('Network response failed.');
	}).then(function(json) {
		if (Array.isArray(json)) {
			throw new Error(json);
		}
		return json;
	});
}

function getCurrentUsername() {
	const result = document.querySelector('.username').innerHTML;
	return result;
}
