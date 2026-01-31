import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Send, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', userType: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Page Header */}
      <section className="w-full bg-gray-50 py-16 lg:py-20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl lg:text-6xl text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="font-paragraph text-lg lg:text-xl text-gray-600 max-w-3xl">
              Whether you're a VC looking to connect with startups or a founder ready to showcase your company, we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full py-16 lg:py-24 flex-grow">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-3xl lg:text-4xl text-gray-900 mb-6">
                  Let's Connect
                </h2>
                <p className="font-paragraph text-lg text-gray-700 leading-relaxed">
                  We're here to facilitate meaningful connections between venture capitalists and innovative startups. Fill out the form and we'll get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-gray-900 mb-2">
                      For VCs
                    </h3>
                    <p className="font-paragraph text-base text-gray-600">
                      Discover promising startups, access detailed metrics, and connect directly with founders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-gray-900 mb-2">
                      For Founders
                    </h3>
                    <p className="font-paragraph text-base text-gray-600">
                      Showcase your startup to a curated network of investors and get discovered by the right VCs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-gray-900 mb-2">
                      Quick Response
                    </h3>
                    <p className="font-paragraph text-base text-gray-600">
                      We typically respond to all inquiries within one business day.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gray-50 border border-gray-200 p-8 lg:p-12">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-sky-500 mx-auto mb-6" />
                    <h3 className="font-heading text-2xl text-gray-900 mb-3">
                      Message Sent!
                    </h3>
                    <p className="font-paragraph text-base text-gray-600">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block font-paragraph text-sm text-gray-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 font-paragraph text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-sky-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-paragraph text-sm text-gray-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 font-paragraph text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-sky-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="userType" className="block font-paragraph text-sm text-gray-900 mb-2">
                        I am a... *
                      </label>
                      <select
                        id="userType"
                        name="userType"
                        required
                        value={formData.userType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 font-paragraph text-base text-gray-900 focus:outline-none focus:border-sky-500 transition-colors"
                      >
                        <option value="">Select an option</option>
                        <option value="vc">Venture Capitalist</option>
                        <option value="founder">Startup Founder</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-paragraph text-sm text-gray-900 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-white border border-gray-300 font-paragraph text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                        placeholder="Tell us about your inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full py-4 px-6 border border-gray-300 text-gray-900 font-paragraph text-base hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="w-full bg-gray-50 py-16 lg:py-20">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <h3 className="font-heading text-xl text-gray-900 mb-3">
                For Investors
              </h3>
              <p className="font-paragraph text-base text-gray-600">
                Access curated startup profiles with verified metrics and direct founder contact.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-heading text-xl text-gray-900 mb-3">
                For Founders
              </h3>
              <p className="font-paragraph text-base text-gray-600">
                Get your startup in front of active investors looking for opportunities.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-heading text-xl text-gray-900 mb-3">
                Partnership Opportunities
              </h3>
              <p className="font-paragraph text-base text-gray-600">
                Interested in partnering with us? Let's discuss collaboration opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
