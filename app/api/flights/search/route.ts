import { NextResponse } from "next/server";
import { FLIGHT_MARKUP_INR } from "@/lib/flight-config";

type SupplierFlight = {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  baseFarePerTicket: number;
};

type SearchRequest = {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  tripType: "one-way" | "round-trip";
  adults: number;
  children: number;
  infants: number;
  travelClass: string;
};

function toCustomerResult(flight: SupplierFlight) {
  return {
    id: flight.id,
    airline: flight.airline,
    flightNumber: flight.flightNumber,
    departureTime: flight.departureTime,
    arrivalTime: flight.arrivalTime,
    duration: flight.duration,
    // Only the final selling price is returned to the customer-facing browser.
    finalPrice: flight.baseFarePerTicket + FLIGHT_MARKUP_INR
  };
}

async function searchSupplierFlights(_search: SearchRequest): Promise<SupplierFlight[]> {
  // API-READY INTEGRATION POINT:
  // Replace this function with the official Travel Boutique Online flight API.
  // Do not scrape or proxy the supplier webpage. Read credentials from secure
  // server environment variables and map its private per-ticket base fare into
  // baseFarePerTicket. Never return that private field to the browser.
  return [];
}

export async function POST(request: Request) {
  const search = (await request.json()) as SearchRequest;

  if (!search.from || !search.to || !search.departureDate) {
    return NextResponse.json({ error: "Please complete the required flight details." }, { status: 400 });
  }

  const supplierFlights = await searchSupplierFlights(search);

  if (supplierFlights.length === 0) {
    return NextResponse.json({
      status: "integration_required",
      message: "Live flight inventory will appear here after the supplier API credentials are connected.",
      results: []
    });
  }

  return NextResponse.json({
    status: "ok",
    results: supplierFlights.map(toCustomerResult)
  });
}
