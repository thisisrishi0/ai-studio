# DesiCart - Next-Gen Indian E-Commerce App

DesiCart is a modern, responsive Single Page Application (SPA) designed to simulate a high-traffic Indian e-commerce storefront (similar to Amazon India or Flipkart). It features a sleek "Black & White" aesthetic, real-time cart management, an AI-powered shopping assistant, and a hybrid backend architecture.

## 🚀 Key Features

*   **Localized Storefront**: Designed for the Indian market with INR currency formatting (`₹`), specific bank offers, delivery estimates, and "Great Indian Festival" style branding.
*   **AI Shopping Assistant ("Gennie")**: Powered by **Google Gemini 2.5 Flash**, this floating chat assistant helps users compare products and find deals using natural language.
*   **Hybrid Backend**: 
    *   **Default**: Uses `localStorage` to simulate persistence and latency, allowing the app to work instantly without server setup.
    *   **Cloud Ready**: Includes a fully implemented **Supabase** adapter in `services/db.ts` that can be toggled on for production.
*   **Dynamic UI**:
    *   **Cart Drawer**: Slide-out interaction preventing page reloads.
    *   **Product Details**: comprehensive view with image galleries, specifications, and reviews.
    *   **Search & Filter**: Real-time filtering by category and keywords.
*   **Minimalist Aesthetic**: High-contrast Black & White theme using Tailwind CSS.

## 📂 Project Structure

```
/
├── index.html              # Entry point. Includes Tailwind CDN and Import Maps.
├── index.tsx               # React Application Root.
├── App.tsx                 # Main Controller (Routing, Global State, Session ID).
├── types.ts                # TypeScript Interfaces (Product, CartItem, Category).
├── constants.ts            # Mock Data (Seed) and Currency Formatters.
├── metadata.json           # Application permissions configuration.
│
├── services/
│   ├── db.ts               # Database Abstraction Layer (LocalDB vs CloudDB).
│   └── geminiService.ts    # Google GenAI API Client configuration.
│
└── components/
    ├── Navbar.tsx          # Sticky header with Search, Cart badge, and User nav.
    ├── HeroCarousel.tsx    # Promotional banner component.
    ├── ProductCard.tsx     # Individual product grid item.
    ├── ProductDetail.tsx   # Full product page (Reviews, Buy Box, Specs).
    ├── CartDrawer.tsx      # Slide-out shopping cart manager.
    ├── SignIn.tsx          # Dedicated Login page.
    └── GeminiAssistant.tsx # Floating AI Chat Interface.
```

## 🛠 Tech Stack

*   **Frontend**: React 18, TypeScript
*   **Styling**: Tailwind CSS (via CDN)
*   **AI**: Google Gemini API (`@google/genai`)
*   **Backend**: Supabase (Optional/Ready), LocalStorage (Default)
*   **Icons**: Heroicons (SVG)
*   **Fonts**: Inter (Google Fonts)

## ⚙️ Configuration & Setup

### 1. AI Assistant (Gemini)
The app expects an API key for the Google Gemini API.
*   The key is accessed via `process.env.API_KEY` in `services/geminiService.ts`.
*   The model used is `gemini-2.5-flash`.

### 2. Database (Local vs Cloud)
The database logic is handled in `services/db.ts`.

**Default Mode (Local Storage):**
No setup required. The app initializes with data from `constants.ts` and persists changes to the browser's `localStorage` under `desicart_products_v1` and `desicart_cart_v1`.

**Cloud Mode (Supabase):**
To enable a real backend:
1.  Open `services/db.ts`.
2.  Set `const USE_CLOUD_DB = true;`.
3.  Fill in `SUPABASE_URL` and `SUPABASE_KEY`.
4.  Run the SQL schema provided below in your Supabase SQL Editor.

### 3. Database Schema (SQL)
Use the following SQL to set up the Supabase tables with Row Level Security (RLS):

```sql
-- 1. Products Table
create table products (
  id text primary key,
  title text not null,
  category text,
  price numeric,
  original_price numeric,
  rating numeric,
  review_count integer,
  image text,
  is_best_seller boolean,
  delivery_date text,
  description text,
  bank_offers text[],
  is_sponsored boolean,
  limited_deal boolean,
  features text[]
);

-- 2. Cart Items Table
create table cart_items (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  product_id text references products(id),
  quantity integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, product_id)
);

-- 3. Enable RLS
alter table products enable row level security;
alter table cart_items enable row level security;

-- 4. Policies
create policy "Public read" on products for select using (true);
create policy "User Cart" on cart_items for all using (user_id = current_setting('app.current_user_id', true));
```

## 🧩 Component Logic

*   **App.tsx**: Generates a robust `userId` (UUID) upon first load. This ID is used to scope cart items to the specific user/browser session, ensuring that even if using a shared backend, users only see their own items.
*   **GeminiAssistant.tsx**: Maintains a chat session history. It injects a system prompt defining the persona "Gennie"—a polite, Indian-market savvy shopping assistant.
*   **ProductDetail.tsx**: Handles image gallery switching and calculates discounts dynamically based on `originalPrice` vs `price`.
*   **CartDrawer.tsx**: Uses optimistic UI updates (UI updates immediately before the DB operation finishes) to ensure the interface feels snappy.

## 🎨 Theme Customization

The theme is configured in `index.html` via `tailwind.config`.
*   **Colors**: The palette is strictly monochrome (`#000000` Black, `#FFFFFF` White, `#F3F4F6` Gray) to mimic a high-end, clean aesthetic.
*   **Typography**: Uses `Inter` for high legibility on high-density data screens.

---
© 2024 DesiCart Demo
