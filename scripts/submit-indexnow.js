const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://xn--80adbi6agmb2c.xn--p1ai").replace(/\/$/, "");
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "6c8139c68f2399cc06fcbfe891be4574";

const urls = [SITE_URL, `${SITE_URL}/configurator`, `${SITE_URL}/sitemap.xml`, `${SITE_URL}/llms.txt`];

async function submitIndexNow() {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`IndexNow failed: ${response.status} ${response.statusText}\n${body}`);
  }

  console.log(`IndexNow accepted ${urls.length} URLs for ${SITE_URL}`);
}

submitIndexNow().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
