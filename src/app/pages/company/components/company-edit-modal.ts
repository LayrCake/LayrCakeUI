import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import 'style-loader!./company-edit-modal.scss';

import { DataService } from '_services/data.service';
import { ICompany } from '_models/_gen/modelInterfaces';
import { GrowlerService, GrowlerMessageType } from 'core/growler/growler.service';
import { ModalService, IModalContent } from 'core/modal/modal.service';

@Component({
    selector: 'edit-modal',
    templateUrl: 'company-edit-modal.html'
})
export class modalHtml implements OnInit {
    company: ICompany = 
    {
        id: 0,
        companyName: '',
        alias: '',
    };
    title: string;
    errorMessage: string;
    deleteMessageEnabled: boolean;
    operationText: string = 'Insert';

    @ViewChild('companyForm') companyForm: NgForm;
    @ViewChild('modal')
    modal: ModalComponent;
    open(){ this.modal.open();}

    constructor(
        private dataService: DataService,
        private growler: GrowlerService,
        private modalService: ModalService) { }

    ngOnInit() {
        this.title = 'New Company';
     /*   this.route.parent.params.subscribe((params: Params) => {
            let id = +params['id'];
            if (id !== 0) {
            this.operationText = 'Update';
            this.getCustomer(id);
            }
        });*/
      //this.dataService.getStates().subscribe((states: IState[]) => this.states = states);

    }
    
    getCompany(id: number) {
        this.dataService.getCompany(id).subscribe((company: ICompany) => {
            this.company = company;
        });
    }

    submit() {
        if (this.company.id === 0) {
        this.dataService.insertCompany(this.company)
            .subscribe((insertedcompany: ICompany) => {
            if (insertedcompany) {
                //Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
                this.companyForm.form.markAsPristine();
                this.modal.close();
                //this.router.navigate(['/companys']);
            } else {
                const msg = 'Unable to insert company';
                this.growler.growl(msg, GrowlerMessageType.Danger);
                this.errorMessage = msg;
            }
            },
            (err: any) => console.log(err));
        } else {
        this.dataService.updateCompany(this.company)
            .subscribe((status: boolean) => {
            if (status) {
                //Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
                this.companyForm.form.markAsPristine();
                this.modal.close();
                this.growler.growl('Operation performed successfully.', GrowlerMessageType.Success);
                //this.router.navigate(['/companys']);
            }
            else {
                const msg = 'Unable to update company';
                this.growler.growl(msg, GrowlerMessageType.Danger);
                this.errorMessage = msg;
            }
        },
        (err: any) => console.log(err));
        }
    }
  
    cancel(event: Event) {
        event.preventDefault();
        //Route guard will take care of showing modal dialog service if data is dirty
    //  this.router.navigate(['/companys']);
    }

    delete(event: Event) {
        event.preventDefault();
        this.dataService.deleteCompany(this.company.id)
            .subscribe((status: boolean) => {
            if (status) {
                //this.router.navigate(['/companys']);
            }
            else {
                this.errorMessage = 'Unable to delete company';
            }
            },
            (err) => console.log(err));
    }

    canDeactivate(): Promise<boolean> | boolean {
        if (!this.companyForm.dirty) {
        return true;
        }

        //Dirty show display modal dialog to user to confirm leaving
        const modalContent: IModalContent = {
        header: 'Lose Unsaved Changes?',
        body: 'You have unsaved changes! Would you like to leave the page and lose them?',
        cancelButtonText: 'Cancel',
        OKButtonText: 'Leave'
        }
        return this.modalService.show(modalContent);
    }
}