exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const body = JSON.parse(event.body);

    // ── LIFTIE lift status request ─────────────────────────────────────────
    if (body.type === "liftie") {
      const slugs = body.slugs || [];
      const results = await Promise.all(
        slugs.map(slug =>
          fetch(`https://liftie.info/api/resort/${slug}`)
            .then(r => r.ok ? r.json() : null)
            .catch(() => null)
        )
      );
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(results),
      };
    }

    // ── Anthropic API request ──────────────────────────────────────────────
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(data),
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: { message: err.message } }),
    };
  }
};
