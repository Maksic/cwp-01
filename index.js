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
                    fs.readFile("config.json","utf8", function(err, data) {
                        copyrights = JSON.parse(data);
                        var copyrightInfo = copyrights.copyright;
                        if(extname == ".txt"){
                                fileName = path.basename(file, extname);
                                fileContent = fs.readFileSync(baseDir + path.sep + file, "utf8", function(err, data) {
                                    if(err) throw err; 
                                 });
                                    fs.appendFile(pathFile + "/" + fileName + extname,copyrightInfo + "\n" + fileContent + "\n" + copyrightInfo, function(err) {
                                        if(err) throw err; 
                                     });
                        } 
                            if(err) throw err; 
                    });
        })

        for (let i in files) {
            let currentDir = baseDir + path.sep + files[i];
            fs.stat(currentDir, (err, stats) => {
                    if (stats.isDirectory()) {
                        getFiles(currentDir);
                    } else {
                    	fs.appendFile(path.resolve(DIR_PATH + "/summary.js"), "console.log('" + currentDir + "');\n", function(err) {
    					if(err) throw err; 
						});
                      
                    }
                }
            );
        }
    });
})(DIR_PATH, null);

fs.watch(pathFile, (eventType, fileNames) => {
    if (fileNames) {
        console.log(fileNames.toString());
    }
});