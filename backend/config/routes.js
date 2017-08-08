const getMail = require('../fn/getMail.js');
const getNew = require('../fn/getNewMail.js');
const sendMail = require('../fn/sendMail.js');

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
                toAddresses: [req.payload.to],
                from: req.payload.from,
                subject: req.payload.subject,
                text: req.payload.text,
            }).then((data) => {
                reply(data);
            }).catch((err) => {
                reply(err);
            });

        }
    },
];
