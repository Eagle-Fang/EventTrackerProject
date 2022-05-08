package com.skilldistillery.repositories;




import org.springframework.data.jpa.repository.JpaRepository;


import com.skilldistillery.entities.Company;
import com.skilldistillery.entities.Job;

public interface CompanyRepository extends JpaRepository <Company, Integer> {

	// Job createJob(int id, Job job);
	
	
}
