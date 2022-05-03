'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">raft-ui-demo documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-81231aea627f47d96a4361262121cec3f9df3d87b7799275bd6710e5657ffae85fd2359319e9429914b913e495dded7171ea93c6f7751b3f2f0ac9ad3189ed12"' : 'data-target="#xs-components-links-module-AppModule-81231aea627f47d96a4361262121cec3f9df3d87b7799275bd6710e5657ffae85fd2359319e9429914b913e495dded7171ea93c6f7751b3f2f0ac9ad3189ed12"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-81231aea627f47d96a4361262121cec3f9df3d87b7799275bd6710e5657ffae85fd2359319e9429914b913e495dded7171ea93c6f7751b3f2f0ac9ad3189ed12"' :
                                            'id="xs-components-links-module-AppModule-81231aea627f47d96a4361262121cec3f9df3d87b7799275bd6710e5657ffae85fd2359319e9429914b913e495dded7171ea93c6f7751b3f2f0ac9ad3189ed12"' }>
                                            <li class="link">
                                                <a href="components/AddApplicantComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddApplicantComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AllInterviewsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AllInterviewsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateInterviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateInterviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FindInterviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindInterviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewInterviewsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewInterviewsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-81231aea627f47d96a4361262121cec3f9df3d87b7799275bd6710e5657ffae85fd2359319e9429914b913e495dded7171ea93c6f7751b3f2f0ac9ad3189ed12"' : 'data-target="#xs-injectables-links-module-AppModule-81231aea627f47d96a4361262121cec3f9df3d87b7799275bd6710e5657ffae85fd2359319e9429914b913e495dded7171ea93c6f7751b3f2f0ac9ad3189ed12"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-81231aea627f47d96a4361262121cec3f9df3d87b7799275bd6710e5657ffae85fd2359319e9429914b913e495dded7171ea93c6f7751b3f2f0ac9ad3189ed12"' :
                                        'id="xs-injectables-links-module-AppModule-81231aea627f47d96a4361262121cec3f9df3d87b7799275bd6710e5657ffae85fd2359319e9429914b913e495dded7171ea93c6f7751b3f2f0ac9ad3189ed12"' }>
                                        <li class="link">
                                            <a href="injectables/Requester.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Requester</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/calHeadModule.html" data-type="entity-link" >calHeadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-calHeadModule-a8e0ff759e223c296d4439e7456d28c0bc6de84e565ba4612514334c90a28e971c98bb83a72522d454dcbbd02be73b51168d3b53cdf010ff99b8bb026efd756d"' : 'data-target="#xs-components-links-module-calHeadModule-a8e0ff759e223c296d4439e7456d28c0bc6de84e565ba4612514334c90a28e971c98bb83a72522d454dcbbd02be73b51168d3b53cdf010ff99b8bb026efd756d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-calHeadModule-a8e0ff759e223c296d4439e7456d28c0bc6de84e565ba4612514334c90a28e971c98bb83a72522d454dcbbd02be73b51168d3b53cdf010ff99b8bb026efd756d"' :
                                            'id="xs-components-links-module-calHeadModule-a8e0ff759e223c296d4439e7456d28c0bc6de84e565ba4612514334c90a28e971c98bb83a72522d454dcbbd02be73b51168d3b53cdf010ff99b8bb026efd756d"' }>
                                            <li class="link">
                                                <a href="components/CalendarHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MyCalendarModule.html" data-type="entity-link" >MyCalendarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MyCalendarModule-152fe60a9ba652588ab26dad3156a070f7fca79ea14ee7b9f84d5506e0fd7cae1c5932f8456793bc5523c2476ba6f0a16f061da0b16ad906925127f3588ddc94"' : 'data-target="#xs-components-links-module-MyCalendarModule-152fe60a9ba652588ab26dad3156a070f7fca79ea14ee7b9f84d5506e0fd7cae1c5932f8456793bc5523c2476ba6f0a16f061da0b16ad906925127f3588ddc94"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MyCalendarModule-152fe60a9ba652588ab26dad3156a070f7fca79ea14ee7b9f84d5506e0fd7cae1c5932f8456793bc5523c2476ba6f0a16f061da0b16ad906925127f3588ddc94"' :
                                            'id="xs-components-links-module-MyCalendarModule-152fe60a9ba652588ab26dad3156a070f7fca79ea14ee7b9f84d5506e0fd7cae1c5932f8456793bc5523c2476ba6f0a16f061da0b16ad906925127f3588ddc94"' }>
                                            <li class="link">
                                                <a href="components/AvailabilityFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AvailabilityFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InterviewStatusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InterviewStatusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SkillsFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SkillsFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewAvailabilityComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewAvailabilityComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/API_CONSTANTS.html" data-type="entity-link" >API_CONSTANTS</a>
                            </li>
                            <li class="link">
                                <a href="classes/APPCONSTANTS.html" data-type="entity-link" >APPCONSTANTS</a>
                            </li>
                            <li class="link">
                                <a href="classes/applicant.html" data-type="entity-link" >applicant</a>
                            </li>
                            <li class="link">
                                <a href="classes/availability.html" data-type="entity-link" >availability</a>
                            </li>
                            <li class="link">
                                <a href="classes/availabilityForInterviews.html" data-type="entity-link" >availabilityForInterviews</a>
                            </li>
                            <li class="link">
                                <a href="classes/availabilityRange.html" data-type="entity-link" >availabilityRange</a>
                            </li>
                            <li class="link">
                                <a href="classes/available.html" data-type="entity-link" >available</a>
                            </li>
                            <li class="link">
                                <a href="classes/CalendarEventDetail.html" data-type="entity-link" >CalendarEventDetail</a>
                            </li>
                            <li class="link">
                                <a href="classes/COLOURS.html" data-type="entity-link" >COLOURS</a>
                            </li>
                            <li class="link">
                                <a href="classes/COMMON_CONSTANTS.html" data-type="entity-link" >COMMON_CONSTANTS</a>
                            </li>
                            <li class="link">
                                <a href="classes/CSS_CONSTANTS.html" data-type="entity-link" >CSS_CONSTANTS</a>
                            </li>
                            <li class="link">
                                <a href="classes/DATA_SOURCE_CONSTANTS.html" data-type="entity-link" >DATA_SOURCE_CONSTANTS</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataSource.html" data-type="entity-link" >DataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/EXPORT.html" data-type="entity-link" >EXPORT</a>
                            </li>
                            <li class="link">
                                <a href="classes/interview.html" data-type="entity-link" >interview</a>
                            </li>
                            <li class="link">
                                <a href="classes/interviewRange.html" data-type="entity-link" >interviewRange</a>
                            </li>
                            <li class="link">
                                <a href="classes/interviewReturn.html" data-type="entity-link" >interviewReturn</a>
                            </li>
                            <li class="link">
                                <a href="classes/LOGIN_CONSTANTS.html" data-type="entity-link" >LOGIN_CONSTANTS</a>
                            </li>
                            <li class="link">
                                <a href="classes/role.html" data-type="entity-link" >role</a>
                            </li>
                            <li class="link">
                                <a href="classes/skillIdOnly.html" data-type="entity-link" >skillIdOnly</a>
                            </li>
                            <li class="link">
                                <a href="classes/skills.html" data-type="entity-link" >skills</a>
                            </li>
                            <li class="link">
                                <a href="classes/SSOCONSTANT.html" data-type="entity-link" >SSOCONSTANT</a>
                            </li>
                            <li class="link">
                                <a href="classes/SSOCONSTANTS.html" data-type="entity-link" >SSOCONSTANTS</a>
                            </li>
                            <li class="link">
                                <a href="classes/statusUpdate.html" data-type="entity-link" >statusUpdate</a>
                            </li>
                            <li class="link">
                                <a href="classes/userData.html" data-type="entity-link" >userData</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BackendService.html" data-type="entity-link" >BackendService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CalendarEventsService.html" data-type="entity-link" >CalendarEventsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataSourceService.html" data-type="entity-link" >DataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModalControllerService.html" data-type="entity-link" >ModalControllerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestCenterService.html" data-type="entity-link" >RequestCenterService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AppInterceptor.html" data-type="entity-link" >AppInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/data.html" data-type="entity-link" >data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBackendService.html" data-type="entity-link" >IBackendService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDataSource.html" data-type="entity-link" >IDataSource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDataSourceService.html" data-type="entity-link" >IDataSourceService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILoginComponent.html" data-type="entity-link" >ILoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISystemUser.html" data-type="entity-link" >ISystemUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});