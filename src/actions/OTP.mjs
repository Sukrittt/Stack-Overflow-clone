// import twilio from "twilio";
// import readlineSync from "readline-sync";

// export const authentication = (mobile) => {
//   // console.log(mobile);
//   const accountSid = "ACefc073b898525251f32a623ea6a066b5";
//   const authToken = "ceb9530f4967704a211301d13555a630";
//   const verifySid = "VA3d50c8d4a5a2953f800bc66cff5a2c85";
//   const client = new twilio(accountSid, authToken);

//   client.verify.v2
//     .services(verifySid)
//     .verifications.create({ to: "+918240849936", channel: "sms" })
//     .then((verification) => console.log(verification.status))
//     .then(async () => {
//       try {
//         const otpCode = readlineSync.question("Please enter the OTP: ");
//         console.log("Received OTP:", otpCode);
//         const verificationCheck = await client.verify.v2
//           .services(verifySid)
//           .verificationChecks.create({ to: "+918240849936", code: otpCode });
//         console.log(verificationCheck.status);
//       } catch (error) {
//         console.error("Got an Error:", error);
//       }
//     });
// };
