const howLongAgo = (date: number) => {
  const timeAgo = new Date().getTime() - date
  const units = [
    { label: 'year', duration: 1000 * 60 * 60 * 24 * 365 },
    { label: 'month', duration: 1000 * 60 * 60 * 24 * 30 },
    { label: 'week', duration: 1000 * 60 * 60 * 24 * 7 },
    { label: 'day', duration: 1000 * 60 * 60 * 24 },
    { label: 'hour', duration: 1000 * 60 * 60 },
    { label: 'minute', duration: 1000 * 60 },
    { label: 'second', duration: 1000 }
  ]

  for (let i = 0; i < units.length; i++) {
    const { label, duration } = units[i]
    const timeAgoInUnit = Math.floor(timeAgo / duration)
    if (timeAgoInUnit > 0) {
      const plural = timeAgoInUnit === 1 ? '' : 's'
      return `${timeAgoInUnit} ${label}${plural} ago`
    }
  }

  return 'just now'
}

export default howLongAgo
