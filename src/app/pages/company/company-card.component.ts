import {
    Component, Input, OnInit, ChangeDetectionStrategy,
    trigger, state, style, transition, animate
} from '@angular/core';

import { ICompany } from '_models/_gen/modelInterfaces';
import { TrackByService } from 'core/services/trackby.service';
import 'style-loader!./company-card.component.scss';

@Component({
    selector: 'cm-company-card',
    templateUrl: 'company-card.component.html',
    //styleUrls: ['companies-card.component.scss'],
    //Add [@flyInOut]="'in'" into template on card
    // animations: [
    //   trigger('flyInOut', [
    //     state('in', style({transform: 'translateX(0)', opacity: 1})),
    //     transition('void => *', [
    //       style({transform: 'translateX(25%)', opacity: 0}),
    //       animate(300)
    //     ]),
    //     transition('* => void', [
    //       animate(300, style({transform: 'translateX(-25%)', opacity: 1}))
    //     ])
    //   ])
    // ],
    //When using OnPush detectors, then the framework will check an OnPush 
    //component when any of its input properties changes, when it fires 
    //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesCardComponent implements OnInit {

    @Input() companies: ICompany[] = [];

    constructor(private trackbyService: TrackByService) { }

    ngOnInit() {

    }

}

