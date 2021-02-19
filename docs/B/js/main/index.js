// ファイルをロードする。URLパラメータに応じて。
import IndexUl from './index/IndexUl.js';
import IndexGrid from './index/IndexGrid.js';
window.addEventListener('load', async(event) => {
    IndexUl.create();
    IndexGrid.create();
});

