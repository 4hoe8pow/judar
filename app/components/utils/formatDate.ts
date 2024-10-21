export const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'Asia/Tokyo',
	} as const
	return date.toLocaleDateString('en-US', options)
}
