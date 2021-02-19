import PlainToAozoraRubyRuleBuilder from './parts/builder/PlainToAozoraRubyRuleBuilder.js';
import RubyParser from './parts/parser/RubyParser.js';
export default class PlainToAozora { // 漢字（かんじ）-> ｜漢字《かんじ》
    #rubyRuleBuilder;
    constructor() {
        this.#rubyRuleBuilder = new PlainToAozoraRubyRuleBuilder();
    }
    parse(text) {
        text = RubyParser.parse(text, this.#rubyRuleBuilder);
        return text;
    }
}
