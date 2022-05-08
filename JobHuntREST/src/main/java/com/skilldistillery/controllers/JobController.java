package com.skilldistillery.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.entities.Job;
import com.skilldistillery.services.JobService;

@RequestMapping("api")
@RestController
public class JobController {

	@Autowired
	JobService serv;
	
	@GetMapping("jobs")
	public List<Job> index()  {
		return serv.index();
	}

	@GetMapping("jobs/{id}")
	public Job show(HttpServletResponse resp, @PathVariable Integer id) {
		Job job = serv.findById(id);
		if(job == null) {
			resp.setStatus(404);
		}
		return job;
	}
	
	@PostMapping("jobs")
	public Job addJob(
			@RequestBody Job job, 
			HttpServletRequest req, 
			HttpServletResponse res
			)  {
		try {
			serv.createJob(job);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(job.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			job = null;
		
		}
		return job;
	}
	
	
	
	@PutMapping("jobs/{id}")
	public Job updateJob(
		@RequestBody Job job,
		@PathVariable int id,  
		HttpServletResponse res
		)  {
		Job updatedjob = null;
		
			try {
				updatedjob = serv.updateJob(job, id);
				if (job == null) {
					res.setStatus(404);
				}
			} catch (Exception e) {
				e.printStackTrace();
				res.setStatus(400);
				job = null;
			}
			return job;
		}
	

	@DeleteMapping("jobs/{id}")
	public boolean deleteJob(
			@PathVariable Integer id,
			HttpServletResponse res
			) {
		try {		
		if (serv.deleteJob(id)) {
			res.setStatus(204);
			return true;
	}
	else {
		res.setStatus(404);
		return false;
	}
} catch (Exception e) {
	e.printStackTrace();
	res.setStatus(400);
	return false;
  }
 }
	

	//Search for Jobs by keyword
		@GetMapping("jobs/search/{keyword}")
		public List<Job> jobsByKeyword(
				@PathVariable String keyword) {
			return serv.findByKeyword(keyword);
		}
	
	//Jobs by Price Range
		@GetMapping("jobs/search/salary/{low}/{high}")
		public List<Job> findBySalaryMaxBetween(
				@PathVariable double low, 
				@PathVariable double high
				) {
			return serv.findBySalaryMaxBetween(low, high);	
		}
	
		// Find jobs by Company Id
		@GetMapping("companies/{compId}/jobs")
		public List<Job> findByCompany (
				@PathVariable int compId) {
			return serv.getJobsforCompany (compId);
		}
		
		
		// Find jobs by Company and Location

		@GetMapping("companies/{companyId}/{location}/jobs")
		public List<Job> findByCompanyAndLocation (
				@PathVariable String keyword) {
			return serv.findByKeyword(keyword);
		}
		
		
		
	}
	
	

