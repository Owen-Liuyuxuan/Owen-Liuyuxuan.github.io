/**
 * @file profile.ts
 * @description Static profile data for the HeroSection.
 */

export interface ProfileLink {
  label: string;
  url: string;
  icon: string;
  narratorHint: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  narratorHint: string;
}

export interface Profile {
  name: string;
  nameCN: string;
  title: string;
  aboutMe: string;
  links: ProfileLink[];
  education: Education[];
}

export const PROFILE: Profile = {
  name: "Yuxuan Liu",
  nameCN: "刘宇轩",
  title: "Ph.D. in ECE · System Engineer @ TIER IV · Tokyo",
  aboutMe:
    "I am Yuxuan Liu (刘宇轩), holding a Ph.D. from the ECE Department of " +
    "the Hong Kong University of Science and Technology (HKUST). " +
    "I am now a System Engineer at TIER IV in Tokyo. " +
    "My research interests lie in image-based 3D perception, monocular depth " +
    "prediction, autonomous driving, and robotics.",
  links: [
    {
      label: "Email",
      url: "mailto:yliuhb@connect.ust.hk",
      icon: "✉️",
      narratorHint: "Shoot me an email — I usually reply within a day. Usually.",
    },
    {
      label: "GitHub",
      url: "https://github.com/Owen-Liuyuxuan",
      icon: "🐙",
      narratorHint: "Peek at my GitHub — all my open-source toys in one place.",
    },
    {
      label: "Scholar",
      url: "https://scholar.google.com/citations?hl=en&user=G5T6_SQAAAAJ",
      icon: "🎓",
      narratorHint: "Google Scholar — published papers and citations. A researcher's trophy shelf.",
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/yuxuanliu-273a05143",
      icon: "💼",
      narratorHint: "Let's connect on LinkedIn!",
    },
    {
      label: "Resume",
      url: "/cv.pdf",
      icon: "📄",
      narratorHint: "Download my CV in PDF format.",
    },
  ],
  education: [
    {
      degree: "Ph.D. in Electronic and Computer Engineering",
      school: "Hong Kong University of Science and Technology",
      period: "2019 – 2024",
      narratorHint:
        "Ph.D. at HKUST ECE — developing autonomous driving algorithms at RAM-LAB. The grind was real.",
    },
    {
      degree: "B.Sc. in Mechatronics",
      school: "Zhejiang University",
      period: "2015 – 2019",
      narratorHint:
        "ZJU undergrad — where the robotics obsession started and never really ended.",
    },
    {
      degree: "System Engineer",
      school: "TIER IV",
      period: "2023 – Present",
      narratorHint:
        "System Engineer at TIER IV in Tokyo — building the future of autonomous driving with Autoware.",
    },
  ],
};
