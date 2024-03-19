const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();

    // 測試正確的學生物件是否被成功加入到班級中
    const student = new Student();
    student.setName("John");
    const result = myClass.addStudent(student);
    assert.strict(result, 0); // 預期加入成功，並且回傳加入的位置為 0

    // 測試傳入非學生物件時是否回傳 -1
    const nonStudent = {}; // 非學生物件
    const resultNonStudent = myClass.addStudent(nonStudent);
    assert.strictEqual(resultNonStudent, -1); // 預期回傳 -1

    // 新增測試對 MyClass 的其他方法進行邊界測試，例如空值或邊界情況
    // 測試傳入空值時是否回傳 -1
    const resultNull = myClass.addStudent(null);
    assert.strictEqual(resultNull, -1); // 預期回傳 -1
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student = new Student();
    student.setName("Jane");
    myClass.addStudent(student);

    // 測試給定正確 id 時是否能夠正確地取得對應的學生物件
    const retrievedStudent = myClass.getStudentById(0);
    assert.strictEqual(retrievedStudent.getName(), "Jane"); // 預期取得的學生名稱為 "Jane"

    // 測試給定不存在的 id 時是否回傳 null
    const nonExistentStudent = myClass.getStudentById(1);
    assert.strictEqual(nonExistentStudent, null); // 預期回傳 null

    // 新增測試對 MyClass 的其他方法進行邊界測試，例如空值或邊界情況
    // 測試給定負數的 id 時是否回傳 null
    const resultNegativeId = myClass.getStudentById(-1);
    assert.strictEqual(resultNegativeId, null); // 預期回傳 null

    // 測試在空的學生列表中查找學生時是否回傳 null
    const resultEmptyList = myClass.getStudentById(0);
    assert.strictEqual(resultEmptyList, null); // 預期回傳 null

    // 新增測試傳入空字串時是否回傳 -1
    const emptyStringStudent = ""; // 空字串
    const resultEmptyStringStudent = myClass.addStudent(emptyStringStudent);
    assert.strictEqual(resultEmptyStringStudent, -1); // 預期回傳 -1

    // 新增測試傳入數字時是否回傳 -1
    const numberStudent = 123; // 數字
    const resultNumberStudent = myClass.addStudent(numberStudent);
    assert.strictEqual(resultNumberStudent, -1); // 預期回傳 -1

    // 新增測試傳入布林值時是否回傳 -1
    const booleanStudent = true; // 布林值
    const resultBooleanStudent = myClass.addStudent(booleanStudent);
    assert.strictEqual(resultBooleanStudent, -1); // 預期回傳 -1

});

test("Test Student's setName", () => {
    const student = new Student();

    // 測試設定學生姓名的功能是否正常運作
    student.setName("Alice");
    assert.strictEqual(student.name, "Alice"); // 預期設定學生姓名為 "Alice"

    // 新增測試對 Student 的其他方法進行邊界測試，例如空值或邊界情況
    // 測試傳入空值時是否正確處理
    student.setName(null);
    assert.strictEqual(student.getName(), ""); // 預期取得的學生姓名為空字串

    // 測試傳入非字串類型的姓名是否能正確處理
    student.setName(123); // 傳入數字
    assert.strictEqual(student.getName(), ""); // 預期取得的學生姓名為空字串

    // 新增測試傳入空字串時是否回傳 -1
    const emptyStringStudent = ""; // 空字串
    const resultEmptyStringStudent = myClass.addStudent(emptyStringStudent);
    assert.strictEqual(resultEmptyStringStudent, -1); // 預期回傳 -1

    // 新增測試傳入數字時是否回傳 -1
    const numberStudent = 123; // 數字
    const resultNumberStudent = myClass.addStudent(numberStudent);
    assert.strictEqual(resultNumberStudent, -1); // 預期回傳 -1

    // 新增測試傳入布林值時是否回傳 -1
    const booleanStudent = true; // 布林值
    const resultBooleanStudent = myClass.addStudent(booleanStudent);
    assert.strictEqual(resultBooleanStudent, -1); // 預期回傳 -1

});

test("Test Student's getName", () => {
    const student = new Student();

    // 測試取得學生姓名的功能是否正常運作
    student.setName("Bob");
    assert.strictEqual(student.getName(), "Bob"); // 預期取得的學生姓名為 "Bob"
});
