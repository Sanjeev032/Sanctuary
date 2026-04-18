import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User';

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/peace-sanctuary');

        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@peace.local' });
        
        if (adminExists) {
            console.log('Admin user already exists');
            process.exit(1);
        }

        const salt = await bcrypt.genSalt(10);
        // Using exactly the password required by the user
        const hashedPassword = await bcrypt.hash('KUM@r029', salt);

        await User.create({
            name: 'Master Admin',
            email: 'admin@peace.local',
            password: hashedPassword,
            role: 'admin'
        });

        console.log('Admin user seeded successfully. Password: KUM@r029');
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
