
const https = require('https')

const receiver: any = async (event: any, context: any, callback: any): Promise<any> => {
  try {
    console.log('SESHandler Invoked - v1');

    // Get the mail event
    const mail = event.Records[0].ses.mail;
    const {
      timestamp,
      source,
      headers,
    } = mail;
    const contentId = headers.filter(header => header.name.toUpperCase() == "CONTENT-ID")[0];
    const inReplyTo = headers.filter(header => header.name.toUpperCase() == "IN-REPLY-TO")[0];
    const references = headers.filter(header => header.name.toUpperCase() == "REFERENCES")[0];
    const messageId = headers.filter(header => header.name.toUpperCase() == "MESSAGE-ID")[0];
    const { from, date, to, subject } = mail.commonHeaders;

    // These are the values we get from SES
    // NO BODY! 😭
    console.log({
      timestamp,
      source,
      messageId,
      inReplyTo,
      contentId,
      references,
      messageIdNotHeader: mail.messageId,
      from: from[0],
      to: to[0],
      subject,
      date,
    });

    // Makes a webhook request
    const postdata = JSON.stringify({ mail })
    const postoptions = {
      hostname: process.env.API_PATH.replace('https://',''),
      port: 443,
      path: '/posts/webhook',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postdata.length
      }
    }

    await new Promise((resolve, reject) => {
      var request = https.request(postoptions, (res) => {
          const body = [];

          res.setEncoding('utf8');
          res.on('data', (chunk) => body.push(chunk));
          res.on('end', () => resolve(body.join('')));
      });

      request.on('error', (err) => reject(err))
      request.write(postdata);
      request.end();
    })

    // END
    context.done()

    // And
    callback(null);

    // Just in case
    return true
  } catch (e) {
    return false
  }
}

export default receiver;
