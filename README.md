# Package versions
## Usage
```javascript
import getVersions from '@factry/package-versions'
import packageLock from './package-lock.json'

getVersions(packageLock, )
getVersions(packageLock, 'dependencies')

getVersions(packageLock, 'peerDependencies')

getVersions(packageLock, 'devDependencies')
```
