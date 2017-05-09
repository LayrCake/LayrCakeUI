import { Routes, RouterModule } from '@angular/router';

import { Project } from './project.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: Project,
    }
];

export const routing = RouterModule.forChild(routes);
