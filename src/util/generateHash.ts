import Crypto from 'crypto-js'

export function generateXAuth(password: string) {
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '')
  const authString = `${password}_${timestamp}`
  return Crypto.MD5(authString).toString()
}