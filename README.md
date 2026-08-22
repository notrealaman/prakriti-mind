🧠 Prakriti Mind

«Your Mental Health Matters.»

Prakriti Mind is a modern mental-health support platform designed to make professional psychological assistance more accessible. The platform provides users with an easy way to explore mental-health resources, interact through a support chat interface, and request a free 30-minute professional assistance session.

🔗 Live Demo: https://prakriti-mind.vercel.app/
🔗 GitHub: https://github.com/notrealaman/prakriti-mind

---

✨ Features

💬 Support Chat

An integrated chat interface allows users to interact with the platform and begin the assistance/session process directly from the website.

🧑‍⚕️ Professional Assistance

Users can request a free 30-minute psychological assistance session through the platform.

🔒 Confidential Support

The interface emphasizes privacy and confidentiality while providing users with a simple and approachable experience.

📚 Mental Health Resources

The platform includes a dedicated blog section where users can access educational and informational content related to mental health.

📝 Session & Evaluation Flow

Dedicated routes are included for sessions and evaluations, allowing the application to manage the support workflow.

📊 Data Management

The application includes a database abstraction layer that can use Upstash Redis when configured, while also supporting a local JSON-based fallback for development.

🎨 Responsive UI

Built with a responsive component-based interface designed to work across desktop and mobile screen sizes.

---

🛠️ Tech Stack

Technology| Purpose
Next.js 16| Full-stack React framework
React 19| UI development
Tailwind CSS 4| Styling and responsive design
JavaScript| Application logic
Upstash Redis| Optional cloud database
ESLint| Code quality and linting
Vercel| Deployment

The project dependencies and scripts are defined in "package.json".

---

🏗️ Project Structure

prakriti-mind/
│
├── public/
│   ├── logo.png
│   └── ...
│
├── src/
│   │
│   ├── app/
│   │   ├── about/
│   │   ├── api/
│   │   ├── blog/
│   │   ├── books/
│   │   ├── contact/
│   │   ├── evaluation/
│   │   ├── portal/
│   │   ├── session/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── components/
│   │   ├── AboutPreview.jsx
│   │   ├── BlogPreview.jsx
│   │   ├── ChatWidget.jsx
│   │   ├── CtaSection.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   └── OpenChatButton.jsx
│   │
│   ├── data/
│   │   └── posts.js
│   │
│   └── lib/
│       ├── assignment.js
│       └── db.js
│
├── .gitignore
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── jsconfig.json
└── README.md

The current source is organized around Next.js App Router pages, reusable React components, data, and shared library utilities.

---

🚀 Getting Started

1. Clone the repository

git clone https://github.com/notrealaman/prakriti-mind.git

2. Navigate to the project

cd prakriti-mind

3. Install dependencies

npm install

4. Start the development server

npm run dev

The application will be available at:

http://localhost:3000

---

📜 Available Scripts

Development

npm run dev

Starts the Next.js development server.

Production Build

npm run build

Creates an optimized production build.

Production Server

npm run start

Starts the application using the production build.

Lint

npm run lint

Runs ESLint against the project.

---

🔐 Environment Variables

The application can optionally use Upstash Redis for persistent cloud-based data storage.

Create a ".env.local" file in the project root:

KV_REST_API_URL=your_upstash_redis_url
KV_REST_API_TOKEN=your_upstash_redis_token

Alternatively, the database layer supports:

UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

If Redis is not configured, the application falls back to its local JSON database/seed data.

«⚠️ Never commit your ".env.local" file or expose private API credentials.»

---

🧩 Architecture

Prakriti Mind follows a component-based Next.js architecture.

                 ┌─────────────────────┐
                 │     Next.js App      │
                 └──────────┬──────────┘
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
        UI Components     App Routes     API Routes
             │              │              │
             └──────────────┼──────────────┘
                            │
                            ▼
                    Database Layer
                            │
                  ┌─────────┴─────────┐
                  │                   │
                  ▼                   ▼
             Upstash Redis       Local JSON

The database utility checks for Redis configuration and uses Upstash when available, otherwise falling back to local file/seed data.

---

🎨 Main User Experience

The homepage is composed of reusable sections including:

- Header
- Hero section
- About preview
- Blog preview
- Call-to-action section
- Footer

The hero section introduces the platform's free 30-minute assistance offering and provides entry points to the support chat and blog.

---

🗺️ Application Routes

The application currently contains dedicated sections for:

/               → Homepage
/about          → About
/blog           → Mental health blog
/books          → Books/resources
/contact        → Contact
/evaluation     → Evaluation flow
/portal         → Portal
/session        → Session flow
/api            → Application API routes

---

📦 Deployment

The project can be deployed using Vercel or another platform capable of running Next.js applications.

Deploy with Vercel

1. Import the GitHub repository into Vercel.
2. Configure the required environment variables.
3. Deploy the project.
4. Open the generated deployment URL.

The repository already includes a live Vercel deployment at:

https://prakriti-mind.vercel.app/

---

🔮 Future Improvements

Potential improvements for future versions include:

- [ ] User authentication
- [ ] Improved appointment scheduling
- [ ] Email/SMS session notifications
- [ ] Professional dashboard
- [ ] User session history
- [ ] Advanced mental-health resources
- [ ] Analytics dashboard
- [ ] Improved accessibility
- [ ] Automated testing
- [ ] CI/CD pipeline
- [ ] Enhanced AI-assisted support features

---

⚠️ Disclaimer

Prakriti Mind is intended to provide access to mental-health resources and support services.

It should not be considered a replacement for emergency services, professional medical diagnosis, or treatment.

If someone is experiencing an immediate mental-health emergency, they should seek appropriate professional or emergency assistance.

---

🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a new branch:

git checkout -b feature/your-feature

3. Make your changes.
4. Commit your changes:

git commit -m "Add your feature"

5. Push the branch:

git push origin feature/your-feature

6. Open a Pull Request.

---

📄 License

This project currently does not specify a license.

If you intend to make the project open source, consider adding an appropriate license such as MIT.

---

👨‍💻 Author

Aman

GitHub: https://github.com/notrealaman

---

<p align="center">
  Made with ❤️ using Next.js
</p>