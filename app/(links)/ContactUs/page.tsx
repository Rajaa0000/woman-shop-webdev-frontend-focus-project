'use client';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
export default function ContactUs() {
  const [Sent, setSent]=useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message,setMessage]=useState("");
  function handleSubmit(e){
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail("");
      setMessage("");
      setName("");

    }, 2000);
  }
  return (
    <main className="min-h-screen bg-white text-[#737789] px-6 md:px-20 py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-semibold text-[#2b2b2b] uppercase">Contact Us</h1>

        <p>
          We’d love to hear from you! Whether you have a question about your order, our products, or just want to say hi — our team is always ready to help.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="text-black" />
            <span>+213 555 123 456</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-black" />
            <span>support@rajaa-shop.com</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-black" />
            <span>Algiers, Algeria</span>
          </div>
        </div>
    
        <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-md" required  defaultValue={name}/>
          <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-md" required defaultValue={email}/>
          <textarea placeholder="Your Message" className="w-full p-3 border rounded-md h-32" required defaultValue={message}></textarea>
          <button className="bg-black text-white px-6 py-3 rounded-lg ">Send Message</button>
        </form>
        {Sent && <div className='text-red-500'> message sent successfully</div>}
      </div>
      
    </main>
  );
}
