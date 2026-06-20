const fs = require('fs');
const file = 'src/components/sections/experiences-grid.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add imports
code = code.replace('import { motion, AnimatePresence } from "framer-motion";', 
`import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export interface ExperienceMedia {
  _type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface ExperienceItem {
  _id: string;
  title: string;
  venueLogo: string;
  location: string;
  isFeatured: boolean;
  duration?: string;
  previewText?: string;
  fullText?: string;
  highlights?: string[];
  coverImage: string;
  gallery?: ExperienceMedia[];
}
`);

// 2. Fix the EXPERIENCES mock array
code = code.replace(/const EXPERIENCES = \[[\s\S]*?\];/g, 
`const EXPERIENCES: ExperienceItem[] = [
  {
    _id: "taj-lands-end",
    venueLogo: "TAJ",
    title: "Taj Lands End",
    location: "MUMBAI",
    previewText: "Luxury flute residency creating serene ambience and memorable moments for distinguished guests.",
    fullText: "Immerse yourself in the soulful melodies of the flute at the iconic Taj Lands End. Our exclusive residency program features ambient morning instrumentals and sophisticated evening performances designed to elevate the luxury guest experience. Set against the stunning backdrop of the Arabian Sea, these curated performances transform the lobby and premium dining areas into a sanctuary of tranquility.",
    coverImage: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800",
    gallery: [
      { _type: 'image', url: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800" },
      { _type: 'video', url: "https://www.youtube.com/watch?v=LXb3EKWsInQ", thumbnail: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800" },
      { _type: 'image', url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800" }
    ],
    duration: "02:15",
    highlights: ["Lobby Ambience", "Premium Dining", "Guest Receptions"],
    isFeatured: true
  },
  {
    _id: "taj-santacruz",
    venueLogo: "TAJ",
    title: "Taj Santacruz",
    location: "MUMBAI",
    previewText: "Live music experiences at the lobby and dining venues for elevated guest experiences.",
    fullText: "Experience the vibrant energy of live music at Taj Santacruz. Our vocal and acoustic sets are perfectly tailored to complement the bustling, cosmopolitan atmosphere of the hotel.",
    coverImage: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800",
    gallery: [
      { _type: 'image', url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800" },
      { _type: 'image', url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800" }
    ],
    duration: "01:48",
    highlights: ["Evening Lounges", "Live Singing", "Acoustic Sets"],
    isFeatured: false
  }
];`);

// 3. Update Props interface
code = code.replace(/export interface ExperiencesGridProps {[\s\S]*?}/, 
`export interface ExperiencesGridProps {
  goldenTitle?: string;
  title?: string;
  subtitle?: string;
  experiences?: ExperienceItem[];
}`);

// 4. Update Component args
code = code.replace(/export const ExperiencesGrid = \(\{ goldenTitle, title, subtitle \}: ExperiencesGridProps\) => \{/,
`export const ExperiencesGrid = ({ goldenTitle, title, subtitle, experiences = EXPERIENCES }: ExperiencesGridProps) => {`);

// 5. Update State and activeMedia logic
code = code.replace(/const \[activeExp, setActiveExp\] = useState<typeof EXPERIENCES\[0\] \| null>\(null\);/,
`const [activeExp, setActiveExp] = useState<ExperienceItem | null>(null);
  const [activeMedia, setActiveMedia] = useState<ExperienceMedia | null>(null);

  React.useEffect(() => {
    if (activeExp) {
      if (activeExp.gallery && activeExp.gallery.length > 0) {
        setActiveMedia(activeExp.gallery[0]);
      } else {
        setActiveMedia({ _type: 'image', url: activeExp.coverImage });
      }
    } else {
      setActiveMedia(null);
    }
  }, [activeExp]);`);

// 6. Update mapping to use \`experiences\` array
code = code.replace(/\{EXPERIENCES\.map\(\(exp, idx\)/, `{experiences.map((exp, idx)`);

// 7. Update card fields mapping
code = code.replace(/exp\.image/g, `exp.coverImage`);
code = code.replace(/exp\.isTaj \? <TajLogo \/> : <GingerLogo \/>/g, `exp.venueLogo === 'TAJ' ? <TajLogo /> : exp.venueLogo === 'GINGER' ? <GingerLogo /> : null`);
code = code.replace(/exp\.subtitle/g, `exp.location`);
code = code.replace(/exp\.description/g, `exp.previewText`);

// 8. Update Modal logic mapping
code = code.replace(/activeExp\.isTaj \? <TajLogo \/> : <GingerLogo \/>/, `activeExp.venueLogo === 'TAJ' ? <TajLogo /> : activeExp.venueLogo === 'GINGER' ? <GingerLogo /> : null`);
code = code.replace(/activeExp\.subtitle/g, `activeExp.location`);
code = code.replace(/activeExp\.fullDescription/g, `activeExp.fullText`);
code = code.replace(/activeExp\.bullets/g, `(activeExp.highlights || [])`);

// 9. Replace Video Player Placeholder
code = code.replace(/<div className="relative w-full flex-1 md:flex-none md:h-\[70%\] group">[\s\S]*?{activeExp\.duration} HD\n\s*<\/div>\n\s*<\/div>/,
`<div className="relative w-full flex-1 md:flex-none md:h-[70%] group bg-black flex items-center justify-center overflow-hidden">
                  {activeMedia?._type === 'video' ? (
                    <div className="w-full h-full relative">
                      <ReactPlayer
                        url={activeMedia.url}
                        width="100%"
                        height="100%"
                        controls
                        playing={true}
                        light={activeMedia.thumbnail || false}
                        playIcon={
                          <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center bg-black/40 backdrop-blur-md text-white shadow-xl hover:scale-110 hover:bg-gold/20 hover:text-gold transition-all duration-300 cursor-pointer">
                            <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        }
                        style={{ position: 'absolute', top: 0, left: 0 }}
                      />
                    </div>
                  ) : (
                    <img src={activeMedia?.url || activeExp.coverImage} className="w-full h-full object-cover opacity-90" />
                  )}
                  {/* Duration Tag */}
                  {activeExp.duration && (
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-md text-[10px] text-white/90 border border-white/10 z-10 pointer-events-none">
                      {activeExp.duration} HD
                    </div>
                  )}
                </div>`);

// 10. Replace Thumbnails
code = code.replace(/\{activeExp\.gallery\?\.map\(\(img, i\) => \([\s\S]*?<\/SwiperSlide>\n\s*\)\)}/,
`{activeExp.gallery?.map((media, i) => (
                      <SwiperSlide key={i} className="w-auto! h-full">
                        <div 
                          onClick={() => setActiveMedia(media)}
                          className={\`h-full aspect-video rounded-xl overflow-hidden border transition-all cursor-pointer relative \${activeMedia === media ? 'border-gold shadow-[0_0_15px_rgba(201,167,109,0.3)]' : 'border-white/10 opacity-60 hover:opacity-100'}\`}
                        >
                          <img src={media.thumbnail || media.url} className="w-full h-full object-cover" />
                          {media._type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                          )}
                        </div>
                      </SwiperSlide>
                    ))}`);

fs.writeFileSync(file, code);
