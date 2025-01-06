const core = require('@actions/core')
const tc = require('@actions/tool-cache')
const path = require('path')
const { getDownloadObject } = require('./utils')

async function setup() {
  try {
    // Get version
    const version = core.getInput('version')

    // Download tarball
    const download = getDownloadObject(version)
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