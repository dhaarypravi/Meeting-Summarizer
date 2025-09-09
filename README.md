# 📝 Meeting Summarizer

A web application that automatically summarizes meeting transcripts using **AI**.  
Built with **Next.js**, **TypeScript**, and **Gemini API**, this app generates structured summaries, including key decisions, action items, and next steps.

# Demo link : https://fabulous-raindrop-6f6f73.netlify.app/

---

## ✨ Features
- 🎙️ **Transcript Input** – Paste or upload meeting transcripts.  
- 🤖 **AI Summaries** – Generates concise summaries using Google Gemini AI.  
- 📄 **Structured Output** – Summaries include:
  - Executive Summary  
  - Key Decisions  
  - Action Items with owners & deadlines  
  - Risks/Blockers  
  - Next Steps  
- 📧 **Email Summary** – Send generated summaries directly via email.  
- 🖥️ **Responsive UI** – Works on both desktop and mobile devices.  

---

## 🛠️ Tech Stack
| Technology      | Purpose                  |
|-----------------|--------------------------|
| **Next.js**     | Frontend & API Routes   |
| **TypeScript**  | Type safety             |
| **Google Gemini API** | AI-based summarization |
| **TailwindCSS** | Styling                 |
| **SendGrid**    | Email service           |
| **Vercel**      | Deployment              |

---

## 🚀 Getting Started

### **1. Clone the repository**
```bash
git clone https://github.com/dhaaryparvi/Meeting-Summarizer.git
cd Meeting-Summarizer
2. Install dependencies
bash
Copy code
npm install
3. Setup environment variables
Create a .env.local file in the root directory and add the following:

env
Copy code
GEMINI_API_KEY=your_gemini_api_key_here
SENDGRID_API_KEY=your_sendgrid_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
4. Run the development server
bash
Copy code
npm run dev
Your app will be live at: http://localhost:3000
```
# 📂 Project Structure
csharp
Copy code
```
Meeting-Summarizer/
│
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   │   └── summarize/      # Meeting summarizer endpoint
│   │       └── route.ts
│   │
│   └── page.tsx            # Home page UI
│
├── components/             # Reusable UI components
│
├── styles/                 # Global styles
│
├── public/                 # Static assets
│
├── .env.local              # Environment variables
└── README.md

```
# 🧑‍💻 Usage
Summarize a Meeting Transcript
Paste the meeting transcript into the text box.

(Optional) Add a custom prompt for better summary control.

Click "Generate Summary".

The AI will return a structured summary in Markdown format.

Send Summary via Email
After generating a summary, click "Send Email".

Enter the recipient's email address.

The summary will be sent using SendGrid.

# 📊 Example Summary Output
Executive Summary
The team discussed progress on the Q3 marketing campaign and identified blockers related to budget approvals.

Key Decisions
Approved a 20% budget increase for digital ads.

Move product launch date to October 15th, 2025.

Action Items
Owner	Task	Deadline
Sarah	Draft new campaign plan	Sept 15
John	Update budget spreadsheet	Sept 12

Risks/Blockers
Delay in finance approval for extra budget.

Next Steps
Conduct follow-up meeting next Monday.

# 🌍 Deployment
To deploy on Vercel:

bash
Copy code
vercel
Make sure your .env.local variables are also configured in Vercel project settings.

# 🤝 Contributing
Pull requests are welcome!

Steps to contribute:
```
bash
Copy code
# 1. Fork the repo
# 2. Create a feature branch
git checkout -b feature-name

# 3. Commit your changes
git commit -m "Added new feature"

# 4. Push to the branch
git push origin feature-name

# 5. Open a pull request
🐞 Troubleshooting
Email Issues:
If emails go to spam or are blocked:

Verify your domain with SendGrid.

Add SPF, DKIM, and DMARC records to your domain settings.

```

# 📜 License
This project is licensed under the MIT License.

yaml
Copy code

---

### **How to Add It**
1. Create a `README.md` file in your project's root folder.
2. Paste the above content into it.
3. Save and commit it:
   ```bash
   git add README.md
   git commit -m "Added README file"
   git push origin main
