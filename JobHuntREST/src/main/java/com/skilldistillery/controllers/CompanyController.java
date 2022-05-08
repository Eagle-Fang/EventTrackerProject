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

import com.skilldistillery.entities.Company;
import com.skilldistillery.entities.Job;
import com.skilldistillery.services.CompanyService;
import com.skilldistillery.services.JobService;

@RequestMapping("api")
@RestController
public class CompanyController {

	@Autowired
	CompanyService cserv;
	
	@Autowired
	JobService jserv;
	
	@GetMapping("companies")
	public List<Company> index()  {
		List<Company> companies = cserv.index();
		return companies;
	}

	
	@PostMapping("companies")
	public Company addCompany (
			@RequestBody Company newCompany, 
			HttpServletRequest req, 
			HttpServletResponse res
			)  {
		try {
			newCompany = cserv.addCompany(newCompany);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(newCompany.getId());
			res.addHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			return null;
		
		}
		return newCompany;
	}
	
	
	
	@PutMapping("companies/{id}")
	public Company updateCompany(
		@RequestBody Company company,
		@PathVariable int id,  
		HttpServletResponse res,
		HttpServletRequest req
		)  {
		Company updatedCompany = null;
		
			try {
				updatedCompany = cserv.updateCompany (company, id);
				if (updatedCompany == null) {
					res.setStatus(404);
				}
				res.setStatus(202);
				StringBuffer url = req.getRequestURL();
				url.append("/").append(updatedCompany.getId());
				res.addHeader("Location",url.toString());
				
			} catch (Exception e) {
				e.printStackTrace();
				res.setStatus(400);
				return null;
			}
			return updatedCompany;
		}
	
	
	@DeleteMapping("comopanies/{id}")
	public boolean deleteCompany(
			@PathVariable int id,
			HttpServletResponse res
			) {
		try {		
		if (cserv.deleteCompany(id)) {
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
	
	
	
	@PostMapping("companies/{id}/jobs")
	public Job createJob(
			@PathVariable int id,
			@RequestBody Job job,
			HttpServletRequest req, 
			HttpServletResponse res
			)  {
		Job jobCreated = null;
		
		try {
			jobCreated = jserv.createJob(job);
			res.setStatus(202);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(jobCreated.getId());
			res.addHeader("Location",url.toString());
			
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			return null;
		}
		return jobCreated;
	}
	

}

