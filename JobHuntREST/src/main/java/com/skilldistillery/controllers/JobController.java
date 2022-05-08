package com.skilldistillery.controllers;

import java.util.List;

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
	public Job show(HttpServletResponse resp, @PathVariable int id) {
		Job job = serv.findById(id);
		if(job == null) {
			resp.setStatus(404);
		}
		return job;
	}
	
	@PostMapping("jobs")
	public Job addJob(HttpServletResponse resp, @RequestBody Job job) {
		Job newJob = serv.create(job);
		if(newJob != null) {
			resp.setStatus(201);
		}
		return newJob;
	}
	
	@PutMapping("jobs/{id}")
	public Job updateJob(@RequestBody Job job, @PathVariable int id) {
		return serv.update(job, id);
	}
	
	@DeleteMapping("jobs/{id}")
	public void deleteJob(@PathVariable int id) {
		serv.delete(id);
	}
	
	
	//Posts by Price Range
		@GetMapping("jobs/search/salary/{low}/{high}")
		public List<Job> findBySalaryMaxBetween(@PathVariable double low, @PathVariable double high) {
			return serv.findBySalaryMaxBetween(low, high);	
		}
		
	}
	
	

