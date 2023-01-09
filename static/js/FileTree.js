var electronFs = require('fs');

module.exports = class FileTree {
    constructor(path, name = null){
        this.path = path;
        this.name = name;
        this.items = [];
    }

    build = () => {
        this.items = FileTree.readDir(this.path);
    }

    static readDir(path) {
        var fileArray = [];
        electronFs.readdirSync(path).forEach(file => {
            var fileInfo = new FileTree(`${path}\\${file}`, file);

            var stat = electronFs.statSync(fileInfo.path);

            if (stat.isDirectory()){
                fileInfo.items = FileTree.readDir(fileInfo.path);
            }

            fileArray.push(fileInfo);
        })
        return fileArray;
    }
}