const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/server/assets/*.json', 'src/server/assets/**/*.json'];

gulp.task('scripts', function () {
    const tsProject = ts.createProject('tsconfig.json');
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist/server'));
});

gulp.task('watch', ['scripts'], function () {
    gulp.watch('src/server/**/*.ts', ['scripts']);
});

gulp.task('assets', function () {
    return gulp.src(JSON_FILES).pipe(gulp.dest('dist/server/assets'));
});

gulp.task('default', ['watch', 'assets']);