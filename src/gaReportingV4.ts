import { google } from 'googleapis';
import { analyticsreporting_v4, Common } from 'googleapis';
import config from './config';

const reportingV4 = google.analyticsreporting('v4');

const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];
const KEY_PATH = config.svc_account_key_path;

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: scopes,
});

type Schema$ReportRequest = analyticsreporting_v4.Schema$ReportRequest;
type Schema$GetReportsResponse = analyticsreporting_v4.Schema$GetReportsResponse;

export default class GAReportingv4 {

    static async batchGet(reportRequest: Schema$ReportRequest): Promise<Common.GaxiosPromise<Schema$GetReportsResponse>> {
        const result = await reportingV4.reports.batchGet({
            auth: auth,
            requestBody: {
                reportRequests: [reportRequest]
            }
        });
        return result;
    }

}