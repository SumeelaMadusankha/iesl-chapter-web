import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  onGoingProjects: Project[] = [];
  upComingProjects: Project[] = [];
  pastProjects: Project[] = [];

  constructor(private router: Router, private _projectService: ProjectService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    
    this._projectService.getProjects()
      .subscribe(
        data => {
          this.projects = data;
          this.onGoingProjects = this.projects.filter(item => item.category === "on-going");
          this.upComingProjects = this.projects.filter(item => item.category === "up-coming");
          this.pastProjects = this.projects.filter(item => item.category === "past");
        }
      );
  }

  onSelect(project: any){
    this.router.navigate(['projects', project._id]);
  }

}
