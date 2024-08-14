import fs from 'fs';
import yaml from 'js-yaml';

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

export default readYAMLFile;
