// Used for validation in all other pages
export default async function validateSessionStatus() {
	const response = await fetch(`./api/isReactAuthPrivateRoute`)
	const json = await response.json()
	if (json.hasSession) {
		return { hasSession: true }
	} else {
		await fetch(`./api/logout`)
		window.location.reload()
	}
}
