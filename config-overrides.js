/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

const path = require('path')
const { override, addLessLoader, addWebpackAlias, adjustStyleLoaders, overrideDevServer } = require('customize-cra')

module.exports = {
    webpack: override(
        addLessLoader({
            lessOptions: {
                javascriptEnabled: true,
            },
        }),
        addWebpackAlias({
            '@': path.resolve(__dirname, 'src'),
        }),
        adjustStyleLoaders(({ use: [, , postcss] }) => {
            const postcssOptions = postcss.options
            postcss.options = { postcssOptions }
        }),
    ),
    devServer: overrideDevServer(config => {
        return {
            ...config,
            proxy: {
                '/api/v1': { changeOrigin: true, target: 'http://localhost:8000' },
            },
        }
    }),
}
