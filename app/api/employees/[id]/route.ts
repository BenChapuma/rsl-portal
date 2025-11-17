// app/api/employees/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Utility: check if a string represents an integer number
 */
function isNumericString(s: string) {
  if (typeof s !== "string") return false;
  // allow negative/positive integers too
  return /^-?\d+$/.test(s);
}

/**
 * DELETE /api/employees/[id]
 */
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> } // awaitable in modern Next versions
) {
  try {
    // Always await params (covers both Promise and plain object cases)
    const { id: rawId } = await context.params;

    if (!rawId) {
      return NextResponse.json(
        { error: "Missing employee ID in URL path." },
        { status: 400 }
      );
    }

    const prismaAny = prisma as any;

    // Ensure model accessor exists
    if (!prismaAny.employee || typeof prismaAny.employee.delete !== "function") {
      // Provide available keys to help debug model name mismatch
      const keys = Object.keys(prismaAny).slice(0, 100);
      return NextResponse.json(
        {
          error:
            "Prisma model accessor `employee` not found on Prisma client. Check your Prisma schema model name.",
          availableClientKeys: keys,
        },
        { status: 500 }
      );
    }

    // Primary attempt: try deleting with the raw (string) ID
    try {
      await prismaAny.employee.delete({
        where: { id: rawId },
      });

      // If successful, return 204 No Content
      return new NextResponse(null, { status: 204 });
    } catch (firstErr: any) {
      // if it's record-not-found (P2025) return 404
      if (firstErr?.code === "P2025") {
        return NextResponse.json({ error: "Employee not found." }, { status: 404 });
      }

      // If the incoming id looks numeric, try deleting with a Number id (handles Int PKs)
      if (isNumericString(rawId)) {
        const numericId = Number(rawId);
        try {
          await prismaAny.employee.delete({
            where: { id: numericId },
          });
          return new NextResponse(null, { status: 204 });
        } catch (secondErr: any) {
          if (secondErr?.code === "P2025") {
            return NextResponse.json({ error: "Employee not found." }, { status: 404 });
          }

          // If still failing (likely type mismatch or other invalid invocation),
          // fall through to the safe deleteMany fallback below
          console.error("DELETE attempt with numeric id failed:", secondErr);
        }
      } else {
        // not numeric and firstErr wasn't P2025; log and continue to fallback
        console.error("DELETE attempt with string id failed:", firstErr);
      }

      // Fallback: use deleteMany which won't throw when nothing matches
      try {
        const whereClause = isNumericString(rawId)
          ? { id: Number(rawId) }
          : { id: rawId };

        const result = await prismaAny.employee.deleteMany({
          where: whereClause,
        });

        // deleteMany returns { count: number }
        if (result?.count && result.count > 0) {
          return new NextResponse(null, { status: 204 });
        } else {
          return NextResponse.json({ error: "Employee not found." }, { status: 404 });
        }
      } catch (fallbackErr: any) {
        console.error("Fallback deleteMany failed:", fallbackErr);
        // If fallback also fails, return a useful error body
        return NextResponse.json(
          {
            error: "Failed to delete employee.",
            details: String(fallbackErr?.message ?? fallbackErr),
          },
          { status: 500 }
        );
      }
    }
  } catch (err: any) {
    console.error("DELETE Route Error:", err);
    return NextResponse.json(
      {
        error: "Failed to delete employee.",
        details: String(err?.message ?? err),
      },
      { status: 500 }
    );
  }
}
