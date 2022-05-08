package com.skilldistillery.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class JobTest {


	private static EntityManagerFactory emf;
	private EntityManager em;
	private Job job;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	emf = Persistence.createEntityManagerFactory("JobhuntJPA");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
	emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
	em = emf.createEntityManager();
	job = em.find(Job.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		job = null;
	}

	@Test
	@DisplayName("testing job entity")
	void test1() {
		assertNotNull(job);
		assertEquals("Full Stack Engineer ", job.getTitle());
		assertEquals(125000,job.getSalaryMin());
	}
	
}


