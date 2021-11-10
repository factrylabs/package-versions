function getVersions (lockFile, type = 'dependencies') {
  const versions = {}
  const [pkgs] = Object.values(lockFile.packages)
  const dependencies = Object.keys(pkgs[type] || {})

  for (const dependency of dependencies) {
    const nodeModule = `node_modules/${dependency}`
    versions[dependency] = lockFile.packages[nodeModule].version
  }

  return versions
}

module.exports = getVersions
