﻿/*------------------------------------------------------------------------------
<auto-generated>
     This code was generated by a tool.
	    Code originates from EA Uml ClassTemplate.t4
     Changes to this file will be lost if the code is regenerated.
	    Code Generated Date: 	06 May 2017
	    ProjectModel: 			MedicsAway
	    Requested Namespace:	Model$1. Presentation Model$LayrCake$LayrCake$Models$Implementation
</auto-generated>
------------------------------------------------------------------------------*/
import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DataService } from '_services/data.service';
import { IDDDMethod } from '_models/_gen/modelInterfaces';

@Component({
  selector: 'cm-dddmethod-details',
  templateUrl: 'dddmethod-details.component.html',
  styleUrls: [ 'dddmethod-details.component.css' ]
})
export class DDDMethodDetailsComponent implements OnInit {

  dddmethod: IDDDMethod;
  mapEnabled: boolean;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
      //Subscribe to params so if it changes we pick it up. Could use this.route.parent.snapshot.params["id"] to simplify it.
      this.route.parent.params.subscribe((params: Params) => {
        let id = +params['id'];
        this.dataService.getDDDMethod(id)
            .subscribe((dddmethod: IDDDMethod) => {
              this.dddmethod = dddmethod;
              this.mapEnabled = true;
            });
      });
  }
}

