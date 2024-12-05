const tinycolor = require('tinycolor2');

StyleDictionary.registerTransform({
    name: 'color/modify',
    type: 'value',
    matcher: (prop) => prop.type === 'color' && prop.$extensions?.['studio.tokens']?.modify,
    transformer: (prop) => {
        const modify = prop.$extensions['studio.tokens'].modify;
        let color = tinycolor(prop.value);

        if (modify.type === 'lighten') {
            color = color.lighten(parseFloat(modify.value) * 100); // Multiply value to match tinycolor scale
        } else if (modify.type === 'darken') {
            color = color.darken(parseFloat(modify.value) * 100);
        } else if (modify.type === 'alpha') {
            color = color.setAlpha(parseFloat(modify.value));
        }

        return color.toString();
    },
});

StyleDictionary.registerTransformGroup({
    name: 'scss',
    transforms: ['attribute/cti', 'name/cti/kebab', 'color/modify', 'size/px'],
});
