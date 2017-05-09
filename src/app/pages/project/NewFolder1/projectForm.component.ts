import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

import { DataService } from '_services/data.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import 'style-loader!./elementTables2.scss';
import { routing } from '../project.routing';
import { IDDDProject, IDDDPackageToPackageLink } from '_models/_gen/modelInterfaces';
export class DDDProject implements IDDDProject {
    id: number;
    projectName: string;
    shortDescription: string;
    dDDPackageToPackageLinks?: IDDDPackageToPackageLink[];
}

@Component({
    selector: 'project-form',
    template: `
<div bsModal #lgModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" (click)="lgModal.hide()" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title">Create New Project</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="inputFirstName">Project Name</label>
              <input type="text" class="form-control" id="inputProjectName" [(ngModel)]="dddProject.projectName" placeholder="Project Name">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="inputCreatedDate">Created Date</label>
              <input type="text" disabled class="form-control" id="inputCreatedDate" [(ngModel)]="dddProject.createdDate" placeholder="Created Date">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
              <label for="inputFirstName">Email</label>
              <input type="email" class="form-control" id="inputEmail" placeholder="Email">
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <label for="inputWebsite">Website</label>
              <input type="text" class="form-control" id="inputWebsite" placeholder="Website">
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>      
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary confirm-btn" (click)="lgModal.hide()">Clear changes</button>
        <button class="btn btn-primary confirm-btn" (click)="lgModal.hide()">Cancel changes</button>
        <button class="btn btn-primary confirm-btn" (click)="lgModal.hide()">Save changes</button>
      </div>
    </div>
  </div>
</div>
`
})

export class ProjectList {
    dddProject: DDDProject;
}
