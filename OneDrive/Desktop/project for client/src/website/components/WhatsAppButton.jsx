import React from 'react';
export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/917904058228?text=Hello%20Geetham%20Veg%20Muttukadu,%20I%20would%20like%20to%20inquire%20about%20your%20menu%20or%20dining.`;
  return (
    <div className="fixed bottom-6 right-6 z-40 select-none hidden sm:block">
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 p-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group relative" title="Chat on WhatsApp">
        <span className="absolute inset-0 rounded-full border border-[#25D366] group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping" />
        <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 fill-current shrink-0"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.847.002-2.63-1.023-5.101-2.886-6.968C16.58 1.83 14.113.805 11.488.805c-5.44 0-9.866 4.414-9.868 9.848-.001 1.77.465 3.498 1.348 5.013l-.99 3.615 3.7-.971zm11.758-5.32c-.328-.164-1.94-.959-2.241-1.07-.302-.11-.52-.164-.74.164-.219.328-.849 1.07-1.041 1.29-.192.219-.384.246-.712.082-1.745-.87-2.903-1.464-4.053-2.434-.303-.256-.086-.24.246-.688.328-.448.164-.849-.082-1.013-.246-.164-2.241-2.399-2.241-2.399-.192-.465-.411-.383-.575-.383-.164 0-.356-.014-.548-.014-.192 0-.507.071-.772.356-.266.287-1.013.992-1.013 2.42 0 1.428 1.039 2.808 1.184 3.003.146.195 2.046 3.14 4.957 4.397.693.3 1.233.479 1.654.613.696.22 1.329.19 1.83.115.558-.083 1.94-.793 2.214-1.56.274-.766.274-1.423.192-1.56-.082-.136-.301-.218-.629-.382z" /></svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 ease-out whitespace-nowrap text-sm font-bold tracking-wide pr-1">Chat with us</span>
      </a>
    </div>
  );
}
