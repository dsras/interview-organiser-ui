import { BehaviorSubject } from "rxjs";

export interface IDataSource {
    route: any;
    metadata: any;
    users: any;
    allPositions: any;
    allCandidates: any;
    selectedPosition: any;
    addPosition: any;
    updateCandidate: any;
    loginType: any;
    grid_quick_filter: any;
    grid_filter: any;
    row_count: any;
    updateMappedCandidates: any;
}

export class DataSource implements IDataSource {
    route: any = null;
    metadata: any = null;
    users: any = null;
    allPositions: any = null;
    allCandidates: any = null;
    addPosition: any = null;
    updateCandidate: any = null;
    selectedPosition: any = null;
    loginType: any = null;
    grid_quick_filter: any = null;
    grid_filter: any = null;
    row_count: any = null;
    updateMappedCandidates: any = null;
    constructor() {
        this.route = new BehaviorSubject(null);
        this.metadata = new BehaviorSubject(null);
        this.users = new BehaviorSubject(null);
        this.allPositions = new BehaviorSubject(null);
        this.allCandidates = new BehaviorSubject(null);
        this.selectedPosition = new BehaviorSubject(null);
        this.addPosition = new BehaviorSubject(null);
        this.updateCandidate = new BehaviorSubject(null);
        this.loginType = new BehaviorSubject(null);
        this.grid_quick_filter = new BehaviorSubject(null);
        this.grid_filter = new BehaviorSubject(null);
        this.row_count = new BehaviorSubject(null);
        this.updateMappedCandidates = new BehaviorSubject(null);
    }
}