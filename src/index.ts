require('dotenv').config();
import GAReportGenerator from './gaReportGenerator';

const segment_id = 'sessions::condition::ga:hostname=@www.tech.gov.sg';

const start = async (segmentId?: string) => {
    await GAReportGenerator.generatePopularPagesReport(segmentId);
    await GAReportGenerator.generatePopularPagesBySourceReport(segmentId);
    await GAReportGenerator.generatePopularSearchesReport(segmentId);
}

start();