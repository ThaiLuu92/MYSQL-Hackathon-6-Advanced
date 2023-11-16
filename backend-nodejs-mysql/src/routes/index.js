import loginRouter from "./login.route.js";
import taskRouter from "./task.route.js";
import userRouter from "./user.route.js";




export default function route(app) {
    app.use("/api/v1/tasks" , taskRouter);
    app.use("/api/v1/users" , userRouter);
    app.use("/api/v1/login" , loginRouter);

}