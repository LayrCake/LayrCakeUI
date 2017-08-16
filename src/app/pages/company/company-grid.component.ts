import { Component, Input, OnInit, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { GenericTableComponent, GtConfig } from '@angular-generic-table/core';
import { DataService } from '_services/data.service';

import { SorterService } from 'core/services/sorter.service';
import { TrackByService } from 'core/services/trackby.service';

import { ICompany } from '_models/_gen/modelInterfaces';

@Component({
    selector: 'cm-company-grid',
    templateUrl: 'company-grid.component.html',
    //styleUrls: ['companies-grid.component.css'],
    //When using OnPush detectors, then the framework will check an OnPush 
    //component when any of its input properties changes, when it fires 
    //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesGridComponent implements OnInit {
    public configObject: GtConfig<any>;
    @Input() companies: ICompany[] = [];
    @ViewChild(GenericTableComponent)
   // private myTable: GenericTableComponent<any, CustomRowComponent>;
  
    public data: Array<{
        id: number,
        companyname: string,
        alias: number
    }> = []; 

    constructor(private dataService: DataService, public trackbyService: TrackByService) { 
//debugger;
        this.configObject = {
            settings: [{
                objectKey: 'id',
                sort: 'asc',
                columnOrder: 0
            }, {
                objectKey: 'companyname',
                sort: 'enable',
                columnOrder: 1
            }, {
                objectKey: 'alias',
                sort: 'enable',
                columnOrder: 2
            }],
            fields: [{
                name: 'Id',
                objectKey: 'id'
            }, {
                name: 'Company Name',
                objectKey: 'companyname'
            }, {
                name: 'Alias',
                objectKey: 'alias'
            }],
            data: this.companies
        };
    }

    ngOnInit() {
        //this.configObject.data = this.companies;
        this.dataService.getCompanies()
            .subscribe((result) => {
                setTimeout(() => {
                    this.configObject.data = result;
                }, 1000);
            });
    }
  /*  public addData = function(){

        // create mock data
        const random = Math.floor(Math.random() * this.configObject.data.length - 1) + 1;
        const firstName = this.configObject.data[random].first_name;
        const lastName = this.configObject.data[Math.floor(Math.random() * this.configObject.data.length - 1) + 1].last_name;
        const gender = this.configObject.data[random].gender;
        const favoriteColor = this.configObject.data[Math.floor(Math.random() * this.configObject.data.length - 1) + 1].favorite_color;
        const birthday = this.configObject.data[Math.floor(Math.random() * this.configObject.data.length - 1) + 1].birthday;

        // push data to data array (could be swapped to a method for persisting the data to a database).
        this.configObject.data.push({
        'id': this.configObject.data.length + 1,
        'first_name': firstName,
        'last_name': lastName,
        'email': firstName + '.' + lastName + '@some_email_address.xyz',
        'gender': gender,
        'favorite_color': favoriteColor,
        'birthday': birthday
        });
    };*/

}
