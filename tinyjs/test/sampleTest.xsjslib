/*eslint-env node, es6 */
describe("sample test suite", function () {

	beforeEach(function () {});

	it("not ok", function () {
		expect(0).toBe(1);
	});

	it("is ok", function () {
		expect(1).toBe(1);
	});

	it("... should calculate the correct value", () => {
		$.import("calc", "calculator");
		const calc = $.calc.calculator;
		const sum = calc.add(1, 1);
		expect(sum).toBe(2);
	});
});