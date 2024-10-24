// config-overrides.js
/**
 * Webpack 5에서는 일부 기본 polyfill이 더 이상 포함되지 않기 때문에, 
 * process/browser를 수동으로 지정해야 하며 확장자 .js를 명시적으로 추가해야 합니다.
 */
const webpack = require('webpack');

module.exports = function override(config, env) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        url: require.resolve('url/'),
        path: require.resolve('path-browserify'),
        net: false,
        fs: false,
        zlib: false,
        vm: false,
        async_hooks: false,
        querystring: require.resolve('querystring-es3'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util/'),
        process: require.resolve('process/browser.js'),
    };

    config.plugins = [
        ...(config.plugins || []),
        new webpack.ProvidePlugin({
            process: 'process/browser.js',
        }),
    ];

    return config;
};
