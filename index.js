const express = require('express');
const app = express();
const fs = require('fs')
const PORT = 5000;
const cors = require('cors')

app.use(express.static('public'));
// app.get('/', (req, res) => {
//     res.send('Hello!');
// });

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
    const users = getUserData()
    res.send(users)
})

app.post('/users/add', (req, res) => {
    const existUsers = getUserData()
    const userData = req.body
    console.log("POST userdata",userData);
    existUsers.push(userData)
    console.log("POST",existUsers);
    saveUserData(existUsers);
    res.send({success: true, msg: 'User data added successfully'})
})

app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log("DELETE", id)
    const existUsers = getUserData()
    const filterUser = existUsers.filter(users => {
        return users.id !== id
      });
    console.log(filterUser);
    saveUserData(filterUser)
    res.send({success: true, msg: 'User removed successfully'})
    
})

app.put('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const data = req.body
    console.log("PUT userdata",data);
    const existUsers = getUserData()
    const user = existUsers.find(user => user.id === id);
    console.log("PUT",user);
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.phone = data.phone;
    user.gender = data.gender;
    saveUserData(existUsers)
    res.send({success: true, msg: 'User data updated successfully'})
})

const getUserData = () => {
    const jsonData = fs.readFileSync('users.txt')
    return JSON.parse(jsonData)    
}

const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('users.txt', stringifyData)
}

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));