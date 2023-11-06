const {findAllUsers} = require('../Controllers/UserControllers');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('./TestServer');
require('dotenv').config();
const {
    userInsertInput,
    findUser,
    deleteUser,
    loginUser,
    invalidPass
} = require('./DataObjectsFortesting');

let storedCookie = '';

describe('Testing the user API',()=>{
    beforeAll(async()=>{
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("DB connected");
        })
    })

    test('Adding a user',async()=>{
        
        await supertest(app).post('/user/addUser')
        .send(userInsertInput)
        .expect(201);

    });

    test('Find a user',async()=>{
        const{body}=await supertest(app).get(`/user/getuser?user=${"testName"}`)
        .send({})
        expect(body.username).toBe("testName");
    })
    
    test('Delete a user', async()=>{
        
        const{body} = await supertest(app).delete(`/user/deleteuser?user=${deleteUser.user}`)
        .send({}).expect(200)

    })

    test('Login a user', async()=>{

        await supertest(app).post('/user/loginUser').send(loginUser).expect(200)
    })

    test('Entering an invalid password and correct email', async()=>{

        await supertest(app).post('/user/loginUser').send(invalidPass).expect(500)
    })

    
    test('Entering an invalid email and correct password', async()=>{

        await supertest(app).post('/user/loginUser').send(invalidPass).expect(500)
    })
    
    
    afterAll(async()=>{
        await mongoose.disconnect();
        await mongoose.connection.close();
    })
})



describe('Testing the admin API',()=>{
    beforeAll(async()=>{
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("DB connected");
        })
    })

    test('Adding a user',async()=>{
        
        await supertest(app).post('/user/addUser')
        .send(userInsertInput)
        .expect(201);

    });

    test('Find a user',async()=>{
        const{body}=await supertest(app).get(`/user/getuser?user=${"testName"}`)
        .send({})
        expect(body.username).toBe("testName");
    })
    
    test('Delete a user', async()=>{
        
        const{body} = await supertest(app).delete(`/user/deleteuser?user=${deleteUser.user}`)
        .send({}).expect(200)

    })

    test('Login a user', async()=>{

        await supertest(app).post('/user/loginUser').send(loginUser).expect(200)
    })

    test('Entering an invalid password and correct email', async()=>{

        await supertest(app).post('/user/loginUser').send(invalidPass).expect(500)
    })

    
    test('Entering an invalid email and correct password', async()=>{

        await supertest(app).post('/user/loginUser').send(invalidPass).expect(500)
    })
    
    
    afterAll(async()=>{
        await mongoose.disconnect();
        await mongoose.connection.close();
    })
})

