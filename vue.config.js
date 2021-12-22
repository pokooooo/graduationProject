module.exports = {
    devServer: {
        proxy: {//解决跨域问题
            '/api': {
                target: 'http://localhost:3000',
                // 允许跨域
                changeOrigin: true,
                ws: true
            }
        }
    }
};


