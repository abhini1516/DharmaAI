export interface Topic {
  id: string;
  slug: string;
  title: string;
  domain: string;
  summary: string;
  plainLanguageExplainer: string;
  keySections: {
    sectionId: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const topics: Topic[] = [
  {
    id: "t1",
    slug: "fundamental-rights",
    title: "Fundamental Rights",
    domain: "Constitution of India",
    summary: "The core human rights guaranteed to all citizens of India, protecting life, liberty, and equality.",
    plainLanguageExplainer: "The Constitution of India guarantees certain fundamental rights to every citizen. These are basic human rights that protect you from unfair treatment by the government or other entities. They include the right to equality, the right to freedom of speech, the right to life and personal liberty, and the right to practice any religion. If these rights are violated, you can approach the High Courts or the Supreme Court directly for justice.",
    keySections: [
      {
        sectionId: "ART-14",
        title: "Right to Equality",
        description: "Ensures the state treats everyone equally before the law."
      },
      {
        sectionId: "ART-21",
        title: "Protection of Life and Personal Liberty",
        description: "Guarantees that no one can be deprived of their life or liberty without a fair legal process."
      }
    ],
    faqs: [
      {
        question: "Can fundamental rights be taken away?",
        answer: "Generally no, but they can be reasonably restricted under specific circumstances like national emergencies or for public order."
      },
      {
        question: "What should I do if my fundamental rights are violated?",
        answer: "You can file a writ petition directly in the High Court under Article 226 or the Supreme Court under Article 32."
      }
    ]
  },
  {
    id: "t2",
    slug: "criminal-negligence",
    title: "Criminal Negligence & Rashness",
    domain: "Bharatiya Nyaya Sanhita",
    summary: "Laws dealing with accidents, reckless driving, and negligence causing harm or death.",
    plainLanguageExplainer: "Under the new Bharatiya Nyaya Sanhita (BNS) which replaces the Indian Penal Code, causing harm or death through rash or negligent acts is a serious offense. This covers situations like hit-and-run accidents, medical negligence, or workplace accidents where someone failed to take reasonable care.",
    keySections: [
      {
        sectionId: "BNS-106",
        title: "Causing death by negligence",
        description: "Deals with deaths caused by rash or negligent acts, including hit-and-run cases."
      }
    ],
    faqs: [
      {
        question: "What is the punishment for a hit-and-run accident?",
        answer: "Under the BNS, if a driver causes death by rash driving and flees without reporting to the authorities, the punishment can extend up to 10 years imprisonment and a fine."
      },
      {
        question: "Is medical negligence a crime?",
        answer: "Yes, if a doctor's gross negligence causes death, they can be prosecuted under BNS 106, though courts require a high standard of proof for medical professionals."
      }
    ]
  },
  {
    id: "t3",
    slug: "data-protection",
    title: "Digital Data Protection",
    domain: "DPDP Act 2023",
    summary: "Your rights regarding how companies collect, store, and use your personal information online.",
    plainLanguageExplainer: "The Digital Personal Data Protection Act gives you control over your personal data. Companies (Data Fiduciaries) must get your clear consent before collecting your data, and they must tell you exactly what they are using it for. You have the right to ask them what data they have, to correct it, or to ask them to delete it.",
    keySections: [
      {
        sectionId: "DPDP-8",
        title: "Obligations of Data Fiduciaries",
        description: "Companies must protect your data and comply with the law regardless of their own terms of service."
      }
    ],
    faqs: [
      {
        question: "Can a company use my data for anything if I click 'I Agree'?",
        answer: "No. They can only use it for the specific purpose you agreed to. Broad, vague consent is no longer valid."
      },
      {
        question: "How do I make a company delete my data?",
        answer: "You can send a 'consent withdrawal' notice to the company's Data Protection Officer. They are legally required to erase your data unless they need it to comply with other laws."
      }
    ]
  },
  {
    id: "t4",
    slug: "consumer-rights",
    title: "Consumer Rights & Grievances",
    domain: "Consumer Protection Act 2019",
    summary: "Protections against defective goods, deficient services, and unfair trade practices.",
    plainLanguageExplainer: "As a consumer, you have the right to safe products, accurate information, and a fair hearing if something goes wrong. The Consumer Protection Act covers everything from online shopping fraud to poor restaurant service and misleading advertisements. You can file complaints electronically through the e-Daakhil portal.",
    keySections: [
      {
        sectionId: "CPA-2",
        title: "Definition of a Consumer",
        description: "Explains who is protected under the Act, which includes online buyers."
      }
    ],
    faqs: [
      {
        question: "Can I file a consumer complaint online?",
        answer: "Yes, the e-Daakhil portal allows you to file complaints from anywhere in India without needing to physically visit a consumer court."
      },
      {
        question: "Do I need a lawyer for a consumer court?",
        answer: "No, the process is designed to be simple enough that you can represent yourself, though having a lawyer can be helpful for complex cases."
      }
    ]
  },
  {
    id: "t5",
    slug: "cyber-privacy",
    title: "Cyber Privacy & Harassment",
    domain: "IT Act 2000",
    summary: "Legal remedies against online harassment, unauthorized image sharing, and cyberstalking.",
    plainLanguageExplainer: "The Information Technology Act protects you against cybercrimes. This includes online harassment, hacking, identity theft, and the unauthorized capture or sharing of private images. The law provides strict punishments for those who violate digital privacy or use the internet to threaten others.",
    keySections: [
      {
        sectionId: "IT-66E",
        title: "Violation of Privacy",
        description: "Punishes the unauthorized capture, publication, or transmission of private images."
      }
    ],
    faqs: [
      {
        question: "What should I do if someone shares my private photos without consent?",
        answer: "Immediately file a complaint with the local Cyber Crime cell or the National Cyber Crime Reporting Portal. This is a severe criminal offense under Section 66E."
      },
      {
        question: "Can police trace an anonymous harasser?",
        answer: "Yes, police can request IP logs and subscriber details from internet service providers and platforms to identify anonymous offenders."
      }
    ]
  }
];
