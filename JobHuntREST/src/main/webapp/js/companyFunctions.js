window.addEventListener('load', function(e) {
	console.log('document loaded');
	init();
});

/*
function init() {
	document.getAllButton.lookupAll.addEventListener('click', function(e) {
		e.preventDefault();
		getAllJobs();
	})

	document.addJobForm.submit.addEventListener('click', function(e) {
		e.preventDefault();
		createJob();
	})

	document.getByDate.lookupBySalary.addEventListener('click', function(e) {
		e.preventDefault();
		getBySalary();
	})

*/



function getCompany(companyId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/companies/' + companyId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let company = JSON.parse(xhr.responseText);
				console.log(company);
				displayCompany(company);
			}
			else {
				console.log('Company not found.')
			}
		}
	};

	xhr.send();
}

function displayCompany(company) {
	let dataDiv = document.getElementById('companyJobData');
	dataDiv.textContent = '';

	let h3 = document.createElement('h3');
	h3.textContent = company.name;
	dataDiv.appendChild(h1);

	let bq = document.createElement('blockquote');
	bq.textContent = "";
	dataDiv.appendChild(bq);

	let id = document.createElement('ul');
	let name = document.createElement('li');
	let pocName = document.createElement('li');
	let pocEmail = document.createElement('li');
	let location = document.createElement('li');
	let website = document.createElement('li');
	
	id.textContent = company.id;
	name.textContent = company.name;
	pocName.textContent = company.pocName;
	pocEmail.textContent = company.pocEmail;
	location.textContent = company.location;
	website.textContent = company.website;
	
	ul.appendChild(id);
	ul.appendChild(name);
	ul.appendChild(pocName);
	ul.appendChild(pocEmail);
	ul.appendChild(location);
	ul.appendChild(website);
	
	dataDiv.appendChild(ul);
	
}
