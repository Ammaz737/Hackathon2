export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-27'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
 "24q7x02d",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skSPQTrwPbg5LeHtHYQ6IxBQxkQkPMhMZa8YdgTk5ysGCM1WUJaUDjDfFMEkhKbyLN8LXqFimrbpa6jI7tAEiG1fPxwYhYIVv2KLFLWDdofb7cwhrkfKvvhypjFjWbYK53az339wOGHXzpCTVre8EMehBWPpNEEnHk8ievsFWv96xVmrkYdB",
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
