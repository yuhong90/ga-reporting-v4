import GAReportResultFormatter from './gaReportResultFormatter';
import { Schema$Report } from './types';
import FileUtils from './utils/fileUtils';
import GaQueries from './gaQueries';

async function persistResultsToCSV(output: string, outputPath: string) {
    try {
        await FileUtils.writeFile(outputPath, output);
    } catch (err) {
        console.log('Write file error', err);
    }
}

async function generateReport(reports: Schema$Report[], outputPath: string) {
    let reportsString = GAReportResultFormatter.retrieveReportDataInCSVString(reports);
    // GAReportResultFormatter.printResults(reports);
    await persistResultsToCSV(reportsString[0], outputPath);
    console.log('Report Generated', outputPath);
    return reportsString;
}

export default class GAReportGenerator {

    static async generatePopularPagesReport(segmentId?: string) {
        let popularPageResult = await GaQueries.getPopularPagesLast30days(segmentId);
        generateReport(popularPageResult, './output/popular_pages.csv');
        return popularPageResult;
    }

    static async generatePopularPagesBySourceReport(segmentId?: string) {
        let popularPageResult = await GaQueries.getPopularPagesBreakdownBySourceLast30days(segmentId);
        generateReport(popularPageResult, './output/popular_pages_by_source.csv');
        return popularPageResult;
    }

    static async generatePopularSearchesReport(segmentId?: string) {
        let popularSearchesResult = await GaQueries.getPopularSearchesLast30Days(segmentId);
        generateReport(popularSearchesResult, './output/popular_searches.csv');
        return popularSearchesResult;
    }
}