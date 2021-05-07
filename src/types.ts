import { analyticsreporting_v4 } from 'googleapis';
export type QueryResultHeader = { dimensions: string[], metrics: string[] };
export type QueryResultData = { dimensions?: string[], metrics?: string[] }

export interface SortedQueryResults {
    queryResultHeaders: QueryResultHeader,
    queryResultData: QueryResultData[]
}

export type Schema$Report = analyticsreporting_v4.Schema$Report;
export type Schema$ColumnHeader = analyticsreporting_v4.Schema$ColumnHeader;
export type Schema$MetricHeader = analyticsreporting_v4.Schema$MetricHeader;
export type Schema$ReportData = analyticsreporting_v4.Schema$ReportData;