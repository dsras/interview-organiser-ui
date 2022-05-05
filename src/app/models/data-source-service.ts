export interface IDataSourceService {
    createDataSource(): void;
    getDataSource(source: string): void;
    updateDataSource(source: string, value: any): void
}