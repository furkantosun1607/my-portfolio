export const tsnFeedArticles = [
  {
    id: "webb-first-images",
    category: "Bilim & Uzay",
    title: "Webb, evrene açılan yeni penceresini gösterdi",
    summary:
      "James Webb Uzay Teleskobu'nun ilk tam renkli görüntüleri yayımlandı. Carina Bulutsusu'nun yıldız oluşum bölgesi, kızılötesi gözlemlerle daha önce görülmeyen ayrıntıları ortaya çıkardı.",
    date: "2022-07-12",
    displayDate: "12 Temmuz 2022",
    image: "/images/projects/tsn/webb-carina.jpg",
    imageHeight: 741,
    imageAlt:
      "James Webb'in görüntülediği Carina Bulutsusu'nda turuncu gaz ve toz bulutları ile mavi bir yıldız alanı.",
    imagePosition: "50% 30%",
    photoCredit: "NASA, ESA, CSA, STScI",
    photoSource: "https://images-assets.nasa.gov/image/carina_nebula/carina_nebula~medium.jpg",
    source: "NASA",
    sourceUrl:
      "https://www.nasa.gov/news-release/nasa-reveals-webb-telescopes-first-images-of-unseen-universe/",
  },
  {
    id: "artemis-first-flight",
    category: "Keşif",
    title: "Artemis I, Ay yolculuğuna başladı",
    summary:
      "SLS roketi, insansız Orion uzay aracını Kennedy Uzay Merkezi'nden fırlattı. Artemis I, NASA'nın derin uzay sistemlerini birlikte sınayan ilk uçuş testi olarak Ay'a doğru yola çıktı.",
    date: "2022-11-16",
    displayDate: "16 Kasım 2022",
    image: "/images/projects/tsn/artemis-launch.jpg",
    imageHeight: 795,
    imageAlt:
      "Artemis I roketinin gece fırlatılışı; parlak motor alevleri fırlatma rampasını aydınlatıyor.",
    imagePosition: "65% 20%",
    photoCredit: "NASA / Joel Kowsky",
    photoSource: "https://images-assets.nasa.gov/image/NHQ202211160002/NHQ202211160002~medium.jpg",
    source: "NASA",
    sourceUrl:
      "https://www.nasa.gov/news-release/liftoff-nasas-artemis-i-mega-rocket-launches-orion-to-moon/",
  },
  {
    id: "perseverance-touchdown",
    category: "Teknoloji & Uzay",
    title: "Perseverance, Mars'a başarıyla indi",
    summary:
      "NASA'nın keşif aracı, 203 günlük yolculuğun ardından Mars'a ulaştı. Görev, Jezero Krateri'nin jeolojisini incelemeyi ve geçmiş mikrobiyal yaşamın izlerini araştırmayı hedefliyor.",
    date: "2021-02-18",
    displayDate: "18 Şubat 2021",
    image: "/images/projects/tsn/perseverance-landing.jpg",
    imageHeight: 960,
    imageAlt:
      "Perseverance keşif aracı, iniş kamerasının görüntüsünde Mars yüzeyine kablolarla alçaltılıyor.",
    imagePosition: "50% 20%",
    photoCredit: "NASA / JPL-Caltech",
    photoSource: "https://images-assets.nasa.gov/image/PIA24428/PIA24428~medium.jpg",
    source: "NASA",
    sourceUrl:
      "https://www.nasa.gov/news-release/touchdown-nasas-mars-perseverance-rover-safely-lands-on-red-planet/",
  },
] as const;

export function getFeedIndex(scrollTop: number, viewportHeight: number, count: number) {
  if (viewportHeight <= 0 || count <= 0) return 0;
  return Math.max(0, Math.min(count - 1, Math.round(scrollTop / viewportHeight)));
}
