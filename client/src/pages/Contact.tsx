import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { APP_LOGO } from "@/const";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { MobileMenu } from "@/components/MobileMenu";
import { trackContactFormSubmit } from "@/components/GoogleAnalytics";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const createMessage = trpc.contactMessages.create.useMutation({
    onSuccess: () => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      trackContactFormSubmit();
      reset();
    },
    onError: (error) => {
      toast.error(`Failed to send message: ${error.message}`);
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    await createMessage.mutateAsync(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="flex items-center gap-2 text-2xl font-bold text-primary cursor-pointer">
              <img src={APP_LOGO} alt="OC" className="w-10 h-10" />
              ORBI CITY
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/"><span className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Home</span></Link>
            <Link href="/apartments"><span className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Apartments</span></Link>
            <Link href="/amenities"><span className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Amenities</span></Link>
            <Link href="/gallery"><span className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Gallery</span></Link>
            <Link href="/location"><span className="text-gray-600 hover:text-primary transition-colors cursor-pointer">Location</span></Link>
            <Link href="/contact"><span className="text-primary font-semibold cursor-pointer">Contact</span></Link>
          </nav>
          <Link href="/apartments">
            <Button>Book Now / Pay Later</Button>
          </Link>
          <MobileMenu />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            We're here to help. Get in touch with our team for any questions or assistance
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <MapPin className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Location</h3>
                <p className="text-gray-600">
                  Orbi City, Block C<br />
                  Khimshiashvili St<br />
                  Batumi, Georgia
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Phone className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Phone</h3>
                <a
                  href="tel:+995599181888"
                  className="text-primary hover:underline block mb-2"
                >
                  +995 599 18 18 88
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Mail className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
                <a
                  href="mailto:info@orbicitybatumi.com"
                  className="text-primary hover:underline"
                >
                  info@orbicitybatumi.com
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Clock className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hours</h3>
                <p className="text-gray-600">
                  24/7 Reception<br />
                  Always Available
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="John Doe"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="john@example.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="+995 599 18 18 88"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        {...register("subject")}
                        placeholder="Booking Inquiry"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Find Us on the Map
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-2xl h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2973.8!2d41.6!3d41.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDM5JzAwLjAiTiA0McKwMzYnMDAuMCJF!5e0!3m2!1sen!2sge!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">Orbi City Batumi</h3>
              <p className="text-gray-400 mb-4">
                Experience luxury living at its finest in the heart of Batumi
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">Contact Info</h4>
              <p className="text-gray-400 mb-2">Orbi City, Block C, Khimshiashvili St</p>
              <p className="text-gray-400 mb-2">Batumi, Georgia</p>
              <p className="text-gray-400 mb-2">Phone: +995 599 18 18 88</p>
              <p className="text-gray-400 mb-2">Email: info@orbicitybatumi.com</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-500">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/"><span className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer">Home</span></Link></li>
                <li><Link href="/apartments"><span className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer">Apartments</span></Link></li>
                <li><Link href="/amenities"><span className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer">Amenities</span></Link></li>
                <li><Link href="/gallery"><span className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer">Gallery</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Orbi City Batumi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
