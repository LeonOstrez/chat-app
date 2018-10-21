const expect = require('expect');


var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'some message';
        var message = generateMessage(from,text);

        expect(typeof(message.createdAt)).toBe('number');
        expect(message).toMatchObject({from,text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Arthur';
        var latitude = 50;
        var longitude = 20;
        var url = "https://www.google.com/maps?q=50,20";
        var message = generateLocationMessage(from, latitude, longitude);
5
        expect(typeof(message.createdAt)).toBe('number');
        expect(message).toMatchObject({from,url});
    });
});