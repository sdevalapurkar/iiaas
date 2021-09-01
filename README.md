# iiaas

Increment Integer as a Service.

An application to provide a way to get integers that automatically increment. This can be used to generate identifiers from within code.

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

I tried my best to adhere to the JSON-API spec, following the conventions laid out in their documentation. One caveat was with the following:

```
Servers MUST respond with a 415 Unsupported Media Type status code if a request specifies the header Content-Type: application/vnd.api+json with any media type parameters.
```

The API uses `express`, and as mentioned in this issue (https://github.com/expressjs/express/issues/3490#issuecomment-347884208) there is no way to disable the media parameters in the `Content-Type` header. As a result, basing off a comment from an actual contributor of the JSON-API repo (https://github.com/json-api/json-api/issues/1547#issuecomment-807087361), my API explicitly sets the charset to UTF-8 as part of its response headers. This way it complies with JSON-API spec but also mitigates the express framework issue.

### Shortcuts/Compromises made

There were definitely shortcuts and compromises made as a result of this app being timeboxed and for testing purposes and not a real-world scenario. Some examples include:

1. Using HTTP instead of HTTPS for the endpoint routes.
- In order to focus on functionality and not spend much time on security as this application will not be available for the public to use, I compromised on setting up secure routes - in the real world, the routes should be secured with HTTPS so that the data being sent across the network is secured.

2. Storing integer information inside the users table.
- Within this application, the integer information associated with a given authenticated user is stored directly within the users table. Ideally, to be future proof the system would be better off storing this information in its own table with a reference to the users table - and the users table would be solely responsible for handling user information. This way, more fields could be added as necessary without polluting a single table of the database and maintaining a separation of concerns.

3. 

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
- 

2. Adding a Postman environment.
- 

3. Deploying the application to the cloud.
- 

4. Better error handling and messaging.
- 

5. Integrating OAuth service providers.
- 

6. Creating secure routes (HTTPS).
- 

7. 

### Other information about your submission that you feel it's important that we know if applicable.



### Your feedback on this technical challenge

Have feedback for how we could make this assignment better? Please let us know.
