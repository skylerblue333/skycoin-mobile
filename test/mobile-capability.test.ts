import assert from "node:assert/strict";
import test from "node:test";
import { MobileCapabilityRegistry } from "../src/mobile-capability.js";

test("filters available capabilities by platform", () => {
  const registry = new MobileCapabilityRegistry();
  registry.register({ id: "chat", platforms: ["android", "ios"], requiresNetwork: true, requiresAuth: true, status: "available" });
  registry.register({ id: "wallet", platforms: ["web"], requiresNetwork: true, requiresAuth: true, status: "planned" });
  assert.deepEqual(registry.availableFor("ios").map((item) => item.id), ["chat"]);
});

test("launch assessment never claims native/store verification", () => {
  const registry = new MobileCapabilityRegistry();
  registry.register({ id: "chat", platforms: ["android"], requiresNetwork: true, requiresAuth: true, status: "available" });
  assert.deepEqual(registry.launchAssessment("android", ["chat"]), {
    ready: true,
    unavailable: [],
    nativeBuildVerified: false,
    storeReleaseVerified: false
  });
});

test("missing and planned capabilities fail launch assessment", () => {
  const registry = new MobileCapabilityRegistry();
  registry.register({ id: "wallet", platforms: ["ios"], requiresNetwork: true, requiresAuth: true, status: "planned" });
  assert.deepEqual(registry.launchAssessment("ios", ["wallet", "missing"]).unavailable, ["missing", "wallet"]);
});
