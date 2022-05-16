import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { APPCONSTANTS } from 'src/app/shared/constants/app.constant';
import { DataSourceService } from 'src/app/services/data-source.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['../../../styles.scss']
})
export class HeaderComponent implements OnInit {
    isHeader: boolean = true;
    selectedMenu: string = '';
    loginType: string = '';
    user: any = null;
    constructor(private _dataSourceService: DataSourceService, private router: Router, private socialAuthService: SocialAuthService) { }

    // //* method is used in testing
    // updateService(source: string, value: string){
    //     this._dataSourceService.updateDataSource(source, value);
    // }
    // initService(){
    //     this._dataSourceService.createDataSource();
    //     // this._dataSourceService = new DataSourceService();
    // }
    // getServiceRoute(){
    //     this._dataSourceService.getDataSource('route').subscribe( returnData => {
    //         return returnData;
    //     });
    // }
    ngOnInit(): void {
        this._dataSourceService.getDataSource('route').subscribe((value: string) => {
            this.selectedMenu = value;
            if (value === 'login') {
                this.isHeader = false;
            } 
            else {
                this.isHeader = true;
            }
            const user = localStorage.getItem('ssoUser');
            if (user) {
                this.user = JSON.parse(user);
            }
        })
        this._dataSourceService.getDataSource('loginType').subscribe((value: string) => {
            if (value) {
                this.loginType = value;
            }
        })
    }
    onMenuChange(menu: string): void {
        this.router.navigate([menu]);
        this._dataSourceService.updateDataSource('route', menu);
    }
    getSelectedClass(menu: string): string {
        if (menu === 'candidates') {
            if (this.selectedMenu === 'candidates') {
                return 'selected';
            }
        }
        if (menu === 'positions') {
            if (this.selectedMenu === 'positions') {
                return 'selected';
            }
        }
        return '';
    }
    logout(): void {
        if (this.loginType === APPCONSTANTS.LOGIN_CONSTANTS.LOGIN_TYPE_SSO) {
            this.socialAuthService.signOut();
        }
        localStorage.clear();
        this.user = null;
        this.router.navigate(['login']);
    }
    navigateHome(): void {
        this.router.navigate(['calendar'])
    }
}
