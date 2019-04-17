const fs = require('fs');
const path = require('path');

class Utils {
    static inDevelopment() {
        const env = process.env.NODE_ENV || 'development';
        return (env === 'development');
    }

    static getPath(base, file){
        return path.join(base, file);
    }

    static dirWalk(dir) {
        let results = [];
        const list = fs.readdirSync(dir);

        list.forEach((file) => {
            const fPath = `${dir}/${file}`;
            const stat = fs.statSync(fPath);

            if (stat && stat.isDirectory()) {
                results = results.concat(Utils.dirWalk(fPath));
            } else {
                results.push(fPath);
            }
        });

        return results;
    }

}

module.exports = Utils;
