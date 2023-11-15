import { LanguageService } from 'src/app/services/common/language.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/crm-common/models/user/user';
import { MatButtonModule } from '@angular/material/button';
import { MenuItem } from 'src/app/crm-common/models/menu/menu-item';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { Constants } from 'src/app/crm-common/constants/languages/contstans';

@Component({
    selector: 'init-app',
    standalone: true,
    imports: [RouterLinkWithHref, RouterOutlet, TranslatePipe, CommonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatCardModule, MatMenuModule, MatListModule, MatButtonModule],
    templateUrl: './init-app.component.html',
    styleUrls: ['./init-app.component.scss']
})
export class InitAppComponent implements OnInit, OnDestroy {
    @ViewChild('sidenav') public sidenav: MatSidenav;

    @Output('on-logout') private _onLogout: EventEmitter<void> = new EventEmitter();

    public isMobile: boolean;
    public mode: FormControl = new FormControl('side');
    public uiContent = "content";
    public user: User;
    public isRtl: boolean;
    public menuItems: MenuItem[] = [];
    public isMenuOpen = true;

    public isloading = true;

    constructor(private breakpointObserver: BreakpointObserver, private _languageService: LanguageService,  private router: Router) {
        this.isloading = true;
        this.isRtl = this._languageService.isRtlLanguage();
        this.initMenu();
        this.initModeSideMenu();
    }

    private initMenu(): void {
        this.menuItems.push(
            new MenuItem('assessment', 'Menu.Dashboard', Constants.Routes.Dashboard, window.location.pathname === '/dashboard'),
            new MenuItem('shopping_cart', 'Menu.Orders', Constants.Routes.Orders, window.location.pathname === '/orders'),
            new MenuItem('account_box', 'Menu.Customers', Constants.Routes.Customers, window.location.pathname === '/customers'),
            new MenuItem('store', 'Menu.Products', Constants.Routes.Products, window.location.pathname === '/products'),
            new MenuItem('settings', 'Menu.Settings', Constants.Routes.Settings, window.location.pathname === '/settings'),
        );
    }

    private initModeSideMenu(): void {
        this.breakpointObserver.observe([
            Breakpoints.HandsetLandscape,
            Breakpoints.HandsetPortrait
        ]).subscribe(result => {
            result.matches ? this.setModeMenu(false, true, "over", "mobile-content") : this.setModeMenu(true, false, "side", "content");
        });
    }

    private setModeMenu(isMenuOpen: boolean, isMobile: boolean, modeValue: string, uiContent: string): void {
        this.isMenuOpen = isMenuOpen;
        this.isMobile = isMobile;
        this.mode.setValue(modeValue);
        this.uiContent = uiContent;
    }

    public ngOnInit(): void {
        
        // this.user = this.authService.getUser();
        this.user = <User>JSON.parse(localStorage.getItem("NG_CRM_USER_2.0") || '{}');
        this.isloading = false;
    }

    public onSidenavManu(item:MenuItem) {
        let currentItem = this.menuItems.firstOrNull((item) => item.IsActive);
        if(currentItem)
            currentItem.IsActive = false;
        else {
            
        }

        item.IsActive = true;
    }

    public onMenuItem(): void {
        this.isMenuOpen = !this.isMenuOpen;
        this.sidenav.toggle();
    }

    public logout(): void {
        this._onLogout.emit();

        // this.authService.logout()
        // this.router.navigate([Constants.Routes.Login]); // TODO emit up
    }

    public ngOnDestroy(): void {
        this.breakpointObserver.ngOnDestroy();

        // this.authService.logout()
    }
}
