export default class DateString { // Date型から文字列を返す
    static date(date, delimiter='-') {
        return `${date.getFullYear()}${delimiter}${this.#padding(date.getMonth()+1)}${delimiter}${this.#padding(date.getDate())}`
    }
    static time(date, delimiter=':') {
        return `${this.#padding(date.getHours())}${delimiter}${this.#padding(date.getMinutes())}${delimiter}${this.#padding(date.getSeconds())}`
    }
    static dateTime(date, delimiter=' ') { return `${this.date(date)}${delimiter}${this.time(date)}`; }
    static format(date, format='yyyy-mm-dd HH:MM:SS') {
        let result = format;
        result = result.replace(/[y]{4,}/g, date.getFullYear());
        result = result.replace(/mm/g, this.#padding(date.getMonth()));
        result = result.replace(/dd/g, this.#padding(date.getDate()));
        result = result.replace(/HH/g, this.#padding(date.getHours()));
        result = result.replace(/MM/g, this.#padding(date.getMinutes()));
        result = result.replace(/SS/g, this.#padding(date.getSeconds()));

        return result;
    }
    static #padding(value, figures=2) { return ('0' + value).slice(-1 * figures); }
}
