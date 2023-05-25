/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const defaultAssetExts =
  require('metro-config/src/defaults/defaults').assetExts;

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    // assetExts: [...defaultAssetExts, 'mxl', 'mid', 'xml'],
    assetExts: [
      ...defaultAssetExts,
      'mxl',
      'mid',
      'py',
      'png',
      'jpg',
      'jpeg',
      'gif',
      'bmp',
      'tiff',
      'webp',
      'svg',
      'ttf',
      'otf',
      'woff',
      'woff2',
      'eot',
      'mp3',
      'wav',
      'ogg',
      'mp4',
      'mov',
      'mkv',
      'avi',
      'wmv',
      'pdf',
      'doc',
      'docx',
      'xls',
      'xlsx',
      'ppt',
      'pptx',
      'csv',
      'txt',
      'rtf',
      'json',
      'xml',
      'html',
      'htm',
      'css',
    ],
  },
};
