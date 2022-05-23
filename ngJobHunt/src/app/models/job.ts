import { ɵExtraLocaleDataIndex } from "@angular/core";
import { Company } from "./company";

export class Job {
id: number;
title: string;
date: string;
salaryMax: number;
salaryMin: number;
url: string;
description: string;
location: string;
requirements: string;
supervisory: boolean;
status: string;
company: Company | undefined;


constructor(
  id: number=0,
  title: string='',
  date: string='',
  salaryMax: number=0,
  salaryMin: number=0,
  url: string='',
  description: string='',
  location: string='',
  requirements: string='',
  supervisory: boolean=false,
  status: string=''
) {
  this.id= id;
  this.title=title;
  this.date=date;
  this.salaryMax=salaryMax;
  this.salaryMin=salaryMin;
  this.url=url;
  this.description=description;
  this.location=location;
  this.requirements=requirements;
  this.supervisory=supervisory;
  this.status=status;

}
}
