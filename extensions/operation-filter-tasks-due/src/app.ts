import { defineOperationApp } from '@directus/extensions-sdk';

export default defineOperationApp({
	id: 'filter-tasks-due',
	name: 'Filter Tasks Due',
	icon: 'box',
	description: 'Filters list of tasks due to run by cron schedule and last run time',
	overview: ({ sources }) => [
		{
			label: 'Sources',
			text: sources,
		},
	],
	options: [
		{
			field: 'sources',
			name: 'Sources',
			type: 'string',
			meta: {
				width: 'full',
				interface: 'list',
			},
		},
	],
});
