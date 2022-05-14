window.addEventListener('load', function(e) {
	console.log('document loaded');
	init();
});

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


function getAllJobs() {
	let xhr = new XMLHttpRequest();
	
	xhr.open('GET', 'api/jobs/');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
				var jobs = JSON.parse(xhr.responseText);
				console.log(jobs)
				displayJobs(jobs);
			}
				
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
			var dataDiv = document.getElementById('jobData');
			dataDiv.textContent = '';
			let h1 = document.createElement('h')
			dataDiv.appendChild(h1);
			h1.textContent = "Jobs not found"
		}
	};
	xhr.send(null);
}


function displayJobs(jobs)  {
	var dataDiv = document.getElementById('jobData');
	dataDiv.textContent = '';
	
	let br = document.createElement('br');
	dataDiv.appendChild(br);
	let hr = document.createElement('hr');
	dataDiv.appendChild(hr);
	let table = document.createElement('table');
	dataDiv.appendChild(table);
	dataDiv.appendChild(br);
	
	jobs.forEach(function(job, index, arr){
		let tr = document.createElement('tr');
		let td = document.createElement('td');
		td.textContent = job.title;
		
		td.addEventListener('click', function(e) {
			displayJob(job);	
		})
		dataDiv.appendChild(td);
		dataDiv.appendChild(tr);
	})
	
	let hr1 = document.createElement('hr');
	dataDiv.appendChild(hr1);
}



function createJob(e) {
	e.preventDefault();

	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/jobs', true);

	xhr.setRequestHeader("Content-type", "application/json"); 

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) 
				let data = JSON.parse(xhr.responseText);
				console.log(data);
				getAllJobs();
			}
			else {
				console.error("Failed to Add new Job.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};
		let form = document.addJob;
		let newJobObject = {
		Title: document.createJobForm.title.value,
		Date : document.createJobForm.date.value,
		salaryMax: document.createJobForm.salaryMax.value,
		salaryMin: document.createJobForm.salaryMin.value,
		Url: document.createJobForm.url.value,
		Description: document.createJobForm.description.value,
		Location: document.createJobForm.location.value,
		Requirements: document.createJobForm.requirements.value,
		Supervisory: false,
		Status: document.createJobForm.status.value,
	};
	var objectJson = JSON.stringify(newJobObject);
	xhr.send(objectJson);
}


function displayJob(job) {
	let dataDiv = document.getElementById('onejobData');
	dataDiv.textContent = '';

	let h1 = document.createElement('h1');
	h1.textContent = job.title;
	dataDiv.appendChild(h1);

	let descripJ = document.createElement('p');
	descripJ.textContent = "Job Description: "+job.description;
	dataDiv.appendChild(descripJ);

	let ul = document.createElement('ul');
	let date = document.createElement('li');
	let salary = document.createElement('li');
	let url = document.createElement('li');
	let location = document.createElement('li');
	let requirements = document.createElement('li');
	let supervisory = document.createElement('li');
	let status = document.createElement('li');
	let company = document.createElement('li');

	date.textContent = "Posted: "+job.date;
	salary.textContent = "$"+job.salaryMin + " - " + "$"+job.salaryMax;
	url.textContent = job.url;
	location.textContent = job.location;
	requirements.textContent = job.requirements;
	supervisory.textContent = job.supervisory;
	status.textContent = job.status;
	company.textContent = job.getCompany.getName;
	

	ul.appendChild(date);
	ul.appendChild(salary);
	ul.appendChild(url);
	ul.appendChild(location);
	ul.appendChild(requirements);
	ul.appendChild(supervisory);
	ul.appendChild(status);
	ul.appendChild(company);

	dataDiv.appendChild(ul);

	let editButton = document.createElement('button');
	editButton.innerHTML = "Edit Job";
	dataDiv.appendChild(editButton);
	
	editButton.addEventListener('click', function(e) {
		e.preventDefault();
		showUpdateForm(job);
		
	});
	let hr = document.createElement('hr');
	dataDiv.appendChild(hr);
	
}

function showUpdateForm(job) {
	
	let dataDiv = document.getElementById('editJob');
	dataDiv.textContent = '';
	
	var form = document.createElement('form');
	form.name = "editForm";
	form.id = "editForm";
	dataDiv.appendChild(form);
	
	let titleText = document.createElement('lable');
	titleText.textContent = 'Title: '
	form.appendChild(titleText);	

	var inputId = document.createElement('input');
	inputId.type = 'hidden';
	inputId.name = 'id';
	inputId.value = job.id;
	form.appendChild(inputId);

	var inputTitle = document.createElement('input');
	inputTitle.type = 'text';
	inputTitle.name = 'title';
	inputTitle.value = job.title;
	form.appendChild(inputTitle);
	
	let br = document.createElement('br');
	form.appendChild(br);
	
	let nameDate = document.createElement('lable');
	nameDate.textContent = 'Date ';
	form.appendChild(nameDate);

	var inputDate = document.createElement('input');
	inputDate.type = 'text';
	inputDate.name = 'date';
	inputDate.value = job.date;
	form.appendChild(inputDate);
	
	let br1 = document.createElement('br');
	form.appendChild(br1);
	
	let nameMaxSalary = document.createElement('lable');
	nameMaxSalary.textContent = 'Description: ';
	form.appendChild(nameMaxSalary);

	var inputMaxSalary = document.createElement('input');
	inputMaxSalary.type = 'text';
	inputMaxSalary.name = 'title';
	inputMaxSalary.value = job.salaryMax;
	form.appendChild(inputMaxSalary);
	
	let br2 = document.createElement('br');
	form.appendChild(br2);
	
	let nameMinSalary = document.createElement('lable');
	nameMinSalary.textContent = 'MinSalary: ';
	form.appendChild(nameMinSalary);	
	
	var inputMinSalary = document.createElement('input');
	inputMinSalary.type = 'text';
	inputMinSalary.name = 'minsalary';
	inputMinSalary.value = job.salaryMin;
	form.appendChild(inputMinSalary);
	
	let br3 = document.createElement('br');
	form.appendChild(br3);
	
	let nameUrl = document.createElement('lable');
	nameUrl.textContent = 'Url: ';
	form.appendChild(nameUrl);
	
	var inputTitle = document.createElement('input');
	inputUrl.type = 'text';
	inputUrl.name = 'url';
	inputUrl.value = job.url;
	form.appendChild(inputUrl);
	
	let br4 = document.createElement('br');
	form.appendChild(br4);
	
	let nameDescription = document.createElement('lable');
	nameDescription.textContent = 'Description: ';
	form.appendChild(nameDescription);
	
	var inputDescription= document.createElement('input');
	inputDescription.type = 'text';
	inputDescription.name = 'description';
	inputDescription.value = job.description;
	form.appendChild(inputDescription);
	
	let br5 = document.createElement('br');
	form.appendChild(br5);
	
	let nameLocation = document.createElement('lable');
	nameLocation.textContent = 'Location: ';
	form.appendChild(nameLocation);
	
	var inputLocation = document.createElement('input');
	inputLocation.type = 'text';
	inputLocation.name = 'location';
	inputLocation.value = job.location;
	form.appendChild(inputLocation);
	
	let br6 = document.createElement('br');
	form.appendChild(br6);
	
	let nameRequirements = document.createElement('lable');
	nameRequirements.textContent = 'Requirements: ';
	form.appendChild(nameRequirements);
	
	var inputRequirements = document.createElement('input');
	inputRequirements.type = 'text';
	inputRequirements.name = 'requirements';
	inputRequirements.value = job.requirements;
	form.appendChild(inputRequirements);
	
	let br7 = document.createElement('br');
	form.appendChild(br7);
	
	let nameStatus = document.createElement('lable');
	nameStatus.textContent = 'Status: ';
	form.appendChild(nameStatus);
	
	var inputStatus = document.createElement('input');
	inputStatus.type = 'text';
	inputStatus.name = 'status';
	inputStatus.value = job.status;
	form.appendChild(inputStatus);
	
	let editButton = document.createElement('button');
	editButton.innerHTML = "Submit Edited Job";
	dataDiv.appendChild(editButton);
		
	let editJob = document.getElementById('editForm');
	
	editButton.addEventListener('click', function(e) {
		e.preventDefault();
		
		let form = document.getElementById('editForm');
		
	let editedJob =  {
		id: form.id.value,
		title: form.title.value,
		date : 2022-05-01,
		salaryMax: form.salaryMax.value,
		salaryMin: form.salaryMin.value,
		url: form.url.value,
		description: form.description.value,
		location: form.location.value,
		requirements: form.requirements.value,
		supervisory: false,
		status: form.status.value,
			company : {
						id: 1,
						name: "WeHireAll",
						pocName: "Andy Anderson",
						pocEmail: "andy@wehireall.com",
						location: "Virtual",
						website:  "insert website url"
					}
		}
		
	updateJob(editedJob);

});

	let br8 = document.createElement('br');
	dataDiv.appendChild(br8);
	let br9 = document.createElement('br');
	dataDiv.appendChild(br9);

	let deleteButton = document.createElement('button');
	deleteButton.innerHTML = "Delete this Job";
	dataDiv.appendChild(deleteButton);

	deleteButton.addEventListener('click', function(e) {
		e.preventDefault();
		deleteJob(job);
	});

	let hr = document.createElement('hr');
	dataDiv.appendChild(hr);
}


function updateJob(job)  {
	
		e.preventDefault();
	
		let xhr = new XMLHttpRequest();
		xhr.open('PUT', 'api/jobs' + job.id, true);
	
		xhr.setRequestHeader("Content-type", "application/json"); 

	
		xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201 || xhr.status == 202) { 
				var data = JSON.parse(xhr.responseText);
				console.log(data);
			} else {
				console.log("Failed to update job.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};

	var objectJson = JSON.stringify(job);

	xhr.send(objectJson);

	var editDiv = document.getElementById('editJob');
	editDiv.textContent = '';
	var oneJobDiv = document.getElementById('oneJobData');
	oneJobDiv.textContent = '';
	var jobsDiv = document.getElementById('jobData');
	jobsDiv.textContent = '';
	var output = document.getElementById('jobDataSalary');
	output.textContent = '';
	
}


function deleteJob(job)  {
	
		e.preventDefault();
	
		let xhr = new XMLHttpRequest();
		xhr.open('DELETE', 'api/jobs' + job.id, true);
	
		xhr.setRequestHeader("Content-type", "application/json"); 

	
		xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == !204) {
				console.log("Delete request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};

	var objectJson = JSON.stringify(job);

	xhr.send(objectJson);

	var editDiv = document.getElementById('editJob');
	editDiv.textContent = '';
	var oneJobDiv = document.getElementById('oneJobData');
	oneJobDiv.textContent = '';
	var jobsDiv = document.getElementById('jobData');
	jobsDiv.textContent = '';
	var output = document.getElementById('jobDataSalary');
	output.textContent = '';
	
}
 
function getBySalary() {
	let xhr = new XMLHttpRequest();
	
	let jobSalary = document.getElementById('getBySalary');
	
	xhr.open('GET', 'api/jobs/' + salaryMinSearch, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status == 200) {
			let data = JSON.parse(xhr.responseText);
			displayJobsSalary(data);
			}
			
			
			if (xhr.status === 4 && xhr.status >= 204) {
				console.error(xhr.status + ': ' + xhr.responseText);
				var dataDiv = document.getElementById('jobDataSalary');
				dataDiv.textContent = '';
				let br = document.createElement('br');
				dataDiv.appendChild(br);
				let hr = document.createElement('hr');
				dataDiv.appendChild(hr);
				let h2 = document.createElement('h2');
				dataDiv.appendChild(h2);
				h2.textContent = "No jobs found for: " + salaryMinSearch;		
			}
		};
	
		xhr.send(null);
	}
				
				
				
function displayJobsSalary() {
	
}