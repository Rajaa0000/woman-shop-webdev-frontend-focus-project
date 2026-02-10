'use client';

export default function DeliveryAndPayment() {
  return (
    <main className="min-h-screen bg-white text-[#737789] px-6 md:px-20 py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold text-[#2b2b2b] uppercase">Delivery & Payment</h1>

        <section>
          <h2 className="text-2xl font-medium text-[#2b2b2b] mt-6 mb-2">Delivery</h2>
          <p>
            We deliver across Algeria within 3–7 business days. Orders are shipped via trusted couriers, 
            and you’ll receive a tracking number as soon as your package is dispatched.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-[#2b2b2b] mt-6 mb-2">Shipping Fees</h2>
          <p>
            Shipping costs depend on your location. Free delivery is available for orders above 10,000 DZD.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-[#2b2b2b] mt-6 mb-2">Payment Methods</h2>
          <p>
            We currently accept:
          </p>
          <ul className="list-disc ml-6">
            <li>Cash on Delivery (COD)</li>
            <li>Payment via EDAHABIA or CIB (coming soon)</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
