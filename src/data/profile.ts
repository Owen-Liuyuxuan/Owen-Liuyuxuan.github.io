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
    "the Hong Kong University of Science and Technology (HKUST), supervised by " +
    "Prof. Ming Liu. I am now a System Engineer at TIER IV in Tokyo. " +
    "My research interests lie in image-based 3D perception, monocular depth " +
    "prediction, autonomous driving, and robotics. During my Ph.D., I participated " +
    "in deploying the first commercial autonomous logistic vehicle Hercules. " +
    "In my leisure time, I enjoy language learning — I speak Chinese, English, " +
    "and Japanese.",
  links: [
    {
      label: "Email",
      url: "mailto:yliuhb@connect.ust.hk",
      icon: "✉️",
      narratorHint: "Send me an email — I try to reply within a day.",
    },
    {
      label: "GitHub",
      url: "https://github.com/Owen-Liuyuxuan",
      icon: "🐙",
      narratorHint: "My GitHub — 80 repositories and counting.",
    },
    {
      label: "Scholar",
      url: "https://scholar.google.com/citations?hl=en&user=G5T6_SQAAAAJ",
      icon: "🎓",
      narratorHint: "Google Scholar profile — all my publications.",
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/yuxuanliu-273a05143",
      icon: "💼",
      narratorHint: "LinkedIn — professional network.",
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
      degree: "Ph.D. in Electronic and Computing Engineering",
      school: "Hong Kong University of Science and Technology",
      period: "2019 – 2024",
      narratorHint:
        "Developed autonomous driving algorithms under Prof. Ming Liu at RAM-LAB.",
    },
    {
      degree: "B.Sc. in Mechatronics",
      school: "Zhejiang University",
      period: "2015 – 2019",
      narratorHint:
        "Undergraduate at ZJU — where my journey in robotics began.",
    },
  ],
};
