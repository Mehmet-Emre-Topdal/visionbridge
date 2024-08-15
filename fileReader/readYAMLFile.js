const fs = require("fs");
const yaml = require("js-yaml")

function readYAMLFile(filePath) {
    try {

        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');
        return yaml.load(fileContents);
    } catch (e) {
        throw new Error(`Error from readYAMLfile: ${e.message}`);
    }
}

module.exports = readYAMLFile;
