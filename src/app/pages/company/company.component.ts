import { Component, OnInit } from '@angular/core';

import { DataService } from '_services/data.service';
import { ICompany, IPagedResults } from '_models/_gen/modelInterfaces';
import { FilterService } from 'core/services/filter.service';
import 'style-loader!./company.scss';

@Component({
    selector: 'cm-companies',
    templateUrl: './company.html'
})
export class CompanyComponent implements OnInit {

    title: string;
    filterText: string;
    companies: ICompany[] = [];
    filteredCompanies: ICompany[] = [];
    displayMode: DisplayModeEnum;
    displayModeEnum = DisplayModeEnum;
    totalRecords: number = 0;
    pageSize: number = 10;

    constructor(private dataService: DataService, private filterService: FilterService) { }

    ngOnInit() {
        this.title = 'Companies';
        this.filterText = 'Filter Companies:';
        this.displayMode = DisplayModeEnum.Card;

        //this.getCompaniesPage(1);
        this.getCompanies();
    }

    changeDisplayMode(mode: DisplayModeEnum) {
        this.displayMode = mode;
    }

    pageChanged(page: number) {
        this.getCompaniesPage(page);
    }

    getCompaniesPage(page: number) {
        this.dataService.getCompaniesPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe((response: IPagedResults<ICompany[]>) => {
                this.companies = this.filteredCompanies = response.results;
                this.totalRecords = response.totalRecords;
            },
            (err: any) => console.log(err),
            () => console.log('getCompaniesPage() retrieved companies for page: ' + page));
    }    
    
    getCompanies() {
        this.dataService.getCompanies()
            .subscribe((response: ICompany[]) => {
                this.companies = response;
                //this.totalRecords = response.totalRecords;
            },
            (err: any) => console.log(err),
            () => console.log('getCompanies() retrieved companies'));
    }

    filterChanged(data: string) {
        if (data && this.companies) {
            data = data.toUpperCase();
            const props = ['companyName', 'alias'];
            this.filteredCompanies = this.filterService.filter<ICompany>(this.companies, data, props);
        }
        else {
            this.filteredCompanies = this.companies;
        }
    }
}

enum DisplayModeEnum {
    Card = 0,
    Grid = 1,
    Map = 2
}
