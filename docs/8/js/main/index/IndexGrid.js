// ファイルをロードする。URLパラメータに応じて。
import FileLoader from '../../fileloader/FileLoader.js';
import IndexTsvParser from './IndexTsvParser.js';
export default class IndexGrid {
    static async create() {
        const indexes = IndexTsvParser.parse(await FileLoader.load(`./txt/index.tsv`))
        console.log(indexes);
        this.#createIndexAggregate(indexes);
        this.#createGrid(indexes);
    }
    static #createIndexAggregate(indexes) {
        document.querySelector('#index-aggregate').textContent = `${indexes.data.length} 作品`;
    }
    static #createGrid(indexes) {
        return new gridjs.Grid({
          columns: this.#createGridColumns(indexes),
          sort: true,
          data: this.#createGridData(indexes),
        }).render(document.getElementById("grid"));
    }
    static #createGridColumns(indexes) {
        const columns = [];
        for (const [index, key] of indexes.keys.entries()) {
            if ('created' === key || 'published' === key || 'updated' === key) {
                columns.push({
                    name: `${indexes.names[index]}`, 
                    formatter: (cell) => `${cell.toLocaleString()}`
                });
            } else {
                columns.push(`${indexes.names[index]}`);
            }
        }
        console.log(columns);
        return columns;
    }
    static #createGridData(indexes) {
        console.log(indexes.data);
        return indexes.data;
        /*
        const data = [];
        for (const [r, fields] of indexes.fields.entries()) {
            const line = [];
            for (const [c, field] of fields.entries()) {
                line.push(convertType(indexes, r, c));
            }
            data.push(line);
        }
        console.log(data);
        return data;
        */
    }
    /*
    static #convertType(indexes, r, c) {
        if ('id' === indexes.keys[c] || 'count' === indexes.keys[c]) { return parseInt(indexes.fields[r][c]); }
        else if ('created' === indexes.keys[c]
              || 'published' === indexes.keys[c]
              || 'updated' === indexes.keys[c]) { return new Date(Date.parse(indexes.fields[r][c])); }
        else { return indexes.fields[r][c]; }
    }
    */
}
