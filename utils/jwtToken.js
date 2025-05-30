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



