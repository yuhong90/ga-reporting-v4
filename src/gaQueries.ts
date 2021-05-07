import { Schema$Report } from './types';
import GAReportingv4 from './gaReportingV4';
import config from './config';

const view_id = config.view_id;
const segment_dimension = { name: 'ga:segment' };

function getDefaultQueryOptions(segmentId?: string) {
    const dimensions: any = [];
    const segments: any = [];

    if (segmentId) {
        dimensions.push(segment_dimension);
        segments.push({ segmentId: segmentId });
    }
    return {
        viewId: view_id,
        dateRanges: [{
            startDate: '30daysAgo',
            endDate: 'yesterday'
        }],
        dimensions: dimensions,
        segments: segments
    }
}

async function getPopularPagesLast30days(segmentId?: string): Promise<Schema$Report[]> {
    let base_options = getDefaultQueryOptions(segmentId);
    let options = {
        ...base_options,
        dimensions: [
            ...base_options.dimensions,
            { name: 'ga:pagePath' }
        ],
        metrics: [
            { expression: 'ga:users' },
            { expression: 'ga:pageviews' },
            { expression: 'ga:uniquePageviews' },
            { expression: 'ga:avgTimeOnPage' },
            { expression: 'ga:bounceRate' }
        ],
        orderBys: [{ fieldName: 'ga:uniquePageviews', sortOrder: 'DESCENDING' }]
    };

    const result = await GAReportingv4.batchGet(options);
    return result.data.reports ? result.data.reports : [];
}

async function getPopularPagesBreakdownBySourceLast30days(segmentId?: string): Promise<Schema$Report[]> {
    let base_options = getDefaultQueryOptions(segmentId);
    let options = {
        ...base_options,
        dimensions: [
            ...base_options.dimensions,
            { name: 'ga:sourceMedium' },
            { name: 'ga:pagePath' }
        ],
        metrics: [
            { expression: 'ga:users' },
            { expression: 'ga:pageviews' },
            { expression: 'ga:uniquePageviews' },
            { expression: 'ga:avgTimeOnPage' },
            { expression: 'ga:bounceRate' }
        ],
        orderBys: [{ fieldName: 'ga:uniquePageviews', sortOrder: 'DESCENDING' }]
    };

    const result = await GAReportingv4.batchGet(options);
    return result.data.reports ? result.data.reports : [];
}

async function getPopularSearchesLast30Days(segmentId?: string): Promise<Schema$Report[]> {
    let base_options = getDefaultQueryOptions(segmentId);
    let options = {
        ...base_options,
        dimensions: [
            ...base_options.dimensions,
            { name: 'ga:searchKeyword' }
        ],
        metrics: [
            { expression: 'ga:searchUniques' },
            { expression: 'ga:searchResultViews' },
            { expression: 'ga:avgSearchResultViews' },
            { expression: 'ga:avgSearchDepth' }
        ],
        segments: [{ segmentId: segmentId }],
        orderBys: [{ fieldName: 'ga:searchUniques', sortOrder: 'DESCENDING' }]
    };
    const result = await GAReportingv4.batchGet(options);
    return result.data.reports ? result.data.reports : [];
}

export default {
    getPopularPagesLast30days,
    getPopularPagesBreakdownBySourceLast30days,
    getPopularSearchesLast30Days
}