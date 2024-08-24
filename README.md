# MEAN Stack Web App
The Travlr Getaways web app

## Architecture

This full stack project uses multiple types of frontend development, including Express with Handlebars for server-side rendering on the customer-facing side and Angular for the admin-facing single-page application (SPA), utilizing JavaScript (JS) with both.  

For the customer-facing interface, Handlebars is used as a templating engine with Express to generate HTML pages dynamically on the server.  Data is inserted into HTML templates before being sent back to the client, which makes loading time on the client side faster.  While the overall structure of the pages is static, Handlebars enables the dynamic inclusion of data, such as user-specific content or database information, within these static templates.  The client-side logic is simpler than the Angular SPA because more of this is handled by the server.  

The admin-facing interface is an Angular SPA, which handles rendering on the client-side and retrieves only necessary data from the server.  This allows for more complex interactions and a smoother user experience.  Angular components can update dynamically without requiring a full page reload.  

On the backend, this application uses a NoSQL MongoDB database.  MongoDB is highly scalable and allows for a flexible schema design, which means that different documents within the same collection can have different structures.  This is particularly useful for an organization such as Travlr Getaways that may require variations in travel package types and itineraries.  

## Functionality

### JS vs JSON

JS is a programming language used to create dynamic and interactive web content.  It allows developers to handle user events, make asynchronous requests, and perform logic-based operations within web applications.  It is a full programming language, including variables, functions, structures, etc.

JSON (JavaScript Object Notation) is based on a subset of JS but can be used with many different programming languages.  It is a format used to represent and transfer data between a server and a client or between different parts of an application.  It is easy for humans to read and write and easy for machines to parse, but does not contain any logic.  JSON is a bridge between the frontend and the backend of the web application. 

### Improved functionality

While developing this application, I refactored the code in multiple ways including updating to the most current version of Express JSON Web Token (JWT) for authentication and moving UI elements into reusable Angular components, like 'TripCardComponent'.  Reusable UI components are beneficial because they are self-contained, modular pieces of the UI that can be used across different parts of an application.  Reusing components ensures consistency across the UI and expedites development by removing the need for redundant code.  This also makes the application easier to scale and maintain.  Further, each component encapsulates its own logic, keeping the codebase clean and concerns separated.  

## Testing

In a full stack application, methods, endpoints, and security must all align correctly to enable seamless interaction between the frontend and backend.  HTTP methods like GET, POST, PUT, and DELETE are used to perform specific actions on resources.  For instance, a 'GET /api/trips' request retrieves a list of trips, while a 'POST /api/trips' request would add a new trip to the database.  These methods, when combined with API endpoints allow the frontend to communicate with the backend, sending and receiving data as needed.

API endpoints define how the application interacts with the server.  Each endpoint represents a specific functionality or resource.  These endpoints abstract the complexities of the backend, providing a simple interface for the frontend to interact with the server, enabling the application to be more modular and scalable.

Security in a full stack application is critical for protecting data and ensuring that only authorized users can access certain functionalities.  Authentication verifies a user's identity and issues a JWT, which then allows the user to perform tasks such as modifying the database.  This security helps prevent unauthorized access and preserve data integrity.

Testing these aspects involves validating that API endponts behave as expected, including error handling and security enforcement.  It's important to verify that endpoints correctly handle valid and invalid requests, return appropriate responses, and enforce security measures like authentication.  In the development of this application, Postman was used for manual API testing, and log monitoring for end-to-end testing.  

## Reflection

This course has helped me work toward my career goals in software development by giving me a comprehensive understanding of full stack development and how technologies in the stack connect and work together.  It has allowed me to get hands-on experience with MongoDB, Angular, Express, and Node, which are widely used in the industry.  I've not only learned how to develop both frontend and backend components, but also how to integrate them into a cohesive system that offers a seamless user experience.  

Through this course, I have developed and honed several essential skills, including RESTful API development, user authentication, and client-server communication.  I've also gained experience in debugging across the tech stack and proficiency in using tools like Postman for API testing.  

These skills have added greatly to my portfolio.  I am now better equipped to contribute to projects that require full stack development experience, and I can tackle complex development tasks with greater efficacy.  This course has prepared me for real-world challenges in the industry and made me a more competitive and capable developer.