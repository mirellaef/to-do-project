export function getHealthPayload() {
  return {
    status: "ok" as const,
    timestamp: new Date().toISOString(),
  };
}
