const expect = require('expect');

const{Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Mike",
            room: "Node Course"
        }, {
            id: "2",
            name: "Jen",
            room: "React Course"
        }, {
            id: "3",
            name: "Julie",
            room: "Node Course"
        }]
    });

    it ('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: "Andrew",
            room: "office"
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toMatchObject([user]);
    });

    it ('should remove a user', () => {
        expect(users.removeUser("3")).toMatchObject({
            id: "3",
            name: "Julie",
            room: "Node Course"
        });
        expect(users.users.length).toBe(2);
    });

    it ('should not remove a user', () => {
        expect(users.removeUser("111")).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it ('should find user', () => {
        expect(users.getUser("1")).toMatchObject({
            id: "1",
            name: "Mike",
            room: "Node Course"
        });
    });

    it ('should not find user', () => {
        expect(users.getUser("111")).toBeFalsy();
    });

    it ('should return names in Node Course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toMatchObject(['Mike', 'Julie']);
    });

    it ('should return names in React Course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toMatchObject(['Jen']);
    });
});