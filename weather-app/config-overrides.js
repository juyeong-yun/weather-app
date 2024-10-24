// config-overrides.js
import webpack from 'webpack';

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
            fs: false, // fs 모듈을 false로 설정
            zlib: false,
            querystring: require.resolve('querystring-es3'), // querystring 폴리필 추가
            crypto: require.resolve('crypto-browserify'), // crypto 폴리필 추가
            stream: require.resolve('stream-browserify'), // stream 폴리필 추가
            util: require.resolve('util/'), // util 폴리필 추가
            process: require.resolve('process/browser')
        };

         // ProvidePlugin을 통해 process 변수를 제공
        config.plugins.push(
            new webpack.ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer'], // Buffer 폴리필 추가 (필요한 경우)
            })
        );
        return config;
    },
};