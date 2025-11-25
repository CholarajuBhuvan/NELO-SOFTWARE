/**
 * Mail Automation Utility
 * Checks for pending tasks and sends email notifications every 2 minutes
 * Uses EmailJS for sending emails to official Gmail
 */

/**
 * Send email using EmailJS service
 * @param {string} toEmail - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} message - Email message body
 */
async function sendEmail(toEmail, subject, message) {
  try {
    // Using EmailJS - Free email service for frontend applications
    // You need to set up an account at https://www.emailjs.com/
    
    const serviceID = 'service_mw24vcu'; // Your EmailJS service ID
    const templateID = 'template_xpql7jg'; // Your EmailJS template ID
    const publicKey = 'pDG7bErcgY15ZBqKy'; // Your EmailJS public key
    
    const emailData = {
      to_email: toEmail,
      subject: subject,
      message: message,
      from_name: 'Task Manager App'
    };

    // If EmailJS is configured, send the email
    if (serviceID !== 'YOUR_SERVICE_ID' && typeof window.emailjs !== 'undefined') {
      const response = await window.emailjs.send(serviceID, templateID, emailData, publicKey);
      console.log('✅ Email sent successfully!', response);
      return { success: true, response };
    } else {
      // Fallback: Log to console if EmailJS is not configured
      console.log('⚠️ EmailJS not configured. Email would be sent to:', toEmail);
      console.log('📧 Subject:', subject);
      console.log('📄 Message:', message);
      return { success: false, message: 'EmailJS not configured' };
    }
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error };
  }
}

/**
 * Check for pending tasks and send email notifications
 * This function is called every 2 minutes by the App component
 */
export async function checkMailNotifications() {
  const tasks = JSON.parse(sessionStorage.getItem('tasks') || '[]');
  const userSession = JSON.parse(sessionStorage.getItem('userSession') || '{}');
  
  // Filter pending tasks
  const pendingTasks = tasks.filter(task => !task.completed);
  
  // Filter overdue tasks
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueTasks = pendingTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  });

  // Filter tasks due today
  const todayTasks = pendingTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate.getTime() === today.getTime();
  });

  // Filter tasks due in the next 3 days
  const upcomingDate = new Date(today);
  upcomingDate.setDate(upcomingDate.getDate() + 3);
  const upcomingTasks = pendingTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate > today && dueDate <= upcomingDate;
  });

  // Log notification summary
  console.log('='.repeat(60));
  console.log('📧 TASK NOTIFICATION EMAIL - ' + new Date().toLocaleString());
  console.log('='.repeat(60));
  console.log(`To: ${userSession.email || 'user@example.com'}`);
  console.log(`Subject: Task Reminder - You have ${pendingTasks.length} pending task(s)`);
  console.log('-'.repeat(60));
  
  if (pendingTasks.length === 0) {
    console.log('✅ Great job! You have no pending tasks.');
  } else {
    console.log(`\n📊 TASK SUMMARY:`);
    console.log(`   Total Pending: ${pendingTasks.length}`);
    console.log(`   ⚠️  Overdue: ${overdueTasks.length}`);
    console.log(`   📅 Due Today: ${todayTasks.length}`);
    console.log(`   🔔 Upcoming (3 days): ${upcomingTasks.length}`);

    if (overdueTasks.length > 0) {
      console.log('\n⚠️  OVERDUE TASKS:');
      overdueTasks.forEach((task, index) => {
        console.log(`   ${index + 1}. [${task.priority.toUpperCase()}] ${task.title}`);
        console.log(`      Due: ${new Date(task.dueDate).toLocaleDateString()}`);
      });
    }

    if (todayTasks.length > 0) {
      console.log('\n📅 DUE TODAY:');
      todayTasks.forEach((task, index) => {
        console.log(`   ${index + 1}. [${task.priority.toUpperCase()}] ${task.title}`);
      });
    }

    if (upcomingTasks.length > 0) {
      console.log('\n🔔 UPCOMING (Next 3 Days):');
      upcomingTasks.forEach((task, index) => {
        console.log(`   ${index + 1}. [${task.priority.toUpperCase()}] ${task.title}`);
        console.log(`      Due: ${new Date(task.dueDate).toLocaleDateString()}`);
      });
    }

    // Priority breakdown
    const highPriority = pendingTasks.filter(t => t.priority === 'high').length;
    const mediumPriority = pendingTasks.filter(t => t.priority === 'medium').length;
    const lowPriority = pendingTasks.filter(t => t.priority === 'low').length;

    console.log('\n🎯 PRIORITY BREAKDOWN:');
    console.log(`   🔴 High: ${highPriority}`);
    console.log(`   🟡 Medium: ${mediumPriority}`);
    console.log(`   🟢 Low: ${lowPriority}`);
    
    // Build email message
    let emailMessage = `Task Reminder\n\n`;
    emailMessage += `📊 TASK SUMMARY:\n`;
    emailMessage += `Total Pending: ${pendingTasks.length}\n`;
    emailMessage += `⚠️ Overdue: ${overdueTasks.length}\n`;
    emailMessage += `📅 Due Today: ${todayTasks.length}\n`;
    emailMessage += `🔔 Upcoming (3 days): ${upcomingTasks.length}\n\n`;
    
    if (overdueTasks.length > 0) {
      emailMessage += `⚠️ OVERDUE TASKS:\n`;
      overdueTasks.forEach((task, index) => {
        emailMessage += `${index + 1}. [${task.priority.toUpperCase()}] ${task.title}\n`;
        emailMessage += `   Due: ${new Date(task.dueDate).toLocaleDateString()}\n`;
      });
      emailMessage += `\n`;
    }
    
    if (todayTasks.length > 0) {
      emailMessage += `📅 DUE TODAY:\n`;
      todayTasks.forEach((task, index) => {
        emailMessage += `${index + 1}. [${task.priority.toUpperCase()}] ${task.title}\n`;
      });
      emailMessage += `\n`;
    }
    
    if (upcomingTasks.length > 0) {
      emailMessage += `🔔 UPCOMING (Next 3 Days):\n`;
      upcomingTasks.forEach((task, index) => {
        emailMessage += `${index + 1}. [${task.priority.toUpperCase()}] ${task.title}\n`;
        emailMessage += `   Due: ${new Date(task.dueDate).toLocaleDateString()}\n`;
      });
      emailMessage += `\n`;
    }
    
    emailMessage += `🎯 PRIORITY BREAKDOWN:\n`;
    emailMessage += `🔴 High: ${highPriority}\n`;
    emailMessage += `🟡 Medium: ${mediumPriority}\n`;
    emailMessage += `🟢 Low: ${lowPriority}\n\n`;
    emailMessage += `Stay organized and complete your tasks on time!`;
    
    // Send actual email
    await sendEmail(
      userSession.email || 'user@example.com',
      `Task Reminder - You have ${pendingTasks.length} pending task(s)`,
      emailMessage
    );
  }

  console.log('\n' + '-'.repeat(60));
  console.log('💡 Tip: Stay organized and complete your tasks on time!');
  console.log('='.repeat(60));
  console.log('\n');

  // Store last notification time
  sessionStorage.setItem('lastNotificationTime', new Date().toISOString());

  return {
    totalPending: pendingTasks.length,
    overdue: overdueTasks.length,
    dueToday: todayTasks.length,
    upcoming: upcomingTasks.length
  };
}

/**
 * Get time until next notification
 * @returns {string} - Formatted time string
 */
export function getTimeUntilNextNotification() {
  const lastNotification = sessionStorage.getItem('lastNotificationTime');
  if (!lastNotification) return 'First notification will run immediately';

  const lastTime = new Date(lastNotification);
  const nextTime = new Date(lastTime.getTime() + 20 * 60 * 1000); // Add 20 minutes
  const now = new Date();
  const diff = nextTime - now;

  if (diff <= 0) return 'Next notification is due now';

  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return `Next notification in ${minutes}m ${seconds}s`;
}
