﻿/*------------------------------------------------------------------------------
<auto-generated>
     This code was generated by a tool.
	    Code originates from EA Uml ClassTemplate.t4
     Changes to this file will be lost if the code is regenerated.
	    Code Generated Date: 	23 May 2017
	    ProjectModel: 			MedicsAway
	    Requested Namespace:	Model$1. Presentation Model$LayrCake$LayrCake$Models$Implementation
</auto-generated>
------------------------------------------------------------------------------*/
import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ModalService, IModalContent } from 'core/modal/modal.service';
import { GrowlerService, GrowlerMessageType } from 'core/growler/growler.service';

import { DataService } from '_services/data.service';
import { IDDDSolutionToPackageLink } from '_models/_gen/modelInterfaces';

@Component({
	selector: 'cm-dddsolutiontopackagelink-edit',
	templateUrl: 'dddsolutiontopackagelink-edit.component.html',
	styleUrls: [ 'dddsolutiontopackagelink-edit.component.css' ]
})
export class DDDSolutionToPackageLinkEditComponent implements OnInit {

	dddsolutiontopackagelink: IDDDSolutionToPackageLink = 
	{
		id: 0,
		description: '',
		dDDSolutionRef: null,
		dDDPackageRef: null,
		isMasterSolution: null,
		dDDPackage: null,
		dDDSolution: null,
	};
	errorMessage: string;
	deleteMessageEnabled: boolean;
	operationText: string = 'Insert';
	@ViewChild('dDDSolutionToPackageLinksForm') dDDSolutionToPackageLinksForm: NgForm;
  
	constructor(private router: Router, 
			private route: ActivatedRoute, 
			private dataService: DataService,
			private growler: GrowlerService,
			private modalService: ModalService) { }

	ngOnInit() {
		//Subscribe to params so if it changes we pick it up. Don't technically need that here
		//since param won't be changing while component is alive. 
		//Could use this.route.parent.snapshot.params["id"] to simplify it.
		this.route.parent.params.subscribe((params: Params) => {
			let id = +params['id'];
			if (id !== 0) {
				this.operationText = 'Update';
				this.getDDDSolutionToPackageLink(id);
			}
		});
	}

	getDDDSolutionToPackageLink(id: number) {
		this.dataService.getDDDSolutionToPackageLink(id).subscribe((dddsolutiontopackagelink: IDDDSolutionToPackageLink) => {
			this.dddsolutiontopackagelink = dddsolutiontopackagelink;
		});
	}

	submit() {
		if (this.dddsolutiontopackagelink.id === 0) {
			this.dataService.insertDDDSolutionToPackageLink(this.dddsolutiontopackagelink)
				.subscribe((insertedDDDSolutionToPackageLink: IDDDSolutionToPackageLink) => {
					if (insertedDDDSolutionToPackageLink) {
						//Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
						this.dDDSolutionToPackageLinksForm.form.markAsPristine();
						this.router.navigate(['/dDDSolutionToPackageLinks']);
					} else {
						const msg = 'Unable to insert dddsolutiontopackagelink';
						this.growler.growl(msg, GrowlerMessageType.Danger);
						this.errorMessage = msg;
					}
				},
				(err: any) => console.log(err));
		  } else {
				this.dataService.updateDDDSolutionToPackageLink(this.dddsolutiontopackagelink)
					.subscribe((status: boolean) => {
					if (status) {
						//Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
						this.dDDSolutionToPackageLinksForm.form.markAsPristine();
						this.growler.growl('Operation performed successfully.', GrowlerMessageType.Success);
						//this.router.navigate(['/dDDSolutionToPackageLinks']);
					}
					else {
						const msg = 'Unable to update dddsolutiontopackagelink';
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
		this.router.navigate(['/dDDSolutionToPackageLinks']);
	}

	delete(event: Event) {
		event.preventDefault();
		this.dataService.deleteDDDSolutionToPackageLink(this.dddsolutiontopackagelink.id)
			.subscribe((status: boolean) => {
				if (status) {
					this.router.navigate(['/dDDSolutionToPackageLinks']);
				}
				else {
					this.errorMessage = 'Unable to delete dddsolutiontopackagelink';
				}
			},
			(err) => console.log(err));
		}
		canDeactivate(): Promise<boolean> | boolean {
			if (!this.dDDSolutionToPackageLinksForm.dirty) {
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
import { IDDDPackage,IDDDSolution, }  from '_models/_gen/modelInterfaces';

