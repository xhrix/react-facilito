const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['server/src/*.json', 'server/src/**/*.json'];

gulp.task('scripts', function () {
    const tsProject = ts.createProject('server/tsconfig.json');
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('server/dist'));
});

gulp.task('watch', ['scripts'], function () {
    gulp.watch('server/src/**/*.ts', ['scripts']);
});

gulp.task('assets', function () {
    return gulp.src(JSON_FILES).pipe(gulp.dest('server/dist'));
});

gulp.task('default', ['watch', 'assets']);