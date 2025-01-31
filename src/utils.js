const os = require('os')

function mapArch (arch) {
  const mappings = {
    x64: 'x86_64',
    arm64: 'aarch64'
  }

  return mappings[arch] || arch
}

function mapPlatform (arch) {
  const mappings = {
    linux: 'unknown-linux-gnu',
    darwin: 'apple-darwin',
  }

  return mappings[arch] || arch
}

function getDownloadObject (version, platform) {
  const arch = mapArch(os.arch())
  const filename = `hnc-v${version}-${arch}-${platform}.tar.gz`
  const url = `https://github.com/cakevm/huff-neo/releases/download/v${version}/${filename}`

  return {
    url,
    binPath: '.'
  }
}

module.exports = {
  getDownloadObject
}