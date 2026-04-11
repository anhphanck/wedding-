import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import tieccuoi1 from './assets/tieccuoi1.jpg'
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

const SlideInSection = ({ children, className = "", from = "left", delay = 0 }) => {
  const x = from === "left" ? -72 : 72;
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const eventHeadingVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

const eventTitleVariants = {
  hidden: { opacity: 0, y: -28, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const eventLineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const EventSectionHeading = () => (
  <motion.div
    className="text-center mb-16"
    variants={eventHeadingVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-90px" }}
  >
    <motion.h2
      variants={eventTitleVariants}
      className="font-cursive text-5xl md:text-6xl text-[#8d6e63] drop-shadow-sm"
    >
      Sự Kiện
    </motion.h2>
    <motion.div
      variants={eventLineVariants}
      className="h-[2px] w-28 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-6 origin-center"
    />
  </motion.div>
);

const MusicPlayer = ({ isPlaying, onToggle, hasStarted }) => {
  const audioRef = useRef(null);

  // Điều khiển nhạc bằng thẻ audio trực tiếp
  useEffect(() => {
    if (hasStarted && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log("Autoplay bị chặn hoặc lỗi:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, hasStarted]);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3">
      {/* Audio Element - Dùng file cục bộ để tránh hiện video trên di động */}
      <audio
        ref={audioRef}
        src="/IDo.mp3"
        loop
        preload="auto"
      />

      {/* Nút bật/tắt nhạc với hiệu ứng đĩa quay */}
      <button
        onClick={onToggle}
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

      {/* Tên bài hát hiển thị khi đang phát */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-[#d4af37]/20 hidden md:block"
          >
            <p className="text-xs font-serif text-[#8d6e63] whitespace-nowrap">
              Đang phát: <span className="font-bold">I Do</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WelcomeOverlay = ({ onStart, isExiting }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[100] bg-[#fdfaf5] flex flex-col items-center justify-center p-6 text-center ${isExiting ? 'pointer-events-none' : ''}`}
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#8d6e63]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative w-56 h-56 mb-8 group">
        <div className="absolute inset-0 border-2 border-[#d4af37]/30 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-[-10px] border border-[#d4af37]/10 rounded-full animate-spin-slow"></div>
        <div className="w-full h-full rounded-full border-8 border-white shadow-2xl overflow-hidden relative z-10">
           <img src={img9} alt="Couple" className="w-full h-full object-cover object-[center_20%] scale-125 transition-transform duration-700 group-hover:scale-150" />
        </div>
      </div>
      
      <div className="space-y-4 mb-10 z-10">
        <h2 className="font-cursive text-5xl md:text-6xl text-[#8d6e63]">Chào mừng bạn</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-8 bg-[#d4af37]/50"></div>
          <p className="text-[#d4af37] font-serif italic tracking-[0.3em] uppercase text-xs md:text-sm">Tiến Huy & Ánh Nga</p>
          <div className="h-px w-8 bg-[#d4af37]/50"></div>
        </div>
      </div>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onStart();
        }}
        className="group relative px-16 py-5 bg-[#8d6e63] text-white rounded-full font-bold overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 z-10"
      >
        <span className="relative z-10 flex items-center gap-3 tracking-[0.2em] uppercase text-sm md:text-base">
          Mở Thiệp <span className="text-2xl animate-pulse">💌</span>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-[#8d6e63] via-[#7a5e54] to-[#8d6e63] background-animate"></div>
      </button>
      
    </motion.div>
  );
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [scrollLocked, setScrollLocked] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: null });
  const [rsvpSelection, setRsvpSelection] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: null });
    
    const formData = new FormData(e.target);
    
    try {
      // Đã cập nhật Form ID: xykbqjzg
      const response = await fetch("https://formspree.io/f/xykbqjzg", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus({ submitting: false, success: true, error: null });
        setRsvpSelection(""); // Reset rsvp selection
        e.target.reset();
      } else {
        const data = await response.json();
        // Nếu lỗi là do chưa set up form, hiển thị hướng dẫn cụ thể
        if (data.error && (data.error.includes("not set up") || data.error.includes("inactive"))) {
          setFormStatus({ 
            submitting: false, 
            success: false, 
            error: "Formspree cần được kích hoạt! Hãy kiểm tra email đăng ký Formspree của bạn để nhấn 'Activate' nhé." 
          });
        } else {
          setFormStatus({ submitting: false, success: false, error: data.error || "Có lỗi xảy ra, vui lòng thử lại!" });
        }
      }
    } catch (error) {
      setFormStatus({ submitting: false, success: false, error: "Không thể kết nối đến máy chủ! Vui lòng kiểm tra mạng." });
    }
  };

  const handleStart = () => {
    window.scrollTo(0, 0);
    setHasStarted(true);
    setIsPlaying(true);
    setIsExiting(true);
    setShowWelcome(false);
  };

  const handleToggleMusic = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Chỉ cho phép bật nhạc nếu đã bắt đầu
    if (!hasStarted) {
      setHasStarted(true);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

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

  useEffect(() => {
    if (!scrollLocked) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;
    const prev = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      htmlOverflow: html.style.overflow,
    };

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.left = prev.bodyLeft;
      body.style.right = prev.bodyRight;
      body.style.width = prev.bodyWidth;
      html.style.overflow = prev.htmlOverflow;
      window.scrollTo(0, 0);
    };
  }, [scrollLocked]);

  return (
    <div className="bg-[#fdfaf5] font-sans text-gray-800">
      <AnimatePresence onExitComplete={() => setScrollLocked(false)}>
        {showWelcome && <WelcomeOverlay onStart={handleStart} isExiting={isExiting} />}
      </AnimatePresence>
      <MusicPlayer isPlaying={isPlaying} onToggle={handleToggleMusic} hasStarted={hasStarted} />
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
              initial={{ opacity: 0, x: -100 }}
              animate={hasStarted ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
              className="font-serif italic text-xl tracking-[0.3em] uppercase text-gray-800 font-bold mb-4 drop-shadow-sm"
            >
              Thư mời tiệc cưới
            </motion.p>
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, x: 150 }}
                animate={hasStarted ? { opacity: 1, x: 0 } : { opacity: 0, x: 150 }}
                transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
                className="font-cursive text-5xl md:text-8xl text-[#7a5e54] leading-tight font-bold drop-shadow-md"
              >
                Tiến Huy
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={hasStarted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.8, delay: 1.0, ease: "easeOut" }}
                className="font-serif text-3xl md:text-4xl text-[#c59d2a] font-bold"
              >
                &
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, x: -150 }}
                animate={hasStarted ? { opacity: 1, x: 0 } : { opacity: 0, x: -150 }}
                transition={{ duration: 2, delay: 1.4, ease: "easeOut" }}
                className="font-cursive text-5xl md:text-8xl text-[#7a5e54] leading-tight font-bold drop-shadow-md"
              >
                Ánh Nga
              </motion.h1>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={hasStarted ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 2, delay: 1.8, ease: "easeOut" }}
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

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={hasStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 1.6, delay: 2.1, ease: "easeOut" }}
              className="pt-6"
            >
              <div className="grid grid-cols-4 gap-2 md:gap-3 max-w-md mx-auto md:mx-0 bg-white/25 rounded-2xl p-2 md:p-3 border border-white/40 shadow-sm">
                {[
                  { label: "Ngày", value: timeLeft.days },
                  { label: "Giờ", value: timeLeft.hours },
                  { label: "Phút", value: timeLeft.minutes },
                  { label: "Giây", value: timeLeft.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/70 backdrop-blur-sm rounded-xl border border-[#d4af37]/30 px-2 py-3 md:px-3 md:py-4 text-center shadow-sm"
                  >
                    <p className="text-xl md:text-3xl font-serif font-bold text-[#8d6e63] leading-none">
                      {String(item.value).padStart(2, "0")}
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-600 mt-2">
                      {item.label}
                    </p>
                  </div>
                ))}
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
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-10 mt-12 px-0">
            {/* Information for Groom's Family */}
            <FadeInSection delay={0.2}>
              <div className="relative w-full p-6 md:p-12 bg-[#fdfaf5] border border-[#d4af37]/20 rounded-2xl shadow-sm overflow-hidden h-full">
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
                <p className="text-2xl md:text-3xl font-serif text-[#8d6e63] mb-4 uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold drop-shadow-sm">16:00 PM - CHỦ NHẬT</p>
                <div className="space-y-2">
                <p className="text-gray-500 italic text-sm md:text-base">(NHẰM NGÀY 03/03 BÍNH NGỌ)</p>
                <div className="py-4 space-y-1">
                  <p className="text-lg md:text-xl font-serif text-[#d4af37] italic">Tới dự bữa cơm thân mật</p>
                  <p className="text-lg md:text-xl font-serif text-[#d4af37] italic">Chung vui cùng gia đình chúng tôi</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500 italic text-sm md:text-base">ÔNG: NGUYỄN VĂN DƯƠNG</p>
                  <p className="text-gray-500 italic text-sm md:text-base">BÀ: VŨ THỊ VẤN</p>
                </div>
                <p className="text-gray-500 italic text-sm md:text-base mt-4">Thôn Trung Tuyến - Xã Kim Thành - Tp Hải Phòng</p>
              </div>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=20.9036493,106.508187" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-10 px-8 py-3 bg-[#8d6e63] text-white rounded-full hover:bg-[#7a5e54] transition-all duration-300 shadow-md hover:shadow-lg uppercase tracking-widest text-sm"
                >
                  Xem Bản Đồ
                </a>
              </div>
            </FadeInSection>

            {/* Information for Bride's Family */}
            <FadeInSection delay={0.4}>
              <div className="relative w-full p-6 md:p-12 bg-[#fdfaf5] border border-[#d4af37]/20 rounded-2xl shadow-sm overflow-hidden h-full">
                {/* Decorative floral element */}
                <div className="absolute -top-10 -right-10 w-24 h-24 md:w-32 md:h-32 opacity-20 rotate-45">
                   <img src={hoa1} alt="" className="w-full h-full" />
                </div>
                
                <p className="font-serif text-xl md:text-2xl tracking-widest text-[#8d6e63] mb-6 border-b border-[#d4af37]/30 pb-4">LỄ VU QUY TẠI NHÀ GÁI</p>
                <div className="flex justify-center items-center gap-4 md:gap-6 text-4xl md:text-5xl font-serif text-[#d4af37] mb-6">
                  <span>19</span>
                  <span className="text-xl md:text-2xl opacity-50">.</span>
                  <span>04</span>
                  <span className="text-xl md:text-2xl opacity-50">.</span>
                  <span>2026</span>
                </div>
                <p className="text-2xl md:text-3xl font-serif text-[#8d6e63] mb-4 uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold drop-shadow-sm">8:00 AM - CHỦ NHẬT</p>
                <div className="space-y-2">
                <p className="text-gray-500 italic text-sm md:text-base">(NHẰM NGÀY 03/03 BÍNH NGỌ)</p>
                <div className="py-4 space-y-1">
                  <p className="text-lg md:text-xl font-serif text-[#d4af37] italic">Tới dự bữa cơm thân mật</p>
                  <p className="text-lg md:text-xl font-serif text-[#d4af37] italic">Chung vui cùng gia đình chúng tôi</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500 italic text-sm md:text-base">ÔNG: PHAN THÔNG GIAO</p>
                  <p className="text-gray-500 italic text-sm md:text-base">BÀ: QUẤT THỊ LUYẾN</p>
                </div>
                <p className="text-gray-500 italic text-sm md:text-base mt-4">Khu Suông 1 - Xã Phú Khê - Tỉnh Phú Thọ</p>
              </div>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=21.381900,105.085898" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-10 px-8 py-3 bg-[#8d6e63] text-white rounded-full hover:bg-[#7a5e54] transition-all duration-300 shadow-md hover:shadow-lg uppercase tracking-widest text-sm"
                >
                  Xem Bản Đồ
                </a>
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
            {[img6, img2, img3, img4, img5, img1].map((img, i) => {
              // Định nghĩa các hướng đi vào khác nhau cho 6 ảnh
              const directions = [
                { x: -100, y: 0 },  // Trái qua
                { x: 0, y: -100 },  // Trên xuống
                { x: 100, y: 0 },   // Phải qua
                { x: 0, y: 100 },   // Dưới lên
                { x: -100, y: 100 }, // Chéo trái dưới
                { x: 100, y: -100 }  // Chéo phải trên
              ];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: directions[i].x, y: directions[i].y }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 1, 
                    delay: i * 0.1, 
                    type: "spring", 
                    stiffness: 50, 
                    damping: 15 
                  }}
                  className="group relative aspect-[3/4] rounded-2xl shadow-lg border-[6px] md:border-[10px] border-white bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="w-full h-full overflow-hidden rounded-lg">
                    <img src={img} alt={`Wedding ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    {/* Lớp phủ nhẹ khi hover */}
                    <div className="absolute inset-0 bg-[#8d6e63]/0 group-hover:bg-[#8d6e63]/10 transition-colors duration-500"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events / Timeline */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <EventSectionHeading />

          <div className="space-y-12">
            <SlideInSection from="right" className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 aspect-video overflow-hidden rounded-lg shadow-md">
                <img src={tieccuoi1} alt="Ceremony" className="w-full h-full object-cover" />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="font-serif text-2xl font-bold text-[#8d6e63] mb-2 uppercase">Lễ Vu Quy</h3>
                <p className="text-gray-600 mb-4">Lễ xin dâu và rước dâu sẽ được tổ chức tại tư gia nhà gái.</p>
                <div className="flex justify-center md:justify-start gap-4 text-[#d4af37] font-serif">
                  <span className="border-r pr-4">19.04.2026</span>
                  <span>08:00 AM</span>
                </div>
              </div>
            </SlideInSection>
            
            <SlideInSection from="left" className="flex flex-col md:flex-row-reverse gap-8 items-center">
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
            </SlideInSection>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-16 md:py-20 bg-[#fdf2f2] px-4">
        <FadeInSection className="max-w-2xl mx-auto bg-white p-6 md:p-12 rounded-2xl shadow-xl text-center relative overflow-hidden">
          {/* Success Overlay */}
          <AnimatePresence>
            {formStatus.success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                  className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-inner"
                >
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </motion.div>
                
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-cursive text-[#8d6e63] mb-4"
                >
                  Gửi lời chúc thành công!
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-600 italic mb-8 max-w-[280px]"
                >
                  Cảm ơn bạn đã dành tình cảm và sự hiện diện quý báu cho chúng mình. Hẹn gặp lại bạn sớm nhé! ❤️
                </motion.p>
                
                <motion.button 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  onClick={() => setFormStatus(prev => ({ ...prev, success: false }))}
                  className="px-10 py-3 bg-[#8d6e63] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#7a5e54] shadow-lg transition-colors"
                >
                  Tiếp tục xem thiệp
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <h2 className="font-cursive text-4xl md:text-5xl text-[#8d6e63] mb-4">Gửi Lời Chúc</h2>
          <p className="text-gray-600 mb-8 italic text-sm md:text-base">Sự hiện diện của bạn là niềm vinh hạnh cho chúng mình!</p>
          
          <form 
            onSubmit={handleFormSubmit}
            className="space-y-6"
          >
            <input 
              name="Họ và Tên"
              type="text" 
              placeholder="Họ và tên của bạn" 
              required
              className="w-full px-6 py-3 bg-[#fdfaf5] border-none rounded-full focus:ring-2 focus:ring-[#d4af37] outline-none" 
            />
            <select 
              name="Tham dự"
              required
              value={rsvpSelection}
              onChange={(e) => setRsvpSelection(e.target.value)}
              className={`w-full px-6 py-3 bg-[#fdfaf5] border-none rounded-full focus:ring-2 focus:ring-[#d4af37] outline-none appearance-none transition-colors ${rsvpSelection === "" ? "text-gray-500 font-light" : "text-gray-800 font-normal"}`}
            >
              <option value="" className="text-gray-500 font-light">Bạn sẽ tham dự chứ?</option>
              <option value="Có, mình sẽ đến!" className="text-gray-800">Có, mình sẽ đến!</option>
              <option value="Tiếc quá, mình không tham dự được" className="text-gray-800">Tiếc quá, mình không tham dự được</option>
            </select>
            <textarea 
              name="Lời chúc"
              placeholder="Lời chúc gửi tới cô dâu chú rể" 
              rows="4" 
              required
              className="w-full px-6 py-4 bg-[#fdfaf5] border-none rounded-2xl focus:ring-2 focus:ring-[#d4af37] outline-none resize-none"
            ></textarea>
            
            {formStatus.error && (
              <p className="text-red-500 text-sm italic">{formStatus.error}</p>
            )}

            <button 
              type="submit"
              disabled={formStatus.submitting}
              className={`w-full bg-[#8d6e63] text-white font-bold py-4 rounded-full transition-all duration-300 uppercase tracking-widest shadow-lg ${formStatus.submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#7a5e54]'}`}
            >
              {formStatus.submitting ? 'Đang gửi...' : 'Gửi lời chúc'}
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
              <motion.h2 
                className="font-cursive text-4xl text-[#8d6e63]"
                animate={{ rotate: [0, 1.5, -1.5, 1, -1, 0], y: [0, -2, 2, -1, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                whileHover={{ rotate: [0, 2.5, -2.5, 0], scale: 1.03, transition: { duration: 0.6 } }}
              >
                Thank You!
              </motion.h2>
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
