import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      apartments: "Apartments",
      amenities: "Amenities",
      gallery: "Gallery",
      location: "Location",
      contact: "Contact",
      loyaltyProgram: "Loyalty Program",
      blog: "Blog",
      bookNow: "Book Now",
      checkRates: "CHECK RATES",
      whatsapp: "WhatsApp",
      
      // Hero Section
      welcomeTo: "WELCOME TO ORBI CITY BATUMI",
      heroTitle: "Your Perfect Seaside Escape",
      heroSubtitle: "Experience unparalleled luxury on the shores of the Black Sea",
      
      // Apartments Section
      exclusiveResidences: "EXCLUSIVE RESIDENCES",
      discoverSanctuary: "Discover Your Perfect Sanctuary",
      sanctuaryDesc: "Each residence is meticulously crafted to offer an unparalleled living experience, where timeless elegance meets contemporary comfort.",
      viewDetails: "View Details",
      guests: "Guests",
      bedrooms: "Bedrooms",
      size: "Size",
      
      // Gallery
      visualJourney: "VISUAL JOURNEY",
      glimpseTitle: "A Glimpse into Our World of Luxury",
      exploreGallery: "Explore Full Gallery",
      
      // About Section
      discoverOrbiCity: "Discover Orbi City Batumi",
      aboutDesc: "Discover unparalleled luxury at Orbi City, where every apartment offers breathtaking Black Sea views and five-star comfort. Located in the heart of Batumi, our serviced apartments combine modern elegance with exceptional hospitality. Whether you're here for business or leisure, experience the perfect blend of comfort, convenience, and coastal beauty.",
      exploreAmenities: "Explore Amenities",
      viewLocation: "View Location",
      
      // Virtual Tours
      immersiveExperience: "IMMERSIVE EXPERIENCE",
      virtualTours: "Virtual Tours",
      virtualToursDesc: "Take a virtual tour of Orbi City Batumi and explore our stunning apartments and facilities from the comfort of your home.",
      
      // Testimonials
      guestExperiences: "GUEST EXPERIENCES",
      whatGuestsSay: "What Our Guests Say",
      
      // Location
      findUs: "FIND US",
      ourLocation: "Our Location",
      locationDesc: "Perfectly situated in the heart of Batumi, steps away from the Black Sea",
      address: "Address",
      phone: "Phone",
      distanceFromAirport: "Distance from Airport",
      getDirections: "Get Directions",
      beach: "Beach",
      attraction: "Attraction",
      landmark: "Landmark",
      airport: "Airport",
      
      // Footer
      aparthotelTitle: "5 Star Aparthotel Orbi City",
      aparthotelDesc: "Discover unparalleled luxury at Orbi City, where every apartment offers breathtaking Black Sea views and five-star comfort.",
      quickLinks: "Quick Links",
      legal: "Legal",
      aboutUs: "About Us",
      purchaseConditions: "Purchase Conditions",
      privacyPolicy: "Privacy Policy",
      termsConditions: "Terms and Conditions",
      allRightsReserved: "All rights reserved",
      
      // Chat
      chatWithUs: "Chat with us!",
      
      // Common
      loading: "Loading...",
    },
  },
  ka: {
    translation: {
      // Navigation
      home: "მთავარი",
      apartments: "აპარტამენტები",
      amenities: "პირობები",
      gallery: "გალერეა",
      location: "მდებარეობა",
      contact: "კონტაქტი",
      loyaltyProgram: "ლოიალობის პროგრამა",
      blog: "ბლოგი",
      bookNow: "დაჯავშნა",
      checkRates: "ფასების ნახვა",
      whatsapp: "WhatsApp",
      
      // Hero Section
      welcomeTo: "მოგესალმებით ორბი სითი ბათუმში",
      heroTitle: "თქვენი სრულყოფილი სანაპირო თავშესაფარი",
      heroSubtitle: "განიცადეთ ულუფასო ლუქსუზი შავი ზღვის სანაპიროზე",
      
      // Apartments Section
      exclusiveResidences: "ექსკლუზიური რეზიდენციები",
      discoverSanctuary: "აღმოაჩინეთ თქვენი სრულყოფილი თავშესაფარი",
      sanctuaryDesc: "თითოეული რეზიდენცია საგულდაგულოდაა შექმნილი, რათა შესთავაზოთ უბადლო საცხოვრებელი გამოცდილება, სადაც უკვდავი ელეგანტურობა შეხვდება თანამედროვე კომფორტს.",
      viewDetails: "დეტალები",
      guests: "სტუმარი",
      bedrooms: "საძინებელი",
      size: "ზომა",
      
      // Gallery
      visualJourney: "ᲕᲘᲖᲣᲐᲚᲣᲠᲘ ᲛᲝᲒᲖᲐᲣᲠᲝᲑᲐ",
      glimpseTitle: "ჩვენი ლუქსუზის სამყაროს მიმოხილვა",
      exploreGallery: "სრული გალერეის ნახვა",
      
      // About Section
      discoverOrbiCity: "აღმოაჩინეთ ორბი სითი ბათუმი",
      aboutDesc: "აღმოაჩინეთ ულუფასო ლუქსუზი ორბი სითიში, სადაც ყველა აპარტამენტი გთავაზობთ შავი ზღვის შთამბეჭდავ ხედებსა და ხუთვარსკვლავიან კომფორტს. ბათუმის ცენტრში მდებარე ჩვენი სერვისული აპარტამენტები აერთიანებს თანამედროვე ელეგანტურობას განსაკუთრებულ სტუმართმოყვარეობასთან. იქნება ეს ბიზნესი თუ დასვენება, განიცადეთ კომფორტის, მოხერხებულობისა და სანაპირო სილამაზის სრულყოფილი ნაზავი.",
      exploreAmenities: "პირობების ნახვა",
      viewLocation: "მდებარეობის ნახვა",
      
      // Virtual Tours
      immersiveExperience: "ინტერაქტიული ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ",
      virtualTours: "ვირტუალური ტურები",
      virtualToursDesc: "გაიარეთ ვირტუალური ტური ორბი სითი ბათუმში და გაეცანით ჩვენს შთამბეჭდავ აპარტამენტებსა და პირობებს თქვენი სახლის კომფორტიდან.",
      
      // Testimonials
      guestExperiences: "სტუმრების გამოცდილება",
      whatGuestsSay: "რას ამბობენ ჩვენი სტუმრები",
      
      // Location
      findUs: "იპოვეთ ჩვენ",
      ourLocation: "ჩვენი მდებარეობა",
      locationDesc: "იდეალურად მდებარეობს ბათუმის ცენტრში, შავი ზღვის ახლოს",
      address: "მისამართი",
      phone: "ტელეფონი",
      distanceFromAirport: "მანძილი აეროპორტიდან",
      getDirections: "მიმართულების ნახვა",
      beach: "პლაჟი",
      attraction: "ღირსშესანიშნაობა",
      landmark: "ლანდმარკი",
      airport: "აეროპორტი",
      
      // Footer
      aparthotelTitle: "5 ვარსკვლავიანი აპარტოტელი ორბი სითი",
      aparthotelDesc: "აღმოაჩინეთ ულუფასო ლუქსუზი ორბი სითიში, სადაც ყველა აპარტამენტი გთავაზობთ შავი ზღვის შთამბეჭდავ ხედებსა და ხუთვარსკვლავიან კომფორტს.",
      quickLinks: "სწრაფი ბმულები",
      legal: "იურიდიული",
      aboutUs: "ჩვენ შესახებ",
      purchaseConditions: "შეძენის პირობები",
      privacyPolicy: "კონფიდენციალურობის პოლიტიკა",
      termsConditions: "წესები და პირობები",
      allRightsReserved: "ყველა უფლება დაცულია",
      
      // Chat
      chatWithUs: "დაგვიკავშირდით!",
      
      // Common
      loading: "იტვირთება...",
    },
  },
  ru: {
    translation: {
      // Navigation
      home: "Главная",
      apartments: "Апартаменты",
      amenities: "Удобства",
      gallery: "Галерея",
      location: "Расположение",
      contact: "Контакты",
      loyaltyProgram: "Программа лояльности",
      blog: "Блог",
      bookNow: "Забронировать",
      checkRates: "УЗНАТЬ ЦЕНЫ",
      whatsapp: "WhatsApp",
      
      // Hero Section
      welcomeTo: "ДОБРО ПОЖАЛОВАТЬ В ORBI CITY BATUMI",
      heroTitle: "Ваш идеальный морской отдых",
      heroSubtitle: "Испытайте непревзойденную роскошь на берегу Черного моря",
      
      // Apartments Section
      exclusiveResidences: "ЭКСКЛЮЗИВНЫЕ РЕЗИДЕНЦИИ",
      discoverSanctuary: "Откройте для себя ваше идеальное убежище",
      sanctuaryDesc: "Каждая резиденция тщательно создана, чтобы предложить непревзойденный жизненный опыт, где вневременная элегантность встречается с современным комфортом.",
      viewDetails: "Подробнее",
      guests: "Гостей",
      bedrooms: "Спален",
      size: "Размер",
      
      // Gallery
      visualJourney: "ВИЗУАЛЬНОЕ ПУТЕШЕСТВИЕ",
      glimpseTitle: "Взгляд в наш мир роскоши",
      exploreGallery: "Смотреть всю галерею",
      
      // About Section
      discoverOrbiCity: "Откройте для себя Orbi City Batumi",
      aboutDesc: "Откройте для себя непревзойденную роскошь в Orbi City, где каждая квартира предлагает захватывающий вид на Черное море и пятизвездочный комфорт. Расположенные в самом сердце Батуми, наши апартаменты с обслуживанием сочетают современную элегантность с исключительным гостеприимством. Будь то бизнес или отдых, испытайте идеальное сочетание комфорта, удобства и прибрежной красоты.",
      exploreAmenities: "Посмотреть удобства",
      viewLocation: "Посмотреть расположение",
      
      // Virtual Tours
      immersiveExperience: "ЗАХВАТЫВАЮЩИЙ ОПЫТ",
      virtualTours: "Виртуальные туры",
      virtualToursDesc: "Совершите виртуальную экскурсию по Orbi City Batumi и изучите наши потрясающие апартаменты и удобства не выходя из дома.",
      
      // Testimonials
      guestExperiences: "ОТЗЫВЫ ГОСТЕЙ",
      whatGuestsSay: "Что говорят наши гости",
      
      // Location
      findUs: "НАЙДИТЕ НАС",
      ourLocation: "Наше расположение",
      locationDesc: "Идеально расположен в самом сердце Батуми, в нескольких шагах от Черного моря",
      address: "Адрес",
      phone: "Телефон",
      distanceFromAirport: "Расстояние от аэропорта",
      getDirections: "Проложить маршрут",
      beach: "Пляж",
      attraction: "Достопримечательность",
      landmark: "Ориентир",
      airport: "Аэропорт",
      
      // Footer
      aparthotelTitle: "5-звездочный апарт-отель Orbi City",
      aparthotelDesc: "Откройте для себя непревзойденную роскошь в Orbi City, где каждая квартира предлагает захватывающий вид на Черное море и пятизвездочный комфорт.",
      quickLinks: "Быстрые ссылки",
      legal: "Юридическая информация",
      aboutUs: "О нас",
      purchaseConditions: "Условия покупки",
      privacyPolicy: "Политика конфиденциальности",
      termsConditions: "Условия и положения",
      allRightsReserved: "Все права защищены",
      
      // Chat
      chatWithUs: "Напишите нам!",
      
      // Common
      loading: "Загрузка...",
    },
  },
  tr: {
    translation: {
      // Navigation
      home: "Ana Sayfa",
      apartments: "Daireler",
      amenities: "Olanaklar",
      gallery: "Galeri",
      location: "Konum",
      contact: "İletişim",
      loyaltyProgram: "Sadakat Programı",
      blog: "Blog",
      bookNow: "Rezervasyon",
      checkRates: "FİYATLARI GÖRÜN",
      whatsapp: "WhatsApp",
      
      // Hero Section
      welcomeTo: "ORBI CITY BATUMI'YE HOŞ GELDİNİZ",
      heroTitle: "Mükemmel Sahil Kaçışınız",
      heroSubtitle: "Karadeniz kıyısında eşsiz lüksü deneyimleyin",
      
      // Apartments Section
      exclusiveResidences: "ÖZEL RESİDANSLAR",
      discoverSanctuary: "Mükemmel Sığınağınızı Keşfedin",
      sanctuaryDesc: "Her rezidans, zamansız zarafetin modern konforla buluştuğu eşsiz bir yaşam deneyimi sunmak için titizlikle tasarlanmıştır.",
      viewDetails: "Detaylar",
      guests: "Misafir",
      bedrooms: "Yatak Odası",
      size: "Boyut",
      
      // Gallery
      visualJourney: "GÖRSEL YOLCULUK",
      glimpseTitle: "Lüks Dünyamıza Bir Bakış",
      exploreGallery: "Tüm Galeriyi Keşfedin",
      
      // About Section
      discoverOrbiCity: "Orbi City Batumi'yi Keşfedin",
      aboutDesc: "Her dairenin nefes kesici Karadeniz manzarası ve beş yıldızlı konfor sunduğu Orbi City'de eşsiz lüksü keşfedin. Batumi'nin kalbinde yer alan hizmetli dairelerimiz, modern zarafeti olağanüstü misafirperverlikle birleştiriyor. İş veya tatil için burada olun, konfor, kolaylık ve kıyı güzelliğinin mükemmel karışımını deneyimleyin.",
      exploreAmenities: "Olanakları Keşfedin",
      viewLocation: "Konumu Görün",
      
      // Virtual Tours
      immersiveExperience: "SÜRÜKLEYİCİ DENEYİM",
      virtualTours: "Sanal Turlar",
      virtualToursDesc: "Orbi City Batumi'nin sanal turunu yapın ve evinizin konforunda muhteşem dairelerimizi ve tesislerimizi keşfedin.",
      
      // Testimonials
      guestExperiences: "MİSAFİR DENEYİMLERİ",
      whatGuestsSay: "Misafirlerimiz Ne Diyor",
      
      // Location
      findUs: "BİZİ BULUN",
      ourLocation: "Konumumuz",
      locationDesc: "Batumi'nin kalbinde, Karadeniz'e birkaç adım mesafede mükemmel konumda",
      address: "Adres",
      phone: "Telefon",
      distanceFromAirport: "Havaalanına Uzaklık",
      getDirections: "Yol Tarifi Al",
      beach: "Plaj",
      attraction: "Cazibe Merkezi",
      landmark: "Simge Yapı",
      airport: "Havaalanı",
      
      // Footer
      aparthotelTitle: "5 Yıldızlı Apart Otel Orbi City",
      aparthotelDesc: "Her dairenin nefes kesici Karadeniz manzarası ve beş yıldızlı konfor sunduğu Orbi City'de eşsiz lüksü keşfedin.",
      quickLinks: "Hızlı Bağlantılar",
      legal: "Yasal",
      aboutUs: "Hakkımızda",
      purchaseConditions: "Satın Alma Koşulları",
      privacyPolicy: "Gizlilik Politikası",
      termsConditions: "Şartlar ve Koşullar",
      allRightsReserved: "Tüm hakları saklıdır",
      
      // Chat
      chatWithUs: "Bizimle sohbet edin!",
      
      // Common
      loading: "Yükleniyor...",
    },
  },
  uk: {
    translation: {
      // Navigation
      home: "Головна",
      apartments: "Апартаменти",
      amenities: "Зручності",
      gallery: "Галерея",
      location: "Розташування",
      contact: "Контакти",
      loyaltyProgram: "Програма лояльності",
      blog: "Блог",
      bookNow: "Забронювати",
      checkRates: "ДІЗНАТИСЯ ЦІНИ",
      whatsapp: "WhatsApp",
      
      // Hero Section
      welcomeTo: "ЛАСКАВО ПРОСИМО ДО ORBI CITY BATUMI",
      heroTitle: "Ваш ідеальний морський відпочинок",
      heroSubtitle: "Відчуйте неперевершену розкіш на березі Чорного моря",
      
      // Apartments Section
      exclusiveResidences: "ЕКСКЛЮЗИВНІ РЕЗИДЕНЦІЇ",
      discoverSanctuary: "Відкрийте для себе ваш ідеальний притулок",
      sanctuaryDesc: "Кожна резиденція ретельно створена, щоб запропонувати неперевершений життєвий досвід, де позачасова елегантність зустрічається з сучасним комфортом.",
      viewDetails: "Детальніше",
      guests: "Гостей",
      bedrooms: "Спалень",
      size: "Розмір",
      
      // Gallery
      visualJourney: "ВІЗУАЛЬНА ПОДОРОЖ",
      glimpseTitle: "Погляд у наш світ розкоші",
      exploreGallery: "Переглянути всю галерею",
      
      // About Section
      discoverOrbiCity: "Відкрийте для себе Orbi City Batumi",
      aboutDesc: "Відкрийте для себе неперевершену розкіш в Orbi City, де кожна квартира пропонує захоплюючий вид на Чорне море та п'ятизірковий комфорт. Розташовані в самому серці Батумі, наші апартаменти з обслуговуванням поєднують сучасну елегантність з виключною гостинністю. Чи то бізнес, чи відпочинок, відчуйте ідеальне поєднання комфорту, зручності та прибережної краси.",
      exploreAmenities: "Переглянути зручності",
      viewLocation: "Переглянути розташування",
      
      // Virtual Tours
      immersiveExperience: "ЗАХОПЛЮЮЧИЙ ДОСВІД",
      virtualTours: "Віртуальні тури",
      virtualToursDesc: "Здійсніть віртуальну екскурсію Orbi City Batumi та вивчіть наші приголомшливі апартаменти та зручності не виходячи з дому.",
      
      // Testimonials
      guestExperiences: "ВІДГУКИ ГОСТЕЙ",
      whatGuestsSay: "Що кажуть наші гості",
      
      // Location
      findUs: "ЗНАЙДІТЬ НАС",
      ourLocation: "Наше розташування",
      locationDesc: "Ідеально розташований в самому серці Батумі, за кілька кроків від Чорного моря",
      address: "Адреса",
      phone: "Телефон",
      distanceFromAirport: "Відстань від аеропорту",
      getDirections: "Прокласти маршрут",
      beach: "Пляж",
      attraction: "Пам'ятка",
      landmark: "Орієнтир",
      airport: "Аеропорт",
      
      // Footer
      aparthotelTitle: "5-зірковий апарт-готель Orbi City",
      aparthotelDesc: "Відкрийте для себе неперевершену розкіш в Orbi City, де кожна квартира пропонує захоплюючий вид на Чорне море та п'ятизірковий комфорт.",
      quickLinks: "Швидкі посилання",
      legal: "Юридична інформація",
      aboutUs: "Про нас",
      purchaseConditions: "Умови покупки",
      privacyPolicy: "Політика конфіденційності",
      termsConditions: "Умови та положення",
      allRightsReserved: "Всі права захищені",
      
      // Chat
      chatWithUs: "Напишіть нам!",
      
      // Common
      loading: "Завантаження...",
    },
  },
  ar: {
    translation: {
      // Navigation
      home: "الرئيسية",
      apartments: "الشقق",
      amenities: "المرافق",
      gallery: "المعرض",
      location: "الموقع",
      contact: "اتصل بنا",
      loyaltyProgram: "برنامج الولاء",
      blog: "المدونة",
      bookNow: "احجز الآن",
      checkRates: "تحقق من الأسعار",
      whatsapp: "واتساب",
      
      // Hero Section
      welcomeTo: "مرحباً بكم في أوربي سيتي باتومي",
      heroTitle: "ملاذك الساحلي المثالي",
      heroSubtitle: "استمتع بالرفاهية التي لا مثيل لها على شواطئ البحر الأسود",
      
      // Apartments Section
      exclusiveResidences: "مساكن حصرية",
      discoverSanctuary: "اكتشف ملاذك المثالي",
      sanctuaryDesc: "تم تصميم كل مسكن بعناية فائقة لتقديم تجربة معيشية لا مثيل لها، حيث تلتقي الأناقة الخالدة بالراحة العصرية.",
      viewDetails: "التفاصيل",
      guests: "ضيوف",
      bedrooms: "غرف نوم",
      size: "الحجم",
      
      // Gallery
      visualJourney: "رحلة بصرية",
      glimpseTitle: "لمحة عن عالمنا من الفخامة",
      exploreGallery: "استكشف المعرض الكامل",
      
      // About Section
      discoverOrbiCity: "اكتشف أوربي سيتي باتومي",
      aboutDesc: "اكتشف الرفاهية التي لا مثيل لها في أوربي سيتي، حيث تقدم كل شقة إطلالات خلابة على البحر الأسود وراحة من فئة الخمس نجوم. تقع شققنا المخدومة في قلب باتومي، وتجمع بين الأناقة الحديثة والضيافة الاستثنائية. سواء كنت هنا للعمل أو الترفيه، استمتع بالمزيج المثالي من الراحة والملاءمة والجمال الساحلي.",
      exploreAmenities: "استكشف المرافق",
      viewLocation: "عرض الموقع",
      
      // Virtual Tours
      immersiveExperience: "تجربة غامرة",
      virtualTours: "جولات افتراضية",
      virtualToursDesc: "قم بجولة افتراضية في أوربي سيتي باتومي واستكشف شققنا ومرافقنا المذهلة من راحة منزلك.",
      
      // Testimonials
      guestExperiences: "تجارب الضيوف",
      whatGuestsSay: "ماذا يقول ضيوفنا",
      
      // Location
      findUs: "اعثر علينا",
      ourLocation: "موقعنا",
      locationDesc: "يقع في موقع مثالي في قلب باتومي، على بعد خطوات من البحر الأسود",
      address: "العنوان",
      phone: "الهاتف",
      distanceFromAirport: "المسافة من المطار",
      getDirections: "احصل على الاتجاهات",
      beach: "الشاطئ",
      attraction: "معلم سياحي",
      landmark: "معلم بارز",
      airport: "المطار",
      
      // Footer
      aparthotelTitle: "فندق أوربي سيتي المكون من شقق فندقية 5 نجوم",
      aparthotelDesc: "اكتشف الرفاهية التي لا مثيل لها في أوربي سيتي، حيث تقدم كل شقة إطلالات خلابة على البحر الأسود وراحة من فئة الخمس نجوم.",
      quickLinks: "روابط سريعة",
      legal: "قانوني",
      aboutUs: "معلومات عنا",
      purchaseConditions: "شروط الشراء",
      privacyPolicy: "سياسة الخصوصية",
      termsConditions: "الشروط والأحكام",
      allRightsReserved: "جميع الحقوق محفوظة",
      
      // Chat
      chatWithUs: "تحدث معنا!",
      
      // Common
      loading: "جار التحميل...",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
