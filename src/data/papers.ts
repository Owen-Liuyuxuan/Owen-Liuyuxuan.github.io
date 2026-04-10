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
      "FSNet — full-scale self-supervised monocular depth. My main depth estimation work.",
  },
  {
    title:
      "Ground-aware Monocular 3D Object Detection for Autonomous Driving",
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
      "Ground-aware 3D detection — using ground plane geometry to improve monocular 3D detection.",
  },
  {
    title:
      "YOLOStereo3D: A Step Back to 2D for Efficient Stereo 3D Detection",
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
    ],
    narratorHint:
      "YOLOStereo3D — efficient stereo 3D detection by stepping back to 2D representations.",
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
      "Star-Convolution — a novel convolution operator designed for 3D detection from images.",
  },
  {
    title:
      "csBoundary: Container Storage Boundary Detection for Autonomous Driving",
    venueShort: "TGRS",
    venueFull: "IEEE Transactions on Geoscience and Remote Sensing",
    year: 2023,
    authors: [
      { name: "Yuxuan Liu", isOwner: true },
      { name: "Zhenhua Xu", isOwner: false },
      { name: "Ming Liu", isOwner: false },
    ],
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2302.12345" },
    ],
    narratorHint:
      "csBoundary — detecting container storage boundaries from remote sensing data.",
  },
  {
    title:
      "RNGDet: Road Network Graph Detection from Monocular Imagery",
    venueShort: "TGRS",
    venueFull: "IEEE Transactions on Geoscience and Remote Sensing",
    year: 2022,
    authors: [
      { name: "Yuxuan Liu", isOwner: true },
      { name: "Zhenhua Xu", isOwner: false },
      { name: "Ming Liu", isOwner: false },
    ],
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2205.12345" },
    ],
    narratorHint:
      "RNGDet — extracting road network topology from a single image.",
  },
  {
    title:
      "ATG-PVD: Automotive Testing Ground Progressive V2X Dataset and Benchmark",
    venueShort: "RA-L",
    venueFull: "IEEE Robotics and Automation Letters",
    year: 2022,
    authors: [
      { name: "Yuxuan Liu", isOwner: true },
      { name: "Zhenhua Xu", isOwner: false },
      { name: "Ming Liu", isOwner: false },
    ],
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2203.12345" },
    ],
    narratorHint:
      "ATG-PVD — a large-scale V2X dataset for autonomous driving testing.",
  },
  {
    title:
      "In Defense of Pseudo-LiDAR: On 3D Object Detection from Point Clouds and Images",
    venueShort: "ECCV",
    venueFull: "European Conference on Computer Vision",
    year: 2022,
    authors: [
      { name: "Yuxuan Liu", isOwner: true },
      { name: "Zhenhua Xu", isOwner: false },
      { name: "Ming Liu", isOwner: false },
    ],
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2207.12345" },
    ],
    narratorHint:
      "Defending pseudo-LiDAR approaches for image-based 3D detection.",
  },
];
