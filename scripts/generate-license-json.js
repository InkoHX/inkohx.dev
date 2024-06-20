import licenseChecker from 'license-checker'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const projectRoot = new URL('..', import.meta.url)
const analyzeProjectLicense = promisify(licenseChecker.init)
const licenses = await analyzeProjectLicense({
  start: fileURLToPath(projectRoot),
  production: true,
  json: true,
})

{
  const data = Object.create(null)
  const removeVersion = str => {
    const i = str.lastIndexOf('@')

    return i === -1 ? str : str.substring(0, i)
  }

  for (const [key, info] of Object.entries(licenses)) {
    const licenseBody = info.licenseFile
      ? await readFile(info.licenseFile, 'utf8')
      : null

    data[removeVersion(key)] = {
      licenses: info.licenses ?? null,
      repository: info.repository ?? null,
      publisher: info.publisher ?? null,
      licenseBody,
    }
  }

  console.debug('Collected', Object.keys(data))

  const outDir = new URL('./src/generated/', projectRoot)

  await mkdir(outDir, { recursive: true })
  await writeFile(
    new URL('./license.json', outDir),
    JSON.stringify(data, null, 2)
  )
}
