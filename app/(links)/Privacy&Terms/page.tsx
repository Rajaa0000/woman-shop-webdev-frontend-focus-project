'use client';
import { CheckCircle } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-white text-[#737789] px-6 md:px-20 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-8">
          Terms & Conditions
        </h1>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-3">
            1. Introduction
          </h2>
          <p>
            Welcome to <strong>RAJAA</strong> — your destination for elegant and
            timeless women’s fashion. By accessing or purchasing from our
            website, you agree to the following terms and conditions. Please
            read them carefully before using our services.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-3">
            2. Use of Our Website
          </h2>
          <p>
            You agree to use our website only for lawful purposes. You may not
            use it in a way that could damage our reputation or interfere with
            the experience of other users. All images, text, and content on this
            site are the property of <strong>RAJAA</strong> and may not be
            copied or reused without permission.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-3">
            3. Product Information
          </h2>
          <p>
            We strive to ensure that all product descriptions, prices, and
            images are accurate. However, small variations in color or fit may
            occur due to lighting or screen settings. <strong>RAJAA</strong>{' '}
            reserves the right to modify or update product information at any
            time.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-3">
            4. Orders & Payments
          </h2>
          <p>
            Once you place an order, you will receive a confirmation email. All
            payments must be completed before order processing. We accept major
            payment methods as listed at checkout. If a product becomes
            unavailable after purchase, you will be notified and refunded in
            full.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-3">
            5. Shipping & Delivery
          </h2>
          <p>
            Delivery times vary based on your location and selected shipping
            method. <strong>RAJAA</strong> is not responsible for delays caused
            by courier services or customs processes. You will receive tracking
            information once your order has been dispatched.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-3">
            6. Returns & Exchanges
          </h2>
          <p>
            We want you to love your purchase. If you are not satisfied, you may
            return or exchange eligible items within 7 days of delivery, provided
            they are unworn and in original condition. Items marked as “Final
            Sale” cannot be returned.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-3">
            7. Privacy & Security
          </h2>
          <p>
            Your privacy matters to us. We collect personal information only to
            process your orders and enhance your shopping experience. Your data
            will never be sold or shared without your consent. For details, see
            our <strong>Privacy Policy</strong>.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-3">
            8. Changes to These Terms
          </h2>
          <p>
            <strong>RAJAA</strong> may update these Terms & Conditions at any
            time. Continued use of our site after changes means you accept the
            updated terms.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-3">
            9. Contact Us
          </h2>
          <p>
            For any questions about these Terms & Conditions, please contact our
            support team at{' '}
            <a href="mailto:support@rajaa.com" className="text-[#213e69] underline">
              support@rajaa.com
            </a>
            .
          </p>
        </section>

        {/* Bottom acknowledgment */}
        <div className="flex items-center gap-2 text-[#213e69] mt-10">
          <CheckCircle className="w-5 h-5" />
          <p>Thank you for shopping with RAJAA — where elegance meets confidence.</p>
        </div>
      </div>
    </main>
  );
}
