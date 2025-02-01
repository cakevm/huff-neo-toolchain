const os = require('os')

function getArch() {
  let arch = os.arch();
  const mappings = {
    x64: 'x86_64',
    arm64: 'aarch64'
  }

  return mappings[arch] || arch
}

function getPlatform() {
  const platform = os.platform();
  const mappings = {
    linux: 'unknown-linux-gnu',
    darwin: 'apple-darwin',
  }

  return mappings[platform] || platform
}

function getDownloadObject(version, platform) {
  const arch = getArch();
  const filename = `hnc-v${version}-${arch}-${platform}.tar.gz`;
  const url = `https://github.com/cakevm/huff-neo/releases/download/v${version}/${filename}`;

  return {
    url,
    binPath: '.'
  }
}

module.exports = {
  getDownloadObject,
  getPlatform
}