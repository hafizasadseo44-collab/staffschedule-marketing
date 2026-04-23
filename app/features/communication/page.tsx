import React from "react";
import FeatureHero from "@/components/features/FeatureHero";
import AeoSection from "@/components/features/AeoSection";
import ChatHeroVisual from "@/components/features/ChatHeroVisual";
import StopUsingWhatsApp from "@/components/features/StopUsingWhatsApp";
import ChatBento from "@/components/features/ChatBento";
import ChatShowcase from "@/components/features/ChatShowcase";
import ChatResourceVault from "@/components/features/ChatResourceVault";
import ChatAcknowledgment from "@/components/features/ChatAcknowledgment";
import ChatTranslation from "@/components/features/ChatTranslation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Messaging & Communication Platform for Staff",
  description: "Centralize your team communication with StaffSchedule.io. Built-in staff chat, instant push notifications, and shift-related messaging for focused collaboration.",
};

const FAQS = [
  {
    question: "How is this different from WhatsApp?",
    answer: "StaffSchedule.io messaging is strictly for professional use. It keeps personal and work lives separate. Plus, messages are integrated with the schedule, allowing you to message a specific shift's staff or a whole department with one click."
  },
  {
    question: "Do staff need to install a separate app?",
    answer: "No. The messaging hub is built directly into the StaffSchedule.io app that your team already uses to check their rotas and clock in."
  },
  {
    question: "Can I see who has read my messages?",
    answer: "Yes! Every message comes with read receipts so you can hold your team accountable and ensure important updates are seen."
  },
  {
    question: "Can I share documents like menus or safety guides?",
    answer: "Absolutely. You can upload PDFs, images, and other files to individual chats or group channels, ensuring everyone has the latest information at their fingertips."
  }
];

export default function CommunicationPage() {
  return (
    <main className="pt-10">
      <FeatureHero
        badge="Team Communication"
        title={
          <>
            Talk to your team, <br />
            <span className="text-brand-primary text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              without the noise.
            </span>
          </>
        }
        description="Eliminate communication silos. StaffSchedule.io brings all your team talk into one professional hub integrated directly with your shift schedule."
        ctaText="Start Messaging Free"
        visual={<ChatHeroVisual />}
      />

      <StopUsingWhatsApp />
      <ChatBento />
      
      {/* Service-Level Additions */}
      <ChatResourceVault />
      <ChatAcknowledgment />
      <ChatTranslation />

      <ChatShowcase />

      <AeoSection faqs={FAQS} />
    </main>
  );
}
