let gulp = require("gulp");
let yaml = require("js-yaml");
let path = require("path");
let fs = require("fs");

gulp.task("swagger", () => {

    let doc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, "../api/swagger/swagger.yaml")));
    fs.writeFileSync(
        path.join(__dirname, "../public/swagger/swagger.json"),
        JSON.stringify(doc, null, " ")
    );

});