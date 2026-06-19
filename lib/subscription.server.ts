import { auth } from "@clerk/nextjs/server";
import type { PlanType } from "./subscription-constants";

export async function getUserPlan(): Promise<PlanType> {
  const { userId, has } = await auth();
  if (!userId) return "free";
  if (has({ plan: "pro" })) return "pro";
  if (has({ plan: "standard" })) return "standard";
  return "free";
}
