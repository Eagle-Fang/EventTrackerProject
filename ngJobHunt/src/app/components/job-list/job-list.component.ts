import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  title = 'Job Tracker';
  jobs: Job[] = [];
  searchJobs: Job[] = [];
  selected: Job | null = null;
  addForm: null | boolean =null;
  list: null | boolean = false;

  newJob: Job = new Job();
  editJob: Job | null=null;
  id: number = 0;
  company1 = new Company(1);
  keyword: null | string = null;
  searchResult: null | boolean = false;
  hideSearchResult = false;
  totalJobs = 0;
  totalSupervisory = 0;
  totalRemote = 0;
  public isCollapsed = false;

  constructor(private jobSvc: JobService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.clearSearch();
    this.jobSvc.index().subscribe(
      (data) => {
        console.log(data);
        this.jobs = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  search() {
    this.clearSearch();
    this.loadJobs();
    this.resetTotals();

    for (let i = 0; i < this.jobs.length; i++) {
    if (this.keyword) {

      if (this.jobs[i].title.toLowerCase().includes(this.keyword.toLowerCase())) {
        this.searchJobs.push(this.jobs[i]);
        this.totalJobs++;
        continue;
      }
      if (this.jobs[i].description && this.jobs[i].description.toLowerCase().includes(this.keyword.toLowerCase())) {
        this.searchJobs.push(this.jobs[i]);
        this.totalJobs++;
        continue;
      }
      if (this.jobs[i].requirements && this.jobs[i].requirements.toLowerCase().includes(this.keyword.toLowerCase())) {
        this.searchJobs.push(this.jobs[i]);
        this.totalJobs++;
      }

    }
    if (this.searchJobs.length === 0) {
      this.hideSearchResult = true;
    } else {
      this.hideSearchResult = false;
    }
    this.keyword = null;

  }
  }


  displayJob(job: Job) {
    this.selected = job;
  }

  setEditJob() {
    this.editJob = Object.assign({}, this.selected);
    console.log(this.editJob);
  }

  addJob() {
    this.newJob.company = this.company1;
    // this.newJob.active = true;
    this.newJob.supervisory = false;

    return this.jobSvc.create(this.newJob).subscribe(
      (data) => {
        this.loadJobs();
        this.newJob = new Job();
      },
      (err) => {
        console.log('JobListComponent.addJob() error');
        console.log(err);
      }
    );
  }

  editSubmit() {
    if (this.editJob) {
      this.jobSvc.update(this.editJob).subscribe(
        (data) => {
          this.loadJobs();
          this.editJob = new Job();
          this.editJob = null;
          this.selected = data;
        },
        (err) => {
          console.log('JobListComponent.editSubmit() error');
          console.log(err);
        }
      );
    }
  }

  deleteJob(id: number) {
    this.jobSvc.destroy(id).subscribe(
      (good) => {
        this.loadJobs();
    },
    (err) => {
      console.log('JobListComponent.deleteJob() error');
      console.log(err);
    }
  );
    }

    private resetTotals() {
      this.totalJobs = 0;
      this.totalSupervisory = 0;
      this.totalRemote = 0;
    }

    private clearSearch() {
      this.searchJobs = [];
    }
    }
