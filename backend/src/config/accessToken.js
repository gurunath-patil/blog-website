const jwt = require("jsonwebtoken")
const secret = "djhsojnwsgnownogslkjg45wg5gg"

async function getNewToken(tokenPayload) {
	try {
		const newToken = await jwt.sign(tokenPayload, secret)
		return newToken
	} catch (err) {
		console.log("inside create token:", err)
		return 400
	}
}

async function validateToken(token) {
	try {
	   const tokenStatus = await jwt.verify(token, secret, (err, payload) => {
			if (err) return 401

			return 200
		})
        return tokenStatus
	} catch (err) {
		console.log("inside token validate:", err)
		return 400
	}
}

module.exports = { getNewToken, validateToken }
