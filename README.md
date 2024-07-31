# Laravel React Survey

This project showcases a full-stack survey application built with Laravel for the backend and React for the frontend. It demonstrates various development skills and functionalities.

Purpose
This project serves as a personal showcase to display your proficiency in Laravel, React, database integration, and user interface development.

Technology Stack
Backend:
PHP: 8.1
Laravel: 10.10
Database: MySQL
Frontend:
Node.js: 20.11
React: 18.3.1
Build Tool: Vite
CSS Framework: Tailwind CSS
Project Structure
The project follows a clear separation of concerns:

laravel/
  ... (Laravel application files)
react/
  ... (React application files)
All React code resides within the react folder, while Laravel handles the backend logic and database interaction.

Features
User Management:

Login and Registration functionalities.
Survey Management (CRUD):

Create new surveys.
Read existing surveys.
Update survey details.
Delete surveys.
Public Survey URL:

Generate unique URLs for surveys that can be shared with respondents.
Survey Response Collection:

Users can access surveys using the public URL and submit their responses.
Survey Answer Analysis:

View and analyze submitted survey responses within the application.
Please note: Image placeholders are included to represent the features. You can replace them with actual screenshots or visuals if desired.

Installation
Prerequisites:

PHP 8.1 or later with Composer installed
Node.js 14 or later with npm or yarn package manager
Laravel Project Setup:

Clone this repository:

Bash
git clone https://your-github-repository.com/laravel-react-survey.git
Use code with caution.

Navigate to the project directory:

Bash
cd laravel-react-survey
Use code with caution.

Install Laravel dependencies:

Bash
composer install
Use code with caution.

Generate the application key:

Bash
php artisan key:generate
Use code with caution.

Create a .env file by copying the .env.example file and configure database credentials and other necessary environment variables.

Migrate the database tables:

Bash
php artisan migrate
Use code with caution.

Start the Laravel development server:

Bash
php artisan serve
Use code with caution.

This will run the Laravel application at http://localhost:8000 by default.

React Project Setup:

Navigate to the react folder within the project directory:

Bash
cd react
Use code with caution.

Install React dependencies:

Bash
npm install
Use code with caution.

(or using yarn)

Bash
yarn install
Use code with caution.

Start the React development server:

Bash
npm run dev
Use code with caution.

(or using yarn)

Bash
yarn dev
Use code with caution.

This will run the React development server, typically at http://localhost:3000 by default.

Usage
Access the Laravel application in your browser (usually http://localhost:8000).
Login or register as a user.
Manage your surveys through the provided user interface.
Share the generated public URL with respondents to access surveys.
View and analyze survey responses within the application interface.
Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Please follow coding style guidelines and provide clear comments for your changes.   

Contact
For any questions or feedback, you can reach out via email: touhedulislam46@gmail.com or connect on LinkedIn: https://www.linkedin.com/in/touhedul

