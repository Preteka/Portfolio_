import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Cpu, CheckCircle2, Star } from 'lucide-react';
import { projectsData } from '../sections/Projects';

interface ProjectDetailsData {
  title: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  stackDetails: { name: string; reason: string }[];
}

const detailsMap: Record<string, ProjectDetailsData> = {
  'interior-sourcing': {
    title: 'A Unified Platform for Interior Material Sourcing',
    problem: 'Plywood and interior material stores lacked an efficient digital presence. Customers had no easy way to browse product catalogs, estimate material costs for their interior projects in real time, or place orders online — leading to frequent in-person visits and manual price calculations.',
    solution: 'Built and deployed a full-stack e-commerce web application live at final-sem-project-ut7u.vercel.app. The platform provides a complete product catalog, shopping cart, and checkout experience, with a dynamic cost-estimation module that calculates raw material pricing for interior work in real time based on user inputs.',
    features: [
      'Dynamic cost-estimation module for real-time interior material pricing calculations.',
      'End-to-end product catalog with detailed plywood and material listings.',
      'Shopping cart, checkout flow, and order management system.',
      'Firebase-powered data storage for real-time product and order sync.',
      'Fully deployed and live on Vercel with production-ready configuration.'
    ],
    architecture: 'React.js powers the frontend with component-based UI for the catalog, cart, and cost estimator. Node.js and Express.js handle backend API routes and business logic. Firebase is used for real-time database storage and authentication, while the entire app is deployed on Vercel for seamless CI/CD.',
    stackDetails: [
      { name: 'React.js / HTML / CSS', reason: 'Delivered a responsive, component-driven UI for catalog browsing and real-time cost estimation.' },
      { name: 'Node.js & Express.js', reason: 'Handled API routing, server-side business logic, and communication between frontend and Firebase.' },
      { name: 'Firebase', reason: 'Provided real-time data storage for product catalog and orders with built-in sync capabilities.' }
    ]
  },
  'agro-center': {
    title: 'Digital Platform for Agro Center',
    problem: 'Farmers faced significant challenges in accessing fair markets due to multiple intermediaries driving up costs and reducing profits. There was no direct digital channel for farmers to connect with vendors and buyers for agricultural products and equipment.',
    solution: 'Developed a full-stack marketplace web application connecting farmers directly with agricultural product and equipment vendors. The platform removes intermediaries, simplifying the procurement process and enabling fair, transparent transactions.',
    features: [
      'Direct farmer-to-vendor marketplace for agricultural products and equipment.',
      'Responsive product listing and browsing interfaces built with ReactJS.',
      'Purchase flow and order management backed by Firebase real-time database.',
      'Simplified procurement process eliminating intermediary layers.'
    ],
    architecture: 'React.js provides the frontend marketplace interface with responsive product grids and purchase flows. Firebase acts as the real-time backend data layer, handling product listings and transaction records without requiring a dedicated server.',
    stackDetails: [
      { name: 'React.js', reason: 'Delivered intuitive product browsing, cart, and purchase flow interfaces for farmers and vendors.' },
      { name: 'Firebase', reason: 'Enabled real-time data sync for listings and orders without complex server infrastructure.' },
      { name: 'Node.js', reason: 'Handled backend business logic and API communication between the client and database.' }
    ]
  },
  'collaborative-cart': {
    title: 'Collaborative Shopping Cart',
    problem: 'Standard shopping carts are single-user experiences. Families, teams, or groups had no way to collaboratively build and manage a shared shopping list in real time without switching tools.',
    solution: 'Developed a Collaborative Shopping Cart application that enables multiple users to add, update, and manage products in a shared cart simultaneously, with real-time synchronization across all sessions.',
    features: [
      'Real-time synchronization allowing multiple users to manage the same cart simultaneously.',
      'Add, update, and remove products with instant reflection across all connected users.',
      'Clean and intuitive product management interface built with vanilla HTML, CSS and JavaScript.',
      'Lightweight implementation with no framework dependency for maximum performance.'
    ],
    architecture: 'Built entirely with vanilla HTML, CSS, and JavaScript. Real-time synchronization is achieved through a shared state mechanism, keeping all connected sessions in sync without any framework overhead.',
    stackDetails: [
      { name: 'HTML', reason: 'Structured the cart layout and product entry forms semantically.' },
      { name: 'CSS', reason: 'Styled the collaborative UI with clean, responsive design.' },
      { name: 'JavaScript', reason: 'Managed real-time state updates and multi-user synchronization logic.' }
    ]
  },
  'donorhub': {
    title: 'DonorHub – Blood Donation Management App',
    problem: 'Finding blood donors during emergencies is often a stressful, time-consuming process involving phone calls and social media posts. There was no streamlined mobile solution for connecting donors with recipients quickly.',
    solution: 'Developed DonorHub, a mobile application that connects blood donors with people in need. Users can register as donors, search for available donors by blood group, and submit blood requests through a simple and user-friendly interface.',
    features: [
      'User registration and secure login system.',
      'Blood donor registration with blood group and location details.',
      'Search for available donors by blood group.',
      'Blood request form for emergency submissions.',
      'Donor profile management with simple, intuitive navigation.'
    ],
    architecture: 'Built with Flutter and Dart for a cross-platform mobile experience. Firebase handles user authentication and real-time donor data storage through Cloud Firestore, enabling fast search and retrieval of donor records across devices.',
    stackDetails: [
      { name: 'Flutter & Dart', reason: 'Delivered a smooth, cross-platform mobile UI for both Android and iOS from a single codebase.' },
      { name: 'Firebase Auth', reason: 'Provided secure user registration and login functionality.' },
      { name: 'Cloud Firestore', reason: 'Stored and retrieved donor profiles and blood requests in real time.' }
    ]
  },
  'inventory-app': {
    title: 'Inventory Management Mobile App',
    problem: 'A local rice shop managed all inventory manually, making it difficult to track stock, update product information, and maintain accurate records — leading to inefficiencies and frequent errors in daily operations.',
    solution: 'Developed a mobile application that provides a centralized digital platform for managing inventory. The app allows users to add, update, and monitor products while storing data securely using Firebase Cloud Firestore, replacing manual record-keeping entirely.',
    features: [
      'Secure user authentication to protect inventory data.',
      'Product and category management with add, edit, and delete operations.',
      'Real-time inventory tracking with stock availability monitoring.',
      'Image upload for product entries with visual product catalog.',
      'Search and filter functionality for fast product lookup.'
    ],
    architecture: 'Flutter and Dart power the cross-platform mobile interface designed in Figma. Firebase Authentication manages user access, while Cloud Firestore provides real-time, scalable database storage for all product and inventory data.',
    stackDetails: [
      { name: 'Flutter & Dart', reason: 'Built a clean, responsive mobile UI from Figma designs, deployable on both Android and iOS.' },
      { name: 'Firebase Authentication', reason: 'Secured app access with reliable user authentication.' },
      { name: 'Cloud Firestore', reason: 'Stored product, category, and inventory data with real-time updates and offline capability.' }
    ]
  },
  'uiux-projects': {
    title: 'UI/UX Design Projects Collection',
    problem: 'Across multiple design challenges, users needed intuitive, visually engaging interfaces that balance aesthetics with usability — from food ordering to real-time communication and social impact platforms.',
    solution: `Designed and delivered a collection of 6 UI/UX projects covering diverse problem spaces. The designs focus on modern aesthetics, responsiveness, and seamless user interaction:

1. User Simple Login Page
• Designed a clean, accessible, and intuitive login interface focusing on simplicity and user authentication flow.
• Included user-friendly validation screens with responsive inputs for a smooth credentials check.

2. E-Mail Template
• Designed a highly responsive email template with clear typography and consistent layout hierarchy.
• Balanced visual aesthetics with branding guidelines to ensure professional and readable communication.

3. Food Delivery Mobile App
• Designed a modern mobile experience for food ordering, layout out restaurant browsing, menus, cart, and delivery tracking.
• Focused on user-centric paths to minimize checkout friction and enhance search filters.

4. Hover Effect with Animation
• Created interactive micro-interactions and smooth hover states to increase interface feedback and responsiveness.
• Used precise timing functions for a premium, native-feeling responsiveness.

5. Food Donation Management
• Designed a digital platform connecting local food donors with recipient organizations to minimize waste.
• Streamlined listing forms and location routing maps for high usability and coordination.

6. Real-Time Chat Application
• Designed a clean, multi-pane chat interface supporting separate user and admin workspaces.
• Focused on conversation discovery, message threading, and real-time status indicators.`,
    features: [
      'Food Delivery Mobile App — intuitive ordering experience with restaurant browsing, cart, and order tracking.',
      'Food Donation Management — connects donors with organizations to reduce food waste through a simple interface.',
      'Real-Time Chat Application — messaging app with separate user and admin workflows.',
      'Email Template — responsive layout with clear typography and consistent branding.',
      'User Login Page — clean, accessible authentication screen focused on simplicity.',
      'Hover Effect with Animation — micro-interactions and smooth transitions for enhanced user engagement.'
    ],
    architecture: 'All projects were designed using Figma with a focus on user research, wireframing, prototyping, and high-fidelity mockups. Each design followed established UX principles including visual hierarchy, accessibility, and responsive layouts.',
    stackDetails: [
      { name: 'Figma', reason: 'Primary design tool for wireframing, prototyping, and delivering high-fidelity UI mockups.' },
      { name: 'UX Research', reason: 'Informed design decisions through user flows, empathy mapping, and usability evaluation.' },
      { name: 'Prototyping', reason: 'Created interactive prototypes to validate and communicate design intent before development.' }
    ]
  }
};

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find(p => p.id === id);
  const details = id ? detailsMap[id] : null;

  if (!project || !details) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col px-6 font-sans">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <Link to="/" className="text-primary hover:text-accent flex items-center gap-2">
          <ArrowLeft size={16} /> Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-28 pb-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto z-10 relative">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" /> Back to projects
        </Link>

        <div className="relative rounded-3xl overflow-hidden mb-12 h-96 bg-zinc-950 border border-white/5">
          <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-primary px-3 py-1 rounded-full text-white shadow-md">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white mt-4 font-sans leading-tight">
              {details.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2 space-y-6 font-normal">
            <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">The Problem</h2>
            <p className="text-muted text-sm md:text-base leading-relaxed whitespace-pre-line">{details.problem}</p>

            <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 pt-4">The Solution</h2>
            <p className="text-muted text-sm md:text-base leading-relaxed whitespace-pre-line">{details.solution}</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/5 h-fit space-y-5">
            <div>
              <h3 className="text-xs text-muted uppercase font-semibold tracking-wider">Tech Stack</h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.stack.map((s, i) => (
                  <span key={i} className="text-[10px] font-medium px-2 py-0.5 bg-white/5 rounded border border-white/5 text-white">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-4">
              <h3 className="text-xs text-muted uppercase font-semibold tracking-wider mb-2">Code repository</h3>
              <a href={project.github} className="flex items-center gap-2 text-xs font-bold text-white hover:text-primary transition-colors">
                <Github size={14} /> Github codebase
              </a>
            </div>

            {project.live && (
              <div className="border-t border-white/5 pt-4">
                <h3 className="text-xs text-muted uppercase font-semibold tracking-wider mb-2">Live Demo</h3>
                <a href={project.live} className="flex items-center gap-2 text-xs font-bold text-white hover:text-accent transition-colors">
                  <ExternalLink size={14} /> View Deployment
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="glass-panel p-6 md:p-8 rounded-3xl mb-12">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
            <Cpu size={18} className="text-primary" /> Architecture & Data Strategy
          </h2>
          <p className="text-sm md:text-base text-muted leading-relaxed mb-6 font-normal">
            {details.architecture}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {details.stackDetails.map((item, idx) => (
              <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-xl">
                <h4 className="text-xs font-bold text-accent mb-1 flex items-center gap-1">
                  <Star size={10} className="fill-accent text-accent" /> {item.name}
                </h4>
                <p className="text-[11px] text-muted leading-relaxed font-normal">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3 font-sans">Core Engine Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {details.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3.5 bg-card border border-white/5 rounded-2xl">
                <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs md:text-sm text-muted font-normal">{feat}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;
