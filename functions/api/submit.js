// Proxy for the Google Form behind the Submit page.
//
// The page used to POST to Google directly with mode: "no-cors", which makes the
// response opaque: a rejected submission is indistinguishable from an accepted
// one, so the page showed "Submission received" either way. Google silently
// dropped every submission for a stretch and nothing surfaced it.
//
// Running the POST here instead means we can read Google's real status code and
// hand the browser an honest answer.

const GOOGLE_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSemeU58lIKQTYBnLn0ZFR6hA--n7b5jxi7JhdSAv2VSkImJzw/formResponse";

// Everything the Google Form requires. Anything else is dropped rather than
// forwarded, so the endpoint cannot be used to post arbitrary fields.
const ALLOWED_FIELDS = [
  "emailAddress",
  "entry.525735177", // Full name
  "entry.1150894213", // Challenge tier
  "entry.1273546212", // Gender
  "entry.1435247792", // Age
  "entry.969096334", // Strava links
];

export async function onRequestPost({ request }) {
  let submitted;
  try {
    submitted = await request.formData();
  } catch {
    return json({ ok: false, error: "Could not read the submitted form." }, 400);
  }

  const params = new URLSearchParams();
  const missing = [];
  for (const field of ALLOWED_FIELDS) {
    const value = submitted.get(field);
    if (typeof value !== "string" || value.trim() === "") {
      missing.push(field);
      continue;
    }
    params.append(field, value);
  }

  if (missing.length) {
    return json(
      { ok: false, error: "Some required answers were missing.", missing },
      400
    );
  }

  let upstream;
  try {
    upstream = await fetch(GOOGLE_FORM, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
  } catch {
    return json(
      { ok: false, error: "Could not reach Google Forms. Try again in a moment." },
      502
    );
  }

  if (upstream.ok) {
    return json({ ok: true }, 200);
  }

  // A 400 from Google means the form rejected the answers, most often because a
  // required question or setting changed on their side without the page knowing.
  return json(
    {
      ok: false,
      status: upstream.status,
      error:
        "Google Forms rejected the submission. Nothing was recorded, so please " +
        "get in touch rather than assuming it went through.",
    },
    502
  );
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
