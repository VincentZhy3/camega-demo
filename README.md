# Camega User Management System

A complete user management system for the Camega health products website, designed specifically for GitHub Pages deployment. This system provides user registration, login, profile management, and more.

## Features

### 🔐 User Authentication
- Email/password registration and login
- Google OAuth integration
- Secure authentication with Firebase
- Session management
- Password reset functionality

### 👤 User Management
- User profile viewing and editing
- Password change functionality
- Persistent user data storage
- User dashboard with multiple features

### 🎨 User Interface
- Responsive design for mobile and desktop
- Modern UI design
- Consistent with existing website style
- English interface for international customers

## Technology Stack

### Frontend
- HTML5 + CSS3
- Vanilla JavaScript
- Firebase Authentication
- Responsive design

### Backend Services
- Firebase Authentication (serverless)
- Firebase Firestore (optional for data storage)
- Google OAuth integration

## Quick Start

### 1. Setup Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google providers
3. Get your Firebase configuration
4. Follow the detailed setup guide in [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

### 2. Configure Your Site

1. Replace the Firebase configuration in `user-management.html`:
```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### 3. Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select your source branch
4. Your site will be available at: `https://yourusername.github.io/camega-demo`

## Project Structure

```
camega-demo/
├── index.html              # Main page
├── user-management.html    # User management page
├── styles.css             # Stylesheet
├── articles/              # Articles directory
├── assets/                # Static assets
├── FIREBASE_SETUP.md     # Firebase setup guide
└── README.md             # Project documentation
```

## User Management Features

### Authentication
- **Email Registration**: Users can create accounts with email and password
- **Google Sign-in**: One-click login with Google accounts
- **Secure Login**: Industry-standard authentication with Firebase
- **Password Reset**: Users can reset forgotten passwords

### User Dashboard
- **Profile Management**: View and edit personal information
- **Order History**: Track past orders and shipments
- **Saved Articles**: Bookmark favorite health articles
- **Customer Support**: Easy access to help and support

### Security Features
- **Password Encryption**: Secure password hashing
- **JWT Tokens**: Secure session management
- **Input Validation**: Client and server-side validation
- **CORS Protection**: Secure cross-origin requests

## GitHub Pages Compatibility

This system is specifically designed for GitHub Pages deployment:

### ✅ What Works
- Static file hosting
- Client-side authentication
- Firebase integration
- Responsive design
- No server required

### ⚠️ Limitations
- No server-side processing
- All authentication handled by Firebase
- Data storage through Firebase services

## Firebase Integration

### Authentication Providers
- **Email/Password**: Traditional registration and login
- **Google OAuth**: Social login integration
- **Email Verification**: Optional email verification
- **Password Reset**: Automated password recovery

### Data Storage (Optional)
- **Firestore**: For user profiles and preferences
- **Realtime Database**: For real-time features
- **Storage**: For user avatars and files

## Customization

### Styling
The user management system uses the existing `styles.css` file and maintains consistency with your current design.

### Features
You can easily add or modify features by editing the JavaScript functions in `user-management.html`.

### Branding
Update colors, logos, and text to match your brand requirements.

## Security Best Practices

### 1. Firebase Security Rules
```javascript
// Example Firestore security rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 2. Domain Restrictions
- Add only your production domains to Firebase authorized domains
- Remove test domains after development
- Use environment variables for sensitive configuration

### 3. API Key Security
- Restrict API keys to your domain
- Use Firebase App Check for additional security
- Monitor usage in Firebase Console

## Deployment Guide

### GitHub Pages Deployment
1. **Push to GitHub**: Commit and push your changes
2. **Enable Pages**: Go to Settings > Pages
3. **Select Source**: Choose your main branch
4. **Configure Domain**: Add custom domain if needed
5. **Update Firebase**: Add your GitHub Pages domain to Firebase authorized domains

### Custom Domain Setup
1. **Add Custom Domain**: In GitHub repository settings
2. **Configure DNS**: Point your domain to GitHub Pages
3. **Update Firebase**: Add your custom domain to authorized domains
4. **SSL Certificate**: GitHub Pages provides automatic SSL

## Monitoring and Analytics

### Firebase Console
- Monitor user sign-ups and sign-ins
- Track authentication errors
- View user engagement metrics

### Google Analytics (Optional)
- Track user behavior
- Monitor page performance
- Analyze user demographics

## Cost Considerations

### Firebase Pricing
- **Authentication**: 10,000 authentications/month free
- **Firestore**: 1GB storage and 50,000 reads/day free
- **Hosting**: 10GB storage and 360MB/day transfer free

### GitHub Pages
- **Free**: Unlimited public repositories
- **Custom Domain**: Free SSL certificates
- **Bandwidth**: 100GB/month free

## Troubleshooting

### Common Issues

1. **"Firebase not initialized"**
   - Check Firebase SDK loading
   - Verify configuration object

2. **"Domain not authorized"**
   - Add GitHub Pages domain to Firebase
   - Wait for propagation (5-10 minutes)

3. **"Google sign-in not working"**
   - Enable Google provider in Firebase
   - Check authorized domains
   - Verify OAuth configuration

4. **"CORS errors"**
   - Should not occur with Firebase Auth
   - Check domain configuration

### Debug Mode
Add this to your HTML for debugging:
```javascript
firebase.auth().useDeviceLanguage();
```

## Future Enhancements

### Planned Features
- [ ] Email verification
- [ ] Advanced profile management
- [ ] Order tracking integration
- [ ] Article bookmarking
- [ ] User avatar upload
- [ ] Multi-language support
- [ ] Advanced analytics

### Third-party Integrations
- [ ] Payment processing (Stripe)
- [ ] Email marketing (Mailchimp)
- [ ] Customer support (Zendesk)
- [ ] Analytics (Google Analytics)

## Support

For technical support:
- Check [Firebase Documentation](https://firebase.google.com/docs)
- Review [GitHub Pages Documentation](https://pages.github.com/)
- Contact Firebase Support for authentication issues

## License

MIT License

## Contact

For questions or support:
- Email: support@camega.com
- Website: https://camega.com

---

**Camega Health Technology Limited** - Providing quality products for healthy living 