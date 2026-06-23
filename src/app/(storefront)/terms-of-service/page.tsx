import React from "react";

export default function TermsOfServicePage() {
  return (
    <div className="w-full bg-bg-warm dark:bg-zinc-950 py-16 px-6 md:px-12 lg:px-20 min-h-[50vh] flex items-center justify-center">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-3xl font-bold uppercase tracking-tight text-text-primary">
          Terms of Service
        </h1>
        <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold">
          Last updated: June 2026
        </p>
        <p className="text-sm text-text-muted leading-relaxed">
          Full policy coming soon. Contact{" "}
          <a
            href="mailto:hello@ruvenstudio.in"
            className="text-brand-burgundy font-bold underline hover:text-brand-burgundy-light"
          >
            hello@ruvenstudio.in
          </a>{" "}
          for details.
        </p>
      </div>
    </div>
  );
}
