# Email Setup Guide - Task Manager

This guide will help you configure real email sending functionality for the Task Manager application.

## 📧 EmailJS Setup (Free & Easy)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service
1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or any provider you prefer)
4. Connect your Gmail account
5. Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Set up your template:

**Template Name:** Task Notification

**Subject:** {{subject}}

**Content:**
```
Hi there,

{{message}}

Best regards,
Task Manager App
```

4. Save and copy the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `abcdefghij123456`)

### Step 5: Update the Code
Open `src/utils/mailAutomation.js` and replace these values (around line 15-17):

```javascript
const serviceID = 'YOUR_SERVICE_ID';     // Replace with your Service ID
const templateID = 'YOUR_TEMPLATE_ID';   // Replace with your Template ID
const publicKey = 'YOUR_PUBLIC_KEY';     // Replace with your Public Key
```

**Example:**
```javascript
const serviceID = 'service_abc123';
const templateID = 'template_xyz789';
const publicKey = 'abcdefghij123456';
```

### Step 6: Test the Integration
1. Save the file
2. Restart your app (`npm start`)
3. Login to the application
4. Create some tasks
5. Check your email inbox (emails will be sent every 2 minutes)
6. Also check the browser console for confirmation

## 🔧 Alternative: Backend Email Service

If you prefer a backend solution, you can use:

### Option 1: Node.js with Nodemailer
Create a simple Express server with Nodemailer to send emails.

### Option 2: SendGrid API
Use SendGrid's API to send emails from the frontend.

### Option 3: Custom Backend
Build your own backend API endpoint to handle email sending.

## 📝 EmailJS Template Variables

Your template will receive these variables:
- `{{to_email}}` - Recipient email
- `{{subject}}` - Email subject
- `{{message}}` - Email body with task details
- `{{from_name}}` - "Task Manager App"

## 🎯 Features

Once configured, the app will:
- ✅ Send emails every **2 minutes**
- ✅ Include pending task count
- ✅ List overdue tasks
- ✅ List tasks due today
- ✅ List upcoming tasks (next 3 days)
- ✅ Show priority breakdown
- ✅ Send to the logged-in user's email

## 🚨 Troubleshooting

**Emails not sending?**
1. Check browser console for errors
2. Verify your Service ID, Template ID, and Public Key
3. Make sure you've connected your Gmail account in EmailJS
4. Check EmailJS dashboard for usage limits (free tier: 200 emails/month)

**Gmail blocking emails?**
1. Enable "Less secure app access" in Gmail settings
2. Or use Gmail App Password for better security

## 🔐 Security Note

The current implementation exposes API keys in the frontend. For production:
1. Move email sending to a backend server
2. Use environment variables for API keys
3. Implement rate limiting
4. Add authentication for API endpoints

## 💡 Current Behavior

**Without EmailJS configured:**
- Logs detailed email preview to browser console
- Shows what would be sent

**With EmailJS configured:**
- Sends actual emails to Gmail
- Also logs confirmation to console

---

**Need help?** Check the EmailJS documentation: https://www.emailjs.com/docs/
