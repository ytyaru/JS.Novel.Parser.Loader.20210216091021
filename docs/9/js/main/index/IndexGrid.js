// ファイルをロードする。URLパラメータに応じて。
import DateString from '../../common/DateString.js';
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
                    formatter: (cell) => `${DateString.date(cell)}`
//                    formatter: (cell) => `${cell.toLocaleString()}`
                });
            } else {
                columns.push(`${indexes.names[index]}`);
            }
        }
        return columns;
    }
    static #createGridData(indexes) {
        return indexes.data;
    }
}
