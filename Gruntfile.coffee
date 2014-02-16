module.exports = (grunt) ->
    grunt.initConfig
        dist: 'public/dist'
        src: 'public/src'
        pkg: grunt.file.readJSON 'package.json'
        clean: ['<%= dist %>/css', '<%= dist %>/js', '<%= dist %>/img']
        coffeelint:
            app: ['Enactus.coffee']
            grunt: ['Gruntfile.coffee']
            config:
                files:
                    src: ['config/*.coffee']
                options:
                    'max_line_length':
                        'level': 'ignore'
            controllers:
                files:
                    src: ['controllers/*.coffee']
                options:
                    'max_line_length':
                        'level': 'ignore'
            options:
                'indentation':
                    value: 4
        compass:
            dist:
                options:
                    httpPath: '<%= pkg.cdn %>'
                    cssDir: '<%= dist %>/css'
                    sassDir: '<%= src %>/sass'
                    imagesDir: 'img'
                    importPath: 'bower_components/foundation/scss'
                    environment: 'production'
                    relativeAssets: false
                    force: true
            dev:
                options:
                    cssDir: '<%= dist %>/css'
                    sassDir: '<%= src %>/sass'
                    imagesDir: 'img'
                    importPath: 'bower_components/foundation/scss'
                    force: true
                    watch: true
        copy:
            images:
                files: [
                    expand: true
                    cwd: '<%= src %>/img/'
                    src: ['**']
                    dest: '<%= dist %>/img/'
                ]
        imagemin:
            images:
                files: [
                    expand: true
                    cwd: '<%= src %>/img/'
                    src: ['**/*.{png,jpg,gif}']
                    dest: '<%= dist %>/img/'
                ]
        uglify:
            options:
                mangle:
                    except: ['jQuery']
            main:
                files: [
                    '<%= dist %>/js/enactus.js': [
                        '<%= src %>/js/plugins.js', '<%= src %>/js/enactus.js'
                    ]
                    '<%= dist %>/js/landing.js':['<%= src %>/js/landing.js']
                    '<%= dist %>/js/contact.js': ['<%= src %>/js/contact.js']
                ]

    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-coffeelint'
    grunt.loadNpmTasks 'grunt-contrib-compass'
    grunt.loadNpmTasks 'grunt-contrib-imagemin'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-copy'

    grunt.registerTask 'default', [
        'clean', 'copy', 'imagemin', 'uglify', 'compass:dist'
    ]
    grunt.registerTask 'dev', ['default', 'test', 'compass:dev']
    grunt.registerTask 'test', ['coffeelint']