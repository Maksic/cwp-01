const fs = require('fs');
const path = require('path');
const DIR_PATH = process.argv[2];

floderName = path.basename(DIR_PATH);
//fs.mkdirSync(DIR_PATH + "/" + floderName);


(function getFiles(baseDir) {
    fs.readdir(baseDir, function (err, files) {
        for (let i in files) {
            let currentDir = baseDir + path.sep + files[i];
            fs.stat(currentDir, (err, stats) => {
                    if (stats.isDirectory()) {
                        getFiles(currentDir);
                    } else {
                        //console.log(path.extname(files));
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