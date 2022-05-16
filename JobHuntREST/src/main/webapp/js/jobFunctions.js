window.addEventListener('load', function(e) {
	console.log('document loaded');
	init();
});

function init() {
	document.getAllButton.lookupAll.addEventListener('click', function(event) {
		event.preventDefault();
		getAllJobs();
	});

	document.addJobForm.submit.addEventListener('click', function(event) {
		event.preventDefault();
		addNewJob();
	});

	document.getBySalaryBetween.lookupBySalaryMin.addEventListener('click', function(event) {
		event.preventDefault();
		getBySalary();
	});
}

function getAllJobs() {
	let xhr = new XMLHttpRequest();
	
	xhr.open('GET', 'api/jobs', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
	
				let job = JSON.parse(xhr.responseText);
				displayJobs(job);
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
	
	//let br = document.createElement('br');
	//dataDiv.appendChild(br);
	let hr = document.createElement('hr');
	dataDiv.appendChild(hr);
	var table = document.createElement('table');
	table.id = 'jobsTable';

	var thead = document.createElement('thead');
	
	jobs.forEach(function(job, ind, array){
	
		var tr = document.createElement('tr');
		var jobId = document.createElement('td');
		var jobComp = document.createElement('td');
		var jobTitle = document.createElement('td');
	
		jobId.textContent = job.id;
		jobComp.textContent = job.company.name;
		jobTitle.textContent = job.title;
			
		tr.appendChild(jobId);
		tr.appendChild(jobComp);
		tr.appendChild(jobTitle);
		thead.appendChild(tr);
		
		tr.addEventListener('click', function(e) {
			displayJob(job);	
		});
					
	let hr1 = document.createElement('hr');
	table.appendChild(thead);
	dataDiv.appendChild(table);
	var rows = document.querySelectorAll("tr");

	
});
}


function addNewJob() {
	
	var xhr = new XMLHttpRequest();
	
	xhr.open('POST', 'api/jobs', true);

	xhr.setRequestHeader("Content-type", "application/json"); 

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) {
				let data = JSON.parse(xhr.responseText);
				console.log(data);
				getAllJobs();
			}  else {
				console.error("Failed to Add new Job.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};
		let form = document.addJobForm;

		let newJobObject = {
		title: form.title.value,
		date : form.date.value,
		salaryMax: form.salaryMax.value,
		salaryMin: form.salaryMin.value,
		url: form.url.value,
		description: form.description.value,
		location: form.location.value,
		requirements: form.requirements.value,
		supervisory: false,
		status: form.status.value,
	};
	var objectJson = JSON.stringify(newJobObject);
	xhr.send(objectJson);

}

function displayJob(job) {
	let dataDiv = document.getElementById('oneJobData');
	dataDiv.textContent = '';

	let br = document.createElement('br');
	dataDiv.appendChild(br);

	let h4 = document.createElement('h4');
	h4.textContent = "Job #"+ job.id + ": ("+job.company.name+")- " + job.title;
	dataDiv.appendChild(h4);

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

	date.textContent = "Posted: "+job.date;
	salary.textContent = "$"+job.salaryMin + " - " + "$"+job.salaryMax;
	url.textContent = job.url;
	location.textContent = job.location;
	requirements.textContent = job.requirements;
	
	if (job.supervisory === true) {
	supervisory.textContent = "Supervisory position"
	} else {
	supervisory.textContent = "Non-Supervisory position"
	}
	status.textContent = "Status: " + job.status;
	

	ul.appendChild(date);
	ul.appendChild(salary);
	ul.appendChild(url);
	ul.appendChild(location);
	ul.appendChild(requirements);
	ul.appendChild(supervisory);
	ul.appendChild(status);

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
	nameMaxSalary.textContent = 'Max Salary: ';
	form.appendChild(nameMaxSalary);

	var inputMaxSalary = document.createElement('input');
	inputMaxSalary.type = 'text';
	inputMaxSalary.name = 'salaryMax';
	inputMaxSalary.value = job.salaryMax;
	form.appendChild(inputMaxSalary);
	
	let br2 = document.createElement('br');
	form.appendChild(br2);
	
	let nameMinSalary = document.createElement('lable');
	nameMinSalary.textContent = 'Min Salary: ';
	form.appendChild(nameMinSalary);	
	
	var inputMinSalary = document.createElement('input');
	inputMinSalary.type = 'text';
	inputMinSalary.name = 'salaryMin';
	inputMinSalary.value = job.salaryMin;
	form.appendChild(inputMinSalary);
	
	let br3 = document.createElement('br');
	form.appendChild(br3);
	
	let nameUrl = document.createElement('lable');
	nameUrl.textContent = 'Url: ';
	form.appendChild(nameUrl);
	
	var inputUrl = document.createElement('input');
	inputUrl.type = 'text';
	inputUrl.name = 'url';
	inputUrl.value = job.url;
	form.appendChild(inputUrl);
	
	let br4 = document.createElement('br');
	form.appendChild(br4);
	
	let nameDescription = document.createElement('label');
	nameDescription.textContent = 'Description: ';
	form.appendChild(nameDescription);
	
	var inputDescription = document.createElement('input');
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
		
	
	editButton.addEventListener('click', function(e) {
		e.preventDefault();
		
		let form = document.getElementById('editForm');
		
	let editedJob =  {
		id: form.id.value,
		title: form.title.value,
		date : form.date.value,
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
		console.log(editedJob);	
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
	
		let xhr = new XMLHttpRequest();
		xhr.open('PUT', 'api/jobs/' + job.id, true);
	
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
	
		let xhr = new XMLHttpRequest();
		xhr.open('DELETE', 'api/jobs/' + job.id, true);
	
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
	
	let jobSalary = document.getElementById('getBySalaryBetween');
	
	xhr.open('GET', 'api/jobs/search/salary/' + jobSalary.salaryMinDown.value 
	+ '/' + jobSalary.salaryMinUp.value, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status == 200) {
			let data = JSON.parse(xhr.responseText);
			displayJobsSalary(data);
			console.log(data);
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
				h2.textContent = "No jobs found for: " + jobSalary.salaryMinDown.value 
				+ ' - ' + jobSalary.salaryMinUp.value;		
			}
		};
	
		xhr.send(null);
	}
							
function displayJobsSalary(data) {
	let jobSalary = document.getElementById('getBySalaryBetween');
	var dataDiv = document.getElementById('jobDataSalary');
	dataDiv.textContent = '';
	
	let hr = document.createElement('hr');
	hr.textContent = "Tracking " + data.length + " jobs with min salary between $" 
		+ jobSalary.salaryMinDown.value+" and $" + jobSalary.salaryMinUp.value;
	dataDiv.appendChild(hr);
	
	let br = document.createElement('br');
	dataDiv.appendChild(br);
	
	var table = document.createElement('table');
	table.id = 'jobsSalaryTable';

	var thead = document.createElement('thead');
	
	data.forEach(function(val, ind, arr){
	
		var tr = document.createElement('tr');
		var jobId = document.createElement('td');
		var jobComp = document.createElement('td');
		var jobTitle = document.createElement('td');
	//	var jobSalMin = document.createElement('td');
	//	var jobSalMax = document.createElement('td');
	
		jobId.textContent = val.id;
		jobComp.textContent = val.company.name;
		jobTitle.textContent = val.title;
	//	jobSalMin = val.salaryMin;
	//	jobSalMax = val.salaryMax.value;
			
		tr.appendChild(jobId);
		tr.appendChild(jobComp);
		tr.appendChild(jobTitle);
	// 	tr.appendChild(jobSalMin);
	//	tr.appendChild(jobSalMax);
		thead.appendChild(tr);
		

	table.appendChild(thead);
	dataDiv.appendChild(table);
});
}