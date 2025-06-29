# 🔑 Gemini API Setup Guide for Quiznetic

This guide will help you set up valid Google Gemini API keys for the Quiznetic application.

## 📋 Prerequisites

- Google Account
- Access to Google AI Studio or Google Cloud Console
- Basic understanding of environment variables

## 🚀 Step-by-Step Setup

### 1. Get Gemini API Keys

#### Option A: Google AI Studio (Recommended for Development)

1. **Visit Google AI Studio**
   - Go to [https://aistudio.google.com/](https://aistudio.google.com/)
   - Sign in with your Google account

2. **Create API Key**
   - Click on "Get API key" in the left sidebar
   - Click "Create API key"
   - Choose "Create API key in new project" or select existing project
   - Copy the generated API key (starts with `AIza...`)

3. **Generate Multiple Keys (Optional)**
   - For rate limiting protection, create 2-8 API keys
   - Each key should be from the same or different projects

#### Option B: Google Cloud Console (Recommended for Production)

1. **Create/Select Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Generative Language API**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Generative Language API"
   - Click "Enable"

3. **Create API Keys**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API key"
   - Copy the generated key
   - Optionally restrict the key to specific APIs

### 2. Configure Environment Variables

1. **Update .env File**
   ```bash
   # In frontend/.env file
   VITE_GEMINI_API_KEY_1=your_first_api_key_here
   VITE_GEMINI_API_KEY_2=your_second_api_key_here
   VITE_GEMINI_API_KEY_3=your_third_api_key_here
   # ... up to 8 keys
   ```

2. **Verify Keys Format**
   - Valid Gemini API keys start with `AIza`
   - Length is typically 39 characters
   - Example: `AIzaSyBY3JRDz66RYCkRVPO0sil_akc-wGLxKGk`

### 3. Test Your Setup

1. **Run the Test Script**
   ```bash
   cd frontend
   node test-api.js
   ```

2. **Expected Output**
   ```
   Testing all Gemini API keys...
   
   Key 1 - Status: 200
   Key 1 - SUCCESS: API key is working
   
   === SUMMARY ===
   Working keys: 1/1
   🎉 SUCCESS! You have working API keys.
   ```

### 4. Start the Application

```bash
cd frontend
npm run dev
```

## 🔧 Troubleshooting

### Common Issues

#### ❌ "API key not valid"
- **Cause**: Invalid or expired API key
- **Solution**: 
  - Regenerate API key in Google AI Studio
  - Check for typos in .env file
  - Ensure no extra spaces or quotes

#### ❌ "API_KEY_INVALID"
- **Cause**: Key format is incorrect
- **Solution**: 
  - Verify key starts with `AIza`
  - Check key length (should be ~39 characters)
  - Copy key directly from Google AI Studio

#### ❌ "Quota exceeded"
- **Cause**: Rate limit reached
- **Solution**: 
  - Wait for quota reset
  - Add more API keys for rotation
  - Upgrade to paid plan if needed

#### ❌ "Service unavailable"
- **Cause**: Gemini API service is down
- **Solution**: 
  - App will automatically use fallback questions
  - Check Google Cloud Status page
  - Try again later

### API Key Best Practices

1. **Security**
   - Never commit API keys to version control
   - Use environment variables only
   - Restrict keys to specific APIs in Google Cloud

2. **Rate Limiting**
   - Use multiple keys for higher throughput
   - Implement exponential backoff (already included)
   - Monitor usage in Google Cloud Console

3. **Production Deployment**
   - Use Google Cloud Console for production keys
   - Set up billing alerts
   - Monitor API usage and costs

## 📊 API Limits & Pricing

### Free Tier (Google AI Studio)
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per minute

### Paid Tier (Google Cloud)
- Higher rate limits
- Pay-per-use pricing
- Enterprise support

## 🆘 Getting Help

1. **Check Console Logs**
   - Open browser developer tools
   - Look for API error messages
   - Check network tab for failed requests

2. **Run Diagnostics**
   ```bash
   # Test individual API key
   curl -X POST \
     "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
   ```

3. **Fallback Mode**
   - If API keys fail, app uses sample questions
   - Look for yellow warning banner
   - Functionality remains available

## 🎯 Production Checklist

- [ ] Valid API keys configured
- [ ] Keys tested and working
- [ ] Environment variables set
- [ ] Rate limiting configured
- [ ] Error handling tested
- [ ] Fallback mode verified
- [ ] Monitoring set up (optional)

---

**Need more help?** Check the [Google AI documentation](https://ai.google.dev/docs) or [Google Cloud documentation](https://cloud.google.com/docs). 