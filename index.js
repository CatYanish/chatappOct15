const express = require('express')
const app = express()
const port = 3000

// Implement a set of APIs that can accomplish the following:

// - After joining, a user can send a message to that chat room.
// - A user can retrieve messages from a chat room that they have joined.
// - (Optional) A user can leave a chat room.

// The server should support multiple chat rooms.

// Take into account this API will be consumed by a basic chat app (think: slack, discord, basecamp, etc).


let chatRooms = []
// let chatRoom = {
//     id: "",
//     message: [],
// }

app.get('read/:chatID', (request, response) => {
	response.send('Hello, Notion!')
})

app.post('/send/:chatID', (request, response) => {
    let chatID = request.params.chatID
    let message = request.query.message
    let username = request.query.name

    let chatExists = false;
    for (let index = 0; index < chatRooms.length; index++) {
        const chatRoomID = chatRooms[index].id;
        if (chatRoomID === chatID) {
            chatExists = true;
            let newMessage = {
                user: username, 
                copy: message,
                date: Date.now(),
            }
            chatRooms[index].messages.push(newMessage)      
            console.log(JSON.stringify(chatRooms[index]))
            response.send('Hello, Notion!')
            return
        }
    }


    if (!chatExists) {
        response.send("could not find the chat for chatID", 400)
        return
    }    
})

app.post('/join/:chatID', (request, response) => {
    let chatID = request.params.chatID
    let username = request.query.name


    let chatExists = false
    for (let index = 0; index < chatRooms.length; index++) {
        const chatRoomID = chatRooms[index].id;
        if (chatRoomID === chatID) {
            chatExists = true
            chatRooms[index].users.push(username)      
        }
    }

    if (!chatExists) {
        let newChatRoom = {
            id: chatID,
            messages: [],
            users:[username],
        }
    
        chatRooms.push(newChatRoom)
    }


    console.log(JSON.stringify(chatRooms))
	response.send('success! you joined the chat')
})




app.listen(port, () => {
	console.log(`Basic HTTP Server listening at http://localhost:${port}`)
})