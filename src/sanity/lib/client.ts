import { createClient } from 'next-sanity'


export const client = createClient({
  projectId: "24q7x02d",
  dataset: "production",
  apiVersion: '2025-01-27',
  token: "skSPQTrwPbg5LeHtHYQ6IxBQxkQkPMhMZa8YdgTk5ysGCM1WUJaUDjDfFMEkhKbyLN8LXqFimrbpa6jI7tAEiG1fPxwYhYIVv2KLFLWDdofb7cwhrkfKvvhypjFjWbYK53az339wOGHXzpCTVre8EMehBWPpNEEnHk8ievsFWv96xVmrkYdB",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
