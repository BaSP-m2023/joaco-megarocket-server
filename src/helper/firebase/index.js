import * as admin from 'firebase-admin';

require('dotenv').config();

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCTb8AOdzY/kbu2\nihg8GG90F58kFUz25jncjRS7+nMsvuOmQ/ZQXFeNwiBjHRnCfhCkBXj1lUYJR3Nh\nSS4QJR5PN3WQqKyQWk4l+HqU5aMMJwTRMybqba318IxuOXm+VFDEvKR7kfefksU4\nyTYyRRt+scLZk6Z6uwwMbORc3/24DEuRQkZkfiDBCjsZa3QEcaQJnNsl8mNLWXHI\nd414125hfoKBSumXYbAv2hfEC/Zr5pdLVA9I9IM+UAGsL01F3WITmsVgNr8YaDS5\nKVXP3JG27J96Tgov3rPIskul2K4QjqSBBKPjnSLDVvZ91b8EwW3oEV99uwQytDDt\nt+FjLS75AgMBAAECggEADGD5GJ3UvbCgOJrOnxkUHoSvNWnebOp2mDh2MbQ9AFhE\np9yT7TpblYjjjD7Qv14zSno1JjVyzGul2di5l9xt94u6ALvQxUv3vMNok2DWeDo8\ncs4fKdasoPYh7E1CFgNhRqtqCf/+8PRzP6nRNZZM0S3epML7WtmikNaBs/SQimfJ\nMHSP60NSn81rRIiOxADDagRKbiXkE8j23KtkTZMK5cBLru/9OCFOPio5OiBm9vqr\nri0RRNwybc7qFxsf6tih19eLKa9FEbs19doKdDsSpE5G/KkaLEKmvbif+9nKAbk3\nKbAcwJM79sIRiwk+IeGGHE5YEUp427D0P8gwcmgPCwKBgQDOAkfMsiin0MuTRibn\n4Hj8+VTQCtprUOo5/pU5z6w/+N8+8qUjB4fk68geMMwHRI6S4XG1a/jjSkgcvqEa\nLrPhkgYhTIW4obNDGinmf+YbdReP9gFzEUHtG9dEJ7lLVChT3hGEh5QHswgEbgIQ\nOx80dlxVnv6bde+0w6lL86AtAwKBgQC3NtOQStRNjHirCaO45OILrsHG1ZJFRSx+\nx0pJYWmAfLYuHza88vg6EJ2rThXZRP8r8XHJu/m6JWx2FTUavIHXw4LGfomnZCdi\nfHQUjda9AMWT4Z9vQTAqPkASDghoyJQljzvdtHqZlkAXHRKxLYmRIIwyM0rEPjrq\nWJt+xiHdUwKBgFxkCW90N2eL7MEQJUK5GYnbCH6FX4/hqip4UtSqnsXSB81jZUxg\nhEHWvNlNaTOZO5gEI8sJsYW+OrkphXcImwP/SWCFwTMc0hi2EzSdB8YorXiTC/Nf\nOgHtCo42gpOWGsACSDj31Rve3ymdbK961HPi4WZE+EsgiXC4j6TQjnWhAoGAFzp/\nRjsGgbJ+lgjJ1iZGtn54mPH48olbo9M2iukrzBuDqYNRmFEhwZLbup1SzdIem/6n\nk5Eej0gxYSM9MV+XArkJ+oqOf0eGaskmmniFMj9HzYD8isl0BtcPnnpi/I35om1v\nhKNeK9zN0WBhP09rspeyzqaMIydUpuOHC2KpZnsCgYB1OWNf9PvnXlWI7CNfNYv7\na5NW4uBDrC+b6EapXWkvSAgc+6t5xPR9cukY214BgIFxT7lW9sVBIARvE2N7pS3+\n7M1EarNPvKx+4JYE1pIo1dEd7wnH17qDGATZQcj7+dUNNw0XKl5h5FMXzvNe5StT\n3tqGessqW0gEHKJgKcf2SQ==\n-----END PRIVATE KEY-----\n',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    type: process.env.FIREBASE_TYPE,
    privateKeyID: process.env.FIREBASE_PRIVATE_KEY_ID,
    clientID: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
});

export default firebaseApp;
