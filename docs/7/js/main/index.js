// ファイルをロードする。URLパラメータに応じて。
import FileLoader from '../fileloader/FileLoader.js';
import Kakuyomu from '../novelparser/parser/Kakuyomu.js';
import BreakLine from '../novelparser/parser/parts/BreakLine.js';
import Paragraph from '../novelparser/parser/parts/Paragraph.js';
window.addEventListener('load', async(event) => {
    const indexes = parseIndexTsv(await FileLoader.load(`./txt/index.tsv`));
    console.log(indexes );
    createIndex(indexes);
    createIndexAggregate(indexes);
    createGrid(indexes);
    function createIndex(indexes) {
        document.querySelector('#index').appendChild(createUl(indexes.indexes));
    }
    function createIndexAggregate(indexes) {
        document.querySelector('#index-aggregate').textContent = `${indexes.indexes.length} 作品`;
    }
    function parseIndexTsv(source) {
        const allFields = [];
        const indexes = [];
        const lines = source.split('\n').filter(line=>0 < line.trim().length);
        const keys = lines.shift().split('\t');
        const titles = lines.shift().split('\t');
//        if (lines[0].startsWith('id	title')) { lines = lines.slice(1); }
//        if (lines[0].startsWith('ID	タイトル')) { lines = lines.slice(1); }
        for (const line of lines) {
            const fields = line.split('\t');
            allFields.push(fields);
            indexes.push(tsvToJson(fields));
        }
        return {fields: allFields, indexes: indexes, keys: keys, titles: titles};
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
          columns: createGridColumns(indexes),
          sort: true,
          data: createGridData(indexes),
        }).render(document.getElementById("grid"));
    }
    function createGridColumns(indexes) {
        const columns = [];
        for (const [index, key] of indexes.keys.entries()) {
            if ('created' === key || 'published' === key || 'updated' === key) {
                columns.push({
                    name: `${indexes.titles[index]}`, 
                    formatter: (cell) => `${cell.toLocaleString()}`
                });
            } else {
                columns.push(`${indexes.titles[index]}`);
            }
        }
        return columns;
    }
    function createGridData(indexes) {
        const data = [];
        for (const [r, fields] of indexes.fields.entries()) {
            const line = [];
            for (const [c, field] of fields.entries()) {
                line.push(convertType(indexes, r, c));
            }
            data.push(line);
//            console.log(i, fields)
//            data.push(convertType(indexes, i));
        }
        console.log(data);
        return data;
    }
    function convertType(indexes, r, c) {
        if ('id' === indexes.keys[c] || 'count' === indexes.keys[c]) { return parseInt(indexes.fields[r][c]); }
        else if ('created' === indexes.keys[c]
              || 'published' === indexes.keys[c]
              || 'updated' === indexes.keys[c]) { return new Date(Date.parse(indexes.fields[r][c])); }
        else { return indexes.fields[r][c]; }
    }
    /*
    function convertType(indexes, i) {
        if ('id' === indexes.keys[i] || 'count' === indexes.keys[i]) { return parseInt(indexes.fields[i]); }
        else if ('created' === indexes.keys[i]
              || 'published' === indexes.keys[i]
              || 'updated' === indexes.keys[i]) { return new Date(Date.parse(indexes.fields[i])); }
        else { return indexes.fields[i]; }
    }
    */
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

