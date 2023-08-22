const {findAllUsers} = require('../Controllers/UserControllers');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('./TestServer');
require('dotenv').config();
const {
    userInsertInput,
    findUser
} = require('./DataObjectsFortesting');

describe('testing the functions of userController',()=>{
    beforeAll(async()=>{
        await mongoose.connect(process.env.MONGO_URI_TEST).then(()=>{
            console.log("DB connected");
        })
    })

    test('create user using add user function ',async()=>{
        
        await supertest(app).post('/user/addUser')
        .send(userInsertInput)
        .expect(201);

    });

    test('find All users in the database',async()=>{
        const{body}=await supertest(app).get('/user/findUser')
        .send(findUser)
        
        expect(body.userName).toBe("testName");

    })
    
    
    afterAll(async()=>{
        await mongoose.disconnect();
        await mongoose.connection.close();
    })
})
