package com.skilldistillery.services;

import java.util.List;

import com.skilldistillery.entities.Company;
import com.skilldistillery.entities.Job;

public interface CompanyService {

	List <Company> index();
	
	Company addCompany (Company newcompany);
	
	Company updateCompany (Company company, int id);
	
	boolean deleteCompany (int id);
	
	//Job createJob(int id, Job job);
	
}
