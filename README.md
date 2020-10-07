# Unused Serverless SES worker

Lambda function for getting the headers from SES. To process the body (which is kinda what we wanted), you'll need to go SES → S3 → SQS → Lambda. Which is too much work when other vendors offer webhooks out of the box. 
 
## Setup
```
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=xxx
export API_PATH=xxx
serverless deploy
```
