module.exports  = {
    devServer : {
        watchOptions: {
            ignored : [`${__dirname}/public/uploads`,`${__dirname}/public`]
        }
    }
}
