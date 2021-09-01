# iiaas

Increment Integer as a Service.

An application to provide a way to get integers that automatically increment. This can be used to generate identifiers from within code.

## Web Interface

### Register as a new user

<img width="582" alt="Screenshot 2021-08-31 004853" src="https://user-images.githubusercontent.com/28017034/131601827-2a59cbf2-b390-4004-a98e-cdc5cd8fc991.png">

### Login as an existing user

<img width="578" alt="Screenshot 2021-08-31 004916" src="https://user-images.githubusercontent.com/28017034/131601829-5790f290-5512-49ce-b636-008785ed4807.png">

### View current/next integer in sequence and reset integer value

<img width="578" alt="Screenshot 2021-08-31 004829" src="https://user-images.githubusercontent.com/28017034/131601821-07f66160-63cd-41c3-b8cc-35a7f325b8a4.png">

### Sample request with postman

![image](https://user-images.githubusercontent.com/28017034/131619989-3189902f-82d9-48cc-b87a-a395d59a1a2f.png)

## Notes

### Date

September/01/2021

### Location of deployed application

This was not a stretch goal I attempted due to time constraints, so the only way to run the application currently is locally/using Docker.

### Time spent

- Core requirements: 5.5 hrs
- Stretch goals: 1.5 hrs
- QA and Documentation: 1 hr
- Total: 8 hrs

### Assumptions made

1. I tried my best to adhere to the JSON-API spec, following the conventions laid out in their documentation. One caveat was with the following:

```
Servers MUST respond with a 415 Unsupported Media Type status code if a request specifies the header Content-Type: application/vnd.api+json with any media type parameters.
```

The API uses `express`, and as mentioned in this issue (https://github.com/expressjs/express/issues/3490#issuecomment-347884208) there is no way to disable the media parameters in the `Content-Type` header. As a result, basing off a comment from an actual contributor of the JSON-API repo (https://github.com/json-api/json-api/issues/1547#issuecomment-807087361), my API explicitly sets the charset to UTF-8 as part of its response headers. This way it complies with JSON-API spec but also mitigates the express framework issue.

2. Every user has their own count. As a result, each request made with a given authenticated user's token returns that user's count.

3. Bearer token (API Secret) being returning can have an arbitrarily long expiry. In my case, I chose 60 minutes as it seems reasonable for a user; however, this number was purely based on assumption on how the system may be used by a real-world user.

### Shortcuts/Compromises made

There were definitely shortcuts and compromises made as a result of this app being timeboxed and for testing purposes and not a real-world scenario. Some examples include:

1. Using HTTP instead of HTTPS for the endpoint routes.
- In order to focus on functionality and not spend much time on security as this application will not be available for the public to use, I compromised on setting up secure routes - in the real world, the routes should be secured with HTTPS so that the data being sent across the network is secured.

2. Storing integer information inside the users table.
- Within this application, the integer information associated with a given authenticated user is stored directly within the users table. Ideally, to be future proof the system would be better off storing this information in its own table with a reference to the users table - and the users table would be solely responsible for handling user information. This way, more fields could be added as necessary without polluting a single table of the database and maintaining a separation of concerns.

### Stretch goals attempted

The stretch goals I attempted and had time for were the following:

1. Adding a `/login` endpoint along with the `/register` endpoint to give users who have already registered the ability to login and view their integer details without having to register again.
2. Creating a web SPA that allows users to either login or register an account and also query the API for integer values.
3. Creating a Postman collection with all the endpoints pre-populated to allow for simpler testing and verification of the endpoint functionality.
4. Dockerizing all aspects of the application, allowing them to be spun up and communicate with one another with a single command.

#### What went well

The addition of the `/login` route was a low-hanging fruit that was easy to accomplish as it followed a similar pattern to the `/register` endpoint but it went well because it allowed the app to be more usable and to ensure that the persistence of the data was working correctly (ie; a user with an existing account and a current integer value maintains that value).

The dockerization of the application components was a huge win, because it made local development easier and also allows for simple test setup with a consistent environment regardless of machine and OS. Also, one thing I was very proud of is that I separated the `app`, `api`, and `db` into their own containers with their own `Dockerfile` so they each handle their own area of responsibility and are isolated from one another.

#### Could have been better

The frontend web application could be improved in many ways:

- Better error handling for API errors and more validation rules for input fields.
- Better warnings on actions such as Logout to provide context to the users that this action may cause you to lose or modify your current data's state.
- Focus was on quick iteration and building a SPA, but the app could benefit from routing and less local state being used to manage component interactions and behaviour.

### Instructions to run assignment locally

In order to make running the application locally simpler, all the components of the system (app, api, db) have been dockerized using a `docker-compose.yml` file. To run the application locally, follow the steps below:

#### Prerequisties

1. Install Git: https://git-scm.com/downloads
2. Install docker: https://www.docker.com/products/docker-desktop

#### Running the app

1. Clone the repository using the following command: `git clone https://github.com/sdevalapurkar/iiaas.git`.
2. In the root directory (where the `docker-compose.yml` file resides), create a `.env` file and paste in the contents of the `env.docker` file. You can modify the `API_SECRET` variable if need be, but for testing purposes this does not need to be changed.
3. From the root directory, run the following command: `docker-compose up -d`. This will start up all the containers (db, app, api) in daemon mode (background process) and will also run a database migration which will create the users table for immediate use/testing.
4. Once all containers are up and running, the app is ready to be interacted with using the frontend web interface at `localhost:3000` or through a tool like Postman by hitting the endpoints directly at `localhost:5000`.

### What did you not include in your solution that you want us to know about?

There were many things I wished to include in my solution if I had more time. The biggest constraint to not adding these features/aspects was time. I did want my solution to be easily testable and adhere as well as possible to the requirements so I spent a bit more than 6 hours getting to that point; however, I did not want to drastically expand the scope of the assignment. The following list is not in order of importance, it is just a list of all the things on my mind that I would have loved to add/continue working on:

1. Adding unit tests.
- I would have loved to add unit tests for both my endpoints as well as the frontend web components. I would have used tools like Sinon, Chai and Mocha for the API tests and Jest with snapshot testing for the frontend. I believe no feature or product should be deemed complete without tests and not being able to add them for this app was unfortunate, but the time did not permit for me to work on this - core functionality took priority.

2. Adding a Postman environment.
- I created a Postman collection that allows users to easily see and run the available endpoints; however, I was unable to create an associated environment. This would be useful because it would allow for automatic storage of the JWT token being returned on /register or /login calls and then subsequent requests could be made without the need to manually copy and paste the token into the header.

3. Deploying the application to the cloud.
- This was something I was hoping to be able to get to so that the entire app would be accessible on a public route and would enable for even easier testing and validation on your part; once again was unable to as a result of time constraints.

4. Better error handling and messaging.
- Currently, the API endpoints do have error handling for the basic HTTP status codes; however, the error messages being returned are not very meaningful or descriptive. Also, the database transactions are wrapped in `try catch` blocks which allows us to catch any errors that may arise when trying to make those requests but those errors are being swallowed and a generic `HTTP 500 Internal Server Error` is being returned to the frontend. Ideally, this should be done more systematically where proper errors should be returned. For example, if the `/register` endpoint is hit multiple times with the same email address, then the call fails with a `duplicate pkey` issue. This is swallowed and converted into a `HTTP 500` error. The user of the system has no idea what the cause of the issue is in this case, and it would have been nice to add custom error handling.
- Also, the frontend currently does not do anything with the errors it receives from the backend. It is built for the "happy path" and will assume you are doing things right. If not, it will silently fail and the user will have no context as to why it is failing.

5. Integrating OAuth service providers.
- Would have been nice to be able to tackle this task and integrate with Github. I wanted users to be able to authenticate to my app using their Github credentials; but time constraint.

6. Adding linting/formatting checks.
- There is inconsistency in the application as to usage of single quotes vs. double quotes and other general standards. Would have been nice to set up eslint and prettier for linting and formatting checks; ignored this as the app was relatively small and for testing purposes only.

### Your feedback on this technical challenge

This was a fun challenge and I really liked that it resembles the work that I may be doing at the organization rather than just a test such as `Code a Binary tree` or `Reverse this linked list`. I don't have any explicit feedback on how to improve this test or modify it; however, just a note that just by doing a quick Google search I was able to find other public repos on Github that contained source code for this exact assignment from past applicants. In my case, I did not refer to them or use any of their code (for obvious reasons), but just something to keep in mind for future applicants :) Cheers.
