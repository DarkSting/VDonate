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
    invalidPass,
    invalidEmail,
    makeDonation,
    loginAdmin,
    pendingCampaigns,
    makeComplain
} = require('./DataObjectsFortesting');

let storedCookie = null;

describe('Testing the user API',()=>{
    beforeAll(async()=>{
        await mongoose.connect(process.env.MONGO_URI)
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

    test('Login a user with correct password and email', async()=>{

        const response = await supertest(app).post('/user/loginUser').send(loginUser).expect(200);


        const {header} = response;

        storedCookie = header;

    })


    test('Entering an invalid password and correct email', async()=>{

        await supertest(app).post('/user/loginUser').send(invalidPass).expect(500)

    })

    
    test('Entering an invalid email and correct password', async()=>{

        await supertest(app).post('/user/loginUser').send(invalidEmail).expect(500)

    })


    test('Requesting a donation from a admin', async()=>{

        console.log(storedCookie);
        await supertest(app).post('/user/makeDonationRequest').set('Cookie',[...storedCookie["set-cookie"]]).send(makeDonation).expect(200)

    })

    test('Sending a complain', async()=>{

        await supertest(app).post('/user/makeComplain').set('Cookie',[...storedCookie["set-cookie"]]).send(makeComplain).expect(201)

    })

    afterAll(async()=>{
        
        await mongoose.disconnect();
        await mongoose.connection.close();
        
    })

})

let adminCookie = null;
let Request = null;
let user = null;

describe('Testing the admin API',()=>{
    
    beforeAll(async()=>{
       await mongoose.connect(process.env.MONGO_URI)
    })

    test('Login an admin with correct password an email',async()=>{
        
        const{header}=await supertest(app).post('/admin/loginadmin')
        .send(loginAdmin)
        .expect(200);

        adminCookie = header;

    });

    test('Get donation requests',async()=>{
        const response = await supertest(app).get(`/donation/getdonationrequests`)
        .send({}).expect(200)
        
        const obj = JSON.parse(response.text)
        const{User,request}=obj.requestsArrays[0];

        user = User;
        Request = request;

    })
    
    test('Approve donations received from donors', async()=>{
        
        const{body} = await supertest(app).post(`/donation/acceptdonationrequest`)
        .send({donorID:user._id, requestID:Request._id}).expect(200)

    })

    
    afterAll(async()=>{
        await mongoose.disconnect();
        await mongoose.connection.close();
    })
})


describe('Testing the campaign API',()=>{
    
    beforeAll(async()=>{
       await mongoose.connect(process.env.MONGO_URI)
    })

    test('Getting the pending campaign',async()=>{
        
        const{header}=await supertest(app).get('/campaign/getpendingcampaigns')
        .send(pendingCampaigns)
        .expect(200);

    });

    
    afterAll(async()=>{
        await mongoose.disconnect();
        await mongoose.connection.close();
    })
})