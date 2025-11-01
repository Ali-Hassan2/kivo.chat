METHOD CHECK
Verify if the request method is POST.
If not, return “Method not allowed.”

REQUEST ID EXTRACTION
Extract requestId from the URL query parameters.
Decode and validate the requestId using schema validation.
If invalid, return “Validation error.”

SESSION VALIDATION
Get the current session using getServerSession.
If no user is logged in, return “Please login first.”

DATABASE CONNECTION
Connect to the database before proceeding.

REQUEST DOCUMENT VALIDATION
Find the request document by requestId.
If not found, return “Request not found.”

RECEIVER VALIDATION
Find the receiver user by requestDoc.to.
If not found, return “Receiver not found.”

RECEIVER AUTHORIZATION
Check if the logged-in user is the same as the receiver.
If not, return “Only receiver can reject this request.”

SENDER VALIDATION
Find the sender user by requestDoc.from.
If not found, return “Sender not found.”

UPDATE REQUEST STATUS
Set the request status to REJECTED and save the request document.

REMOVE REQUEST REFERENCES
Remove the requestId from both sender and receiver requests arrays.
Save both updated user documents.

RETURN SUCCESS RESPONSE
Return success message “Request rejected successfully.” with requestId.
