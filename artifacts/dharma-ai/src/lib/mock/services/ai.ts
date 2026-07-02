export const askLegalQuestion = async (query: string): Promise<{ text: string, suggestedFollowUps: string[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      
      if (lowerQuery.includes("accident") || lowerQuery.includes("negligence") || lowerQuery.includes("hit")) {
        resolve({
          text: "Under the new Bharatiya Nyaya Sanhita, cases of rash driving or negligence causing death fall under [BNS-106]. The law has introduced stricter penalties for hit-and-run scenarios compared to the old IPC. If the driver flees the scene without reporting the incident to a police officer or magistrate, the punishment can extend up to ten years imprisonment.\n\nHowever, it's also important to note that [ART-21] ensures a fair trial for the accused. Would you like to know about filing a police report (FIR) or claiming compensation?",
          suggestedFollowUps: [
            "How do I file an FIR for an accident?",
            "What is the motor accident claims tribunal?",
            "Find criminal defense lawyers near me"
          ]
        });
      } else if (lowerQuery.includes("data") || lowerQuery.includes("privacy") || lowerQuery.includes("online")) {
        resolve({
          text: "Digital privacy in India is governed by two main frameworks. If a company is misusing your personal data, [DPDP-8] holds them strictly accountable as a 'Data Fiduciary'. You have the right to demand erasure of your data.\n\nIf the issue involves someone sharing private images of you without consent or harassing you online, that is a severe criminal offense under [IT-66E] of the Information Technology Act. You can report this immediately to the national cyber crime portal.",
          suggestedFollowUps: [
            "How do I send a data deletion request?",
            "Where is the cyber crime reporting portal?",
            "Find cyber law experts in my city"
          ]
        });
      } else if (lowerQuery.includes("defective") || lowerQuery.includes("shopping") || lowerQuery.includes("scam")) {
         resolve({
          text: "As a buyer, you are protected by the Consumer Protection Act. Under [CPA-2], you are officially recognized as a consumer even for online purchases. If you have been sold a defective product or fallen victim to an unfair trade practice, you can file a complaint with the consumer disputes redressal commission.\n\nYou can file this electronically via the e-Daakhil portal. Would you like a step-by-step guide on how to draft a legal notice to the company?",
          suggestedFollowUps: [
            "How to draft a legal notice?",
            "What is the e-Daakhil portal?",
            "Match me with a consumer rights lawyer"
          ]
        });
      } else {
        resolve({
          text: "The Constitution of India forms the bedrock of all our laws. For instance, [ART-14] guarantees equality before the law, ensuring the state cannot discriminate against you. Furthermore, [ART-21] protects your fundamental right to life and liberty.\n\nTo give you a more specific legal assessment, could you provide a few more details about your situation? Are you dealing with a contract issue, a criminal complaint, or a property dispute?",
          suggestedFollowUps: [
            "I have a property dispute",
            "I want to file a criminal complaint",
            "I have a consumer grievance"
          ]
        });
      }
    }, 1500); // Simulate network latency
  });
};
