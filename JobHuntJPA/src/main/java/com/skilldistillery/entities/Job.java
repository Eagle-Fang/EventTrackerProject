package com.skilldistillery.entities;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Job {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	
	private String title;
	
	private String date;
	
	@Column (name="salary_max")
	private Integer salaryMax;
	
	@Column (name="salary_min")
	private Integer salaryMin;
	
	private String url;
	
	private String description;
	
	private String location;
	
	private String requirements;
	
	private Boolean supervisory;
	
	@Column (name="status_update")
	private String status;
	
	@ManyToOne
	@JoinColumn (name="company_id")
	private Company company;
	
	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public Job() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Integer getSalaryMax() {
		return salaryMax;
	}

	public void setSalaryMax(Integer salaryMax) {
		this.salaryMax = salaryMax;
	}

	public Integer getSalaryMin() {
		return salaryMin;
	}

	public void setSalaryMin(Integer salaryMin) {
		this.salaryMin = salaryMin;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getRequirements() {
		return requirements;
	}

	public void setRequirements(String requirements) {
		this.requirements = requirements;
	}

	public Boolean getSupervisory() {
		return supervisory;
	}

	public void setSupervisory(Boolean supervisory) {
		this.supervisory = supervisory;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Job other = (Job) obj;
		return id == other.id;
	}

	public Job(int id, String title, String date, Integer salaryMax, Integer salaryMin, String url, String description,
			String location, String requirements, Boolean supervisory, String status) {
		super();
		this.id = id;
		this.title = title;
		this.date = date;
		this.salaryMax = salaryMax;
		this.salaryMin = salaryMin;
		this.url = url;
		this.description = description;
		this.location = location;
		this.requirements = requirements;
		this.supervisory = supervisory;
		this.status = status;
	}

	@Override
	public String toString() {
		return "Job [id=" + id + ", title=" + title + ", date=" + date + ", salaryMax=" + salaryMax + ", salaryMin="
				+ salaryMin + ", url=" + url + ", description=" + description + ", location=" + location
				+ ", requirements=" + requirements + ", supervisory=" + supervisory + ", status=" + status + "]";
	}
	
	
	
	
	
}
