import { Component } from '@angular/core';
import { GtConfig } from '@angular-generic-table/core';

import { DataService } from '_services/data.service';

@Component({
    selector: 'element-tables',
    templateUrl: 'elementTables4.html'
})

export class ElementTables4 {
    public configObject: GtConfig<any>;

    /*public data: Array<{
        id: number,
        companyname: string,
        alias: number
    }> = [];*/

    constructor(private dataService: DataService) {

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
            }]
        };
    }
    ngOnInit(): void {
        this.dataService.getCompanies()
            .subscribe((result) => {
                setTimeout(() => {
                    this.configObject.data = result;
                }, 1000);
            });
    }

}
