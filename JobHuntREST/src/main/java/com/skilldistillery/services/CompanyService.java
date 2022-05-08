package com.skilldistillery.services;

import java.util.List;

import com.skilldistillery.entities.Company;

public interface CompanyService {

	List <Company> index();
	
	Company addCompany (Company newcompany);
	
	Company updateCompany (Company company, int id);
	
	boolean deleteCompany (int id);
	
}
