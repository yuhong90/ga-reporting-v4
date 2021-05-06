
require('dotenv').config();
import GAReportResultFormatter from './gaReportResultFormatter';
import config from './config';
import FileUtils from './utils/fileUtils';
import GaQueries from './gaQueries';

const view_id = config.view_id;

async function persistResultsToCSV(output: string, outputPath: string) {
    try {
        await FileUtils.writeFile(outputPath, output);
    } catch (err) {
        console.log('Write file error', err);
    }
}

export class UsageReportGenerator {

    static async start() {
        await UsageReportGenerator.generatePopularPagesReport();
        await UsageReportGenerator.generatePopularPagesBySourceReport();
    }

    static async generatePopularPagesReport() {
        let popularPageResult = await GaQueries.getPopularPagesLast30days();
        let reportsString = GAReportResultFormatter.retrieveReportDataInCSVString(popularPageResult);
        GAReportResultFormatter.printResults(popularPageResult);
        persistResultsToCSV(reportsString[0], './output/popular_pages.csv');
        return popularPageResult;
    }

    static async generatePopularPagesBySourceReport() {
        let popularPageResult = await GaQueries.getPopularPagesBreakdownBySourceLast30days();
        let reportsString = GAReportResultFormatter.retrieveReportDataInCSVString(popularPageResult);
        GAReportResultFormatter.printResults(popularPageResult);
        persistResultsToCSV(reportsString[0], './output/popular_pages_by_source.csv');
        return popularPageResult;
    }
}

UsageReportGenerator.start();