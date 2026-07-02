export interface Lawyer {
  id: string;
  name: string;
  barNumber: string;
  location: {
    city: string;
    state: string;
  };
  languages: string[];
  experienceYears: number;
  practiceAreas: string[];
  hourlyFee: number;
  rating: number;
  reviewCount: number;
  about: string;
  notableCases: string[];
  education: string;
  verified: boolean;
}

export const lawyers: Lawyer[] = [
  {
    id: "l1",
    name: "Adv. Vikram Desai",
    barNumber: "D/1452/2005",
    location: { city: "New Delhi", state: "Delhi" },
    languages: ["English", "Hindi"],
    experienceYears: 18,
    practiceAreas: ["Constitutional Law", "Civil Rights", "Public Interest Litigation"],
    hourlyFee: 4500,
    rating: 4.9,
    reviewCount: 124,
    about: "Specializing in fundamental rights and constitutional remedies. Regularly appears before the Supreme Court of India. Passionate about civil liberties and protecting citizens against state overreach.",
    notableCases: [
      "Union of India v. Sharma (2018) - Landmark ruling on Article 21",
      "Drafted PIL leading to cleaner air directives in Delhi NCR"
    ],
    education: "LL.B, Faculty of Law, Delhi University; LL.M, Cambridge University",
    verified: true
  },
  {
    id: "l2",
    name: "Adv. Priya Natarajan",
    barNumber: "KAR/2841/2010",
    location: { city: "Bengaluru", state: "Karnataka" },
    languages: ["English", "Kannada", "Tamil"],
    experienceYears: 13,
    practiceAreas: ["Cyber Law", "Data Protection", "Corporate Law"],
    hourlyFee: 3500,
    rating: 4.8,
    reviewCount: 96,
    about: "A leading voice in India's evolving tech law landscape. Advises startups on DPDP Act compliance and represents individuals in complex cybercrime and privacy violation cases.",
    notableCases: [
      "TechCorp Data Breach Defense (2021)",
      "State v. Anonymous (2022) - Precedent in Section 66E application"
    ],
    education: "B.A. LL.B (Hons.), NLSIU Bengaluru",
    verified: true
  },
  {
    id: "l3",
    name: "Adv. Rohan Mehra",
    barNumber: "MAH/4021/2012",
    location: { city: "Mumbai", state: "Maharashtra" },
    languages: ["English", "Hindi", "Marathi"],
    experienceYears: 11,
    practiceAreas: ["Consumer Protection", "Real Estate", "Contracts"],
    hourlyFee: 2500,
    rating: 4.7,
    reviewCount: 215,
    about: "Dedicated to fighting for consumer rights. Experienced in handling cases against large builders and multinational corporations at the National Consumer Disputes Redressal Commission.",
    notableCases: [
      "Represented Homebuyers Association against Vertex Builders (2020)",
      "Achieved highest class-action compensation in aviation sector (2019)"
    ],
    education: "LL.B, Government Law College, Mumbai",
    verified: true
  },
  {
    id: "l4",
    name: "Adv. Meenakshi Iyer",
    barNumber: "TN/1105/1998",
    location: { city: "Chennai", state: "Tamil Nadu" },
    languages: ["English", "Tamil"],
    experienceYears: 25,
    practiceAreas: ["Criminal Defense", "Family Law"],
    hourlyFee: 6000,
    rating: 4.9,
    reviewCount: 310,
    about: "Senior counsel with decades of trial court experience. Known for meticulous cross-examination and deep understanding of the new Bharatiya Nyaya Sanhita procedures.",
    notableCases: [
      "State of TN v. Rajan (2015) - High profile acquittal in complex negligence case",
      "Pioneered defense strategies in multi-jurisdictional financial fraud"
    ],
    education: "LL.B, Madras Law College",
    verified: true
  },
  {
    id: "l5",
    name: "Adv. Kabir Singh",
    barNumber: "P/922/2015",
    location: { city: "Chandigarh", state: "Punjab" },
    languages: ["English", "Hindi", "Punjabi"],
    experienceYears: 8,
    practiceAreas: ["Criminal Defense", "Motor Accidents", "Civil Litigation"],
    hourlyFee: 2000,
    rating: 4.5,
    reviewCount: 84,
    about: "Fierce advocate for victims of motor accidents and police negligence. Approachable, straightforward, and committed to fast-tracking relief for affected families.",
    notableCases: [
      "Secured record compensation in Highway 44 accident tribunal (2021)"
    ],
    education: "LL.B, Panjab University",
    verified: true
  },
  {
    id: "l6",
    name: "Adv. Ananya Sharma",
    barNumber: "D/3120/2018",
    location: { city: "New Delhi", state: "Delhi" },
    languages: ["English", "Hindi"],
    experienceYears: 5,
    practiceAreas: ["Consumer Protection", "E-commerce Disputes"],
    hourlyFee: 1500,
    rating: 4.6,
    reviewCount: 42,
    about: "Modern lawyer focusing purely on e-commerce and digital consumer rights. Navigates e-Daakhil with ease to get quick resolutions for online shopping fraud.",
    notableCases: [
      "Resolved over 50+ cases of e-commerce delivery fraud through mediation"
    ],
    education: "B.B.A LL.B, Symbiosis Law School",
    verified: true
  }
];
