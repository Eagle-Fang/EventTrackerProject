package com.skilldistillery.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.entities.Company;
import com.skilldistillery.entities.Job;
import com.skilldistillery.repositories.JobRepository;

@Service
public class JobServiceImpl implements JobService {

	@Autowired
	JobRepository repo;

	@Override
	public List<Job> index() {
		return repo.findAll();
	}

	@Override
	public Job findById(int id) {
		Optional<Job> op = repo.findById(id);
		Job j = null;
		if (op.isPresent()) {
			j = op.get();
		}
		return j;
	}

	@Override
	public Job create(Job job) {
		Company c = new Company();
		c.setId(1);
		job.setCompany(c);
		return repo.saveAndFlush(job);
	}

	@Override
	public Job update(Job job, int id) {
		job.setId(id);
		Company c = new Company();
		c.setId(1);
		job.setCompany(c);
		if (repo.existsById(id)) {
			return repo.save(job);
		}
		return null;

	}

	@Override
	public void delete(int id) {
		if (repo.existsById(id)) {
			repo.deleteById(id);
		}

	}

}
