import React from 'react';
import { CONFIG } from '../config';

interface AdSlotProps {
  slot: 'top_guide' | 'between_guide_faq' | 'sidebar' | 'footer';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slot, className = '' }) => {
  if (!CONFIG.ADS_ENABLED) {
    return null;
  }

  return (
    <div
      className={`my-6 mx-auto w-full max-w-4xl min-h-[90px] border border-dashed border-stone-300 dark:border-stone-700 rounded-lg p-2 flex flex-col items-center justify-center text-xs text-stone-600 dark:text-stone-400 bg-stone-50/50 dark:bg-stone-900/50 ${className}`}
      data-ad-slot={slot}
    >
      <span className="text-[10px] uppercase tracking-wider text-stone-600 font-medium mb-1">إعلان</span>
      <ins
        className="adsbygoogle block w-full text-center"
        style={{ display: 'block' }}
        data-ad-client={CONFIG.ADSENSE_CLIENT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
