import BreakLine from './parser/parts/BreakLine.js';
import Paragraph from './parser/parts/Paragraph.js';
window.addEventListener('load', async(event) => {
    document.querySelector('#selector').addEventListener('input', async(event)=>{
        await parse();
    });
    document.querySelector('#editor').addEventListener('input', async(event)=>{
        await parse();
    });
//    function getParserType() { return eval(document.querySelector('#selector').value); }
//    function getParserType(){return Function(`return (${document.querySelector('#selector').value})`)();}
    async function getParserType() {
        const module = await import(`./parser/${document.querySelector('#selector').value}.js`);
        return module.default;
    }
    async function parse() {
        const editor = document.querySelector('#editor');
        const viewer = document.querySelector('#viewer');
        const drawer = document.querySelector('#drawer');
        const parserType = await getParserType();
        const parser = new parserType();
        viewer.value = parser.parse(editor.value);
        drawer.innerHTML = BreakLine.parse(Paragraph.parse(viewer.value));
    }
    document.querySelector('#selector').focus();
    document.querySelector('#selector').options[0].selected = true;
    await parse();
});
