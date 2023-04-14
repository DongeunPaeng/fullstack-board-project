//
module.exports = {
    webpack: {
        alias: {
            buffer: require.resolve("buffer"),
        },
        resolve: {
            fallback: {
                buffer: require.resolve("buffer"),
            },
        },
    },
};
