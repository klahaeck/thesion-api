import { defineOperationApi } from '@directus/extensions-sdk';
import cronParser from 'cron-parser';
import moment from 'moment';

type Options = {
	sources: any[];
};

export default defineOperationApi<Options>({
	id: 'filter-tasks-due',
	handler: ({ sources }) => {
		const now = moment();

		const dueToRun = sources.filter(source => {
			try {
				const lastCrawled = source.last_crawled ? source.last_crawled : new Date(0);
				const interval = cronParser.parse(source.crawl_frequency, { currentDate: lastCrawled });
				const nextRun = interval.next();
	
				return now.isSameOrAfter(nextRun.toDate());
			} catch (error) {
				console.error(`Error evaluating cron for task ${source.id}:`, error);
				return false;
			}
		});
		return dueToRun;
	},
});
