var gulp = require('gulp')
var rev = require('gulp-rev') // 自动给每个文件添加版本号(同步修改)
var revReplace = require('gulp-rev-replace') // 更新index中的引用
var useref = require('gulp-useref') // 自动合并css或js
var filter = require('gulp-filter') // 筛选 ==> restore恢复
var uglify = require('gulp-uglify') // 压缩js
var csso = require('gulp-csso') // 压缩css

gulp.task('default', function(){
    var jsFilter = filter('**/*.js', {restore: true})
    var cssFilter = filter('**/*.css', {restore: true})
    var indexHtmlFilter = filter(['**/*', '!**/index.html'], {restore: true}) // filter中可以是字符串，也可以是包含多个字符串的数组，**/*表示所有，!...表示排除首页

    return gulp.src('src/index.html')
        .pipe(useref()) // 通过之前所加的注释，将index中引用的文件放到处理程序中
        .pipe(jsFilter) // 筛选出js
        .pipe(uglify()) // 压缩处理
        .pipe(jsFilter.restore) //再放回去
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'))
})