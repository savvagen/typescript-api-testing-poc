 import faker from "@faker-js/faker/locale/en_US";
 import {Post} from "../models/Post";
 import {User} from "../models/User";


let categories = ["cats", "dogs", "test"]

 function randomChose(arr: Array<any>): any {
    return arr[Math.floor(Math.random() * arr.length)]
}

export function generatePost(userId: number): Omit<Post, "id"> {
    return {
        title: `Post ${faker.datatype.number({min: 10000, max: 99999})}`,
        subject: `Test Subject ${faker.datatype.number({min: 10000, max: 99999})}`,
        body: `Hello This is a post ${faker.datatype.number({min: 10000, max: 99999})}`,
        category: `${randomChose(categories)}`,
        user: userId,
        comments: [
            faker.datatype.number({min: 1, max: 30}),
            faker.datatype.number({min: 31, max: 50}),
            faker.datatype.number({min: 51, max: 99})
        ],
        createdAt: `${new Date().toISOString()}`
    }
}

export function generateUser(): Omit<User, "id"> {
    return {
        name: faker.name.firstName(),
        username: faker.name.firstName().toLowerCase() + "_" + faker.name.lastName().toLowerCase(),
        email: faker.internet.email(),
        createdAt: new Date().toISOString()
    }
}