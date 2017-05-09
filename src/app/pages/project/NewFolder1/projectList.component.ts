import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

import { DataService } from '../../../../core/services/data.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import 'style-loader!./elementTables2.scss';
import { routing } from '../../tables.routing';

@Component({
    selector: 'element-tables',
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
    //,encapsulation: ViewEncapsulation.None, 
})

export class ProjectList {
    rows = [];
    count: number = 0;
    offset: number = 0;
    limit: number = 15;

    ngOnInit() {
        this.page(this.offset, this.limit);
    }

    page(offset, limit) {
        this.fetch((results) => {
            this.count = results.length;

            const start = offset * limit;
            const end = start + limit;
            const rows = [...this.rows];

            for (let i = start; i < end; i++) {
                rows[i] = results[i];
            }

            this.rows = rows;
            console.log('Page Results', start, end, rows);
        });
    }

    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `http://13.93.125.180:8731/tables/dddelement`);

        req.onload = () => {
            cb(JSON.parse(req.response));
        };

        req.send();
    }


    detail(row: any) {
        //this.routing.navigateByUrl('/details/' + row.id);
    }

    delete(row: any) {

    }

    send(row: any) {

    }
    onPage(event) {
        console.log('Page Event', event);
        this.page(event.offset, event.limit);
    }

}
