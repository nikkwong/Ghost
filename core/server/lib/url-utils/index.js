const UrlUtils = require('@tryghost/url-utils');
const config = require('../../config');
const cards = require('../mobiledoc/cards');
const BF_CONFIG = require('../../../../bf-custom/config')


const urlUtils = new UrlUtils({
    url: config.get('url'),
    adminUrl: config.get('admin:url'),
    apiVersions: config.get('api:versions'),
    defaultApiVersion: 'v3',
    slugs: config.get('slugs').protected,
    redirectCacheMaxAge: config.get('caching:301:maxAge'),
    baseApiPath: `/${BF_CONFIG.adminPath}/api`,
    cardTransformers: cards
});

urlUtils._urlFor = urlUtils.urlFor

// @bf-override
urlUtils.urlFor = function() {

    const retVal = urlUtils._urlFor(...arguments)
    const regex = /(ghost(?!\.))/g
    
    return arguments[0] == 'admin' ?  retVal.replace(regex, BF_CONFIG.adminPath) : retVal
    return retVal

}

module.exports = urlUtils;
 