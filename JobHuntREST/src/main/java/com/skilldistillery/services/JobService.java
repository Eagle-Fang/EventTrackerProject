package com.skilldistillery.services;

import java.util.List;

import com.skilldistillery.entities.Job;


public interface JobService {

	List <Job> index();
	
	Job findById(int id);
	
	Job create(Job job);
	
	Job update(Job job, int id);
	
	void delete (int id);
	
	
}
