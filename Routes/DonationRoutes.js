const{

    addDonation,
    findAllDonations,
    findDonation,
    updateDonation,
    getNotApprovedDonationRequest,
    deleteDonationRequests,
    acceptDonationRequest,
    getApprovedRequests,
    getRejectedRequests
} = require('../Controllers/DonationController');

const {Router} = require('express');

const routes = Router();

routes.post('/addDonation',addDonation);
routes.post('/updateDonation',updateDonation);
routes.get('/findAllDonations',findAllDonations);
routes.get('/findDonation',findDonation);
routes.get('/getdonationrequests',getNotApprovedDonationRequest);
routes.put('/deletedonationrequest',deleteDonationRequests);
routes.post('/acceptdonationrequest',acceptDonationRequest)
routes.get('/getapprovedrequests',getApprovedRequests);
routes.get('/getrejectedrequests',getRejectedRequests);


module.exports = routes;