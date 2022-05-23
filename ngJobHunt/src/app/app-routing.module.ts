import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { JobListComponent } from './components/job-list/job-list.component';

const routes: Routes = [
{path: '', pathMatch: 'full', redirectTo: 'home' },
{path: 'home', component: HomeComponent },
{path: 'jobs', component: JobListComponent },
{path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
