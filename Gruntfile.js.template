module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.initConfig({
            secrets: grunt.file.readJSON('../secrets.json'),
            screeps: {
                options: {
                    email: "<%= secrets.email %>",
                    password: "<%= secrets.password %>",
                    branch: 'multiRoom',
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
