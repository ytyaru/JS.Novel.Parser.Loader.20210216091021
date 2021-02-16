window.addEventListener('load', async(event) => {
    const source = await FileLoader.load('./txt/test.txt');
    const content = BreakLine.parse(Paragraph.parse(new Kakuyomu().parse(source)));
    console.log(content)
    document.querySelector(`#content`).innerHTML = content;
});
