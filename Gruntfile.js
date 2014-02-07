module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dist: {
                options: {
                    httpPath: '<%= pkg.homepage %>',
                    cssDir: 'public/css',
                    sassDir: 'sass',
                    imagesDir: 'img',
                    javascriptsDir: 'js',
                    fontsDir: 'fonts',
                    importPath: 'bower_components/foundation/scss',
                    environment: 'production',
                    relativeAssets: false,
                    force: true
                }
            },
            dev: {
                options: {
                    httpPath: '',
                    cssDir: 'public/css',
                    sassDir: 'sass',
                    imagesDir: 'public/img',
                    javascriptsDir: 'public/js',
                    fontsDir: 'public/fonts',
                    importPath: 'bower_components/foundation/scss',
                    relativeAssets: true,
                    force: true,
                    watch: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('default', ['compass:dist']);
    grunt.registerTask('dev', ['compass:dev']);
}