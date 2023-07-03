/*
change first line for var server. Change to correct 
get/post requests. 
getting certain info from database: 
import { Comment, User } from './models'
*/

// Imports the server.js file to be tested. Need to find the correct one
const server = require("../server");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;
import { Student } from './models'

describe("Server!", () => {
  it("error with invalid email, missing .edu", (done) => {
    chai
      .request(server)
      .post("/add")
      .send({email: "JohnSmith@aol.com"})
      .end((err, res) => {
     expect(res).to.have.status(400);
      done();
      });
  });
  
  it("Error if missing credential", (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(res.body).to.have.property('email'); 
        expect(res.body).to.have.property('password'); 
        done();
      });
    }); 

 it("Check if valid email and password", (done) => //password stored in database?
  {
    chai
      .request(server)
      .get("")
      .send({
          email: "JohnSmith@colorado.edu",
          password: "abcdefg123"
      })
      .end((err, res) => {
      expect(res.body.email).to.equals("JohnSmith@colorado.edu");
      expect(res.body.email).to.equals("abcdefg123");
      done();
      });
  }); 

});
