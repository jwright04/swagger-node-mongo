let gulp = require("gulp");
let refresh = require('gulp-refresh');

gulp.task("watch", () => {
    gulp.watch("api/swagger/swagger.yaml", ["swagger"]);
});