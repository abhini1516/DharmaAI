export interface Citation {
  tag: string;
  title: string;
  act: string;
  year: number;
  section: string;
  text: string;
  simplified: string;
}

export const citations: Record<string, Citation> = {
  "ART-21": {
    tag: "[ART-21]",
    title: "Article 21",
    act: "Constitution of India",
    year: 1950,
    section: "Part III, Article 21",
    text: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
    simplified: "Everyone has the fundamental right to life and personal liberty, which can only be restricted by a fair and valid legal process.",
  },
  "ART-14": {
    tag: "[ART-14]",
    title: "Article 14",
    act: "Constitution of India",
    year: 1950,
    section: "Part III, Article 14",
    text: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
    simplified: "The government must treat everyone equally and cannot discriminate unfairly.",
  },
  "BNS-106": {
    tag: "[BNS-106]",
    title: "Section 106",
    act: "Bharatiya Nyaya Sanhita",
    year: 2023,
    section: "Chapter VI, Section 106",
    text: "Whoever causes the death of any person by doing any rash or negligent act not amounting to culpable homicide, shall be punished with imprisonment of either description for a term which may extend to five years, and shall also be liable to fine. Where the act is done by a registered medical practitioner while performing a medical procedure, the term may extend to two years.",
    simplified: "Causing death by a careless or negligent act (like reckless driving) is punishable by up to 5 years in prison and a fine.",
  },
  "BNS-101": {
    tag: "[BNS-101]",
    title: "Section 101",
    act: "Bharatiya Nyaya Sanhita",
    year: 2023,
    section: "Chapter VI, Section 101",
    text: "Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.",
    simplified: "Murder is punishable by death or life imprisonment, plus a fine.",
  },
  "DPDP-8": {
    tag: "[DPDP-8]",
    title: "Section 8",
    act: "Digital Personal Data Protection Act",
    year: 2023,
    section: "Chapter II, Section 8",
    text: "A Data Fiduciary shall, irrespective of any agreement to the contrary or failure of a Data Principal to carry out the duties provided under this Act, be responsible for complying with the provisions of this Act.",
    simplified: "Companies that collect your data are strictly responsible for protecting it, no matter what their terms of service say.",
  },
  "DPDP-12": {
    tag: "[DPDP-12]",
    title: "Section 12",
    act: "Digital Personal Data Protection Act",
    year: 2023,
    section: "Chapter III, Section 12",
    text: "The Data Principal shall have the right to obtain from the Data Fiduciary confirmation of processing, a summary of personal data, and the identities of other Data Fiduciaries with whom the data has been shared.",
    simplified: "You have the right to ask any company exactly what personal data they hold on you and who they have shared it with.",
  },
  "CPA-2": {
    tag: "[CPA-2]",
    title: "Section 2(7)",
    act: "Consumer Protection Act",
    year: 2019,
    section: "Chapter I, Section 2(7)",
    text: "Consumer means any person who buys any goods for a consideration which has been paid or promised or partly paid and partly promised, or under any system of deferred payment, and includes any user of such goods.",
    simplified: "A consumer is anyone who buys goods or services for personal use, whether paid upfront, in installments, or on credit.",
  },
  "CPA-35": {
    tag: "[CPA-35]",
    title: "Section 35",
    act: "Consumer Protection Act",
    year: 2019,
    section: "Chapter IV, Section 35",
    text: "A complaint may be filed with the District Commission by the consumer against whom goods have been sold or delivered or agreed to be sold or delivered, or any service has been provided or agreed to be provided.",
    simplified: "You can file a formal complaint with your local District Consumer Commission against a seller or service provider.",
  },
  "IT-66E": {
    tag: "[IT-66E]",
    title: "Section 66E",
    act: "Information Technology Act",
    year: 2000,
    section: "Chapter XI, Section 66E",
    text: "Whoever, intentionally or knowingly captures, publishes or transmits the image of a private area of any person without his or her consent, under circumstances violating the privacy of that person, shall be punished with imprisonment which may extend to three years or with fine not exceeding two lakh rupees, or with both.",
    simplified: "Secretly recording or sharing private images of someone without their consent is a serious crime punishable by jail and fines.",
  },
  "IT-43A": {
    tag: "[IT-43A]",
    title: "Section 43A",
    act: "Information Technology Act",
    year: 2000,
    section: "Chapter IX, Section 43A",
    text: "Where a body corporate, possessing, dealing or handling any sensitive personal data or information, is negligent in implementing and maintaining reasonable security practices, it shall be liable to pay damages by way of compensation to the person so affected.",
    simplified: "A company that carelessly mishandles your sensitive personal data can be forced to pay you compensation.",
  },
};

export const citationReferenceForPrompt = Object.values(citations)
  .map(
    (c) =>
      `${c.tag} — ${c.act} (${c.year}), ${c.section}: "${c.text}" (Plain language: ${c.simplified})`,
  )
  .join("\n");
