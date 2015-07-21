module.exports = function(grunt) {

    // Load the plugins.
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-react');

    // Project configuration.
    grunt.initConfig({
        eslint: {
            target: ['static/js/frontend/**/*.js']
        },
        browserify: {
            options: {
                transform: ["babelify"],
                browserifyOptions: {
                    paths: [
                        "./static/js/frontend/index"
                    ],
                    extensions: [".js", ".json", ".jsx"]
                }
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "./static/js/frontend/",
                        src: "*",
                        dest: "./static/js/dist/",
                        ext: ".js"
                    }
                ]
            }
        },
        react: {
            combined_file_output: {
                files: {
                    './static/js/dist/index.js': [
                        './static/js/frontend/index/items.js'
                    ]
                }
            },
            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        cwd: './static/js/frontend',
                        src: ['**/*.jsx'],
                        dest: './static/js/dist/dest',
                        ext: '.js'
                    }
                ]
            }
        }
    });

    grunt.registerTask('default', ['eslint', 'react']);
    grunt.registerTask('prod', ['eslint', 'browserifyProd']);

};
