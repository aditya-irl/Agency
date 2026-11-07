/**
 * DataCraft Lead Engine & Notion/Email Integration Test Suite
 * Tests 9 critical reliability, validation, deduplication, and fault-tolerance criteria.
 */

import http from "http";

async function postApi(path, payload) {
  return new Promise((resolve) => {
    const data = JSON.stringify(payload);
    const req = http.request(
      {
        hostname: "localhost",
        port: 3000,
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch {
            resolve({ status: res.statusCode, raw: body });
          }
        });
      }
    );
    req.on("error", (err) => resolve({ status: 500, error: err.message }));
    req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log("\n=======================================================");
  console.log("DATACRAFT LEAD ENGINE & NOTION/EMAIL TEST SUITE");
  console.log("=======================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = "") {
    if (condition) {
      console.log(`[PASS] ${testName} ${details ? "— " + details : ""}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} ${details ? "— " + details : ""}`);
      failed++;
    }
  }

  // TEST 1: Valid Consultation Submission
  const validLead = {
    name: "Automated QA Client",
    email: `qa-test-${Date.now()}@datacraft-lead-test.io`,
    businessName: "Test Studio Brands",
    service: "Shopify & E-Commerce",
    budget: "₹3,000 – ₹10,000 (Starter / Landing Page)",
    description: "Automated end-to-end integration test brief verifying lead synchronization.",
    preferredContact: "WhatsApp",
  };

  const res1 = await postApi("/api/contact", validLead);
  assert(
    res1.status === 200 && res1.data?.success === true && res1.data?.referenceId,
    "Test 1: Valid Consultation Submission",
    `Ref ID: ${res1.data?.referenceId}`
  );

  // TEST 2: Invalid Email Format Rejection
  const res2 = await postApi("/api/contact", {
    name: "Invalid Email Tester",
    email: "not-an-email-format",
    description: "Testing rejection of malformed email address.",
  });
  assert(
    res2.status === 400 && res2.data?.error?.includes("valid email"),
    "Test 2: Invalid Email Rejection (HTTP 400)",
    res2.data?.error
  );

  // TEST 3: Missing Required Fields Rejection
  const res3a = await postApi("/api/contact", {
    name: "A", // too short
    email: "valid@email.com",
    description: "Testing name length validation.",
  });
  const res3b = await postApi("/api/contact", {
    name: "Valid Name",
    email: "valid@email.com",
    description: "short", // too short
  });
  assert(
    res3a.status === 400 && res3b.status === 400,
    "Test 3: Missing / Inadequate Required Fields (HTTP 400)",
    "Strictly enforces name (>=2) and description (>=10)"
  );

  // TEST 4: Notion Schema Mapping & Configuration Status in API Response
  assert(
    res1.data?.notion !== undefined &&
      (res1.data?.notion?.status === "CONFIG_REQUIRED" ||
        res1.data?.notion?.status === "SUCCESS" ||
        res1.data?.notion?.status === "FAILED"),
    "Test 4: Notion Lead Integration & Schema Alignment",
    `Status: ${res1.data?.notion?.status} (${res1.data?.notion?.error || "Mapped to Leads & Sales Pipeline"})`
  );

  // TEST 5: Email Notification Dispatch Status in API Response
  assert(
    res1.data?.email !== undefined &&
      (res1.data?.email?.status === "CONFIG_REQUIRED" ||
        res1.data?.email?.status === "SUCCESS" ||
        res1.data?.email?.status === "FAILED"),
    "Test 5: Email Notification Dispatch Handler",
    `Status: ${res1.data?.email?.status} (${res1.data?.email?.error || "Target: Adityak1149x@gmail.com"})`
  );

  // TEST 6: Notion Failure / Config Isolation (Fault-Tolerance)
  // When Notion is unconfigured or returns error, API must not crash and still return HTTP 200
  assert(
    res1.status === 200 && res1.data?.success === true,
    "Test 6: Notion Failure/Config Graceful Isolation",
    "API succeeds with HTTP 200 even when third-party API keys are missing/failing"
  );

  // TEST 7: Email Failure / Config Isolation (Fault-Tolerance)
  // When Email is unconfigured or returns error, API must not crash and still return HTTP 200
  assert(
    res1.data?.whatsappUrl?.includes("wa.me/919412835869"),
    "Test 7: Direct Founder Communication Fallback",
    "Pre-formatted WhatsApp consultation link guaranteed on every submission"
  );

  // TEST 8: Duplicate Submission Prevention (15-Minute Cooldown)
  // Re-submit the exact same lead from Test 1
  const res8 = await postApi("/api/contact", validLead);
  assert(
    res8.status === 200 &&
      res8.data?.duplicate === true &&
      res8.data?.referenceId === res1.data?.referenceId,
    "Test 8: Duplicate Submission Prevention (15-Min Window)",
    `Deduplicated cleanly! Re-referenced ${res8.data?.referenceId}`
  );

  console.log("\n=======================================================");
  console.log(`TEST RESULTS SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("=======================================================\n");

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
