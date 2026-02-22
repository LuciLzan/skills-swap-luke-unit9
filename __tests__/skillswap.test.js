const { filterSkillsByCategory } = require("../skillswap-functions.js");

const {calculateTotalCost, matchSkillsToUser} = require("../skillswap-functions");




describe('Filter skills tests by category tests', () => {
    const skills = [
        { title: 'Python Tutoring', category: 'Programming', price: 20 },
        { title: 'Guitar Lessons', category: 'Music', price: 15 },
        { title: 'Resume Review', category: 'Career', price: 0 },
        { title: 'Web Development', category: 'Programming', price: 25 }
    ];
    test("Test with category 'Programming'", () => {
        let res = filterSkillsByCategory(skills, 'Programming');
        expect(res).toEqual([
            { title: 'Python Tutoring', category: 'Programming', price: 20 },
            { title: 'Web Development', category: 'Programming', price: 25 }
        ])
    })

    test("Test with category 'All'", () => {
        let res = filterSkillsByCategory(skills, 'All');
        expect(res).toEqual(    [
            { title: 'Python Tutoring', category: 'Programming', price: 20 },
            { title: 'Guitar Lessons', category: 'Music', price: 15 },
            { title: 'Resume Review', category: 'Career', price: 0 },
            { title: 'Web Development', category: 'Programming', price: 25 }
        ])
    })



    test("Test with category 'Cooking' (Non existent)", () => {
        let res = filterSkillsByCategory(skills, 'Cooking');
        expect(res).toEqual(    [])
    })

})

describe('Calculate cost tests', () => {

    test("Test normal conditions", () => {
        expect(calculateTotalCost(20, 2)).toEqual(40)
    })
    test("Test with zero cost", () => {
        expect(calculateTotalCost(0, 3)).toEqual(0)
    })
    test("Test with fractional component", () => {
        expect(calculateTotalCost(25, 1.5)).toEqual(37.5)
    })
    test("Test with zero hours", () => {
        expect(calculateTotalCost(20, 0)).toEqual(0)
    })

})

describe('Match skill tests', () => {

    const skills = [
        { title: 'Python Tutoring', category: 'Programming', price: 20 },
        { title: 'JavaScript Help', category: 'Programming', price: 25 },
        { title: 'Guitar Lessons', category: 'Music', price: 15 },
        { title: 'Resume Review', category: 'Career', price: 0 }
    ];
    test("Test with 30 max price", () => {
        const user1Needs = { category: 'Programming', maxPrice: 30 };
        const result = matchSkillsToUser(user1Needs, skills);
        const val =
            [
                { title: 'Python Tutoring', category: 'Programming', price: 20 },
                { title: 'JavaScript Help', category: 'Programming', price: 25 }
            ]
        expect(result).toEqual(val)
    })
    test("Test with 20 max price", () => {
        const user2Needs = { category: 'Programming', maxPrice: 20 };
        const result = matchSkillsToUser(user2Needs, skills);
        const val = [ { title: 'Python Tutoring', category: 'Programming', price: 20 }]
        expect(result).toEqual(val)

    })
    test("Test with empty array", () => {
        const user3Needs = { category: 'Cooking', maxPrice: 100 };
        const result = matchSkillsToUser(user3Needs, skills);
        const val = []
        expect(result).toEqual(val)
    })
    test("Test with free price", () => {
        const user4Needs = { category: 'Career', maxPrice: 0 };
        const result = matchSkillsToUser(user4Needs, skills);
        const val = [ { title: 'Resume Review', category: 'Career', price: 0 } ]
        expect(result).toEqual(val)

    })



})

