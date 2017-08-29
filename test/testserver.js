var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

it('Should have a response status of 200 and provide OK', function (done) {
    chai.request(server)
        .get('/')
        .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            done();
        });
});

it('Should have a response status of 200 and list users', function (done) {
    chai.request(server)
        .get('/users')
        .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            done();
        });
});
it('Should have a response status of 400', function (done) {
    chai.request(server)
        .put('/users')
        .send({ password: '123', confirmPassword: '123' })
        .end(function (err, res) {
            res.should.be.a('object');
            res.should.have.status(400);
            done();
        });
});
it('Should have a response status of 200 and list users', function (done) {
    chai.request(server)
        .get("/users?id=12RTvd")
        .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            done();
        });
});

it('Should have a response status of 404', function (done) {
    chai.request(server)
        .get('/users/admin')
        .end(function (err, res) {
            res.should.have.status(404);

            res.should.be.json;

            done();
        });
});
