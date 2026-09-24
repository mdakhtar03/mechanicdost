const socketHandler = (io)=>{
    io.on('connection',(socket)=>{
        console.log('A user connected', socket.id); 

        //User/Mechanic Joins thier room based on their userId or mechanicId

        socket.on('joinRoom',(userId)=>{
            socket.join(userId)
            console.log(`User with userID ${userId} joined room`);
        })

        //Event
        //1. New request created by user

        socket.on('new-Request', (data)=>{
            io.emit('new-Request-Notification', data); 
        })


        //2. Request-Accepted by mechanic
        socket.on('request-accepted', (data)=>{
            io.to(data.userId).emit('mechanic-found', data);
        })

        //3. Location update -> mechanic sends location to user

        socket.on('location-update', (data)=>{
            io.to(data.userId).emit('location-update', data);
        })

        //4. Request completed by mechanic
        socket.on('request-completed', (data)=>{
            io.to(data.userId).emit('job-completed', data);
        })

        socket.on('disconnect',()=>{
            console.log('A user disconnected', socket.id);
        })  
    });
};

module.exports = socketHandler;