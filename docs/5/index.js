// ファイルをロードする。URLパラメータに応じて。
import FileLoader from './js/fileloader/FileLoader.js';
import Kakuyomu from './js/novelparser/parser/Kakuyomu.js';
import BreakLine from './js/novelparser/parser/parts/BreakLine.js';
import Paragraph from './js/novelparser/parser/parts/Paragraph.js';
window.addEventListener('load', async(event) => {
    const indexes = parseIndexTsv(await FileLoader.load(`./txt/index.tsv`));
    const ul = createUl(indexes);
    document.querySelector('#index').appendChild(ul);
    function parseIndexTsv(source) {
        const indexes = [];
        let lines = source.split('\n');
        console.log(lines[0], lines[0] === 'id	title', lines.slice(1));
        if (lines[0] === 'id	title') { lines = lines.slice(1); }
        lines = lines.filter(txt=>0 < txt.trim().length);
        for (const line of lines) {
            const fields = line.split('\t');
            indexes.push(tsvToJson(fields));
        }
        console.log(indexes);
        return indexes;
    }
    function tsvToJson(fields) {
        return {
            id: fields[0],
            title: fields[1],
        };
    }
    function createUl(indexes) {
        const ul = document.createElement('ul');
        for (const index of indexes) {
            ul.appendChild(createLi(index));
        }
        return ul;
    }
    function createLi(index) {
        const li = document.createElement('li');
        li.appendChild(createA(index));
        return li;
    }
    function createA(index) {
        const a = document.createElement('a');
        a.href = `./content.html?id=${index.id}`;
        a.textContent = `${index.title}`;
        return a;
    }
});

