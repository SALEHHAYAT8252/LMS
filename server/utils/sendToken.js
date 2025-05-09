export const sendToken = (user, statusCode, message, res) => {
    // console.log("I am in send token");
    try {
      // 1. Generate JWT token (ensure user.generateToken() is defined in User model)
      const token = user.generateToken(); // Fixed: user.getJwtToken() instead of user.generateToken()
    //   console.log(token);

      // 2. Set cookie options
    //   console.log(process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000); test COOKIE_EXPIRE
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };

      // 3. Send response with cookie and JSON data
      res.status(statusCode)
        .cookie("token", token, cookieOptions) // Fixed: "token" instead of sendToken
        .json({
          success: true,
          user,
          message,
          token, // Send token in response (optional)
        });
    } catch (error) {
      // console.error("Error in sendToken:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
