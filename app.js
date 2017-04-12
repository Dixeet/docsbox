const i18n = require('i18n'),
    path = require('path'),
    readline = require('readline'),
    config = require('./lib/simpleConfig/simpleConfig.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "DOCSBOX> ",
    terminal: true
});

config.init();

i18n.configure({
    locales: ['fr', 'en'],
    register: global
});
i18n.setLocale('fr');

rl.prompt();
rl.question('Path : ', (pathG) => {
    console.log(`apth given ${pathG}`);
    console.log(path.parse(pathG));
    console.log(path.normalize(pathG));
    console.log(__dirname);
    setTimeout(()=> {
        console.log("move");
        readline.cursorTo(process.stdout, 4, 2);
    }, 1000);


//rl.close();
});
