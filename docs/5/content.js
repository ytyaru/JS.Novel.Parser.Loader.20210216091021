// ファイルをロードする。URLパラメータに応じて。
import FileLoader from './js/fileloader/FileLoader.js';
import Kakuyomu from './js/novelparser/parser/Kakuyomu.js';
import BreakLine from './js/novelparser/parser/parts/BreakLine.js';
import Paragraph from './js/novelparser/parser/parts/Paragraph.js';
window.addEventListener('load', async(event) => {
    const id = getId();
    const source = await FileLoader.load(`./txt/${id}.txt`);
    const content = BreakLine.parse(Paragraph.parse(new Kakuyomu().parse(source)));
    document.querySelector(`#content`).innerHTML = content;
    function getId() {
        const params = new URL(location.href).searchParams;
        for (const key of params.keys()) {
            if ('id' === key) { return params.get(key); }
        }
    }
    function getParameters() { // URL書式: protocol://domain/path?param1=val1&param2=val2
        const params = new URL(location.href).searchParams;
        for (const key of params.keys()) {
            console.log(`${key} = ${params.get(key)}`);
        }
    }
});

