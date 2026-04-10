import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import img1 from './assets/1.jpg'
import img2 from './assets/2.jpg'
import img3 from './assets/3.jpg'
import img4 from './assets/4.jpg'
import img5 from './assets/5.jpg'
import img6 from './assets/6.jpg'
import hoa1 from './assets/hoa1.avif'
import back1 from './assets/back1.jpg'
import back2 from './assets/back2.jpg'
import tieccuoi from './assets/tieccuoi.jpg'
import img9 from './assets/9.jpg'

const FadeInSection = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);
  
  // Link mp3 thực tế bài "Em Đồng Ý (I Do)" - Nguồn trực tiếp để mobile dễ phát
  const audioUrl = "https://files.catbox.moe/k2n3d1.mp3";

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(err => {
          console.log("Autoplay blocked on mobile, waiting for next touch:", err);
        });
      }
      // Gỡ bỏ listeners sau khi đã tương tác thành công
      if (hasInteracted) {
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('scroll', handleFirstInteraction);
      }
    };

    if (!hasInteracted) {
      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('touchstart', handleFirstInteraction, { passive: false });
      document.addEventListener('scroll', handleFirstInteraction);
    }

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        setHasInteracted(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Audio Element HTML5 - Cách ổn định nhất cho điện thoại */}
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        playsInline
        preload="auto"
      />

      {/* Nút bật/tắt nhạc với hiệu ứng đĩa quay */}
      <button
        onClick={togglePlay}
        className={`w-14 h-14 rounded-full bg-white shadow-2xl border-2 border-[#d4af37] flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 group ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}
        title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
           <div className="absolute inset-0 bg-gradient-to-tr from-[#8d6e63] to-[#d4af37] opacity-10 group-hover:opacity-20 transition-opacity"></div>
           {isPlaying ? (
             <div className="flex gap-1 items-center h-4">
                <span className="w-1 bg-[#8d6e63] rounded-full animate-[bounce_0.6s_infinite_0s]"></span>
                <span className="w-1 bg-[#8d6e63] rounded-full animate-[bounce_0.6s_infinite_0.2s]"></span>
                <span className="w-1 bg-[#8d6e63] rounded-full animate-[bounce_0.6s_infinite_0.4s]"></span>
             </div>
           ) : (
             <svg className="w-6 h-6 text-[#8d6e63] fill-current" viewBox="0 0 24 24">
               <path d="M8 5v14l11-7z" />
             </svg>
           )}
        </div>
      </button>

      {/* Tên bài hát & Hướng dẫn nhỏ */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col items-end gap-1"
      >
        {!hasInteracted && (
          <div className="bg-[#d4af37] text-white text-[10px] px-2 py-1 rounded-md animate-pulse whitespace-nowrap mb-1">
            ❤️
          </div>
        )}
        {isPlaying && (
          <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-[#d4af37]/20 hidden md:block">
            <p className="text-xs font-serif text-[#8d6e63] whitespace-nowrap">
              Đang phát: <span className="font-bold">Em Đồng Ý (I Do)</span>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2026-04-19T10:30:00');
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#fdfaf5] font-sans text-gray-800">
      <MusicPlayer />
      {/* Hero Section */}
      <section 
        className="relative min-h-[750px] flex items-center justify-center pt-12 pb-32 px-4"
        style={{ 
          backgroundImage: `url(${back1})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 items-center gap-4 relative z-10">
          <FadeInSection className="text-center md:text-left space-y-8">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-serif italic text-xl tracking-[0.3em] uppercase text-gray-800 font-bold mb-4 drop-shadow-sm"
            >
              Thư mời tiệc cưới
            </motion.p>
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="font-cursive text-5xl md:text-8xl text-[#7a5e54] leading-tight font-bold drop-shadow-md"
              >
                Tiến Huy
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="font-serif text-3xl md:text-4xl text-[#c59d2a] font-bold"
              >
                &
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="font-cursive text-5xl md:text-8xl text-[#7a5e54] leading-tight font-bold drop-shadow-md"
              >
                Ánh Nga
              </motion.h1>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex justify-center md:justify-start items-center gap-4 md:gap-6 mt-12 font-serif text-4xl md:text-7xl text-[#7a5e54] tracking-tighter"
            >
              <div className="flex flex-col items-center">
                <span className="font-bold opacity-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">19</span>
                <span className="text-xs uppercase tracking-[0.3em] text-gray-800 font-bold font-sans mt-2 drop-shadow-sm">Tháng 04</span>
              </div>
              <span className="w-px h-20 bg-gradient-to-b from-transparent via-[#d4af37] to-transparent"></span>
              <div className="flex flex-col items-center">
                <span className="font-bold opacity-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">2026</span>
                <span className="text-xs uppercase tracking-[0.3em] text-gray-800 font-bold font-sans mt-2 drop-shadow-sm">Chủ Nhật</span>
              </div>
            </motion.div>
          </FadeInSection>

          <FadeInSection className="relative flex justify-center items-center h-[400px] md:h-[500px]" delay={0.5}>
            {/* Main Arch Image */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="w-[250px] h-[350px] md:w-[350px] md:h-[500px] rounded-t-full overflow-hidden border-[8px] md:border-[12px] border-white shadow-2xl z-10 relative"
            >
              <img src={img4} alt="Wedding Couple" className="w-full h-full object-cover" />
              {/* Decorative line around arch */}
              <div className="absolute inset-0 border border-[#d4af37]/20 rounded-t-full pointer-events-none m-2"></div>
            </motion.div>
            {/* Secondary Overlapping Image */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 right-0 md:-right-8 w-40 h-56 md:w-64 md:h-80 rounded-t-full overflow-hidden border-4 md:border-8 border-white shadow-xl z-20 transform translate-y-4 md:translate-y-8"
            >
              <img src={img2} alt="Couple Detail" className="w-full h-full object-cover" />
              <div className="absolute inset-0 border border-[#d4af37]/20 rounded-t-full pointer-events-none m-1"></div>
            </motion.div>
          </FadeInSection>
        </div>
      </section>

      {/* Invitation Text */}
      <section className="py-24 bg-white px-4 text-center border-t border-dashed border-[#d4af37]/30">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <h2 className="font-cursive text-5xl text-[#8d6e63] mb-8">Trân trọng kính mời</h2>
            <p className="text-xl leading-relaxed text-gray-600 font-serif italic mb-12">
              "Hôn nhân là chuyện cả đời,
yêu người vừa ý, cưới người mình thương...
"
            </p>
          </FadeInSection>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 mt-12 px-2 md:px-0">
            {/* Information for Groom's Family */}
            <FadeInSection delay={0.2}>
              <div className="inline-block relative p-6 md:p-12 bg-[#fdfaf5] border border-[#d4af37]/20 rounded-2xl shadow-sm overflow-hidden h-full md:mx-6">
                {/* Decorative floral element */}
                <div className="absolute -top-10 -right-10 w-24 h-24 md:w-32 md:h-32 opacity-20 rotate-45">
                   <img src={hoa1} alt="" className="w-full h-full" />
                </div>
                
                <p className="font-serif text-xl md:text-2xl tracking-widest text-[#8d6e63] mb-6 border-b border-[#d4af37]/30 pb-4">LỄ THÀNH HÔN TẠI NHÀ TRAI</p>
                <div className="flex justify-center items-center gap-4 md:gap-6 text-4xl md:text-5xl font-serif text-[#d4af37] mb-6">
                  <span>19</span>
                  <span className="text-xl md:text-2xl opacity-50">.</span>
                  <span>04</span>
                  <span className="text-xl md:text-2xl opacity-50">.</span>
                  <span>2026</span>
                </div>
                <p className="text-2xl md:text-3xl font-serif text-[#8d6e63] mb-4 uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold drop-shadow-sm">10:30 AM - CHỦ NHẬT</p>
                <div className="space-y-2">
                  
                  <p className="text-gray-500 italic text-sm md:text-base">Thôn Trung Tuyến - Xã Kim Thành - Tp Hải Phòng</p>
                </div>
                <button className="mt-10 px-8 py-3 bg-[#8d6e63] text-white rounded-full hover:bg-[#7a5e54] transition-all duration-300 shadow-md hover:shadow-lg uppercase tracking-widest text-sm">
                  Xem Bản Đồ
                </button>
              </div>
            </FadeInSection>

            {/* Information for Bride's Family */}
            <FadeInSection delay={0.4}>
              <div className="inline-block relative p-6 md:p-12 bg-[#fdfaf5] border border-[#d4af37]/20 rounded-2xl shadow-sm overflow-hidden h-full md:mx-6">
                {/* Decorative floral element */}
                <div className="absolute -top-10 -right-10 w-24 h-24 md:w-32 md:h-32 opacity-20 rotate-45">
                   <img src={hoa1} alt="" className="w-full h-full" />
                </div>
                
                <p className="font-serif text-xl md:text-2xl tracking-widest text-[#8d6e63] mb-6 border-b border-[#d4af37]/30 pb-4">LỄ THÀNH HÔN TẠI NHÀ GÁI</p>
                <div className="flex justify-center items-center gap-4 md:gap-6 text-4xl md:text-5xl font-serif text-[#d4af37] mb-6">
                  <span>19</span>
                  <span className="text-xl md:text-2xl opacity-50">.</span>
                  <span>04</span>
                  <span className="text-xl md:text-2xl opacity-50">.</span>
                  <span>2026</span>
                </div>
                <p className="text-2xl md:text-3xl font-serif text-[#8d6e63] mb-4 uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold drop-shadow-sm">10:30 AM - CHỦ NHẬT</p>
                <div className="space-y-2">
                  
                  <p className="text-gray-500 italic text-sm md:text-base">Khu Suông 1 - Xã Phú Khê - Huyện Cẩm Khê - Tỉnh Phú Thọ</p>
                </div>
                <button className="mt-10 px-8 py-3 bg-[#8d6e63] text-white rounded-full hover:bg-[#7a5e54] transition-all duration-300 shadow-md hover:shadow-lg uppercase tracking-widest text-sm">
                  Xem Bản Đồ
                </button>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Album Section */}
      <section 
        className="py-16 md:py-24 px-4 overflow-hidden"
        style={{ 
          backgroundImage: `url(${back2})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeInSection className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="font-cursive text-5xl md:text-6xl text-white drop-shadow-lg">Album Hình Cưới</h2>
            <div className="w-24 h-px bg-white mx-auto opacity-50"></div>
          </FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[img1, img2, img3, img4, img5, img6].map((img, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md bg-white p-2 transition-all duration-500 hover:shadow-2xl">
                  <div className="w-full h-full overflow-hidden rounded-xl">
                    <img src={img} alt={`Wedding ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Events / Timeline */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <FadeInSection className="text-center mb-16">
            <h2 className="font-cursive text-5xl text-[#8d6e63]">Sự Kiện</h2>
          </FadeInSection>
          
          <div className="space-y-12">
            <FadeInSection className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 aspect-video overflow-hidden rounded-lg shadow-md">
                <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600" alt="Ceremony" className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="font-serif text-2xl font-bold text-[#8d6e63] mb-2 uppercase">Lễ Vu Quy</h3>
                <p className="text-gray-600 mb-4">Lễ xin dâu và rước dâu sẽ được tổ chức tại tư gia nhà gái.</p>
                <div className="flex justify-center md:justify-start gap-4 text-[#d4af37] font-serif">
                  <span className="border-r pr-4">19.04.2026</span>
                  <span>08:00 AM</span>
                </div>
              </div>
            </FadeInSection>
            
            <FadeInSection className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="w-full md:w-1/2 aspect-video overflow-hidden rounded-lg shadow-md">
                <img src={tieccuoi} alt="Party" className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-right">
                <h3 className="font-serif text-2xl font-bold text-[#8d6e63] mb-2 uppercase">Tiệc Cưới</h3>
                <p className="text-gray-600 mb-4">Trân trọng kính mời quý khách đến dự tiệc mừng tại tư gia.</p>
                <div className="flex justify-center md:justify-end gap-4 text-[#d4af37] font-serif">
                  <span className="border-r pr-4">18.04.2026</span>
                  <span>16:00 PM</span>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-16 md:py-20 bg-[#fdf2f2] px-4">
        <FadeInSection className="max-w-2xl mx-auto bg-white p-6 md:p-12 rounded-2xl shadow-xl text-center">
          <h2 className="font-cursive text-4xl md:text-5xl text-[#8d6e63] mb-4">Gửi Lời Chúc</h2>
          <p className="text-gray-600 mb-8 italic text-sm md:text-base">Sự hiện diện của bạn là niềm vinh hạnh cho chúng mình!</p>
          <form className="space-y-6">
            <input type="text" placeholder="Họ và tên của bạn" className="w-full px-6 py-3 bg-[#fdfaf5] border-none rounded-full focus:ring-2 focus:ring-[#d4af37] outline-none" />
            <select className="w-full px-6 py-3 bg-[#fdfaf5] border-none rounded-full focus:ring-2 focus:ring-[#d4af37] outline-none appearance-none">
              <option>Bạn sẽ tham dự chứ?</option>
              <option>Có, mình sẽ đến!</option>
              <option>Tiếc quá, mình không tham dự được</option>
            </select>
            <textarea placeholder="Lời chúc gửi tới cô dâu chú rể" rows="4" className="w-full px-6 py-4 bg-[#fdfaf5] border-none rounded-2xl focus:ring-2 focus:ring-[#d4af37] outline-none resize-none"></textarea>
            <button className="w-full bg-[#8d6e63] text-white font-bold py-4 rounded-full hover:bg-[#7a5e54] transition-colors duration-300 uppercase tracking-widest shadow-lg">
              Gửi lời chúc
            </button>
          </form>
        </FadeInSection>
      </section>

      

      {/* Footer */}
      <footer className="pt-16 pb-6 bg-[#fdfaf5] border-t border-gray-100 text-center">
        <FadeInSection>
          <div className="flex flex-col items-center">
            {/* Center Image */}
            <div className="relative w-64 h-80 md:w-80 md:h-[400px] z-20 shrink-0 mb-8 mx-auto">
              <div className="w-full h-full rounded-t-full overflow-hidden border-[10px] border-white shadow-2xl relative">
                <img src={img9} alt="Couple" className="w-full h-full object-cover" />
                <div className="absolute inset-0 border border-[#d4af37]/20 rounded-t-full pointer-events-none m-1"></div>
              </div>
            </div>

            <div className="space-y-2 mb-2">
              <h2 className="font-cursive text-4xl text-[#8d6e63]">Thank You!</h2>
              <p className="text-gray-500 italic text-lg">Hẹn gặp lại bạn trong ngày vui của chúng mình!</p>
            </div>

            <div className="opacity-10 w-8 h-8 mx-auto">
              <img src={hoa1} alt="" className="w-full h-full object-contain" />
            </div>
          </div>
        </FadeInSection>
      </footer>
    </div>
  )
}

export default App
