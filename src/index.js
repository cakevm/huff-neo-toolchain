const core = require('@actions/core')
const tc = require('@actions/tool-cache')
const path = require('path')
const utils = require('./utils')


async function setup() {
  try {
    // Read version number from input. Allowed: 'latest' or 'vX.Y.Z'
    let version = core.getInput('version')

    if(version === 'latest' || version === '') {
        core.info('Fetching latest version of neo-huff')
        // Fetch latest version from github.com/cakevm/huff-neo/releases/latest
        const latestReleaseUrl = 'https://api.github.com/repos/cakevm/huff-neo/releases/latest'
        const response = await fetch(latestReleaseUrl)
        const data = await response.json()
        version = data.tag_name.substring(1) // Remove 'v' from vX.Y.Z
    }

    // Read platform from input. E.g. 'unknown-linux-gnu'
    let platform = core.getInput('platform')
    if(platform === '') {
      platform = utils.getPlatform()
    }

    // Download tarball
    const download = utils.getDownloadObject(version, platform)
    core.info(`Downloading neo-huff '${version}' from: ${download.url}`);
    const pathToTarBall = await tc.downloadTool(download.url)

    // Extract the tarball onto host runner
    const extract = download.url.endsWith('.zip') ? tc.extractZip : tc.extractTar
    const pathToCLI = await extract(pathToTarBall)

    // Expose the tool
    core.addPath(path.join(pathToCLI, download.binPath))
  } catch (e) {
    core.setFailed(e)
  }
}

module.exports = setup

if (require.main === module) {
  setup()
}