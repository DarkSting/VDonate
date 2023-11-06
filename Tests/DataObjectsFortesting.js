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

const findUser = {
    name:"testName"
}


const loginUser ={
    email:"akashgeethanjana320@gmail.com",
    password:"akash"
}

const invalidPass = {
    email:"akashgeethanjana320@gmail.com",
    password:"12345"
}

const deleteUser ={
    user:"testName"
}

const updateBloodBage ={
    capacity:200
}

updateUser = {
    username:"DarkSting",
    email:"akashgeethanjana320@gmail.com",
    phoneNumber:"0763345678",
}

module.exports ={
    
    userInsertInput,
    findUser,
    loginUser,
    deleteUser,
    updateUser,
    updateBloodBage,
    invalidPass

}