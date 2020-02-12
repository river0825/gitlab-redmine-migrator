import * as express from 'express'

const app = express();
const port = process.env.ADMIN_PORT || "8080";

app.get('/users', () => {

});

app.post('/users', () => {

});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

