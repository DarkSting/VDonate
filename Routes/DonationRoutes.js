const{

    addDonation,
    findAllDonations,
    findDonation,
    updateDonation,
    getNotApprovedDonationRequest
} = require('../Controllers/DonationController');

const {Router} = require('express');

const routes = Router();

routes.post('/addDonation',addDonation);
routes.post('/updateDonation',updateDonation);
routes.get('/findAllDonations',findAllDonations);
routes.get('/findDonation',findDonation);
routes.get('/getdonationrequests',getNotApprovedDonationRequest);

module.exports = routes;