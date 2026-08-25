export type MobilePlatform = "ios" | "android" | "web";

export interface MobileCapability {
  id: string;
  platforms: readonly MobilePlatform[];
  requiresNetwork: boolean;
  requiresAuth: boolean;
  status: "available" | "planned" | "unavailable";
}

const ID_RE = /^[a-z][a-z0-9.-]{0,63}$/;
const MAX_CAPABILITIES = 256;

export class MobileCapabilityRegistry {
  readonly #items = new Map<string, MobileCapability>();

  register(input: MobileCapability): MobileCapability {
    if (!ID_RE.test(input.id)) throw new Error("invalid capability id");
    if (input.platforms.length === 0 || input.platforms.length > 3) throw new Error("invalid platforms");
    if (!this.#items.has(input.id) && this.#items.size >= MAX_CAPABILITIES) throw new Error("capacity exceeded");
    const capability = Object.freeze({ ...input, platforms: Object.freeze([...new Set(input.platforms)].sort()) });
    this.#items.set(input.id, capability);
    return capability;
  }

  availableFor(platform: MobilePlatform): MobileCapability[] {
    return [...this.#items.values()]
      .filter((item) => item.status === "available" && item.platforms.includes(platform))
      .sort((a, b) => a.id.localeCompare(b.id));
  }

  launchAssessment(platform: MobilePlatform, requiredIds: readonly string[]): {
    ready: boolean;
    unavailable: readonly string[];
    nativeBuildVerified: false;
    storeReleaseVerified: false;
  } {
    const unavailable = [...new Set(requiredIds)]
      .filter((id) => {
        const item = this.#items.get(id);
        return !item || item.status !== "available" || !item.platforms.includes(platform);
      })
      .sort();
    return Object.freeze({
      ready: unavailable.length === 0,
      unavailable: Object.freeze(unavailable),
      nativeBuildVerified: false,
      storeReleaseVerified: false
    });
  }
}
