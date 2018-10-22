const expect = require('expect');

var {isRealString} = require('./validation');

describe('/isRealString', () => {
    it('should reject non-string value', () => {
        var name = 20;
        var room = true;
        expect(isRealString(name)).toBe(false);
        expect(isRealString(room)).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var name = "    ";
        var room = "      ";
        expect(isRealString(name)).toBe(false);
        expect(isRealString(room)).toBe(false);
    });

    it('should allow string with non space string', () => {
        var name = "name";
        var room = "room";
        expect(isRealString(name)).toBe(true);
        expect(isRealString(room)).toBe(true);
    });
});