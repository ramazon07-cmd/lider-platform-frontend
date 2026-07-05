# Lider Platformasi Frontend Deployment

## Vercel environment variables

```env
VITE_API_BASE_URL=https://<backend-service>.onrender.com/api/v1
VITE_MOCK_MODE=false
```

## Vercel settings
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm ci`

`vercel.json` handles React Router refreshes.
