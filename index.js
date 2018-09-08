const fs = require('fs');
const path = require('path');
const DIR_PATH = process.argv[2];

var floderName = path.basename(DIR_PATH);
var pathFile = DIR_PATH + "/" + floderName;
    fs.mkdirSync(pathFile, function(err) {
        if(err) throw err; 
    });

(function getFiles(baseDir) {
    fs.readdir(baseDir, function (err, files) {

        files.forEach(function(file){
            var extname = path.extname(file);
            if(extname == ".txt"){
                fileName = path.basename(file, extname);
                fileContent = fs.readFileSync(baseDir + path.sep + file, "utf8", function(err, data) {
                        if(err) throw err; 
                        });
                console.log(fileContent);
                fs.appendFile(pathFile + "/" + fileName + extname, fileContent, function(err) {
                        if(err) throw err; 
                        });
                console.log(fileName);
            } 
        })

        for (let i in files) {
            let currentDir = baseDir + path.sep + files[i];
            fs.stat(currentDir, (err, stats) => {
                    if (stats.isDirectory()) {
                        getFiles(currentDir);
                    } else {
                    	fs.appendFile(path.resolve(DIR_PATH + "/summary.js"), "console.log('"+ currentDir+ "');\n", function(err) {
    					if(err) throw err; 
						});
                       // console.log(path.relative(__dirname, currentDir));
                    }
                }
            );
        }

    });
})(DIR_PATH, null);