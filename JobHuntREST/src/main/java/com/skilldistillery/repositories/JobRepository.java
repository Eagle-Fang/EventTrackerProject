package com.skilldistillery.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.entities.Company;
import com.skilldistillery.entities.Job;

public interface JobRepository extends JpaRepository <Job, Integer> {

//	Write a method stub that will find a job by its title.
	Job findByTitle(String t);

	//	Write a method stub that will find a collection of jobs by their company.
	List<Job> findByCompanyId (int compId);
	
	//	Write a method stub that will find a collection of jobs by their company that are not supervisory
	List<Job> findByCompanyAndLocation (Company company, String location);
	
	//	Write a method stub that will find a collection of films that salary within a specific range.
	List<Job> findBySalaryMaxBetween (Integer min, Integer max);
	
	//	Write a method stub that will find a jobs by their location.
	List<Job> findByLocation (String Location);

	boolean deleteAllById(Integer id);

	List<Job> findByTitleContaining(String keyword);

	List<Job> getJobsByCompany (int compId);
	
	
	
}
