import { Component } from '@angular/core';
import { GtConfig } from '@angular-generic-table/core';


@Component({
    selector: 'element-tables',
    templateUrl: 'elementTables3.html'
})

export class ElementTables3 {
    public configObject: GtConfig<any>;

    public data: Array<{
        id: number,
        name: string,
        lucky_number: number
    }> = [];

    constructor() {

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
                objectKey: 'lucky_number',
                sort: 'enable',
                columnOrder: 2
            }],
            fields: [{
                name: 'Id',
                objectKey: 'id'
            }, {
                name: 'Name',
                objectKey: 'name'
            }, {
                name: 'Lucky number',
                objectKey: 'lucky_number'
            }],
            data: [{
                "id": 1,
                "name": "Anna",
                "lucky_number": 63
            }, {
                "id": 2,
                "name": "Julie",
                "lucky_number": 8
            }, {
                "id": 3,
                "name": "Lillian",
                "lucky_number": 30
            }, {
                "id": 4,
                "name": "Norma",
                "lucky_number": 13
            }, {
                "id": 5,
                "name": "Ralph",
                "lucky_number": 28
            }, {
                "id": 6,
                "name": "Benjamin",
                "lucky_number": 66
            }, {
                "id": 7,
                "name": "George",
                "lucky_number": 66
            }, {
                "id": 8,
                "name": "Ryan",
                "lucky_number": 65
            }, {
                "id": 9,
                "name": "Martha",
                "lucky_number": 57
            }, {
                "id": 10,
                "name": "Todd",
                "lucky_number": 65
            }]
        };
    }
}
