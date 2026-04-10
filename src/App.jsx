import { useState, useEffect } from 'react'
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
    <div className="min-h-screen bg-[#fdfaf5] font-sans text-gray-800 overflow-x-hidden">
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
              className="font-serif italic text-xl tracking-[0.3em] uppercase text-gray-600 mb-4"
            >
              Chúng tôi cưới
            </motion.p>
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="font-cursive text-7xl md:text-8xl text-[#8d6e63] leading-tight"
              >
                Tiến Huy
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="font-serif text-4xl text-[#d4af37]"
              >
                &
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="font-cursive text-7xl md:text-8xl text-[#8d6e63] leading-tight"
              >
                Ánh Nga
              </motion.h1>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex justify-center md:justify-start items-center gap-6 mt-12 font-serif text-5xl md:text-7xl text-[#8d6e63] tracking-tighter"
            >
              <div className="flex flex-col items-center">
                <span className="font-bold opacity-90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]">19</span>
                <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-sans mt-2">Tháng 04</span>
              </div>
              <span className="w-px h-20 bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent"></span>
              <div className="flex flex-col items-center">
                <span className="font-bold opacity-90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]">2026</span>
                <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-sans mt-2">Chủ Nhật</span>
              </div>
            </motion.div>
          </FadeInSection>

          <FadeInSection className="relative flex justify-center items-center h-[500px]" delay={0.5}>
            {/* Main Arch Image */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="w-[350px] h-[500px] rounded-t-full overflow-hidden border-[12px] border-white shadow-2xl z-10 relative"
            >
              <img src={img4} alt="Wedding Couple" className="w-full h-full object-cover" />
              {/* Decorative line around arch */}
              <div className="absolute inset-0 border border-[#d4af37]/20 rounded-t-full pointer-events-none m-2"></div>
            </motion.div>
            {/* Secondary Overlapping Image */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 right-0 md:-right-8 w-64 h-80 rounded-t-full overflow-hidden border-8 border-white shadow-xl z-20 transform translate-y-8"
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
              "Giữa hàng triệu người, chúng ta đã tìm thấy nhau – đó chính là điều kỳ diệu nhất của tình yêu."
            </p>
          </FadeInSection>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-16 mt-12">
            {/* Information for Groom's Family */}
            <FadeInSection delay={0.2}>
              <div className="inline-block relative p-12 bg-[#fdfaf5] border border-[#d4af37]/20 rounded-2xl shadow-sm overflow-hidden h-full md:mx-6">
                {/* Decorative floral element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 opacity-20 rotate-45">
                   <img src={hoa1} alt="" className="w-full h-full" />
                </div>
                
                <p className="font-serif text-2xl tracking-widest text-[#8d6e63] mb-6 border-b border-[#d4af37]/30 pb-4">LỄ THÀNH HÔN TẠI NHÀ TRAI</p>
                <div className="flex justify-center items-center gap-6 text-5xl font-serif text-[#d4af37] mb-6">
                  <span>19</span>
                  <span className="text-2xl opacity-50">.</span>
                  <span>04</span>
                  <span className="text-2xl opacity-50">.</span>
                  <span>2026</span>
                </div>
                <p className="text-3xl font-serif text-[#8d6e63] mb-4 uppercase tracking-[0.2em] font-bold drop-shadow-sm">10:30 AM - CHỦ NHẬT</p>
                <div className="space-y-2">
                  <p className="text-xl font-medium text-[#8d6e63]">Nhà riêng chú rể</p>
                  <p className="text-gray-500 italic">Địa chỉ nhà trai</p>
                </div>
                <button className="mt-10 px-8 py-3 bg-[#8d6e63] text-white rounded-full hover:bg-[#7a5e54] transition-all duration-300 shadow-md hover:shadow-lg uppercase tracking-widest text-sm">
                  Xem Bản Đồ
                </button>
              </div>
            </FadeInSection>

            {/* Information for Bride's Family */}
            <FadeInSection delay={0.4}>
              <div className="inline-block relative p-12 bg-[#fdfaf5] border border-[#d4af37]/20 rounded-2xl shadow-sm overflow-hidden h-full md:mx-6">
                {/* Decorative floral element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 opacity-20 rotate-45">
                   <img src={hoa1} alt="" className="w-full h-full" />
                </div>
                
                <p className="font-serif text-2xl tracking-widest text-[#8d6e63] mb-6 border-b border-[#d4af37]/30 pb-4">LỄ THÀNH HÔN TẠI NHÀ GÁI</p>
                <div className="flex justify-center items-center gap-6 text-5xl font-serif text-[#d4af37] mb-6">
                  <span>19</span>
                  <span className="text-2xl opacity-50">.</span>
                  <span>04</span>
                  <span className="text-2xl opacity-50">.</span>
                  <span>2026</span>
                </div>
                <p className="text-3xl font-serif text-[#8d6e63] mb-4 uppercase tracking-[0.2em] font-bold drop-shadow-sm">10:30 AM - CHỦ NHẬT</p>
                <div className="space-y-2">
                  <p className="text-xl font-medium text-[#8d6e63]">Nhà riêng cô dâu</p>
                  <p className="text-gray-500 italic">Địa chỉ nhà gái</p>
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
        className="py-24 px-4 overflow-hidden"
        style={{ 
          backgroundImage: `url(${back2})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeInSection className="text-center mb-16 space-y-4">
            <h2 className="font-cursive text-6xl text-white drop-shadow-lg">Album Hình Cưới</h2>
            <div className="w-24 h-px bg-white mx-auto opacity-50"></div>
          </FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
                <p className="text-gray-600 mb-4">Trân trọng kính mời quý khách đến dự tiệc mừng tại nhà hàng.</p>
                <div className="flex justify-center md:justify-end gap-4 text-[#d4af37] font-serif">
                  <span className="border-r pr-4">19.04.2026</span>
                  <span>11:00 AM</span>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-20 bg-[#fdf2f2] px-4">
        <FadeInSection className="max-w-2xl mx-auto bg-white p-12 rounded-2xl shadow-xl text-center">
          <h2 className="font-cursive text-5xl text-[#8d6e63] mb-4">Gửi Lời Chúc</h2>
          <p className="text-gray-600 mb-8 italic">Sự hiện diện của bạn là niềm vinh hạnh cho chúng mình!</p>
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

      {/* Gift / QR Section */}
      <section className="py-20 bg-white px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <FadeInSection className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 bg-[#fdfaf5]/50 p-8 md:p-12 rounded-3xl">
            {/* Groom Gift */}
            <div className="flex-1 text-center md:text-right space-y-4 z-10 md:pr-12">
              <h3 className="font-serif text-2xl text-[#8d6e63] font-bold">Mừng cưới đến chú rể</h3>
              <div className="flex flex-row-reverse items-center justify-center md:justify-start gap-4">
                <div className="w-32 h-32 bg-white p-2 rounded-xl shadow-sm border border-[#d4af37]/20">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExampleGroomBank" alt="QR Groom" className="w-full h-full" />
                </div>
                <div className="text-[#8d6e63] text-sm">
                  <p className="font-bold uppercase">Ngân hàng Vietcombank</p>
                  <p>BÙI TIẾN HUY</p>
                  <p className="font-mono">1234567890</p>
                </div>
              </div>
            </div>

            {/* Center Image */}
            <div className="relative w-64 h-80 md:w-80 md:h-[400px] z-20 shrink-0">
              <div className="w-full h-full rounded-t-full overflow-hidden border-[10px] border-white shadow-2xl relative">
                <img src={img9} alt="Couple" className="w-full h-full object-cover" />
                <div className="absolute inset-0 border border-[#d4af37]/20 rounded-t-full pointer-events-none m-1"></div>
              </div>
            </div>

            {/* Bride Gift */}
            <div className="flex-1 text-center md:text-left space-y-4 z-10 md:pl-12">
              <h3 className="font-serif text-2xl text-[#8d6e63] font-bold">Mừng cưới đến cô dâu</h3>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="w-32 h-32 bg-white p-2 rounded-xl shadow-sm border border-[#d4af37]/20">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExampleBrideBank" alt="QR Bride" className="w-full h-full" />
                </div>
                <div className="text-[#8d6e63] text-sm">
                  <p className="font-bold uppercase">Ngân hàng Techcombank</p>
                  <p>TRẦN ÁNH NGA</p>
                  <p className="font-mono">0987654321</p>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection className="mt-16 text-center space-y-6">
            <h2 className="font-cursive text-6xl text-[#8d6e63] drop-shadow-sm">Mừng cưới</h2>
            <p className="max-w-2xl mx-auto text-gray-500 italic text-sm md:text-base leading-relaxed">
              Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nhé ^^. Cảm ơn bạn rất nhiều!
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#fdfaf5] border-t border-gray-100 text-center">
        <FadeInSection>
          <h2 className="font-cursive text-4xl text-[#8d6e63] mb-4">Thank You!</h2>
          <p className="text-gray-500 italic">Hẹn gặp lại bạn trong ngày vui của chúng mình!</p>
          <div className="mt-8 opacity-20 w-32 h-32 mx-auto">
             <img src={hoa1} alt="" className="w-full h-full object-contain" />
          </div>
        </FadeInSection>
      </footer>
    </div>
  )
}

export default App
