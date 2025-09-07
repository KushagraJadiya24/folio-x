// app/api/webhooks/clerk/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { WebhookEvent } from "@clerk/nextjs/server";

export const runtime = "nodejs"; // IMPORTANT: Prisma won't work on edge runtime

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name } = evt.data as any;
      await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses?.[0]?.email_address ?? "",
          firstName: first_name ?? null,
          lastName: last_name ?? null,
        },
      });
    } else if (eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name } = evt.data as any;
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: email_addresses?.[0]?.email_address ?? "",
          firstName: first_name ?? null,
          lastName: last_name ?? null,
        },
      });
    } else if (eventType === "user.deleted") {
      const { id } = evt.data as any;
      await prisma.user.delete({ where: { clerkId: id } });
    }

    return new Response("Webhook processed", { status: 200 });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return new Response("Internal error", { status: 500 });
  }
}

// handle preflight / GET to avoid 405 from Clerk or proxy
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, svix-id, svix-timestamp, svix-signature",
    },
  });
}

export async function GET() {
  return new Response("OK");
}
