# StoreAdmin

A lightweight, Supabase-powered admin dashboard for managing an e-commerce store.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38BDF8?style=flat&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)

**Live Demo:** [e-commerce-admin.vercel.app](https://e-commerce-admin-tau-virid.vercel.app/)


## Overview

StoreAdmin is the admin panel for an e-commerce platform, built for managing the day-to-day operations of a store — products, categories, and orders — from a single dashboard. It's built with vanilla JavaScript and Tailwind CSS on the frontend, with Supabase handling authentication and data storage on the backend. This is the admin/backend side of a larger project; the customer-facing storefront is planned as a future addition.

## Features

- 🔐 Secure admin authentication via Supabase, with route guarding (`guard.js`) to protect dashboard pages
- 📊 Live dashboard stats overview
- 🛍️ Product management — add, view, and search/filter products
- 🖼️ Product image upload
- 🗂️ Category management — add and view categories
- 📦 Order management with order status updates

## Tech Stack

- **HTML5** — page structure
- **Tailwind CSS v4** — styling (via CDN)
- **JavaScript (ES Modules)** — app logic, no framework
- **Supabase** — authentication, database, and image storage

## Project Structure

```
E-commerce-Admin-/
├── index.html          # Admin login page
├── index.js
├── dashboard.html       # Main dashboard with live stats
├── dashboard.js
├── product.html         # Product listing / search & filter
├── product.js
├── productAdd.html      # Add new product (with image upload)
├── productAdd.js
├── Category.html        # Category listing
├── Category.js
├── CategoryAdd.html     # Add new category
├── CategoryAdd.js
├── order.html            # Order management & status updates
├── order.js
├── guard.js              # Route guard for protected pages
├── supabase-client.js    # Supabase client initialization
└── .vscode/
```

## Getting Started

### Prerequisites

- A [Supabase](https://supabase.com) project (free tier works fine)
- A code editor and a local static server (e.g. the VS Code "Live Server" extension), since this project uses ES modules and doesn't run well from `file://`

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/hamza-stack404/E-commerce-Admin-.git
   cd E-commerce-Admin-
   ```

2. **Set up Supabase**
   - Create a new Supabase project
   - Set up tables for `products`, `categories`, and `orders`
   - Enable Supabase Auth (email/password) for admin login
   - Configure a Storage bucket for product images

3. **Connect Supabase to the project**
   - Open `supabase-client.js`
   - Add your Supabase project URL and public anon key

4. **Run locally**
   - Open the project folder with a local static server (e.g. VS Code Live Server)
   - Navigate to `index.html` to reach the login page

## Usage

1. Sign in with your admin credentials on the login page
2. From the **Dashboard**, view live store stats at a glance
3. Go to **Products** to search, filter, or add new products (with image upload)
4. Go to **Categories** to view or add product categories
5. Go to **Orders** to view incoming orders and update their status

All protected pages are guarded by `guard.js`, which redirects unauthenticated users back to the login page.

## What I Learned

- Building a working **auth guard** to secure routes on a plain multi-page site (no framework/router to lean on)
- Setting up **Tailwind CSS v4**, which has a different configuration approach compared to v3
- Structuring and querying **relational data** across products, categories, and orders in Supabase

## Future Improvements

- Build the customer-facing storefront (browsing, cart, checkout)
- Enable Supabase Row Level Security (RLS) policies for stronger data-level protection
- Add pagination for products/orders as data scales
- Add role-based access (e.g. multiple admin permission levels)
- Add analytics/charts to the dashboard stats
- Move to a bundler/build step for better asset and module management

## License

*No license specified yet.*
