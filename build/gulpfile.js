const{src:src,dest:dest,parallel:parallel,series:series,watch:watch}=require("gulp"),gulp=require("gulp"),cssnano=require("gulp-cssnano"),changed=require("gulp-changed"),browsersync=require("browser-sync"),imagemin=require("gulp-imagemin"),clean=require("gulp-clean"),terser=require("gulp-terser"),htmlmin=require("gulp-htmlmin");function clear(){return gulp.src("./build/*",{read:!1}).pipe(clean())}async function css(){const e="./style.css";return gulp.src(e).pipe(changed(e)).pipe(cssnano()).pipe(dest("./build/")).pipe(browsersync.stream())}function img(){return src("./images/tovar/*/*").pipe(imagemin()).pipe(dest("./build/images/tovar/"))}function html(){return src("./*.html").pipe(htmlmin({collapseWhitespace:!0})).pipe(dest("./build/")).pipe(browsersync.stream())}function js(){return src("./*.js").pipe(terser()).pipe(dest("./build/")).pipe(browsersync.stream())}function watchFiles(){watch("./*.js",js),watch("./*.css",css),watch("./*.html",html),watch("./images/tovar/*/*",img)}function BrowserSync(){browsersync.init({server:{baseDir:"./build"},port:3e3})}exports.watch=parallel(watchFiles,BrowserSync),exports.default=series(clear,gulp.parallel(html,css,js,img));