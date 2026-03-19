const DEFAULT_PASSWORD = "password";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? DEFAULT_PASSWORD;
}

export function isAdminPasswordValid(provided: string | null | undefined) {
  if (!provided) return false;
  return provided === getAdminPassword();
}

