import FileLoader from './js/fileloader/FileLoader.js';
import Kakuyomu from './js/novelparser/parser/Kakuyomu.js';
import BreakLine from './js/novelparser/parser/parts/BreakLine.js';
import Paragraph from './js/novelparser/parser/parts/Paragraph.js';
window.addEventListener('load', async(event) => {
    const source = await FileLoader.load('./txt/test.txt');
    const content = BreakLine.parse(Paragraph.parse(new Kakuyomu().parse(source)));
    console.log(content)
    document.querySelector(`#content`).innerHTML = content;
});
