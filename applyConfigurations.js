const readYAMLFile = require('./fileReader/readYAMLFile.js');

const processActionsFromTree = require('./actionRunners/processActionsFromTree.js');
const createQueues = require('./priority/createQueues.js');
const createDependencyTree = require('./priority/createDependencyTree.js');

function applyConfigurations(datasourceConfig) {
    const currentPage = window.location.pathname.split("/").pop(); // Mevcut sayfa adı
    const currentURL = window.location.pathname; // Mevcut URL
    const currentHost = window.location.hostname; // Mevcut host

    // Sayfa, URL ve Host bazında uygun yapılandırmaları bir araya getirmek için reduce kullanarak tek bir dizi oluşturma
    const configsToApply = ['pages', 'urls', 'hosts'].reduce((acc, key) => {
        const value = {
            'pages': currentPage,
            'urls': currentURL,
            'hosts': currentHost
        }[key];
        
        if (datasourceConfig[key] && datasourceConfig[key][value]) {
            return acc.concat(datasourceConfig[key][value]);
        }

        return acc;
    }, []);

    // Eğer ilgili yapılandırmalar varsa onları uygula
    if (configsToApply.length > 0) {
        let combinedActions = [];

        // Tüm YAML dosyalarından gelen actions'ları birleştir
        configsToApply.forEach(configFile => {
            const configData = readYAMLFile(`./data/${configFile}`);
            combinedActions = combinedActions.concat(configData.actions);
        });

        // Birleştirilmiş actions listesi üzerinden tek bir queue ve tree oluştur
        const queues = createQueues(combinedActions);
        const dependencyTree = createDependencyTree(queues);
        processActionsFromTree(dependencyTree);
    } else {
        console.warn('Bu sayfa, URL veya host için herhangi bir yapılandırma bulunamadı.');
    }
}

module.exports = applyConfigurations;
