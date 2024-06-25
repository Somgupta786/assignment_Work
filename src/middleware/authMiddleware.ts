import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // Basic authentication logic
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Validate credentials here (example: basic auth token)
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  // Example: check against hardcoded credentials
  if (credentials !== 'username:password') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next(); // Authorized
};
