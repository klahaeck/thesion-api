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
				const interval = cronParser.parse(source.crawl_frequency, { currentDate: source.last_crawled });
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
