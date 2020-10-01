const receiver: any = async (event: any, context: any, callback: any): Promise<any> => {
  // console.log('SESHandler Invoked - v1');
  //const endpoint: any = new AWS.Endpoint(process.env.AWS_S3_ENDPOINT)
  // Get the mail event
  const mail = event.Records[0].ses.mail;

  console.log('context', context);
  console.log('mail', mail);

  const { timestamp, source, messageId } = mail;
  const { from, date, to, subject } = mail.commonHeaders;

  console.log({
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
