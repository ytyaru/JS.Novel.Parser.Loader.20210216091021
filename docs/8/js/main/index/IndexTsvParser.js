// index.tsvを解析してオブジェクトや配列にする
export default class IndexTsvParser {
    static parse(source) {
        const allFields = [];
        const indexes = [];
        const lines = source.split('\n').filter(line=>0 < line.trim().length);
        const keys = lines.shift().split('\t');
        const names = lines.shift().split('\t');
//        const data = this.#convertTypes(keys, line.split('\t'))
        const data = lines.map(line=>this.#convertTypes(keys, line.split('\t')));
        return { data: data, keys: keys, names: names };
        /*
        for (const line of lines) {
            const fields = line.split('\t');
            allFields.push(fields);
//            indexes.push(this.#tsvToJson(fields));
        }
//        return {arrays: allFields, objects: indexes, keys: keys, names: names};
        return {data: allFields, keys: keys, names: names};
        */
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
    /*
    static #convertType(indexes, r, c) {
        if ('id' === indexes.keys[c] || 'count' === indexes.keys[c]) { return parseInt(indexes.fields[r][c]); }
        else if ('created' === indexes.keys[c]
              || 'published' === indexes.keys[c]
              || 'updated' === indexes.keys[c]) { return new Date(Date.parse(indexes.fields[r][c])); }
        else { return indexes.fields[r][c]; }
    }
    static #tsvToJson(fields) {
        return {
            id: fields[0],
            title: fields[1],
            created: fields[2],
            published: fields[3],
            updated: fields[4],
            count: fields[5],
        };
    }
    */
}

