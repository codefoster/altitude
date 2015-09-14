///// <vs AfterBuild='default' />
//var gulp = require('gulp');
//var scp = require('gulp-scp');
//var _ = require('lodash');

//var defaults = { user: 'root', port: 22, path:'~'};
//var targets = [
//    { host:'eddie.local' }
//];

//targets.forEach(function (target) {
//    console.log('working on ' + target.host);
//    gulp.task('default', function () {
//        gulp.src(['app.js','package.json'])
//            .pipe(scp(_.merge({}, defaults, target)));
//    });
//});