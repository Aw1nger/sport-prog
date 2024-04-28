const express = require("express");
const path = require("path");
const puppeteer = require("puppeteer");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const html = express();
const serverPort = 3000;
const htmlPort = 4000;
const host = process.env.host || "http://sport-prog.nekto-z.ru";
const apiProxy = createProxyMiddleware("/api", {
  target: host,
  changeOrigin: true,
});

const RENDER_CACHE = new Map();

async function ssr(url) {
  if (RENDER_CACHE.has(url)) {
    console.log("Use cache:", url);
    return { html: RENDER_CACHE.get(url), ttRenderMs: 0 };
  }

  const start = Date.now();

  const browser = await puppeteer.launch({
    executablePath: process.env.chromium || "",
    args: [
      "--disable-gpu",
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--no-zygote",
    ],
  });
  const page = await browser.newPage();
  try {
    await page.goto(url, {
      waitUntil: "networkidle0",
    });
  } catch (err) {
    console.error(err);
    throw new Error("page.goto/waitForSelector timed out.");
  }

  const html = await page.content();
  await browser.close();

  const ttRenderMs = Date.now() - start;
  console.info(`Headless rendered page in: ${ttRenderMs}ms`);

  RENDER_CACHE.set(url, html);

  return { html, ttRenderMs };
}

function handleOptions(req, res, next) {
  if (req.method === "OPTIONS") {
    // Если метод запроса OPTIONS, отправляем ответ со статусом 200
    res.sendStatus(200);
  } else {
    // Если это не запрос OPTIONS, передаем управление следующему middleware
    next();
  }
}

// Добавляем middleware для обработки запросов OPTIONS
app.use(handleOptions);
html.use(handleOptions);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, token, total_page"
  );
  next();
});

app.use(async (req, res, next) => {
  if (req.originalUrl === "/") {
    const { html, ttRenderMs } = await ssr(
      `http://localhost:4000${req.originalUrl}`
    );
    console.log("URL:", req.originalUrl);
    res.set(
      "Server-Timing",
      `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`
    );
    return res.status(200).send(html);
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, "../build")));
app.use("/api/docs", apiProxy);
app.use("/api", apiProxy);

app.get("*", async (req, res, next) => {
  const { html, ttRenderMs } = await ssr(
    `http://localhost:4000${req.originalUrl}`
  );
  console.log("URL:", req.originalUrl);
  res.set(
    "Server-Timing",
    `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`
  );
  return res.status(200).send(html);
});

app.listen(serverPort, function () {
  console.log(`Listening on port ${serverPort}`);
});

html.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

html.use(express.static(path.join(__dirname, "../build")));
html.use("/api/docs", apiProxy);
html.use("/api", apiProxy);

html.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

html.listen(htmlPort, function () {
  console.log(`Listening on port ${htmlPort}`);
});

