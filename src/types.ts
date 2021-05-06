export type QueryResultHeader = { dimensions: string[], metrics: string[] };
export type QueryResultData = { [pathPath: string]: string[] }

export interface SortedQueryResults {
    queryResultHeaders: QueryResultHeader,
    queryResultData: QueryResultData
}