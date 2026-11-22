import { writeFile } from "node:fs/promises";

export interface NanobananaRequest {
  sceneId: string;
  prompt: string;
  metadata: Record<string, unknown>;
}

export interface NanobananaResult {
  sceneId: string;
  status: "generated" | "skipped";
  outputPath: string;
}

export function hasNanobananaConfig(): boolean {
  return Boolean(process.env.NANOBANANAPRO_API_BASE_URL && process.env.NANOBANANAPRO_API_KEY);
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

async function writeFromUrl(imageUrl: string, outputPath: string): Promise<void> {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to download generated image from ${imageUrl}: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await writeFile(outputPath, Buffer.from(arrayBuffer));
}

function extractBase64(responseJson: unknown): string | null {
  if (!responseJson || typeof responseJson !== "object") {
    return null;
  }

  const record = responseJson as Record<string, unknown>;
  if (typeof record.imageBase64 === "string") {
    return record.imageBase64;
  }

  const data = Array.isArray(record.data) ? record.data[0] : null;
  if (data && typeof data === "object") {
    const first = data as Record<string, unknown>;
    if (typeof first.b64_json === "string") {
      return first.b64_json;
    }
  }

  return null;
}

function extractUrl(responseJson: unknown): string | null {
  if (!responseJson || typeof responseJson !== "object") {
    return null;
  }

  const record = responseJson as Record<string, unknown>;
  if (typeof record.imageUrl === "string") {
    return record.imageUrl;
  }

  const data = Array.isArray(record.data) ? record.data[0] : null;
  if (data && typeof data === "object") {
    const first = data as Record<string, unknown>;
    if (typeof first.url === "string") {
      return first.url;
    }
  }

  return null;
}

export async function generateNanobananaPreview(
  request: NanobananaRequest,
  outputPath: string,
): Promise<NanobananaResult> {
  if (!hasNanobananaConfig()) {
    await writeFile(
      outputPath.replace(/\.png$/i, ".request.json"),
      `${JSON.stringify({ status: "skipped", request }, null, 2)}\n`,
      "utf8",
    );
    return {
      sceneId: request.sceneId,
      status: "skipped",
      outputPath: outputPath.replace(/\.png$/i, ".request.json"),
    };
  }

  const baseUrl = normalizeBaseUrl(process.env.NANOBANANAPRO_API_BASE_URL!);
  const model = process.env.NANOBANANAPRO_MODEL ?? "nanobananapro-image";
  const response = await fetch(`${baseUrl}/images/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NANOBANANAPRO_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt: request.prompt,
      metadata: request.metadata,
    }),
  });

  if (!response.ok) {
    throw new Error(`Nanobanana request failed for ${request.sceneId}: ${response.status}`);
  }

  const responseJson = (await response.json()) as unknown;
  const base64 = extractBase64(responseJson);
  if (base64) {
    await writeFile(outputPath, Buffer.from(base64, "base64"));
    return {
      sceneId: request.sceneId,
      status: "generated",
      outputPath,
    };
  }

  const imageUrl = extractUrl(responseJson);
  if (imageUrl) {
    await writeFromUrl(imageUrl, outputPath);
    return {
      sceneId: request.sceneId,
      status: "generated",
      outputPath,
    };
  }

  throw new Error(`Nanobanana response for ${request.sceneId} did not include an image payload`);
}
