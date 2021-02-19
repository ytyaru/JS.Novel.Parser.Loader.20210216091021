// ファイルをロードする。URLパラメータに応じて。
import FileLoader from '../fileloader/FileLoader.js';
import Kakuyomu from '../novelparser/parser/Kakuyomu.js';
import BreakLine from '../novelparser/parser/parts/BreakLine.js';
import Paragraph from '../novelparser/parser/parts/Paragraph.js';
window.addEventListener('load', async(event) => {
    const indexes = parseIndexTsv(await FileLoader.load(`./txt/index.tsv`));
    createIndex(indexes);
    createIndexAggregate(indexes);
    function createIndex(indexes) {
        document.querySelector('#index').appendChild(createUl(indexes.indexes));
    }
    function createIndexAggregate(indexes) {
        document.querySelector('#index-aggregate').textContent = `${indexes.indexes.length} 作品`;
    }
    function parseIndexTsv(source) {
        const indexes = [];
//        const lines = source.split('\n');
        const lines = source.split('\n').filter(line=>0 < line.trim().length);
        const keys = lines.shift().split('\t');
        const titles = lines.shift().split('\t');
//        if (lines[0].startsWith('id	title')) { lines = lines.slice(1); }
//        if (lines[0].startsWith('ID	タイトル')) { lines = lines.slice(1); }
        for (const line of lines) {
            const fields = line.split('\t');
            indexes.push(tsvToJson(fields));
        }
        console.log(indexes);
//        return indexes;
        return {indexes: indexes, keys: keys, titles: titles};
    }
    function tsvToJson(fields) {
        return {
            id: fields[0],
            title: fields[1],
            created: fields[2],
            published: fields[3],
            updated: fields[4],
            count: fields[5],
        };
    }
    function createGrid(indexes) {
        return new gridjs.Grid({
          columns: [
            "Name", "Email", "Age", 
            {
                name:"Birth",
    //            formatter: (cell) => `${cell.toISOString()}`
                formatter: (cell) => `${cell.toLocaleString()}`
            }
          ],
          sort: true,
          data: [
            ["John", "john@example.com", 30, new Date(Date.parse(`2000-01-01 00:00:00`))], 
            ["Mark", "mark@gmail.com", 20, new Date(Date.parse(`2000-01-01 00:00:01`))],
            ["Eoin", "eoin@gmail.com", 120, new Date(Date.parse(`2000-01-01 00:00:02`))],
            ["Sarah", "sarahcdd@gmail.com", 55, new Date(Date.parse(`2000-01-01 00:00:03`))],
            ["Afshin", "afshin@mail.com", 99, new Date(Date.parse(`2000-01-01 00:00:04`))]
          ]
        }).render(document.getElementById("grid"));
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

