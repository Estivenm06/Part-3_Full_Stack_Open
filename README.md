# Full Stack Open - Part 3: Programming a server with NodeJS and Express

This repository contains exercises and projects from Part 3 of the Full Stack Open course by the University of Helsinki.

## 📚 Course Overview

Part 3 focuses on backend development, introducing server-side programming with Node.js and Express.js. This part covers the fundamentals of building REST APIs, connecting to databases, and deploying applications to production.

## 🎯 Learning Objectives

By the end of this part, I understood:

- Node.js runtime environment and its core modules
- Express.js framework for building web servers
- REST API design principles and implementation
- HTTP request methods (GET, POST, PUT, DELETE)
- Middleware concepts and usage
- MongoDB database integration with Mongoose
- Error handling in Express applications
- Environment variables and configuration
- Application deployment to cloud platforms
- CORS (Cross-Origin Resource Sharing)
- Data validation and sanitization

## 🛠 Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **nodemon** - Development server with auto-restart
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
part3/
├── controllers/
│   └── persons.js
├── models/
│   └── person.js
├── utils/
│   ├── config.js
│   ├── logger.js
│   └── middleware.js
├── tests/
├── .env
├── .eslintrc.js
├── .gitignore
├── app.js
├── index.js
├── package.json
└── README.md
```

### Running the Application

Development mode with nodemon:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

### Testing

Run tests:
```bash
npm test
```

Run ESLint:
```bash
npm run lint
```

## 📝 Exercises

- **3.1-3.6**: Basic Express server and REST API
- **3.7-3.8**: HTTP GET requests and middleware
- **3.9-3.11**: Backend functionality for phonebook
- **3.12**: Command line database
- **3.13-3.14**: Phonebook database integration
- **3.15-3.18**: Database error handling
- **3.19-3.21**: Validation and deployment
- **3.22**: ESLint configuration

## 🌐 API Endpoints

### Persons API
- `GET /api/persons` - Get all persons
- `GET /api/persons/:id` - Get person by ID
- `POST /api/persons` - Create new person
- `PUT /api/persons/:id` - Update person
- `DELETE /api/persons/:id` - Delete person
- `GET /info` - Get application info

### Example API Response
```json
{
  "id": "1",
  "name": "Arto Hellas",
  "number": "040-123456"
}
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/phonebook
PORT=3001
NODE_ENV=development
```

## 🚀 Deployment

### Deploying to Railway/Render/Heroku

1. Build the application:
```bash
npm run build:ui
```

2. Set environment variables in your deployment platform
3. Deploy using platform-specific instructions

### Environment Variables for Production
- `MONGODB_URI`: Your production MongoDB connection string
- `NODE_ENV`: Set to "production"
- `PORT`: Will be set automatically by most platforms

*Completed by: Estivenm06*
