export const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	const options = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: 'Asia/Tokyo',
	} as const
	const formatted = date.toLocaleDateString('en-US', options)
	const day = date.getDate()
	const daySuffix = (n: number) =>
		n > 3 && n < 21 ? 'th' : ['st', 'nd', 'rd', 'th'][Math.min(n % 10, 3)]
	return formatted.replace(/\d+/, `${day}${daySuffix(day)}`)
}
