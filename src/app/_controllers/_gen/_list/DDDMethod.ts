﻿import { Component } from '@angular/core';
import { Http } from '@angular/http';

//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTableModule } from "angular2-datatable";
//import 'style-loader!./elementTables.scss';
import { DataService } from '_services/data.service';

@Component({
    selector: 'cm-dddmethod-list',
	templateUrl: 'dddmethod-list.component.html',

    template: `
    <table class="table table-striped" [mfData]="data" #mf="mfDataTable" [mfRowsOnPage]="15">
      <thead>
      <tr>
          <th style="width: 10%">
              <mfDefaultSorter by="id">ID</mfDefaultSorter>
          </th>
          <th style="width: 30%">
              <mfDefaultSorter by="name">Name</mfDefaultSorter>
          </th>
          <th style="width: 20%">
              <mfDefaultSorter by="dddpackageref">Package Ref</mfDefaultSorter>
          </th>
          <th style="width: 10%">
              <mfDefaultSorter by="dddmethod">Methods</mfDefaultSorter>
          </th>
          <th style="width: 20%">
              <mfDefaultSorter by="city">City</mfDefaultSorter>
          </th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let item of mf.data">

          <td class="text-left">{{item.id}}</td>
          <td class="text-left">{{item.name}}</td>
          <td class="text-center">{{item.dddpackageref}}</td>
          <td class="text-right">{{item.dddmethod}}</td>
          <td>{{item.city | uppercase}}</td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
          <td colspan="5">
              <mfBootstrapPaginator [rowsOnPageSet]="[5,15,25]"></mfBootstrapPaginator>
          </td>
      </tr>
      </tfoot>
  </table>
  `
})

export class DDDMethodListComponent {
    public data;
    public filterQuery = "";
    public rowsOnPage = 15;
    public sortBy = "id";
    public sortOrder = "asc";

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this.dataService.getDDDMethods()
            .subscribe((result) => {
                setTimeout(() => {
                    this.data = result;
                }, 1000);
            });
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

}
