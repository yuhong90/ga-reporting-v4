# GAReportingV4 - Common Queries
This repo uses [GA Reporting APIs v4](https://developers.google.com/analytics/devguides/reporting/core/v4) to query common basic analytics use cases on reporting website usage. Queried results are outputed as CSV files.


## Examples of queries:
- Retrieves most visited pages for the week in past 30 days
- Retrieves most visited pages for the week in past 30 days
- Retrieves most searched terms within site (WIP)
- Retrieves most frequent referred search terms (WIP)


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
- `npm run start` - Run script and write results as CSV to `./output` dir
