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
public class JobServiceImpl implements JobService {

	@Autowired
	JobRepository jRepo;

	@Autowired
	CompanyRepository cRepo;
	
	@Override
	public List<Job> index() {
		return jRepo.findAll();
	}

	@Override
	public Job findById(int id) {
		Optional<Job> op = jRepo.findById(id);
		Job j = null;
		if (op.isPresent()) {
			j = op.get();
		}
		return j;
	}

	@Override
	public Job createJob (Job job) {
		Company c = new Company();
		c.setId(1);
		job.setCompany(c);
		return jRepo.saveAndFlush(job);
	}

	@Override
	public Job updateJob(Job job, int id) {
		Optional <Job> jobOpt = jRepo.findById(id);
		if (jobOpt.isPresent())  {
			Job managedJob = jobOpt.get();
			managedJob.setId(job.getId());
			managedJob.setDate(job.getDate());
			managedJob.setSalaryMax(job.getSalaryMax());
			managedJob.setSalaryMin(job.getSalaryMin());
			managedJob.setUrl(job.getUrl());
			managedJob.setDescription(job.getDescription());
			managedJob.setLocation(job.getLocation());
			managedJob.setRequirements(job.getRequirements());
			managedJob.setSupervisory(job.getSupervisory());
			managedJob.setStatus(job.getStatus());
			
			if(job.getCompany().getId() > 3) {
				managedJob.setCompany(job.getCompany());
			} else {
				Company company = cRepo.getById(1);
				managedJob.setCompany(company);
			}
			return jRepo.saveAndFlush(managedJob);
		}
		return null;

	}

	
	@Override
	public boolean deleteJob (int id)  {	
				if (id <= 1) {
				return false;
			}
			
			Optional <Job> jobOpt = jRepo.findById(id);
			if (jobOpt.isPresent())  {
				Job job = jobOpt.get();
				jRepo.delete(job);
			
				return true;
			}
			else {
	
				return false;
			}
	
		}
			

	@Override
	public List<Job> findBySalaryMaxBetween(Integer low, Integer high) {
		return jRepo.findBySalaryMaxBetween(low, high);
	}



	@Override
	public List<Job> findByKeyword(String keyword) {
		return jRepo.findByTitleContaining(keyword);
	}

	@Override
	public List<Job> findByCompanyIdAndLocation(int id, String location) {
		return jRepo.findByCompanyIdAndLocation (id, location);
	
	}

	@Override
	public List<Job> findByCompanyId (int compId) {
			return jRepo.findByCompanyId (compId);
	}

	@Override
	public List<Job> getJobsByCompanyId (int compId) {
		return jRepo.getJobsByCompanyId (compId);
	}



}
