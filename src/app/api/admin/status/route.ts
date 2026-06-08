import { NextResponse } from "next/server";

export async function GET() {
  const githubConfigured = !!(
    process.env.GITHUB_TOKEN &&
    process.env.GITHUB_OWNER &&
    process.env.GITHUB_REPO
  );
  const isProduction = process.env.NODE_ENV === "production";

  return NextResponse.json({
    githubConfigured,
    isProduction,
    // savesWillWork: either not prod (local dev, FS works) or github is configured
    savesWillWork: !isProduction || githubConfigured,
    missing: [
      !process.env.GITHUB_TOKEN && "GITHUB_TOKEN",
      !process.env.GITHUB_OWNER && "GITHUB_OWNER",
      !process.env.GITHUB_REPO && "GITHUB_REPO",
    ].filter(Boolean),
  });
}
