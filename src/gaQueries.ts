require('dotenv').config();
import { analyticsreporting_v4 } from 'googleapis';
import GAReportingv4 from './gaReportingV4';
import config from './config';

type Schema$Report = analyticsreporting_v4.Schema$Report;

const view_id = config.view_id;

async function getPopularPagesLast30days(): Promise<Schema$Report[]> {
    const result = await GAReportingv4.batchGet(
        {
            viewId: view_id,
            dateRanges: [{
                startDate: '30daysAgo',
                endDate: 'yesterday'
            }],
            dimensions: [{ name: 'ga:pagePath' }],
            metrics: [
                { expression: 'ga:users' },
                { expression: 'ga:sessions' },
                { expression: 'ga:pageviews' },
                { expression: 'ga:uniquePageviews' },
                { expression: 'ga:avgTimeOnPage' }
            ],
            orderBys: [{ fieldName: 'ga:users', sortOrder: 'DESCENDING' }]
        }
    );
    return result.data.reports ? result.data.reports : [];
}

async function getPopularPagesBreakdownBySourceLast30days(): Promise<Schema$Report[]> {
    const result = await GAReportingv4.batchGet(
        {
            viewId: view_id,
            dateRanges: [{
                startDate: '30daysAgo',
                endDate: 'yesterday'
            }],
            dimensions: [{ name: 'ga:sourceMedium' }, { name: 'ga:pagePath' }],
            metrics: [
                { expression: 'ga:users' },
                { expression: 'ga:sessions' },
                { expression: 'ga:pageviews' },
                { expression: 'ga:uniquePageviews' },
                { expression: 'ga:avgTimeOnPage' }
            ],
            orderBys: [{ fieldName: 'ga:users', sortOrder: 'DESCENDING' }]
        }
    );
    return result.data.reports ? result.data.reports : [];
}

async function getPopularSearchesLast30Days(): Promise<Schema$Report[]> {
    const result = await GAReportingv4.batchGet(
        {
            viewId: view_id,
            dateRanges: [{
                startDate: '30daysAgo',
                endDate: 'yesterday'
            }],
            dimensions: [{ name: 'ga:searchKeyword' }],
            metrics: [
                { expression: 'ga:searchResultViews' },
                { expression: 'ga:searchUniques' },
                { expression: 'ga:avgSearchDepth' }
            ],
            orderBys: [{ fieldName: 'ga:searchResultViews', sortOrder: 'DESCENDING' }]
        }
    );
    return result.data.reports ? result.data.reports : [];
}

export default {
    getPopularPagesLast30days,
    getPopularPagesBreakdownBySourceLast30days,
    getPopularSearchesLast30Days
}