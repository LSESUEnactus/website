module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        dirs:
            dist: '.'
            src: 'src'
        clean: [
            '<%= dirs.dist %>/css'
            '<%= dirs.dist %>/js'
            '<%= dirs.dist %>/img'
        ]
        compass:
            dist:
                options:
                    httpPath: '<%= pkg.cdn %>'
                    cssDir: '<%= dirs.dist %>/css'
                    sassDir: '<%= dirs.src %>/scss'
                    imagesDir: 'img'
                    importPath: 'bower_components/foundation/scss'
                    environment: 'production'
                    relativeAssets: false
                    force: true
            dev:
                options:
                    outputStyle: 'expanded'
                    cssDir: '<%= dirs.dist %>/css'
                    sassDir: '<%= dirs.src %>/scss'
                    imagesDir: 'img'
                    importPath: 'bower_components/foundation/scss'
                    force: true
                    watch: true
        copy:
            images:
                files: [
                    expand: true
                    cwd: '<%= dirs.src %>/img/'
                    src: ['**']
                    dest: '<%= dirs.dist %>/img/'
                ]
        imagemin:
            options:
                cache: false
            images:
                files: [
                    expand: true
                    cwd: '<%= dirs.src %>/img/'
                    src: ['**/*.{png,jpg,gif}']
                    dest: '<%= dirs.dist %>/img/'
                ]
        uglify:
            options:
                mangle:
                    except: ['jQuery']
            main:
                files: [
                    '<%= dirs.dist %>/js/enactus.js': [
                        '<%= dirs.src %>/js/plugins.js'
                        '<%= dirs.src %>/js/enactus.js'
                    ]
                    '<%= dirs.dist %>/js/landing.js': [
                        '<%= dirs.src %>/js/landing.js'
                    ]
                    '<%= dirs.dist %>/js/contact.js': [
                        '<%= dirs.src %>/js/contact.js'
                    ]
                ]

    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-contrib-compass'
    grunt.loadNpmTasks 'grunt-contrib-imagemin'
    grunt.loadNpmTasks 'grunt-contrib-uglify'

    grunt.registerTask 'default', [
        'clean', 'imagemin', 'uglify', 'compass:dist'
    ]
    grunt.registerTask 'dev', ['compass:dev']