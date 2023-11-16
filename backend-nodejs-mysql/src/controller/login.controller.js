import { getData } from "../utils/util.js";


export default class LoginController {
  async loginUser(req, res) {
    try {
      const { username, password } = req.body; 

      const users = await getData("User");

      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        const role = user.role === 1 ? "admin" : "user";
        
        console.log('Login successful');
        const message = `Welcome, ${user.username}! You are logged in as ${role}.`;
        return res.status(200).json({ success: true, user: { ...user, role }, message });
      } else {
        console.log('Invalid username or password');
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ success: false, message: 'Server error during login' });
    }
  }

}

