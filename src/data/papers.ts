/**
 * @file papers.ts
 * @description Static publication data. Manually curated.
 */

export interface PaperAuthor {
  name: string;
  isOwner: boolean;
}

export interface PaperLink {
  label: string;
  url: string;
}

export interface Paper {
  title: string;
  venueShort: string;
  venueFull: string;
  year: number;
  authors: PaperAuthor[];
  links: PaperLink[];
  narratorHint: string;
}

export const PAPERS: Paper[] = [
  {
    title:
      "FSNet: Redesign Self-Supervised MonoDepth for Full-Scale Depth Prediction for Autonomous Driving",
    venueShort: "T-ASE",
    venueFull: "IEEE Transactions on Automation Science and Engineering",
    year: 2023,
    authors: [
      { name: "Yuxuan Liu", isOwner: true },
      { name: "Zhenhua Xu", isOwner: false },
      { name: "Huaiyang Huang", isOwner: false },
      { name: "Lujia Wang", isOwner: false },
      { name: "Ming Liu", isOwner: false },
    ],
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2304.10719" },
      { label: "Code", url: "https://github.com/Owen-Liuyuxuan/FSNet" },
      { label: "Project", url: "https://sites.google.com/view/fsnet/" },
    ],
    narratorHint:
      "FSNet — unsupervised depth estimation from a moving camera. My main squeeze during Ph.D.",
  },
  {
    title: "Ground-aware Monocular 3D Object Detection for Autonomous Driving",
    venueShort: "RA-L",
    venueFull: "IEEE Robotics and Automation Letters",
    year: 2021,
    authors: [
      { name: "Yuxuan Liu", isOwner: true },
      { name: "Yuan Yixuan", isOwner: false },
      { name: "Ming Liu", isOwner: false },
    ],
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2102.00690" },
      { label: "Code", url: "https://github.com/Owen-Liuyuxuan/visualDet3D" },
    ],
    narratorHint:
      "Ground plane geometry boosts monocular 3D detection — a neat geometric trick that actually works.",
  },
  {
    title: "YOLOStereo3D: A Step Back to 2D for Efficient Stereo 3D Detection",
    venueShort: "ICRA",
    venueFull:
      "IEEE International Conference on Robotics and Automation",
    year: 2021,
    authors: [
      { name: "Yuxuan Liu", isOwner: true },
      { name: "Lujia Wang", isOwner: false },
      { name: "Ming Liu", isOwner: false },
    ],
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2103.09422" },
      { label: "Code", url: "https://github.com/Owen-Liuyuxuan/visualDet3D" },
      { label: "Project", url: "https://arxiv.org/abs/2103.09422" },
    ],
    narratorHint:
      "Still one of the fastest stereo 3D detectors on the KITTI benchmark — sometimes speed is everything.",
  },
  {
    title: "FisheyeDepth: A Real-Scale Self-Supervised Depth Estimation Model for Fisheye Camera",
    venueShort: "ICRA",
    venueFull: "IEEE International Conference on Robotics and Automation",
    year: 2025,
    authors: [
      { name: "Guoyang Zhao", isOwner: false },
      { name: "Yuxuan Liu", isOwner: true },
      { name: "Weiqing Qi", isOwner: false },
      { name: "Fulong Ma", isOwner: false },
      { name: "Ming Liu", isOwner: false },
      { name: "Jun Ma", isOwner: false },
    ],
    links: [
      {
        label: "arXiv",
        url: "https://arxiv.org/abs/2409.15054",
      },
      { label: "Code", url: "https://github.com/guoyangzhao/FisheyeDepth" },
    ],
    narratorHint:
      "FisheyeDepth — because most depth models assume pinhole cameras, but fisheye is where the action really is.",
  },
  {
    title:
      "Star-Convolution for Image-Based 3D Object Detection",
    venueShort: "ICRA",
    venueFull:
      "IEEE International Conference on Robotics and Automation",
    year: 2022,
    authors: [
      { name: "Yuxuan Liu", isOwner: true },
      { name: "Zhenhua Xu", isOwner: false },
      { name: "Ming Liu", isOwner: false },
    ],
    links: [
      {
        label: "IEEE",
        url: "https://ieeexplore.ieee.org/document/9811612/",
      },
    ],
    narratorHint:
      "A novel convolution operator designed for 3D detection from images — geometry meets deep learning.",
  },
  {
    title:
      "In Defense of Knowledge Distillation for Task Incremental Learning and its Application in 3D Object Detection",
    venueShort: "RA-L",
    venueFull:
      "IEEE Robotics and Automation Letters",
    year: 2021,
    authors: [
      { name: "Peng Yun", isOwner: false },
      { name: "Yuxuan Liu", isOwner: true },
      { name: "Ming Liu", isOwner: false },
    ],
    links: [
      {
        label: "IEEE",
        url: "https://ieeexplore.ieee.org/document/9359344",
      },
    ],
    narratorHint:
      "Knowledge distillation helps a 3D detector learn new tasks without forgetting old ones. No catastrophic forgetting here.",
  },
  {
    title:
      "csBoundary: City-Scale Road-Boundary Detection in Aerial Images for High-Definition Maps",
    venueShort: "RA-L",
    venueFull: "IEEE Robotics and Automation Letters",
    year: 2022,
    authors: [
      { name: "Zhenhua Xu", isOwner: false },
      { name: "Yuxuan Liu", isOwner: true },
      { name: "Lu Gan", isOwner: false },
      { name: "Xiangcheng Hu", isOwner: false },
      { name: "Yuxiang Sun", isOwner: false },
      { name: "Ming Liu", isOwner: false },
      { name: "Lujia Wang", isOwner: false },
    ],
    links: [
      { label: "Project", url: "https://sites.google.com/view/csboundary/" },
      { label: "arXiv", url: "https://arxiv.org/abs/2111.06020" },
      { label: "Code", url: "https://github.com/TonyXuQAQ/Topo-boundary" },
    ],
    narratorHint:
      "csBoundary — detect road boundaries from aerial images at city scale. HD maps, here we come.",
  },
  {
    title:
      "RNGDet: Road Network Graph Detection by Transformer in Aerial Images",
    venueShort: "TGRS",
    venueFull: "IEEE Transactions on Geoscience and Remote Sensing",
    year: 2022,
    authors: [
      { name: "Zhenhua Xu", isOwner: false },
      { name: "Yuxuan Liu", isOwner: true },
      { name: "Lu Gan", isOwner: false },
      { name: "Yuxiang Sun", isOwner: false },
      { name: "Lujia Wang", isOwner: false },
      { name: "Ming Liu", isOwner: false },
    ],
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2202.07824" },
      { label: "Code", url: "https://github.com/TonyXuQAQ/Topo-boundary" },
    ],
    narratorHint:
      "RNGDet — a Transformer that reads aerial images and draws road networks. Maps on autopilot.",
  },
  {
    title: "ATG-PVD: Ticketing Parking Violations on a Drone",
    venueShort: "ECCV",
    venueFull: "European Conference on Computer Vision",
    year: 2020,
    authors: [
      { name: "Hengli Wang", isOwner: false },
      { name: "Yuxuan Liu", isOwner: true },
      { name: "Huaiyang Huang", isOwner: false },
      { name: "Yuheng Pan", isOwner: false },
      { name: "Wenbin Yu", isOwner: false },
      { name: "Jialin Jiang", isOwner: false },
      { name: "Dianbin Lyu", isOwner: false },
      { name: "Mohammud J Bocus", isOwner: false },
      { name: "Ming Liu", isOwner: false },
      { name: "Ioannis Pitas", isOwner: false },
      { name: "Rui Fan", isOwner: false },
    ],
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2008.09305" },
    ],
    narratorHint:
      "ATG-PVD — an autonomous drone that hunts for illegal parking. The future of parking enforcement?",
  },
];
