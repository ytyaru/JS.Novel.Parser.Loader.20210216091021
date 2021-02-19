// ファイルをロードする。URLパラメータに応じて。
import DateString from '../../common/DateString.js';
import FileLoader from '../../fileloader/FileLoader.js';
import IndexTsvParser from './IndexTsvParser.js';
export default class IndexGrid {
    static async create() {
        const indexes = IndexTsvParser.parse(await FileLoader.load(`./txt/index.tsv`))
        console.log(indexes);
        this.#createIndexAggregate(indexes);
        const grid = this.#createGrid(indexes);
        console.log(grid);
        grid.on('rowClick', (...args) => {
            console.log('row: ' + JSON.stringify(args), args);
            const url = `./content.html?id=${args[1]._cells[0].data}`
            console.log(url);
            location.href = url;
        });
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
            columns.push(this.#createGridColumn(key, indexes.names[index]));
        }
        return columns;
    }
    /*
    static #createGridSelectColumn() { // https://gridjs.io/docs/config/columns
        return {
            name: '☑',
            plugin: {
                component RowSelection,
            },
        }
    }
    */
    static #createGridColumn(key, name) { // https://gridjs.io/docs/config/columns
        const column = {};
        column.name = name;
        column.hidden = ('id' === key || 'created' === key);
        if ('created' === key || 'published' === key || 'updated' === key) {
            column.formatter = (cell) => `${DateString.date(cell)}`
        }
        return column;
    }
    static #createGridData(indexes) {
        return indexes.data;
    }
}
