package com.skilldistillery.services;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.skilldistillery.entities.Company;
import com.skilldistillery.entities.Job;


public interface JobService {

	List <Job> index();
	
	Job findById(int id);
	
	Job createJob (Job job);
	
	Job updateJob (Job job, int id);
	
	boolean deleteJob (int id);
	
	List<Job> findBySalaryMaxBetween(double low, double high);

	List<Job> findByKeyword(String keyword);
	
	List<Job> findByCompanyAndLocation (Company company, String location);

	List<Job> findByCompanyId (int compId);

	List<Job> getJobsByCompany(int compId);
		
}
