package com.skilldistillery.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Company {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	@Column (name="poc_name")
	private String pocName;


	@Column (name="poc_email")
	private String pocEmail;

	public List<Job> getJobs() {
		return jobs;
	}

	public void setJobs(List<Job> jobs) {
		this.jobs = jobs;
	}

	private String location;

	private String website;

	@JsonIgnore
	@OneToMany(mappedBy="company")
	private List<Job> jobs;

	public Company() {

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public String getPocName() {
		return pocName;
	}

	public void setPocName(String pocName) {
		this.pocName = pocName;
	}

	public String getPocEmail() {
		return pocEmail;
	}

	public void setPocEmail(String pocEmail) {
		this.pocEmail = pocEmail;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if ((obj == null) || (getClass() != obj.getClass()))
			return false;
		Company other = (Company) obj;
		return id == other.id;
	}

	public Company(int id, String name, String email, String pocName, String pocEmail, String location,
			String website) {
		super();
		this.id = id;
		this.name = name;
		this.pocName = pocName;
		this.pocEmail = pocEmail;
		this.location = location;
		this.website = website;
	}

	@Override
	public String toString() {
		return "Company [id=" + id + ", name=" + name +  ", pocName=" + pocName + ", pocEmail="
				+ pocEmail + ", location=" + location + ", website=" + website + "]";
	}



}
