import { randomBytes, pbkdf2Sync } from 'node:crypto'

export const hash = (value: string) => {
	const salt = randomBytes(16).toString('hex')
	const hash = pbkdf2Sync(value, salt, 1000, 64, 'sha512').toString('hex')

	return { salt, hash }
}

export const compareWithHash = (value: string, hash: string, salt: string) => {
	const valueHash = pbkdf2Sync(value, salt, 1000, 64, 'sha512').toString('hex')
	return hash === valueHash
}
