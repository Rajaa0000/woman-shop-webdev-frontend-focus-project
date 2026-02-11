"use client";
import { useState } from "react";

export default function OurStores() {
  const stores = [
    {
      city: "Algiers",
      address: "12 Didouche Mourad Street, Algiers Centre, 16000",
      phone: "+213 (0)21 63 45 89",
      hours: "Sat - Thu: 9:00 AM - 8:00 PM, Fri: Closed",
    },
    {
      city: "Oran",
      address: "45 Boulevard de l’Indépendance, Oran 31000",
      phone: "+213 (0)41 25 78 90",
      hours: "Sat - Thu: 9:30 AM - 8:30 PM, Fri: Closed",
    },
    {
      city: "Constantine",
      address: "23 Rue Abane Ramdane, Constantine 25000",
      phone: "+213 (0)31 92 10 45",
      hours: "Sat - Thu: 10:00 AM - 7:00 PM, Fri: Closed",
    },
    {
      city: "Annaba",
      address: "8 Rue Emir Abdelkader, Annaba 23000",
      phone: "+213 (0)38 77 54 32",
      hours: "Sat - Thu: 9:00 AM - 7:30 PM, Fri: Closed",
    },
    {
      city: "Blida",
      address: "19 Rue des Frères Boukhalfa, Blida 09000",
      phone: "+213 (0)25 43 12 56",
      hours: "Sat - Thu: 9:00 AM - 8:00 PM, Fri: Closed",
    },
    {
      city: "Tizi Ouzou",
      address: "Avenue de la Liberté, Tizi Ouzou 15000",
      phone: "+213 (0)26 10 23 44",
      hours: "Sat - Thu: 9:30 AM - 7:30 PM, Fri: Closed",
    },
    {
      city: "Setif",
      address: "Centre Commercial Park Mall, Setif 19000",
      phone: "+213 (0)36 92 00 12",
      hours: "Sat - Thu: 10:00 AM - 9:00 PM, Fri: Closed",
    },
    {
      city: "Bejaia",
      address: "Avenue de la Wilaya, Bejaia 06000",
      phone: "+213 (0)34 81 55 76",
      hours: "Sat - Thu: 9:00 AM - 8:00 PM, Fri: Closed",
    },
  ];

  // Fix 1: Type the state to accept number or null
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Fix 2: Type the parameter as a number
  const toggleStore = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className=" bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">Our Stores</h1>

        <div className="space-y-4">
          {stores.map((store, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-sm bg-white"
            >
              {/* Store Header */}
              <button
                className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-semibold hover:bg-gray-100 transition"
                onClick={() => toggleStore(index)}
              >
                {store.city}
                <span className="text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* Store Details */}
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-700">
                  <p>
                    <strong>Address:</strong> {store.address}
                  </p>
                  <p>
                    <strong>Phone:</strong> {store.phone}
                  </p>
                  <p>
                    <strong>Hours:</strong> {store.hours}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}