const getMail = require('../fn/getMail.js');
const getNew = require('../fn/getNewMail.js');
const markMailAsRead = require('../fn/markMailAsRead.js');
const sendMail = require('../fn/sendMail.js');
const offerFileForDownload = require('../fn/offerFileForDownload.js');

module.exports = [
  {
      method: 'GET',
      path: '/messages/',
      handler: (req, reply) => {
          getMail()
          .then((messages) => {
              reply(messages);
          })
          .catch((err) => {
              reply(err);
          });
      },
  },
  {
      method: 'GET',
      path: '/getnew/',
      handler: (req, reply) => {
          getNew()
          .then((newMessages) => {
            reply(newMessages);
          })
          .catch((err) => {
              reply(err);
          });
      },
  },
  {
      method: 'POST',
      path: '/sendmail/',
      handler: (req, reply) => {
          sendMail({
              to: req.payload.to,
              from: req.payload.from,
              cc: req.payload.cc,
              bcc: req.payload.bcc,
              subject: req.payload.subject,
              text: req.payload.text,
          }).then((data) => {
              reply(data);
          }).catch((err) => {
              reply(err);
          });

      }
  },
  {
      method: 'PUT',
      path: '/markasread/',
      handler: (req, reply) => {
          markMailAsRead(req.payload.id);
          reply({});
      }
  },
  {
    method: 'GET',
    path: '/download/{cid}',
    handler: (req, reply) => {
      offerFileForDownload(req.params.cid)
      .then((attachment) => {
        return reply.file(attachment.file.path,
          {
            filename: attachment.file.filename,
            mode: 'attachment',
          },
        );
      })
      .catch((err) => {
        console.log('err during offerFileForDownload function:\n', err);
        reply(err);
      });
    }
  },
  {
    method: 'POST',
    path: '/upload_attachment',
    config: {
      payload: {
        output: 'file',
        maxBytes: 209715200,
        parse: true,
        // allow: 'application/x-www-form-urlencoded'
      },
      handler: (request, reply) => {
        /*
        ** use this to check client later
        ** maybe restrict to localhost by default
        */
        const { headers } = request;
        const { path } = request.payload.attachment;
        // return object with path on server
        // to pass in tosendMail
        console.log('got to reply');
        reply({ path });
      }
    }
  },
];
