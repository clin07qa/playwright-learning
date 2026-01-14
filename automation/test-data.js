import { faker } from "@faker-js/faker/locale/en_US";

export const randomUser = {
    userName: faker.internet.username(),
    email: faker.internet.email(),
    fName: faker.person.firstName(),
    lName: faker.person.lastName(),
    password: faker.internet.password({ length: 10 }),
    phoneNum: faker.phone.number({ style: 'international' }),
    address1: faker.location.streetAddress({ useFullAddress: false }),
    country: 'United States',
    state: faker.location.state({ abbreviated: true }),
    city: faker.location.city(),
    zipCode: faker.location.zipCode('#####'),
    day: (faker.number.int({ min: 1, max: 30 })).toString(),
    month: faker.date.month({ context: true }),
    year: (faker.number.int({ min: 1900, max: 2021 })).toString(),
}

export const validUserForLogin = {
    userName: 'TestUserLogin1',
    email:'loginuser2@email.com',
    password: 'loginPass123!',
    subject: 'Test Subject',
    message: 'This is a test message for login user.'
}

export const invalidUser = {
    email: 'test123@email.com',
    password: 'ZePjkFHGGVzp'
}