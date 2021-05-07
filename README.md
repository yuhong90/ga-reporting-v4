# GAReportingV4 - Queries Samples
This repo serves as sample to use [GA Reporting APIs v4](https://developers.google.com/analytics/devguides/reporting/core/v4) to query common basic analytics use cases on reporting website usage. Queried results are outputed as CSV files.


## Examples of queries used:
- Retrieves most visited pages for past 30 days
- Retrieves most visited pages, breakdown by source for past 30 days
- Retrieves most popular searched terms within site for past 30 days (WIP)
- Retrieves most frequently referred pages and sources for past 30 days (WIP)


## Setup Required for running as service application
- [Enable Analytics Reporting API v4](https://developers.google.com/analytics/devguides/reporting/core/v4/quickstart/service-py#1_enable_the_api) on your Google API Console
- Create an service account and generate your service accounts keys
- [Add service account's email to GA account](https://developers.google.com/analytics/devguides/reporting/core/v4/quickstart/service-py#add_service_account_to_the_google_analytics_account).
Under `GA's Settings > Account User Management > Property User Management > `
- Add service account keys and update `.env` files with keypath
- Find your GA property's `ViewId` from  `GA's Settings > Account User Management > View Settings` and update `.env`'s GA_VIEW_ID (`ga:<viewId>`)


## Running the script
- `npm install` - Restore dependencies
- `npm run setup` - Setup dir structure
- `npm run start` - Run reporting script and write results as CSV to `./output` dir
