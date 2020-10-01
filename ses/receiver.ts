const receiver: any = async (event: any, context: any, callback: any): Promise<any> => {
  console.log('SESHandler Invoked - v1', context);

  // const endpoint: any = new AWS.Endpoint(process.env.AWS_S3_ENDPOINT)
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

  //const originalReference = !references ? null : references.value.split(" ")[0]
  const { from, date, to, subject } = mail.commonHeaders;

  console.log({
    //originalReference,
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

  callback(null, {
    from: from[0],
    to: to[0],
    subject,
    date,
    timestamp,
    source,
    messageId,
  });
}

export default receiver;
