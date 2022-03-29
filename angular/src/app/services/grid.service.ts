import { Injectable } from '@angular/core';
import { ColDef, ColumnApi, GridApi } from 'ag-grid-community';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { EXPORT } from '../constants/app.constant';

declare const alasql: any;

export interface IGridService {
    updateGridApis(gridName: string, api: GridApi, columnApi: ColumnApi): void;
    updateGridMasterData(gridName: string, data: Array<any>): void;
    getGridApis(gridName: string): [GridApi, ColumnApi];
    updateGridRowData(gridName: string, rows: Array<any>): void
}

@Injectable({
    providedIn: 'root'
})
export class GridService {
    private _gridApis: any = {};
    private _gridData: any = {};

    constructor() {
        alasql.fn.AGE = function(details: any) {
            if (details && details.Age) {
                return details.Age;
            }
            return null;
        };
        alasql.fn.EXPERIENCE = function(details: any) {
            if (details && details.experience) {
                const years = Math.floor(details.experience / 12);
                const months = details.experience - (12 * years);
                return years + 'Y  ' + months + 'M';
            }
            return '';
        }
        alasql.fn.SKILL = function(skills: Array<string>) {
            if (skills) {
                return skills.join(',');
            }
            return '';
        }
    }
    updateGridApis(gridName: string, api: GridApi, columnApi: ColumnApi): void {
        if (gridName) {
            this._gridApis[gridName] = [api, columnApi];
        }
    }
    updateGridMasterData(gridName: string, data: Array<any>): void {
        if (gridName) {
            this._gridData[gridName] = data;
        }
    }
    getGridMasterData(gridName: string): Array<any> {
        return this._gridData[gridName];
    }
    getGridApis(gridName: string): [GridApi, ColumnApi] {
        return this._gridApis[gridName];
    }
    getDisplayedColumns(gridName: string): Array<string> {
        const apis: [GridApi, ColumnApi] = this.getGridApis(gridName);
        const displayedColumns: Array<any> = [];
        if (apis && apis[0]) {
            const colDef = apis[0].getColumnDefs();
            colDef?.forEach((def: ColDef) => {
                displayedColumns.push(def.field);
            })
        }
        return displayedColumns;
    }
    updateGridRowData(gridName: string, rows: Array<any>): void {
        if (gridName) {
            const apis: [GridApi, ColumnApi] = this.getGridApis(gridName);
            if (rows && rows.length > 0) {
                if (apis && apis[0]) {
                    apis[0].setRowData([]);
                    let count = 0;
                    rows.forEach((row: any) => {
                        setTimeout(() => {
                            const newItem = { ...row };
                            if (apis[0]) {
                                apis[0].applyTransactionAsync({ add: [newItem] }, () => {
                                    count++;
                                    if (count === rows.length) {
                                        // this.gridOptions.api.forEachNode((node, index)=> {
                                        //     if (index === 0) {
                                        //         console.log('Need to set the selection');
                                        //         node.setSelected(true);
                                        //     }
                                        // })
                                    }
                                })
                            }
                        }, 0)
                    })
                }
            }
        }
    }
    applyFilterInColumn(gridName: string, field: string, filterValue: string): void {
        const query = "SELECT * FROM ? WHERE " + field + "='" + filterValue +"'";
        const masterData = this.getGridMasterData(gridName);
        const apis: [GridApi, ColumnApi] = this.getGridApis(gridName);
        if (apis && apis[0]) {
            if (filterValue === 'All') {
                this.updateGridRowData(gridName, masterData);
                return;
            }
            const result = alasql(query, [masterData]);
            if (result.length === 0) {
                apis[0].setRowData([]);
            } else {
                this.updateGridRowData(gridName, result);
            }
        }
    }
    applyQuickFilter(gridName: string, filterValue: string): number {
        const masterData = this.getGridMasterData(gridName);
        if (filterValue === "") {
            this.updateGridRowData(gridName, masterData);
            return masterData.length;
        }
        let query = "SELECT * FROM ? WHERE ";
        const arr: any = [];
        const displayedColumns = this.getDisplayedColumns(gridName);
        displayedColumns.forEach((col: string) => {
            arr.push(col + " LIKE '%" + filterValue + "%'");
        })
        query += arr.join(' OR ');
        const result = alasql(query, [masterData]);
        if (result.length > 0) {
            this.updateGridRowData(gridName, result);
            return result.length;
        } else {
            const apis: [GridApi, ColumnApi] = this.getGridApis(gridName);
            if (apis && apis[0]) {
                apis[0].setRowData([]);
            }
        }
        return 0;
    }
    // [Default export to csv free]
    exportToCSV(gridName: string): void {
        const apis: [GridApi, ColumnApi] = this.getGridApis(gridName);
        if (apis && apis[0]) {
            apis[0].exportDataAsCsv();
        }
    }
    exportToExcel(gridName: string): void {
        const apis: [GridApi, ColumnApi] = this.getGridApis(gridName);
        let gridData: Array<any> = [];
        apis[0].forEachNode((node: any)=> {
            gridData.push(node.data);
        })
        if (gridName === 'candidateGrid') {
            const query = `SELECT candidateName as Name,candidateEmail as Email,EXPERIENCE(candidateDetails) as Experience,
                AGE(candidateDetails) as Aging,SKILL(skill) as Skills,location as Location,positionId as "Position ID",account as Account,
                department as Department,joinDate as "Joined Date",mobile as Mobile,offerDate as "Offer Date",
                accoliteOnboardingStatus as "Accolite Onboarding Status",clientInteractionStatus as "Client Interaction Status",
                clientOnboardingStatus as "Client Onboarding Status" FROM ?`;
            const result = alasql(query, [gridData]);
            gridData = [...result];
        }
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(gridData);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, EXPORT.EXCEL_FILE_NAME);
    }
    saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXPORT.EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + EXPORT.EXCEL_EXTENSION);
    }
}
