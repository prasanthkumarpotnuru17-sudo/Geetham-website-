import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, ExternalLink, ArrowRight, Info, AlertCircle } from 'lucide-react';

export default function SwiggyExportModal({ isOpen, onClose, cartItems = [] }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Format cart list to copy-paste search string
  const getSearchString = () => {
    return cartItems.map(item => `${item.quantity}x ${item.name}`).join('\n');
  };

  const handleCopy = () => {
    const textToCopy = getSearchString();
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleProceed = () => {
    // Open Swiggy search page / home page in a new window tab
    window.open('https://www.swiggy.com/search?query=Geetham', '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Main container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-lg bg-brand-cream dark:bg-brand-green-deep border border-brand-gold/25 rounded-3xl shadow-2xl overflow-hidden relative z-10 theme-transition"
        >
          {/* Header */}
          <div className="p-6 border-b border-brand-gold/10 flex items-center justify-between bg-brand-cream-surface dark:bg-brand-green-card">
            <div>
              <span className="text-[9px] font-bold tracking-[0.2em] text-brand-saffron uppercase block mb-1">
                SWIGGY INTEGRATION
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-charcoal dark:text-white">
                Export Gourmet Order
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-brand-gold/15 text-brand-charcoal/70 dark:text-brand-cream-ivory/70 hover:text-brand-saffron dark:hover:text-brand-gold flex items-center justify-center transition-colors cursor-pointer border border-brand-gold/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 flex flex-col gap-5">
            {/* Swiggy API Notice block */}
            <div className="p-4 rounded-2xl bg-brand-saffron/5 border border-brand-saffron/20 flex gap-3 text-xs text-brand-charcoal/80 dark:text-brand-cream-ivory/80 leading-relaxed font-medium">
              <Info className="w-5 h-5 text-brand-saffron shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-saffron block mb-0.5">Seamless Redirection Process</span>
                Due to food-delivery sandbox policies, direct cart insertions are restricted. We have compiled your delicacies into a copyable checklist. Copy and paste into Swiggy!
              </div>
            </div>

            {/* Compiled Selections Listing */}
            <div>
              <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2.5">
                Your Gourmet Selections
              </h4>
              <div className="max-h-[160px] overflow-y-auto no-scrollbar border border-brand-gold/15 rounded-xl bg-brand-cream-surface dark:bg-brand-green-card/50 p-4 flex flex-col gap-2">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-serif text-brand-charcoal dark:text-brand-cream-ivory">
                    <span className="font-normal flex items-center gap-2">
                      <span className="font-sans font-bold text-[#D95A1E] dark:text-[#ff8e53] bg-brand-saffron/10 px-1.5 py-0.5 rounded">
                        {item.quantity}x
                      </span>
                      <span>{item.name}</span>
                    </span>
                    <span className="text-[#D95A1E] dark:text-brand-saffron-light">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Copy Clipboard Search List Box */}
            <div className="border border-brand-gold/20 rounded-2xl bg-brand-cream dark:bg-brand-green-card p-4 relative group">
              <span className="absolute top-2.5 right-3 text-[8px] font-bold text-brand-gold tracking-wider uppercase">
                CLIPBOARD VALUE
              </span>
              <pre className="font-mono text-xs text-brand-charcoal/70 dark:text-brand-cream-ivory/70 whitespace-pre-wrap font-bold mt-2">
                {getSearchString()}
              </pre>

              <button
                onClick={handleCopy}
                className={`mt-4 w-full py-2.5 rounded-xl border font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                  copied 
                    ? 'bg-green-600/10 border-green-600 text-green-600' 
                    : 'bg-brand-gold/10 border-brand-gold hover:bg-brand-gold text-brand-gold hover:text-white dark:hover:text-[#061d12]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Gourmet Checklist Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Gourmet Checklist</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer Navigation CTAs */}
          <div className="p-6 border-t border-brand-gold/10 bg-brand-cream-surface dark:bg-brand-green-card flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border.5 border-brand-charcoal/20 dark:border-brand-cream-ivory/20 hover:bg-brand-charcoal/5 dark:hover:bg-white/5 text-brand-charcoal/80 dark:text-brand-cream-ivory/80 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleProceed}
              className="flex-1 py-3 bg-brand-saffron hover:bg-brand-saffron-dark text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer group"
            >
              <span>Proceed to Swiggy</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
