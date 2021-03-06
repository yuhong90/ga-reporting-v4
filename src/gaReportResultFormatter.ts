import { Schema$Report, Schema$ColumnHeader, Schema$ReportData } from './types';
import { SortedQueryResults, QueryResultHeader, QueryResultData } from './types';


export default class GAReportResultFormatter {

    static extractMetricHeaders(columnHeader: Schema$ColumnHeader | undefined): QueryResultHeader {
        let headers: { dimensions: string[], metrics: string[] } = { dimensions: [], metrics: [] };

        if (!columnHeader) {
            return headers;
        }

        if (columnHeader.dimensions) {
            columnHeader.dimensions.forEach(dimensionHeader => {
                return headers.dimensions.push(dimensionHeader);
            });
        }

        if (columnHeader.metricHeader && columnHeader.metricHeader.metricHeaderEntries) {
            columnHeader.metricHeader.metricHeaderEntries.forEach(metricHeader => {
                if (metricHeader && metricHeader.name) {
                    return headers.metrics.push(metricHeader.name);
                }
            });

        }
        return headers;
    }

    static extractMetricData(metricData: Schema$ReportData | undefined): QueryResultData[] {
        if (!metricData || !metricData.rows) {
            return [];
        }

        let data: QueryResultData[] = [];
        metricData.rows.forEach(row => {
            // console.log(row);
            if (!row.dimensions) {
                return;
            }
            let metricValueArr: string[] = [];
            if (row.metrics && row.metrics[0]) {
                metricValueArr = row.metrics[0].values ? row.metrics[0].values : [];
            }
            let record: QueryResultData = { dimensions: row.dimensions, metrics: metricValueArr };
            data.push(record);
        });
        return data;
    }

    static printResults(reports: Schema$Report[] | undefined) {
        if (!reports) {
            return;
        }

        reports.forEach(report => {
            let pageMetrics: SortedQueryResults = { queryResultHeaders: { dimensions: [], metrics: [] }, queryResultData: [] };

            pageMetrics.queryResultHeaders = GAReportResultFormatter.extractMetricHeaders(report.columnHeader);
            pageMetrics.queryResultData = GAReportResultFormatter.extractMetricData(report.data);
            console.log(pageMetrics.queryResultHeaders);
            console.log(pageMetrics.queryResultData);
        });
    }


    static extractReportDataForCSV(metricData: Schema$ReportData | undefined): string {
        if (!metricData || !metricData.rows) {
            return '';
        }

        let outputString = '';
        metricData.rows.forEach(row => {
            let rowOutput: string[] = [];
            let metricValueArr: string[] = [];

            if (row.metrics) {
                row.metrics.forEach(metric => {
                    if (metric.values) {
                        metricValueArr = metricValueArr.concat(metric.values);
                    }
                });
            }

            if (row.dimensions) {
                rowOutput = [...row.dimensions, ...metricValueArr];
            }
            outputString += rowOutput.join(',') + '\n';
        });
        return outputString;
    }

    static retrieveReportDataInCSVString(reports: Schema$Report[] | undefined): string[] {
        if (!reports) {
            return [];
        }

        let reportOutputArr: string[] = [];
        reports.forEach(report => {
            let queryResultHeaders = GAReportResultFormatter.extractMetricHeaders(report.columnHeader);
            const headers = [...queryResultHeaders.dimensions, ...queryResultHeaders.metrics];
            const headerString = headers.join(', ');
            const dataString = GAReportResultFormatter.extractReportDataForCSV(report.data);
            const outputString = headerString + '\n' + dataString;

            reportOutputArr.push(outputString);
        });
        return reportOutputArr;
    }
}