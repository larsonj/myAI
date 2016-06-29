module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'sixpakofyew@gmail.com',
                password: 'lFE85&f48U4gyA9n',
                branch: 'master',
                ptr: false
            },
            dist: {
                src: ['*.js']
            }
        },
        jsdoc: {
            dist: {
                src: ['*.js'],
                options: {
                    destination: 'doc'
                }
            }
        }

    });
}
