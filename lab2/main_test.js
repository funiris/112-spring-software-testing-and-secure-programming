const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

// Mock the file containing names
test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'Aqur\nBobi\ncat');
});

const { Application, MailSystem } = require('./main');

test('MailSystem_write()', () => {
    const mailSystem = new MailSystem();
    assert.strictEqual(mailSystem.write('Aqur'), 'Congrats, Aqur!');
    assert.strictEqual(mailSystem.write(202), 'Congrats, 202!');
    assert.strictEqual(mailSystem.write(null), 'Congrats, null!');
});

test('MailSystem_send()', () => {
    const mailSystem = new MailSystem();
    const name = 'Aqur';
    test.mock.method(Math, 'random', () => 0.9);
    assert.strictEqual(mailSystem.send(name, 'success'), true);
    test.mock.method(Math, 'random', () => 0.2);
    assert.strictEqual(mailSystem.send(name, 'fail'), false);
});

test('Application_getNames()', async () => {
    const app = new Application();
    const nameList = ['Aqur', 'Bobi', 'cat'];
    const [names, selected] = await app.getNames();
    assert.deepStrictEqual(names, nameList);
    assert.deepStrictEqual(selected, []);
});

test('Application_getRandomPerson()', async () => {
    const app = new Application();
    const [names] = await app.getNames();                          
    const randomPerson = app.getRandomPerson();
});

test('Application_selectNextPerson()', async () => {
    const app = new Application();
    const [names] = await app.getNames();
    app.selected = ['Aqur'];
    let count = 0;
    test.mock.method(app, 'getRandomPerson', () => names[count++]);
    assert.strictEqual(app.selectNextPerson(), 'Bobi');
    assert.deepStrictEqual(app.selected, ['Aqur', 'Bobi']);
    assert.strictEqual(app.selectNextPerson(), 'cat');
    assert.deepStrictEqual(app.selected, ['Aqur', 'Bobi', 'cat']);
    assert.strictEqual(app.selectNextPerson(), null);
});


test('Application_notifySelected()', async () => {
    const app = new Application();
    const [names] = await app.getNames();
    app.selected = names.slice(); // Select all names initially
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, names.length);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, names.length);
});
