import { randomBytes, pbkdf2 } from 'node:crypto'

export const hash = (value: string): Promise<{ hash: string; salt: string }> => {
	const salt = randomBytes(16).toString('hex')

	return new Promise((resolve, reject) => {
		pbkdf2(value, salt, 1000, 64, 'sha512', (error, result) => {
			if (error) {
				reject(error)
			}

			const hash = result.toString('hex')
			resolve({ salt, hash })
		})
	})
}

export const compareHash = (value: string, hash: string, salt: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		pbkdf2(value, salt, 1000, 64, 'sha512', (error, result) => {
			if (error) {
				reject(error)
			}

			const valueHash = result.toString('hex')
			resolve(hash === valueHash)
		})
	})
}
