import express from "express"
import userController from "../controllers/userController"

let Router = express.Router();

let initWebRoutes = (app) => {

    // Router.post('/api/login', userController.handleLogin)
    Router.get('/api/get-all-users', userController.handleGetAllUsers);
    Router.post('/api/create-new-user', userController.handleCreateNewUser);
    // Router.put('/api/edit-user', userController.handleEditUser);
    // Router.delete('/api/delete-user', userController.handleDeleteUser);

    return app.use("/", Router);
}

module.exports = initWebRoutes;