// index.tsvを解析してオブジェクトや配列にする
export default class IndexTsvParser {
    static parse(source) {
        const allFields = [];
        const indexes = [];
        const lines = source.split('\n').filter(line=>0 < line.trim().length);
        const keys = lines.shift().split('\t');
        const names = lines.shift().split('\t');
        const data = lines.map(line=>this.#convertTypes(keys, line.split('\t')));
        return { data: data, keys: keys, names: names };
    }
    static #convertTypes(keys, fields) {
        const data = [];
        for (const [c, field] of fields.entries()) {
            data.push(this.#convertType(keys[c], field));
        }
        return data;
    }
    static #convertType(key, field) {
        if ('id' === key || 'count' === key) { return parseInt(field); }
        else if ('created' === key || 'published' === key || 'updated' === key) { return new Date(Date.parse(field)); }
        else { return field; }
    }
}

