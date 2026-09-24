require('dotenv').config()
const User = require('./models/User')
const connectDB = require('./config/db')

const seedAdmin = async () => {
    try {
        await connectDB()

        const existing = await User.findOne({ role: 'platformAdmin' })
        if(existing){
            console.log('Platform admin already exists:', existing.email)
            process.exit()
        }

        const admin = await User.create({
            name: 'MechanicDost Admin',
            email: 'mechanicdost.admin@gmail.com',
            password: 'Admin@123',
            phone: '9999999999',
            role: 'platformAdmin',
            isVerified: true
        })

        console.log('Platform admin created successfully!')
        console.log('Email:', admin.email)
        console.log('Password: Admin@123')
        process.exit()

    } catch (err) {
        console.error('Error creating admin:', err.message)
        process.exit(1)
    }
}

seedAdmin()