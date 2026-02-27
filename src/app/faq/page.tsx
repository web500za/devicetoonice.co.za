"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How does Device Too Nice work?",
    answer: (
      <p>
        We import premium smartphones directly from trusted international
        suppliers and deliver them to your door in South Africa. No middlemen, no
        inflated markup. You pay, we order, it arrives.
      </p>
    ),
  },
  {
    question: "Where do the phones come from?",
    answer: (
      <p>
        We source our devices from Giztop, a reputable international retailer.
        Each phone is brand new, factory sealed, and comes with all original
        accessories including the charger.
      </p>
    ),
  },
  {
    question: "Is Device Too Nice a legitimate business?",
    answer: (
      <p>
        Yes. We&rsquo;re a registered South African business. Every payment is
        processed securely through Yoco, a trusted South African payment
        provider. You&rsquo;ll receive a confirmation email with your order
        details and payment reference.
      </p>
    ),
  },
  {
    question: "Why is it cheaper than buying from a network?",
    answer: (
      <p>
        Network stores include contracts, subsidies, and retail overhead in their
        pricing. We sell the device directly &mdash; no contract, no extras, just
        the phone at a fair price with free delivery included.
      </p>
    ),
  },
  {
    question: "What warranty do I get?",
    answer: (
      <p>
        All devices come with the OnePlus manufacturer&rsquo;s warranty (1
        year). If you have a warranty issue, contact us and we&rsquo;ll help
        facilitate the process with OnePlus.
      </p>
    ),
  },
  {
    question: "What if my phone arrives defective?",
    answer: (
      <p>
        If your device is dead on arrival or develops a fault within 30 days,
        contact us immediately. We&rsquo;ll arrange a replacement or full
        refund. See our{" "}
        <Link href="/returns" className="text-[#e31937] hover:underline">
          Returns &amp; Refunds
        </Link>{" "}
        policy for full details.
      </p>
    ),
  },
  {
    question: "How long does delivery take?",
    answer: (
      <p>
        7&ndash;10 working days from the date of payment. Delivery is free to
        any address in South Africa. No customs fees &mdash; we handle
        everything.
      </p>
    ),
  },
  {
    question: "Can I track my order?",
    answer: (
      <p>
        You&rsquo;ll receive a confirmation email when your order is placed.
        We&rsquo;ll send shipping updates via email as your order progresses. If
        you have questions, contact us anytime.
      </p>
    ),
  },
  {
    question: "Can I buy more than one phone?",
    answer: (
      <p>
        To keep stock available for as many customers as possible, we limit
        orders to one phone per customer.
      </p>
    ),
  },
  {
    question: "What payment methods do you accept?",
    answer: (
      <p>
        We accept all major credit and debit cards (Visa, Mastercard, American
        Express) through Yoco&rsquo;s secure payment gateway. Payment is made in
        South African Rand (ZAR).
      </p>
    ),
  },
  {
    question: "Is my payment secure?",
    answer: (
      <p>
        Absolutely. Payments are processed by Yoco, a PCI-DSS compliant South
        African payment provider. We never see or store your card details.
      </p>
    ),
  },
  {
    question: "What happens after I order?",
    answer: (
      <p>
        After payment, you&rsquo;ll receive a confirmation email with your order
        details. We then order your phone from our supplier. Once it ships,
        we&rsquo;ll keep you updated via email. Expect delivery within 7&ndash;10
        working days.
      </p>
    ),
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  isFirst,
}: {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  isFirst: boolean;
}) {
  return (
    <div className={isFirst ? "" : "border-t border-white/[0.08]"}>
      <button
        onClick={onToggle}
        className="flex w-full justify-between items-center py-5 cursor-pointer group text-left"
      >
        <span className="text-sm font-medium text-white group-hover:text-white/80 transition-colors pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/30 text-lg leading-none shrink-0"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="text-sm text-white/50 leading-relaxed pb-5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-black px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-block text-sm text-white/40 hover:text-white transition-colors"
        >
          &larr; Back to home
        </Link>

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-white">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-sm text-white/30">
          Last updated: February 2026
        </p>

        <div className="mt-10">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              isFirst={index === 0}
            />
          ))}
        </div>

        <div className="text-center mt-16 mb-8">
          <h2 className="text-lg font-semibold text-white">
            Still have questions?
          </h2>
          <p className="text-sm text-white/40 mt-2">
            Get in touch &mdash; we usually respond within a few hours.
          </p>
          <div className="flex gap-4 justify-center mt-4">
            <a
              href="mailto:web500za@gmail.com"
              className="text-sm text-[#e31937] hover:underline"
            >
              Email us
            </a>
            <a
              href="https://wa.me/27832540891"
              className="text-sm text-[#e31937] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
