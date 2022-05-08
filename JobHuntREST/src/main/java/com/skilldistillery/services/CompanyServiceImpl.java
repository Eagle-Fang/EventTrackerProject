package com.skilldistillery.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.entities.Company;
import com.skilldistillery.entities.Job;
import com.skilldistillery.repositories.CompanyRepository;
import com.skilldistillery.repositories.JobRepository;

@Service
public class CompanyServiceImpl implements CompanyService {

	@Autowired
	CompanyRepository cRepo;

//	@Autowired
//	JobRepository jRepo;
	
	@Override
	public List<Company> index() {
		return cRepo.findAll();
	}

	@Override
	public Company addCompany(Company newcompany) {
		return cRepo.saveAndFlush(newcompany);
	}

	@Override
	public Company updateCompany(Company company, int id) {
		Optional<Company> compOpt = cRepo.findById(id);
		if (compOpt.isPresent()) {
			Company managedCompany = compOpt.get();
			managedCompany.setName(company.getName());
			managedCompany.setLocation(company.getLocation());
			managedCompany.setPocName(company.getPocName());
			managedCompany.setPocEmail(company.getPocEmail());
			managedCompany.setWebsite(company.getWebsite());			
			cRepo.saveAndFlush(managedCompany);
			return managedCompany;
		}

		return null;
	}

	@Override
	public boolean deleteCompany(int id) {
		Optional <Company> comOpt = cRepo.findById(id);
		if (comOpt.isPresent())  {
			Company company = comOpt.get();
			cRepo.delete(company);
		
			return true;
		}
		else {

			return false;
		}

	}

	
	
	
}