const emailTemplate =(otp)=>{
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #0078d7;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      text-align: center;
    }
    .email-body h2 {
      margin: 0 0 10px;
      font-size: 20px;
      color: #0078d7;
    }
    .email-body p {
      margin: 0 0 20px;
      line-height: 1.5;
    }
    .otp {
      display: inline-block;
      font-size: 24px;
      font-weight: bold;
      background: #f1f1f1;
      padding: 10px 20px;
      margin: 20px 0;
      border-radius: 8px;
      color: #0078d7;
    }
    .footer {
      background-color: #f9f9f9;
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #666;
    }
    .footer a {
      color: #0078d7;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="email-header">
      <h1>Email Verification</h1>
    </div>
    <!-- Body -->
    <div class="email-body">
      <h2>Verify Your Email</h2>
      <p>Dear User,</p>
      <p>We received a request to verify your email for login. Please use the OTP below to proceed:</p>
      <div class="otp">${otp}</div>
      <p>This OTP is valid for 5 minutes. If you did not request this, please ignore this email.</p>
    </div>
    <!-- Footer -->
    <div class="footer">
      <p>If you have any issues, please contact our <a href="mailto:support@yourdomain.com">support team</a>.</p>
      <p>&copy; 2024 Your Company Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
}

module.exports = emailTemplate;