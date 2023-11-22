const userInsertInput = {

    name:"testName",
    age:23,
    nic:'000000',
    gender:true,
    email:'akeeshjaden320@gmail.com',
    phone:'0771669956',
    bloodType:'AB+',
    password:"",
    latitude:"7.244257199999999",
    longitude:"79.8409322",
    address:"Negombo Beach, Negombo, Sri Lanka",
}

const makeComplain = {
    description:"testing a complain"
}

const findUser = {
    name:"testName"
}

const pendingCampaigns = {
    startTime:'2023-11-22T08:30:00.000+00:00',
     endTime: '2023-11-22T10:30:00.000+00:00'
}

const loginUser ={
    email:"akashgeethanjana320@gmail.com",
    password:"akash"
}

const invalidPass = {
    email:"akashgeethanjana320@gmail.com",
    password:"12345"
}

const makeDonation = {
    donationType:"Plasma", 
    description:"test desctiption"
}

const invalidEmail = {
    email:"123",
    password:"akash"
}

const deleteUser ={
    user:"testName"
}

const updateBloodBage ={
    capacity:200
}


//////////// admin test data /////////////////////

const loginAdmin = {
    licenseNumber:'123456', 
    password:'@j5t4'
}


module.exports ={
    
    userInsertInput,
    findUser,
    loginUser,
    deleteUser,
    updateBloodBage,
    invalidPass,
    invalidEmail,
    makeDonation,
    loginAdmin,
    pendingCampaigns,
    makeComplain

}