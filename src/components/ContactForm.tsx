
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  phone: z.string().optional(),
  projectType: z.enum(['automation', 'intelligence', 'integration', 'consulting'], {
    required_error: 'Please select a project type',
  }),
  budget: z.enum(['10k-50k', '50k-100k', '100k-500k', '500k+'], {
    required_error: 'Please select a budget range',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  timeline: z.enum(['immediate', '1-3months', '3-6months', '6months+'], {
    required_error: 'Please select a timeline',
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  isLoading?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, isLoading = false }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
    },
  });

  const handleSubmit = (data: ContactFormData) => {
    onSubmit(data);
    setIsSubmitted(true);
    console.log('Form submitted:', data);
  };

  if (isSubmitted) {
    return (
      <div className="ai8ty-card text-center">
        <div className="text-6xl mb-4">🚀</div>
        <h3 className="text-2xl font-semibold text-[var(--ai8ty-text-accent)] mb-4">
          Thank You!
        </h3>
        <p className="text-lg text-[var(--ai8ty-text-secondary)]">
          We've received your message and will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="ai8ty-card max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold text-[var(--ai8ty-text-accent)] mb-6 text-center">
        Start Your AI Transformation
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--ai8ty-text-primary)]">Full Name *</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      className="w-full p-3 bg-[var(--ai8ty-bg-card)] border border-[var(--ai8ty-border)] rounded-lg text-[var(--ai8ty-text-primary)] focus:border-[var(--ai8ty-primary)] focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--ai8ty-text-primary)]">Email Address *</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="email"
                      className="w-full p-3 bg-[var(--ai8ty-bg-card)] border border-[var(--ai8ty-border)] rounded-lg text-[var(--ai8ty-text-primary)] focus:border-[var(--ai8ty-primary)] focus:outline-none transition-colors"
                      placeholder="john@company.com"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--ai8ty-text-primary)]">Company Name *</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      className="w-full p-3 bg-[var(--ai8ty-bg-card)] border border-[var(--ai8ty-border)] rounded-lg text-[var(--ai8ty-text-primary)] focus:border-[var(--ai8ty-primary)] focus:outline-none transition-colors"
                      placeholder="Your Company"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--ai8ty-text-primary)]">Phone Number</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="tel"
                      className="w-full p-3 bg-[var(--ai8ty-bg-card)] border border-[var(--ai8ty-border)] rounded-lg text-[var(--ai8ty-text-primary)] focus:border-[var(--ai8ty-primary)] focus:outline-none transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--ai8ty-text-primary)]">Project Type *</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full p-3 bg-[var(--ai8ty-bg-card)] border border-[var(--ai8ty-border)] rounded-lg text-[var(--ai8ty-text-primary)] focus:border-[var(--ai8ty-primary)] focus:outline-none transition-colors"
                    >
                      <option value="">Select project type</option>
                      <option value="automation">Process Automation</option>
                      <option value="intelligence">Operational Intelligence</option>
                      <option value="integration">System Integration</option>
                      <option value="consulting">AI Consulting</option>
                    </select>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--ai8ty-text-primary)]">Budget Range *</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full p-3 bg-[var(--ai8ty-bg-card)] border border-[var(--ai8ty-border)] rounded-lg text-[var(--ai8ty-text-primary)] focus:border-[var(--ai8ty-primary)] focus:outline-none transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="10k-50k">$10k - $50k</option>
                      <option value="50k-100k">$50k - $100k</option>
                      <option value="100k-500k">$100k - $500k</option>
                      <option value="500k+">$500k+</option>
                    </select>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="timeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--ai8ty-text-primary)]">Project Timeline *</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full p-3 bg-[var(--ai8ty-bg-card)] border border-[var(--ai8ty-border)] rounded-lg text-[var(--ai8ty-text-primary)] focus:border-[var(--ai8ty-primary)] focus:outline-none transition-colors"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (ASAP)</option>
                    <option value="1-3months">1-3 months</option>
                    <option value="3-6months">3-6 months</option>
                    <option value="6months+">6+ months</option>
                  </select>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--ai8ty-text-primary)]">Project Details *</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={4}
                    className="w-full p-3 bg-[var(--ai8ty-bg-card)] border border-[var(--ai8ty-border)] rounded-lg text-[var(--ai8ty-text-primary)] focus:border-[var(--ai8ty-primary)] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project, current challenges, and goals..."
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="ai8ty-button ai8ty-button--primary w-full text-lg py-4"
          >
            {isLoading ? 'Sending...' : 'Start Your Transformation'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
