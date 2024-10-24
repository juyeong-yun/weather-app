// config-overrides.js
module.exports = {
    // Webpack 설정 추가
    webpack: function (config, env) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            url: require.resolve('url/'),
            path: require.resolve('path-browserify'),
            net: false, // net 모듈은 필요 없다면 false로 설정
        };
        return config;
    },
};