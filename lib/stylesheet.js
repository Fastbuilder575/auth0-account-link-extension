const version = require('../package.json').version;
const path = require('path');

const CDN_BASE = `https://cdn.auth0.com/extensions/auth0-account-link-extension/${version}`;
const LOCAL_BASE = `/css`;

const getBase = useCDN => useCDN ? CDN_BASE : LOCAL_BASE;

const generateHelper = (useCDN = false) => {
  const extension = useCDN ? 'min.css' : 'css';
  const link = (filename) => {
    const name = (filename || '').trim();

    return name ? path.join(getBase(useCDN), `${name}.${extension}`) : '';
  };

  const tag = (filename) => {
    const href = link(filename);

    return href ? `<link rel="stylesheet" href="${href}">` : '';
  };

  return { link, tag };
};

export default generateHelper;