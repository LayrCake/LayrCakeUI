import {Component, Input} from '@angular/core';

@Component({
  selector: 'ba-card-2',
  templateUrl: './baCard2.html',
})
export class BaCard2 {
  @Input() title:String;
  @Input() baCardClass:String;
  @Input() cardType:String;
}
