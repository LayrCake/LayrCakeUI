import { Routes, RouterModule } from '@angular/router';

import { Tables } from './tables.component';
//import { BasicTables } from './components/basicTables/basicTables.component';
//import { SmartTables } from './components/smartTables/smartTables.component';
import { ElementTables } from './components/elementTables/elementTables.component';
import { ElementTables2 } from './components/elementTables/elementTables2.component';
import { ElementTables3 } from './components/elementTables/elementTables3.component';
import { ElementGoJS } from './components/elementTables/elementGoJS.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: Tables,
        children: [
            //{ path: 'basictables', component: BasicTables },
            //{ path: 'smarttables', component: SmartTables },
            { path: 'elementtables', component: ElementTables },
            { path: 'elementtables2', component: ElementTables2 },
            { path: 'elementtables3', component: ElementTables3 },
            { path: 'elementGoJs', component: ElementGoJS }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
