// 共通パーサ（なろう、アルファポリス、エブリスタ、カクヨム）
// https://kakuyomu.jp/works/1177354054887461010/episodes/1177354054887475663
import CommonRubyRuleBuilder from './parts/builder/CommonRubyRuleBuilder.js';
import RubyParser from './parts/parser/RubyParser.js';
export default class Common {
    #rubyRuleBuilder;
    constructor() {
        this.#rubyRuleBuilder = new CommonRubyRuleBuilder();
    }
    parse(text) {
        text = RubyParser.parse(text, this.#rubyRuleBuilder);
        return text;
    }
}
