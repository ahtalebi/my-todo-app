# 📝 My Todo App

A modern, full-stack todo application built with **Next.js** and **Supabase**. Features user authentication, real-time data synchronization, and a clean, responsive interface.

![Todo App Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black) ![Supabase](https://img.shields.io/badge/Supabase-Backend-green)

## 🌐 Live Demo

**Try it live:** [https://my-todo-app-lake-seven.vercel.app](https://my-todo-app-lake-seven.vercel.app)

Create an account and start managing your tasks!

## ✨ Features

- 🔐 **User Authentication** - Secure signup/login with email
- 📝 **Task Management** - Create, complete, and delete todos
- ✅ **Mark as Complete** - Visual feedback with strikethrough
- 🔄 **Real-time Updates** - Changes sync instantly
- 🎨 **Responsive Design** - Works on desktop and mobile
- 🔒 **Data Privacy** - Each user sees only their own todos
- ☁️ **Cloud Storage** - Data persists across devices

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **JavaScript** - Programming language

### Backend
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database
- **Row Level Security** - Data protection
- **Supabase Auth** - Authentication system

### Deployment
- **Vercel** - Frontend hosting
- **GitHub** - Version control

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │◄──►│   Supabase API  │◄──►│ PostgreSQL DB   │
│   (Frontend)    │    │   (Backend)     │    │   (Storage)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
      Vercel                 Cloud                 Cloud
```

## 📊 Database Schema

```sql
todos table:
├── id (uuid, primary key)
├── task (text, not null)
├── is_complete (boolean, default: false)
├── user_id (uuid, foreign key)
└── created_at (timestamp)
```

## 🚀 Local Development

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Git installed

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahtalebi/my-todo-app.git
   cd my-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create `.env.local` in the root directory:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   
   Run this SQL in your Supabase SQL Editor:
   ```sql
   -- Create todos table
   create table todos (
     id uuid default gen_random_uuid() primary key,
     task text not null,
     is_complete boolean default false,
     user_id uuid references auth.users not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Enable Row Level Security
   alter table todos enable row level security;

   -- Create policies
   create policy "Users can view own todos"
     on todos for select using (auth.uid() = user_id);

   create policy "Users can create own todos"
     on todos for insert with check (auth.uid() = user_id);

   create policy "Users can update own todos"
     on todos for update using (auth.uid() = user_id);

   create policy "Users can delete own todos"
     on todos for delete using (auth.uid() = user_id);
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Deploy!

## 📝 Usage

1. **Sign Up** - Create a new account with email and password
2. **Confirm Email** - Check your inbox for confirmation link
3. **Log In** - Access your personal todo dashboard
4. **Add Todos** - Type a task and click "Add" or press Enter
5. **Complete Tasks** - Click the checkbox to mark as done
6. **Delete Tasks** - Click the "✕" button to remove

## 🔐 Security Features

- **Row Level Security (RLS)** - Users can only access their own data
- **Authentication Required** - All operations require valid login
- **Secure Password Storage** - Passwords are encrypted by Supabase
- **Environment Variables** - Sensitive keys stored securely

## 🎨 Customization

### Styling
- Edit `app/globals.css` for global styles
- Modify Tailwind classes in `app/page.js`
- Color scheme defined in the component

### Features
Add new functionality by:
- Adding database columns for new fields
- Updating the React component
- Creating new Supabase policies if needed

## 📱 Mobile Responsive

The app is fully responsive and works great on:
- 📱 Mobile phones (iOS/Android)
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

## 🐛 Common Issues

### Build Errors
- Check environment variables are set correctly
- Ensure Supabase URL and keys are valid
- Verify database table exists

### Authentication Issues
- Confirm email verification is completed
- Check Supabase Auth settings
- Verify RLS policies are correctly configured

## 🚀 Future Enhancements

Potential features to add:
- 📅 Due dates for tasks
- 🏷️ Categories and tags
- ⭐ Priority levels
- 📎 File attachments
- 👥 Shared todos
- 📊 Progress analytics
- 🌙 Dark mode toggle
- 📱 Push notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Author

**Amir H. Talebi**
- GitHub: [@ahtalebi](https://github.com/ahtalebi)
- Project: [my-todo-app](https://github.com/ahtalebi/my-todo-app)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vercel](https://vercel.com/) - Platform for deployment

---

**⭐ If you found this project helpful, please give it a star on GitHub!**

Made with ❤️ and ☕ by Amir
