import PlainToHtmlRubyRuleBuilder from './parts/builder/PlainToHtmlRubyRuleBuilder.js';
import RubyParser from './parts/parser/RubyParser.js';
export default class PlainToHtml { // 漢字（かんじ）-> <ruby>漢字<rt>かんじ</rt></ruby>
    #rubyRuleBuilder;
    constructor() {
        this.#rubyRuleBuilder = new PlainToHtmlRubyRuleBuilder();
    }
    parse(text) {
        text = RubyParser.parse(text, this.#rubyRuleBuilder);
        return text;
    }
}
