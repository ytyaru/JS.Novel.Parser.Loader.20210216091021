// ファイルをロードする。URLパラメータに応じて。
/*
import FileLoader from '../fileloader/FileLoader.js';
import Kakuyomu from '../novelparser/parser/Kakuyomu.js';
import BreakLine from '../novelparser/parser/parts/BreakLine.js';
import Paragraph from '../novelparser/parser/parts/Paragraph.js';
*/
import IndexUl from './index/IndexUl.js';
import IndexGrid from './index/IndexGrid.js';
window.addEventListener('load', async(event) => {
    IndexUl.create();
    IndexGrid.create();
});

