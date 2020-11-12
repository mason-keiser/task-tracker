# task-tracker
A full stack CRUD application to keep track and organize daily tasks

* Link: https://planner.masonkeiser.com/
# Technologies Used
* React.js
* Node.js
* Express
* PostgreSQL
* Webpack 4
* HTML 5
* CSS 3
* Bootstrap 4
* AWS EC2
# Features
* User can add a checklistitem to their active table
* User can change the status of a checklistitem
* User can delete a checklistitem
# Development
## System Requirements
* Node.js 10 or higher
* NPM 6 or higher
* PostgreSQL 10 or higher
# Getting Started
1. Clone this repository:
```
git clone https://github.com/mason-keiser/task-tracker.git
```
2. Locate cloned repository: 
```
cd task-tracker
```
3. Install all dependencies with NPM:
```
npm install
```
4. Start postgreSQL server in terminal:
```
sudo service posgresql start
``` 
5. Create database that you will be using for the site:
```
createdb taskTracker
```
6. Import database to PostgreSQL:
```
npm run db:import
```
7. Open a second terminal; navigate to project directory, start pgweb:
```
pgweb --db=taskTracker
```
8. Start the project (in another terminal). You can view the application by opening http://localhost:3000 in your browser:
```
npm run dev
```
