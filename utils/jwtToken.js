// export const generateToken = (user, message, statusCode, res) => {
//   const token = user.generateJsonWebToken();

//   // Determine the cookie name based on the user's role
//   let cookieName;
//   if (user.role === 'Admin') {
//     cookieName = 'adminToken';
//   } else if (user.role === 'Doctor') {
//     cookieName = 'doctorToken';
//   } else {
//     cookieName = 'patientToken';
//   }

//   res
//     .status(statusCode)
//     .cookie(cookieName, token, {
//       expires: new Date(
//         Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: true,
//       secure: true,         // ✅ Only send over HTTPS
//       sameSite: "None",     // ✅ Allow cross-site cookies (between frontend & backend)
//     })
//     .json({
//       success: true,
//       message,
//       user,
//       token,
//     });
// };


export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  // Determine token name based on role
  let tokenName;
  if (user.role === 'Admin') {
    tokenName = 'adminToken';
  } else if (user.role === 'Doctor') {
    tokenName = 'doctorToken';
  } else {
    tokenName = 'patientToken';
  }

  res.status(statusCode).json({
    success: true,
    message,
    user,
    token,
    tokenName, // Tell frontend what name to store it as (optional but helpful)
  });
};



