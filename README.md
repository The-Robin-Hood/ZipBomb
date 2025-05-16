# 💣 Zip Bomb Trap Demo

This project demonstrates a way to defend against malicious bots and crawlers by serving a compressed file (zip bomb) that decompresses into a massive payload, overwhelming memory-limited or poorly coded bots.

Read this [blog post](https://example.com) for more details.

---

### ⚙️ What It Does

- Runs a Express server (written in TypeScript).
- Serves a regular homepage at `/`.
- Serves a maliciously crafted gzip file at `/trap`.
  - Appears small (e.g., 10MB).
  - Decompresses into a massive file (e.g., 10GB).
  - Can break naive crawlers, scrapers, or vulnerability scanners.

Includes a **simulated bot client** that:
- Sends `Accept-Encoding: gzip` header.
- Downloads and attempts to decompress the trap.
- Simulates a crash if memory exceeds a threshold (e.g., 500MB).

---

## 🧱 Project Structure

```
zip-bomb-demo/
├── public/
│ └── 10GB.gz # The zip bomb file
├── server.ts # Express server
├── bot.js # Crawler simulator (Node.js)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠 Setup Instructions

```bash
git clone <your-repo-url>
cd zip-bomb-demo
bun install # or npm install
mkdir -p public
dd if=/dev/zero bs=1G count=10 | gzip -c > public/10GB.gz  # ->> Create a 10GB gzip file
bun run server.ts 
bun run bot.ts
```

----