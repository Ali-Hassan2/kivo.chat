# Signup Flow (User Registration)

ENTRY
user submits { username, email, password }

IF username exists AND isVerified
return "Username already taken"

IF username exists AND not verified
IF verificationCode is expired
generate new verificationCode
send via Resend API
return "Verification code expired. A new one has been sent."
ELSE
resend existing verificationCode
return "Please verify your account before proceeding."

IF email exists AND isVerified
return "Email already registered"

IF email exists AND not verified
IF verificationCode is expired
generate new verificationCode
send via Resend API
return "Verification code expired. A new one has been sent."
ELSE
resend existing verificationCode
return "Please verify your account before proceeding."

ELSE
create new user { username, email, password, isVerified = false }
generate verificationCode
send verification email via Resend API
return "Verification code sent successfully"
