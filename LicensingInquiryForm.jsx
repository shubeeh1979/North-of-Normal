import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

export default function LicensingInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "new"
  });

  const [submitted, setSubmitted] = useState(false);

  const submitInquiry = useMutation({
    mutationFn: async (data) => {
      // Create simplified inquiry record
      const inquiry = await base44.entities.LicensingInquiry.create({
        name: data.name,
        email: data.email,
        project_type: "other",
        intended_use: data.message,
        phone: data.phone,
        status: "new"
      });
      
      // Send notification email
      try {
        await base44.integrations.Core.SendEmail({
          to: "info@northofnormal.com",
          subject: `New Inquiry from ${data.name}`,
          body: `
New inquiry received:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}

Message:
${data.message}

---
Reply to this email to respond to the inquiry.
          `
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }

      return inquiry;
    },
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Message sent successfully!");
    },
    onError: (error) => {
      console.error("Submission error:", error);
      toast.error("Failed to send message. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    submitInquiry.mutate(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-gradient-to-br from-green-950/20 to-black/50 backdrop-blur-xl rounded-3xl p-12 border border-green-500/20">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            We've received your message and will get back to you within 24-48 hours.
          </p>
          <p className="text-sm text-gray-400">
            A confirmation has been sent to <span className="text-amber-400">{formData.email}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-amber-500/10">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-gray-300 mb-2 block">
                Name <span className="text-amber-400">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Your full name"
                className="bg-black/50 border-amber-500/20 text-white placeholder:text-gray-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-300 mb-2 block">
                Email <span className="text-amber-400">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your@email.com"
                className="bg-black/50 border-amber-500/20 text-white placeholder:text-gray-500"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="text-gray-300 mb-2 block">
              Phone Number <span className="text-gray-500 text-sm">(optional)</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+44 123 456 7890"
              className="bg-black/50 border-amber-500/20 text-white placeholder:text-gray-500"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-gray-300 mb-2 block">
              Your Message <span className="text-amber-400">*</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Tell us about your project or inquiry..."
              className="bg-black/50 border-amber-500/20 text-white placeholder:text-gray-500 min-h-[150px]"
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Let us know what you're looking for - licensing, custom production, or any questions you have
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <Button
            type="submit"
            disabled={submitInquiry.isPending}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold px-8 py-6 text-lg rounded-lg shadow-[0_0_20px_rgba(251,191,36,0.3)] disabled:opacity-50"
          >
            {submitInquiry.isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          We'll get back to you within 24-48 hours
        </p>
      </div>
    </form>
  );
}