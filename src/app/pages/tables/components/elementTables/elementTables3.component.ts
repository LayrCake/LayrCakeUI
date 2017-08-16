import { Component } from '@angular/core';
import { GtConfig } from '@angular-generic-table/core';

import { DataService } from '_services/data.service';

@Component({
    selector: 'element-tables',
    templateUrl: 'elementTables3.html'
})

export class ElementTables3 {
    public configObject: GtConfig<any>;

    public data: Array<{
        id: number,
        name: string,
        dddpackageref: number
    }> = [];

    constructor(private dataService: DataService) {

        this.configObject = {
            settings: [{
                objectKey: 'id',
                sort: 'asc',
                columnOrder: 0
            }, {
                objectKey: 'name',
                sort: 'enable',
                columnOrder: 1
            }, {
                objectKey: 'dddpackageref',
                sort: 'enable',
                columnOrder: 2
            }],
            fields: [{
                name: 'Id',
                objectKey: 'id'
            }, {
                name: 'Package Name',
                objectKey: 'name'
            }, {
                name: 'Package Ref',
                objectKey: 'dddpackageref'
            }]
        };
    }
    ngOnInit(): void {
        this.dataService.getDDDElements()
            .subscribe((result) => {
                setTimeout(() => {
                    this.configObject.data = result;
                }, 1000);
            });
    }

}
