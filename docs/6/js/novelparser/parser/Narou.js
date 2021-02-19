import NarouRubyRuleBuilder from './parts/builder/NarouRubyRuleBuilder.js';
import RubyParser from './parts/parser/RubyParser.js';
export default class Narou {
    #rubyRuleBuilder;
    constructor() {
        this.#rubyRuleBuilder = new NarouRubyRuleBuilder();
    }
    parse(text) {
        text = RubyParser.parse(text, this.#rubyRuleBuilder);
        return text;
    }
}
