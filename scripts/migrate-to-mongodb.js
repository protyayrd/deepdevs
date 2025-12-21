/**
 * Migration script to move data from JSON files to MongoDB
 * Run this once after setting up MongoDB to migrate existing data
 * 
 * Usage: node scripts/migrate-to-mongodb.js
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/deepdevs-app';

// FAQ Schema
const FAQSchema = new mongoose.Schema({
  page: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { timestamps: true });

// Contact Schema
const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, default: '' },
  isRobot: { type: Boolean, default: false },
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const FAQ = mongoose.model('FAQ', FAQSchema);
const Contact = mongoose.model('Contact', ContactSchema);

async function migrate() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Migrate FAQs
    const faqsPath = path.join(process.cwd(), 'data', 'faqs.json');
    if (fs.existsSync(faqsPath)) {
      console.log('Migrating FAQs...');
      const faqsData = JSON.parse(fs.readFileSync(faqsPath, 'utf8'));
      
      // Check if FAQs already exist
      const existingCount = await FAQ.countDocuments();
      if (existingCount === 0 && faqsData.length > 0) {
        const faqsToInsert = faqsData.map(faq => ({
          page: faq.page,
          question: faq.question,
          answer: faq.answer,
        }));
        await FAQ.insertMany(faqsToInsert);
        console.log(`✓ Migrated ${faqsToInsert.length} FAQs`);
      } else {
        console.log(`⚠ FAQs already exist in database (${existingCount} found). Skipping migration.`);
      }
    } else {
      console.log('⚠ No FAQs file found. Skipping FAQ migration.');
    }

    // Migrate Contacts
    const contactsPath = path.join(process.cwd(), 'data', 'contacts.json');
    if (fs.existsSync(contactsPath)) {
      console.log('Migrating Contacts...');
      const contactsData = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
      
      // Check if Contacts already exist
      const existingCount = await Contact.countDocuments();
      if (existingCount === 0 && contactsData.length > 0) {
        const contactsToInsert = contactsData.map(contact => ({
          firstName: contact.firstName,
          lastName: contact.lastName,
          phoneNumber: contact.phoneNumber,
          emailAddress: contact.emailAddress,
          subject: contact.subject,
          message: contact.message || '',
          isRobot: contact.isRobot || false,
          submittedAt: new Date(contact.submittedAt || Date.now()),
        }));
        await Contact.insertMany(contactsToInsert);
        console.log(`✓ Migrated ${contactsToInsert.length} Contacts`);
      } else {
        console.log(`⚠ Contacts already exist in database (${existingCount} found). Skipping migration.`);
      }
    } else {
      console.log('⚠ No Contacts file found. Skipping Contact migration.');
    }

    console.log('\n✓ Migration completed successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('✗ Migration failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

migrate();

