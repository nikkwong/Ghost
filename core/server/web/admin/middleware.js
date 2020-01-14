const urlUtils = require('../../lib/url-utils');
const BF_CONFIG = require('../../../../bf-custom/config')

function redirectAdminUrls(req, res, next) {
    console.log('###')
    // ## TODO 
    debugger
    const subdir = urlUtils.getSubdir(),
        ghostPathRegex = new RegExp(`^${subdir}/${BF_CONFIG.adminPath}/(.+)`),
        ghostPathMatch = req.originalUrl.match(ghostPathRegex);

    if (ghostPathMatch) {
        return res.redirect(urlUtils.urlJoin(urlUtils.urlFor('admin'), '#', ghostPathMatch[1]));
    }

    next();
}

module.exports = [
    redirectAdminUrls
];
