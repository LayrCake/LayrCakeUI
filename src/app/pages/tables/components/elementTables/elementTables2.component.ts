import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

import { DataService } from '_services/data.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import 'style-loader!./elementTables2.scss';
import { routing } from 'pages/tables/tables.routing';

@Component({
    selector: 'element-tables',
    template: `
    <ba-card>
      <!--h3>
        Client-side Paging
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/paging/paging-client.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3-->
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="[{name:'Name'},{name:'dddpackageref'},{name:'Actions'}]"
        [columnMode]="'force'"
        [headerHeight]="40"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [externalPaging]="true"
        [count]="count"
        [offset]="offset"
        [limit]="limit"
        (page)='onPage($event)'>
          <ngx-datatable-column name="Name" [width]="200" ></ngx-datatable-column>
          <ngx-datatable-column name="dddpackageref" ></ngx-datatable-column>
          <ngx-datatable-column name="Actions" sortable="false" prop="id">
              <ng-template let-column="column" let-sort="sortFn" ngx-datatable-header-template>
                  {{column.name}}
              </ng-template>
              <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
                  <button md-icon-button (click)="blockAgents(value)" [disabled]="row['status']==='BLOCKED'">
                      <i class="fa fa-ban"></i>
                  </button>
                  <button md-icon-button (click)="approveAgent(value)" [disabled]="row['status']==='APPROVED'">
                      <i class="fa fa-check"></i>
                  </button>
              </ng-template>
          </ngx-datatable-column>
      </ngx-datatable>
    </ba-card>  
`
    //,encapsulation: ViewEncapsulation.None, 
})

export class ElementTables2 {
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
