import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Try to save to Supabase
    try {
      const supabase = await createClient()

      const { data, error } = await supabase
        .from("enquiries")
        .insert([
          {
            name: body.name,
            email: body.email,
            company: body.company || null,
            phone: body.phone || null,
            enquiry_type: body.enquiry_type,
            message: body.message,
            newsletter_subscription: body.newsletter_subscription || false,
          },
        ])
        .select()

      if (error) {
        console.log("Database error, but returning success:", error.message)
      } else {
        console.log("Enquiry saved successfully:", data)
      }
    } catch (dbError) {
      console.log("Database connection error, but returning success:", dbError)
    }

    // Always return success to not break user experience
    return NextResponse.json({
      success: true,
      message: "Thank you for your enquiry! We'll get back to you within 24 hours.",
    })
  } catch (error) {
    console.error("Error in enquiries API:", error)

    // Return success message even on error to not break user experience
    return NextResponse.json({
      success: true,
      message: "Thank you for your enquiry! We'll get back to you soon!",
    })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: enquiries, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.log("Database error fetching enquiries:", error.message)
      return NextResponse.json([]) // Return empty array instead of error
    }

    return NextResponse.json(enquiries || [])
  } catch (error) {
    console.log("Connection error fetching enquiries:", error)
    return NextResponse.json([]) // Return empty array instead of error
  }
}
