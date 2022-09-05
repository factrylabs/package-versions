const yml = require('js-yaml')
const fs = require('fs')
const path = require('path')

const dependencyType = 'dependencies'

function getVersions (directory, packageManager) {
  let versions = { version: '', dependencies: {} }
  if (packageManager === 'npm') versions = getNpmVersions(directory)
  if (packageManager === 'pnpm') versions = getPnpmVersions(directory)
  return versions
}

function getPnpmVersions (directory) {
  let lockFile = fs.readFileSync(path.join(directory, 'pnpm-lock.yaml'), 'utf8')
  const yaml = yml.load(lockFile)

  let packageFile = fs.readFileSync(path.join(directory, 'package.json'), 'utf8')
  packageFile = JSON.parse(packageFile)

  const versions = { version: '', dependencies: {} }
  versions.version = packageFile.version
  const dependencies = yaml[dependencyType] || {}

  for (const dependency of Object.keys(dependencies)) {
    versions.dependencies[dependency] = dependencies[dependency].replace(/_[0-9a-z]+$/, '')
  }

  return versions
}

function getNpmVersions (directory) {
  let lockFile = fs.readFileSync(path.join(directory, 'package-lock.json'), 'utf8')
  lockFile = JSON.parse(lockFile)

  const versions = { version: '', dependencies: {} }
  versions.version = lockFile.version

  const [pkgs] = Object.values(lockFile.packages)
  const dependencies = Object.keys(pkgs[dependencyType] || {})

  for (const dependency of dependencies) {
    const nodeModule = `node_modules/${dependency}`
    versions.dependencies[dependency] = lockFile.packages[nodeModule].version
  }

  return versions
}

module.exports = getVersions
