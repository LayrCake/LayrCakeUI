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
import { IDDDLayer } from '_models/_gen/modelInterfaces';

@Component({
	selector: 'cm-dddlayer-edit',
	templateUrl: 'dddlayer-edit.component.html',
	styleUrls: [ 'dddlayer-edit.component.css' ]
})
export class DDDLayerEditComponent implements OnInit {

	dddlayer: IDDDLayer = 
	{
		id: 0,
		name: '',
		description: '',
		dDDSolutionRef: null,
		dDDLayerTemplateRef: null,
		dDDSolution: null,
		dDDPackages: null,
	};
	errorMessage: string;
	deleteMessageEnabled: boolean;
	operationText: string = 'Insert';
	@ViewChild('dDDLayersForm') dDDLayersForm: NgForm;
  
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
				this.getDDDLayer(id);
			}
		});
	}

	getDDDLayer(id: number) {
		this.dataService.getDDDLayer(id).subscribe((dddlayer: IDDDLayer) => {
			this.dddlayer = dddlayer;
		});
	}

	submit() {
		if (this.dddlayer.id === 0) {
			this.dataService.insertDDDLayer(this.dddlayer)
				.subscribe((insertedDDDLayer: IDDDLayer) => {
					if (insertedDDDLayer) {
						//Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
						this.dDDLayersForm.form.markAsPristine();
						this.router.navigate(['/dDDLayers']);
					} else {
						const msg = 'Unable to insert dddlayer';
						this.growler.growl(msg, GrowlerMessageType.Danger);
						this.errorMessage = msg;
					}
				},
				(err: any) => console.log(err));
		  } else {
				this.dataService.updateDDDLayer(this.dddlayer)
					.subscribe((status: boolean) => {
					if (status) {
						//Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
						this.dDDLayersForm.form.markAsPristine();
						this.growler.growl('Operation performed successfully.', GrowlerMessageType.Success);
						//this.router.navigate(['/dDDLayers']);
					}
					else {
						const msg = 'Unable to update dddlayer';
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
		this.router.navigate(['/dDDLayers']);
	}

	delete(event: Event) {
		event.preventDefault();
		this.dataService.deleteDDDLayer(this.dddlayer.id)
			.subscribe((status: boolean) => {
				if (status) {
					this.router.navigate(['/dDDLayers']);
				}
				else {
					this.errorMessage = 'Unable to delete dddlayer';
				}
			},
			(err) => console.log(err));
		}
		canDeactivate(): Promise<boolean> | boolean {
			if (!this.dDDLayersForm.dirty) {
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
import { IDDDSolution,IDDDPackage, }  from '_models/_gen/modelInterfaces';

