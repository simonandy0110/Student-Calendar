/***********************
  Load Components!
  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
const { queryResult } = require('pg-promise');
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

//coookies 
const cookieParser = require('cookie-parser');


// // let’s you use the cookieParser in your application
app.use(cookieParser());

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.
		We'll be using `db` as this is the name of the postgres container in our
		docker-compose.yml file. Docker will translate this into the actual ip of the
		container for us (i.e. can't be access via the Internet).
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab,
		we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database. We set this in the
		docker-compose.yml for now, usually that'd be in a seperate file so you're not pushing your credentials to GitHub :).
**********************/
const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'users_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

/*End of initializing stuff*/



// login page
	// what appears when first starting application
app.get('/', function(req, res) {
	res.render('loginPage/LoginPage',{
		// no info passed
	});
});

// create account page
app.get('/createAccount', function(req, res) {
	res.render('createAccountPage/createAccount',{
		// no info passed
	});
});

// COOKIES TEST 
app.get('/', (req, res) => {
    res.send('welcome to a simple HTTP cookie server');
});


// creating new user
app.post('/createAccount/newuser', function(req,res){
	var firstname = req.body.firstName;
	var lastname = req.body.lastName;
	var email = req.body.email;
	var password = req.body.password;
	var query = `INSERT INTO students(first_name, last_name, email, password) VALUES('${firstname}','${lastname}','${email}','${password}');`;
	db.task('get-everything', task => {
		return task.batch([
			task.any(query)
		]);
	})
	.then(info => {
		res.render('loginPage/LoginPage', {
			// I don't think anything needs to go here
		})
	})
	.catch(err => {
		console.log('error', err);
		res.render('createAccountPage/createAccount',{
			// I don't think anything needs to go here
		})
	})
});

// home page: variables emailAddress, password
app.post('/home', function(req, res) {

	//console.log(res.cookie);
	
	var user_email = req.body.emailAddress;
	var user_password = req.body.password;
	var query = `SELECT id, first_name, last_name, email, calendar_id FROM students WHERE email = '${user_email}' AND password = '${user_password}';`;
	db.task('get-everything', task => {
        return task.batch([
            task.any(query)
        ]);
    })
    .then(info => {
		res.cookie(`Student_ID`, `${info[0][0].id}`),
		res.cookie(`Student_First_Name`,`${info[0][0].first_name}`),
		res.cookie(`Student_Last_Name`,`${info[0][0].last_name}`),
		res.cookie(`Student_Email`,`${info[0][0].email}`),
		res.cookie(`Student_Password`,`${info[0][0].password}`),
		res.cookie('Calendar_ID', `${info[0][0].calendar_id}`),	

    	res.render('homePage/home',{
			firstName: info[0][0].first_name,
			lastName: info[0][0].last_name,
			email: info[0][0].email,
			calendarID: info[0][0].calendar_id
		})
		
    })
    .catch(err => {
		console.log('error', err);
		res.render('loginPage/loginPage', {
			// nothing to send
		})
    });
});

// home from login page
app.get('/homeFromLogin', function(req, res) {
	res.render('homePage/home',{
		firstName: req.cookies.Student_First_Name,
		lastName: req.cookies.Student_Last_Name,
		email: req.cookies.Student_Email,
		calendarID: req.cookies.Calendar_ID
	});
});

// home - after creating calendar
app.post('/home/createCalendar', function(req, res) {

	var cid = req.body.calendar_id_input;
	var user_email = req.cookies.Student_Email;
	var user_password = req.cookies.Student_Password;
	var query = `UPDATE students SET calendar_id = '${cid}' WHERE email = '${user_email}' AND password = '${user_password}';`;
	db.task('get-everything', task => {
        return task.batch([
            task.any(query)
        ]);
    })
    .then(info => {
		res.cookie('Calendar_ID', cid, {overwrite: true}),
    	res.render('homePage/home',{
			firstName: req.cookies.Student_First_Name,
			lastName: req.cookies.Student_Last_Name,
			email: req.cookies.Student_Email,
			calendarID: cid
		})
		
    })
    .catch(err => {
		console.log('error', err);
		res.render('loginPage/loginPage', {
			// nothing to send
		})
    });
});

app.get('/profilePage', function(req, res) {
	
	//console.log(req.cookies);
	console.log("ID", req.cookies.Student_ID);
	console.log("FIRST NAME", req.cookies.Student_First_Name);
	console.log("LAST NAME", req.cookies.Student_Last_Name);
	console.log("EMAIL", req.cookies.Student_Email);

	var cookie_student_id = req.cookies.Student_ID;
	var cookie_first_name = req.cookies.Student_First_Name;
	var cookie_last_name = req.cookies.Student_Last_Name;
	var cookie_email = req.cookies.Student_Email; 
	//var calendar_id = "ALEX FINISH THIS"; 

	//console.log("CALENDAR ID", req.cookies.Calender_Id);
	res.render('profilePageHTML/profilePage',{
		my_title: "Profile Page",
		student_id: cookie_student_id,// Return the color options
		first_name: cookie_first_name,
		last_name: cookie_last_name,
		email: cookie_email
		// ADD CALENDAR ID 

		
	});


	//
	// db.task('get-everything', task => {
    //     return task.batch([
    //         task.any(get_students_info)
    //         //task.any(color_message)
    //     ]);
    // })
	// // console.log("JHIUGVI", info[0][0].id)

    // .then(info => {
	// 	// console.log("ID", info[0][0].id);
	// 	// console.log("First Name", info[0][0].first_name);
	// 	// console.log("Last Name", info[0][0].last_name);
	// 	// console.log("Email", info[0][0].email);
		

    // 	res.render('profilePageHTML/profilePage',{
	// 			my_title: "Profile Page",
	// 			data: info[0],// Return the color options
				
				
	// 		})
    // })
    // .catch(err => {
    //         console.log('error', err);
	// 		console.log("HVIUFKHGKJDFKJSGDKJGFUSYGF");
	// 		//console.log(task.any(color_message));
    //         res.render('profilePageHTML/profilePage', {
    //             my_title: 'Profile Page',
    //             data: '',
                
    //         })
    // });
});


app.get('/miniHomePage', (req,res) => {


	res.render('homePage/home',{
		firstName: req.cookies.Student_First_Name,
		lastName: req.cookies.Student_Last_Name,
		email: req.cookies.Student_Email,
		calendarID: req.cookies.Calendar_ID
	});

});

app.get('/logout', (req, res) => {
	
	res.clearCookie(`Student_ID`);
	res.clearCookie(`Student_First_Name`);
	res.clearCookie(`Student_Last_Name`);
	res.clearCookie(`Student_Email`);
	res.clearCookie('Student_Password');
	res.clearCookie('Calendar_ID');
	// console.log("I AM LOGGING OUT");
	res.render('loginPage/LoginPage',{
		// no info passed
	});
});

app.get('/setcookie', (req, res) => {
	console.log("I SET THE COOKIE");
    res.cookie(`Cookie token name`,`encrypted cookie string Value`);
    res.send('Cookie have been saved successfully');
});

app.get('/getcookie', (req, res) => {
    //show the saved cookies
	console.log("I AM HERE");
    console.log(req.cookies)
    res.send(req.cookies);
});

app.get('/deletecookie', (req, res) => { //??????????
    //show the saved cookies
    res.clearCookie()
    res.send('Cookie has been deleted successfully');
});

//--------------

app.listen(3000);
console.log('3000 is the magic port');