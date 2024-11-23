# Kutez Internship Case


## Tech Stack

### Backend

- NodeJS (Express)
- API used: https://www.goldapi.io/dashboard

### Frontend

- React + Vite
- Tailwind CSS

---

- I've used **node-cache** to avoid exceeding API quotas. The fiat equivalent of gold is being cached for 4 hours. The API provider limits requests to 100 per month.

- Both backend and frotend are deployed on Vercel.

- Additionally, I have added a filter button to the frontend.

---

## Running on Local Computer

- /backend/.env:
```
# Application Configuration
NODE_ENV=development
PORT=3000

# API Keys
METAL_PRICE_API_KEY=<goldapi-key-here>
```

- /frontend/.env:
`
VITE_BACKEND_URL=<localhost:3000>
METAL_PRICE_API_KEY=<goldapi-key-here>
`

