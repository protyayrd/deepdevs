# Admin Panel Setup

## Prerequisites

### MongoDB Setup

1. **Install MongoDB locally** (if not already installed):
   - macOS: `brew install mongodb-community`
   - Windows: Download from [MongoDB website](https://www.mongodb.com/try/download/community)
   - Linux: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB service**:
   - macOS: `brew services start mongodb-community`
   - Windows: MongoDB should start automatically as a service
   - Linux: `sudo systemctl start mongod`

3. **Verify MongoDB is running**:
   ```bash
   mongosh
   # or
   mongo
   ```

### Environment Variables

1. Create a `.env.local` file in the root directory
2. Add the following variables:
   ```env
   # MongoDB Connection String
   # For local MongoDB (default):
   MONGODB_URI=mongodb://localhost:27017/deepdevs-app
   
   # For MongoDB Atlas (cloud), use:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/deepdevs-app
   
   # Admin Panel Password
   ADMIN_PASSWORD=your-secure-password-here
   ```

3. Restart your Next.js development server after creating `.env.local`

## Migrating Existing Data (Optional)

If you have existing data in JSON files and want to migrate to MongoDB:

1. Make sure MongoDB is running
2. Run the migration script:
   ```bash
   node scripts/migrate-to-mongodb.js
   ```

This will migrate all FAQs and Contacts from `data/faqs.json` and `data/contacts.json` to MongoDB.

## Accessing the Admin Panel

1. Navigate to `/admin/login` in your browser
2. Enter the admin password (set in `.env.local`)

## Features

### FAQ Management
- View all FAQs by page
- Add new FAQs
- Edit existing FAQs
- Delete FAQs
- Manage FAQs for multiple pages:
  - Homepage
  - Yoler
  - Plantzify
  - SeSign
  - Deep Study AI
  - Ztax

### Contact Submissions
- View all contact form submissions
- See submission details including:
  - Name, email, phone number
  - Subject and message
  - Submission timestamp

## Data Storage

The admin panel now uses **MongoDB** for data storage:
- **Database**: `deepdevs-app` (or as specified in MONGODB_URI)
- **Collections**:
  - `faqs` - FAQ data
  - `contacts` - Contact form submissions

### MongoDB Collections Structure

**FAQs Collection:**
```javascript
{
  _id: ObjectId,
  page: String, // 'homepage', 'yoler', 'plantzify', etc.
  question: String,
  answer: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Contacts Collection:**
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  emailAddress: String,
  subject: String,
  message: String,
  isRobot: Boolean,
  submittedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### MongoDB Connection Issues

1. **Check if MongoDB is running**:
   ```bash
   # macOS/Linux
   brew services list
   # or
   sudo systemctl status mongod
   ```

2. **Check connection string**: Make sure `MONGODB_URI` in `.env.local` is correct

3. **Check MongoDB logs**: Look for connection errors in your Next.js console

### Data Not Showing

- Make sure you've run the migration script if you had existing JSON data
- Check MongoDB using `mongosh`:
  ```bash
  mongosh
  use deepdevs-app
  db.faqs.find()
  db.contacts.find()
  ```

