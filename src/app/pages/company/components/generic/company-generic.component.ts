import { Component } from '@angular/core';
import { GtConfig } from '@angular-generic-table/core';
import { DataService } from '_services/data.service';

export interface rowData {
    id: number,
    companyName: string,
    alias: string
}
@Component({
    selector: 'cm-companies-generic',
    templateUrl: 'companies-generic.component.html',
    //styleUrls: ['companies-grid.component.css'],
    //When using OnPush detectors, then the framework will check an OnPush 
    //component when any of its input properties changes, when it fires 
    //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesGridGenericComponent { // implements OnInit 

    public data: Array<rowData> = [];
    public configObject: GtConfig<rowData>;

    constructor(private dataService: DataService) {
        this.configObject = {
            settings: [{
                objectKey: 'id',
                sort: 'asc',
                sortOrder: 1,
                columnOrder: 0
            }, {
                objectKey: 'companyName',
                sort: 'asc',
                sortOrder: 0,
                columnOrder: 1
            }, {
                objectKey: 'alias',
                sort: 'enable',
                columnOrder: 2,
                visible: true
            }],
            fields: [{
                name: 'Id',
                objectKey: 'id'
            }, {
                name: 'Company Name',
                objectKey: 'companyName'
            }, {
                name: 'Alias',
                objectKey: 'alias',
            }]
        };
    }

    ngOnInit() {
        this.dataService.getCompanies()
            .subscribe((result) => {
                setTimeout(() => {
                    this.configObject.data = result;
                }, 1000);
            });
    }
}
