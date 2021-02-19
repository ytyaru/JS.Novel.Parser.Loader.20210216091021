// ファイルをロードする。URLパラメータに応じて。
import FileLoader from '../../fileloader/FileLoader.js';
import IndexTsvParser from './IndexTsvParser.js';
export default class IndexUl {
    static async create() {
        const indexes = IndexTsvParser.parse(await FileLoader.load(`./txt/index.tsv`))
        console.assert('id' === indexes.keys[0]);
        console.assert('title' === indexes.keys[1]);
        this.#createIndexAggregate(indexes);
        this.#createIndex(indexes);
    }
    static #createIndexAggregate(indexes) {
        document.querySelector('#index-aggregate').textContent = `${indexes.data.length} 作品`;
    }
    static #createIndex(indexes) {
        document.querySelector('#index').appendChild(this.#createUl(indexes));
    }
    static #createUl(indexes) {
        const ul = document.createElement('ul');
        for (const data of indexes.data) {
            ul.appendChild(this.#createLi(data));
        }
        return ul;
    }
    static #createLi(data) {
        const li = document.createElement('li');
        li.appendChild(this.#createA(data));
        return li;
    }
    static #createA(data) {
        const a = document.createElement('a');
        a.href = `./content.html?id=${data[0]}`;
        a.textContent = `${data[1]}`;
        return a;
    }
}
