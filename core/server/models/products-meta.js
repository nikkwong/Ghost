const ghostBookshelf = require('./base');
const urlUtils = require('../lib/url-utils');

const ProductsMeta = ghostBookshelf.Model.extend({
    tableName: 'products_meta',

    onSaving: function onSaving() {
        const urlTransformMap = {
            og_image: 'absoluteToRelative',
            twitter_image: 'absoluteToRelative'
        };

        Object.entries(urlTransformMap).forEach(([attr, transform]) => {
            let method = transform;
            let methodOptions = {};

            if (typeof transform === 'object') {
                method = transform.method;
                methodOptions = transform.options || {};
            }

            if (this.hasChanged(attr) && this.get(attr)) {
                const transformedValue = urlUtils[method](this.get(attr), methodOptions);
                this.set(attr, transformedValue);
            }
        });

        ghostBookshelf.Model.prototype.onSaving.apply(this, arguments);
    }
}, {
    product() {
        return this.belongsTo('Product');
    }
});

module.exports = {
    ProductsMeta: ghostBookshelf.model('ProductsMeta', ProductsMeta)
};
