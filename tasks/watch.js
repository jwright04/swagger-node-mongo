let gulp = require("gulp");

gulp.task("watch", () => {
    gulp.watch("api/swagger/swagger.yaml", ["swagger"]);
});