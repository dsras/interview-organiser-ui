import { ColDef, ColumnApi, GridApi } from "ag-grid-community";

export interface IDefaultColDef {
    sortable?: boolean;
    resizable?: boolean;
    suppressMovable?: boolean;
    enableCellTextSelection: boolean
}

export interface IFrameworkComponents {
    nameRenderer?: any;
    editRenderer?: any;
    statusRenderer?: any;
    mappedCandidateEditRenderer?: any;
    skillRenderer?: any;
    agingRenderer?: any;
}

export interface IGridOptions {
    api?: GridApi;
    columnApi?: ColumnApi;
    columnDefs?: Array<ColDef>;
    rowData?: Array<any>;
    headerHeight?: number;
    rowHeight?: number;
    rowSelection?: string;
    defaultColDef?: IDefaultColDef;
    frameworkComponents?: IFrameworkComponents;
    suppressLoadingOverlay?: boolean
}