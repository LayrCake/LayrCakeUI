import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';


import { GlobalState } from 'global.state';
import { GrowlerService, GrowlerMessageType } from 'core/growler/growler.service';
import { AuthService } from '_services/auth.service';

import 'style-loader!./baPageTop.scss';

@Component({
    selector: 'ba-page-top',
    templateUrl: './baPageTop.html',
})
export class BaPageTop {

    public isScrolled: boolean = false;
    public isMenuCollapsed: boolean = false;
    private sub: Subscription;
    private loginLogoutText: string;

    constructor(private _state: GlobalState, private router: Router, private authService: AuthService, private growler: GrowlerService) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    ngOnInit() {
        this.sub = this.authService.authChanged
            .subscribe((loggedIn: boolean) => {
                this.setLoginLogoutText();
            },
            (err: any) => console.log(err));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        return false;
    }

    public scrolledChanged(isScrolled) {
        this.isScrolled = isScrolled;
    }

    public profileClick() {
    }

    public settingsClick() {

    }

    public logoutClick() {
        const isAuthenticated = this.authService.isAuthenticated;
        if (isAuthenticated) {
            this.authService.logout()
                .subscribe((status: boolean) => {
                    this.setLoginLogoutText();
                    this.growler.growl('Logged Out', GrowlerMessageType.Info);
                    return;
                },
                (err: any) => console.log(err));
        }
        this.redirectToLogin();
    }

    redirectToLogin() {
        this.router.navigate(['/login']);
    }

    setLoginLogoutText() {
        this.loginLogoutText = (this.authService.isAuthenticated) ? 'Logout' : 'Login';
    }

}
