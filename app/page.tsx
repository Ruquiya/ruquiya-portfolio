"use client";

import { useState, useEffect, useMemo, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaEnvelope, FaSun, FaMoon, FaDownload, FaArrowDown, FaPhone, FaCode, FaRobot, FaDatabase, FaTools, FaExternalLinkAlt, FaBars } from 'react-icons/fa';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';

// TypeScript Interfaces
interface Skill {
  category: string;
  items: string[];
  icon: React.ReactNode;
}

interface Project {
  title: string;
  description: string;
  year: string;
  link: string;
  image: string;
  tags: string[];
}

interface Experience {
  title: string;
  company: string;
  period: string;
  details: string[];
}

interface Education {
  institution: string;
  degree: string;
  period: string;
  details: string;
}

interface Certification {
  title: string;
  issuer: string;
  year: string;
}

interface Language {
  language: string;
  level: string;
}

// Interactive Background Component
const InteractiveBackground: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x = mouse.current.x * 0.5;
      groupRef.current.position.y = mouse.current.y * 0.5;
    }
  });

  return (
    <>
      <Stars radius={50} depth={25} count={800} factor={2} saturation={isDarkMode ? 0 : 0.5} fade speed={0.3} />
      <group ref={groupRef}>
        <Sparkles count={15} scale={3} size={2} speed={0.1} color={isDarkMode ? '#d8b4fe' : '#60a5fa'} />
      </group>
      <ambientLight intensity={isDarkMode ? 0.2 : 0.4} />
    </>
  );
};

// Header Component
const Header: React.FC<{ isDarkMode: boolean; toggleTheme: () => void }> = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg shadow-lg transition-colors duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <motion.h1
          className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-500 transition-transform duration-300 hover:scale-105"
          whileHover={{ scale: 1.05 }}
          aria-label="Ruquiya Nasir"
        >
          Ruquiya Nasir
        </motion.h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className={`text-sm font-medium capitalize ${
                isDarkMode ? 'text-gray-200 hover:text-cyan-400 hover:bg-gray-800/50' : 'text-gray-800 hover:text-purple-600 hover:bg-gray-100/50'
              } transition-all duration-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.id)}
              aria-label={`Navigate to ${item.label}`}
            >
              {item.label}
            </motion.button>
          ))}
          <div className="flex items-center gap-3">
            <motion.button
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              } transition-all duration-300 hover:shadow-lg`}
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
            </motion.button>
            <motion.a
              href="/RuquiyaCV.pdf"
              download
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-medium shadow hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-700 hover:to-cyan-600"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Download Resume"
            >
              Resume
            </motion.a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`md:hidden absolute top-full left-0 right-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border-t border-gray-200 dark:border-gray-700`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium ${
                    isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
                  } rounded-md transition-all duration-300 hover:shadow-md`}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  className={`flex items-center gap-2 px-4 py-2 ${
                    isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
                  } transition-all duration-300 rounded-md`}
                  onClick={toggleTheme}
                  aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                >
                  {isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
                  <span>Switch Theme</span>
                </button>
                <a
                  href="/RuquiyaCV.pdf"
                  download
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-700 hover:to-cyan-600"
                  aria-label="Download Resume"
                >
                  <FaDownload size={14} />
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Hero Section Component
const HeroSection: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <motion.section
      id="home"
      className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative"
      style={{ opacity, scale }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <Image
            src="/images/ruquiya.jpg"
            alt="Ruquiya Nasir"
            width={160}
            height={160}
            className="w-full h-full object-cover"
            priority
          />
        </motion.div>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-500 transition-transform duration-300 hover:scale-105"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Ruquiya Nasir
        </motion.h1>
        <motion.h2
          className="text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Full Stack Developer & AI Specialist
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Crafting seamless digital experiences with expertise in full-stack development, AI, and innovative solutions.
        </motion.p>
        <motion.div
          className="flex justify-center gap-4 sm:gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            href="#projects"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-700 hover:to-cyan-600 hover:scale-105"
            aria-label="View My Projects"
          >
            View Projects
          </Link>
          <Link
            href="#contact"
            className={`px-6 py-3 border ${
              isDarkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-700/50' : 'border-gray-400 text-gray-800 hover:bg-gray-100/50'
            } rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-md`}
            aria-label="Contact Me"
          >
            Contact Me
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="mt-12"
        >
          <FaArrowDown className="text-2xl text-purple-500 mx-auto" />
        </motion.div>
      </div>
    </motion.section>
  );
};

// Skills Section Component
const SkillsSection: React.FC<{ isDarkMode: boolean; skills: Skill[] }> = ({ isDarkMode, skills }) => {
  return (
    <motion.section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-12">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-500 transition-transform duration-300 hover:scale-105"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technical Skills
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          A curated set of tools and technologies I leverage to build exceptional digital solutions.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((category) => (
          <motion.div
            key={category.category}
            className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/90 border-gray-300'
            } backdrop-blur-md border shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-102 hover:bg-opacity-90`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            role="group"
            tabIndex={0}
            aria-label={`Skills in ${category.category}`}
          >
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-lg ${
                isDarkMode ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-700'
              } transition-colors duration-300 hover:bg-opacity-75`}>
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 ml-4">{category.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className={`px-3 py-1 text-xs sm:text-sm rounded-full ${
                    isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  } transition-colors duration-300 hover:shadow-md`}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// Projects Section Component
const ProjectsSection: React.FC<{ isDarkMode: boolean; projects: Project[] }> = ({ isDarkMode, projects }) => (
  <motion.section
    id="projects"
    className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-center mb-12">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-500 transition-transform duration-300 hover:scale-105"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Featured Projects
      </motion.h2>
      <motion.p
        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Explore my latest work, showcasing innovation and technical expertise.
      </motion.p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {projects.map((project) => (
        <motion.div
          key={project.title}
          className={`rounded-xl overflow-hidden ${
            isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/90 border-gray-300'
          } backdrop-blur-md border shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-102 hover:bg-opacity-90`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden group">
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:from-black/70"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-xl font-bold text-white">{project.title}</h4>
              <p className="text-sm text-gray-200">{project.year}</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-1 text-xs rounded-full ${
                    isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  } transition-colors duration-300 hover:shadow-md`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <Link
                href={project.link}
                target="_blank"
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-purple-600 hover:text-purple-700'
                } flex items-center gap-1 transition-all duration-300 hover:scale-105 hover:underline`}
                aria-label={`View ${project.title} project`}
              >
                View Project <FaExternalLinkAlt size={12} />
              </Link>
              <Link
                href={project.link}
                target="_blank"
                className={`text-sm ${
                  isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
                } flex items-center gap-1 transition-all duration-300 hover:scale-105 hover:underline`}
                aria-label={`View ${project.title} on GitHub`}
              >
                GitHub <FaGithub size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

// Experience Section Component
const ExperienceSection: React.FC<{ isDarkMode: boolean; experiences: Experience[] }> = ({ isDarkMode, experiences }) => (
  <motion.section
    id="experience"
    className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-center mb-12">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-500 transition-transform duration-300 hover:scale-105"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Professional Experience
      </motion.h2>
      <motion.p
        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        My professional journey in technology and community service.
      </motion.p>
    </div>
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-purple-600 before:to-transparent dark:before:via-cyan-500">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          className={`relative pl-12 ${
            isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/90 border-gray-300'
          } backdrop-blur-md p-6 rounded-xl border shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-102 hover:bg-opacity-90`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute left-0 top-6 w-4 h-4 rounded-full bg-purple-600 dark:bg-cyan-500 border-2 border-white dark:border-gray-800"></div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{exp.title}</h3>
            <span className="text-sm text-purple-600 dark:text-cyan-400">{exp.period}</span>
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">{exp.company}</p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {exp.details.map((detail, i) => (
              <li key={i} className="flex items-start">
                <span className="text-purple-600 dark:text-cyan-400 mr-2 mt-1">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

// Contact Section Component
const ContactSection: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | 'loading' | null; message: string | null }>({ type: null, message: null });

  useEffect(() => {
    // Clear form status message after 5 seconds
    if (formStatus.message) {
      const timer = setTimeout(() => {
        setFormStatus({ type: null, message: null });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      // Validate input client-side
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('All fields are required');
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error('Invalid email format');
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send your message. Please try again later.');
      }

      setFormStatus({
        type: 'success',
        message: 'Your message has been sent successfully! I will get back to you soon.',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Form submission error:', error);
      setFormStatus({
        type: 'error',
        message: error.message || 'An unexpected error occurred. Please try again later.',
      });
    }
  };

  return (
    <motion.section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-12">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-500 transition-transform duration-300 hover:scale-105"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          I'm excited to collaborate on innovative projects or discuss new opportunities. Reach out today!
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/90 border-gray-300'
          } backdrop-blur-md border shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-102 hover:bg-opacity-90`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 group">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-700'
              } transition-colors duration-300 group-hover:bg-opacity-75`}>
                <FaEnvelope size={18} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</h4>
                <a
                  href="mailto:ruquiyanasir57@gmail.com"
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-200 hover:text-cyan-400' : 'text-gray-800 hover:text-purple-700'
                  } transition-all duration-300 group-hover:underline group-hover:scale-105`}
                  aria-label="Email Ruquiya Nasir"
                >
                  ruquiyanasir57@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-700'
              } transition-colors duration-300 group-hover:bg-opacity-75`}>
                <FaPhone size={18} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</h4>
                <a
                  href="tel:+923345302913"
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-200 hover:text-cyan-400' : 'text-gray-800 hover:text-purple-700'
                  } transition-all duration-300 group-hover:underline group-hover:scale-105`}
                  aria-label="Call Ruquiya Nasir"
                >
                  +92 334 5302913
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-700'
              } transition-colors duration-300 group-hover:bg-opacity-75`}>
                <FaGithub size={18} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">GitHub</h4>
                <a
                  href="https://github.com/Ruquiya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-200 hover:text-cyan-400' : 'text-gray-800 hover:text-purple-700'
                  } transition-all duration-300 group-hover:underline group-hover:scale-105`}
                  aria-label="Visit Ruquiya's GitHub Profile"
                >
                  github.com/Ruquiya
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/90 border-gray-300'
          } backdrop-blur-md border shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-102 hover:bg-opacity-90`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-400 text-gray-800'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-md`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                aria-required="true"
                aria-label="Your Name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-400 text-gray-800'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-md`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                aria-required="true"
                aria-label="Your Email"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-400 text-gray-800'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-md`}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                aria-required="true"
                aria-label="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className={`w-full px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-700 hover:to-cyan-600 hover:scale-105 ${
                formStatus.type === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={formStatus.type === 'loading'}
              aria-label="Send Message"
            >
              {formStatus.type === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            {formStatus.message && (
              <motion.p
                className={`text-sm text-center ${formStatus.type === 'success' ? 'text-green-500' : 'text-red-500'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                aria-live="polite"
              >
                {formStatus.message}
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};
// Main Portfolio Component
const Portfolio: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const skills = useMemo<Skill[]>(() => [
    {
      category: 'Frontend Development',
      items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS'],
      icon: <FaCode />,
    },
    {
      category: 'Backend Development',
      items: ['Node.js', 'Express', 'Laravel', 'PHP', 'Python', 'Java'],
      icon: <FaDatabase />,
    },
    {
      category: 'AI & Machine Learning',
      items: ['TensorFlow', 'PyTorch', 'Chatbot Development', 'NLP'],
      icon: <FaRobot />,
    },
    {
      category: 'Database & DevOps',
      items: ['MySQL', 'MongoDB', 'PostgreSQL','Git'],
      icon: <FaTools />,
    },
  ], []);

  const projects = useMemo<Project[]>(() => [
    {
     title: 'AirGuard',
  description: 'A MERN stack-based real-time air quality monitoring system with predictive analytics and interactive dashboards.',
  year: '2025',
  link: 'https://github.com/Ruquiya?tab=repositories',
  image: '/images/airguard.png', 
  tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'ARIMA', 'Holt-Winters', 'AI Chatbot', 'IoT']
    },
    {
     title: 'ORAPMS',
  description: 'A property management system built with ASP.NET to manage rooms, tenants, and team operations efficiently.',
  year: '2024',
  link: 'https://github.com/Ruquiya?tab=repositories',
  image: '/images/ORAPMS.png',
  tags: ['ASP.NET', 'Project Management', 'Team Collaboration']
    },
    {
      title: 'Fresh Cart',
      description: 'E-commerce platform for grocery delivery with inventory management and payment integration.',
      year: '2024',
      link: 'https://github.com/Ruquiya/FreshCart',
      image: '/images/Freshcart.png',
      tags: ['Laravel', 'HTML', 'CSS', 'Bootstrap', 'Stripe API'],
    },
    {
      title: 'Signal Processing Tool',
      description: 'Advanced signal analysis application with FFT/DFT visualization and noise reduction algorithms.',
      year: '2023',
      link: 'https://github.com/Ruquiya/SignalProcessing',
      image: '/images/Signal.png',
      tags: ['Python', 'MATLAB', 'NumPy', 'SciPy'],
    },
    {
      title: 'Traffic Management System',
  description: 'A database-driven traffic management project featuring ER diagrams, relational schemas, and SQL-based data handling.',
  year: '2022',
  link: 'https://github.com/Ruquiya/TrafficSquad',
  image: '/images/traffic.png',
  tags: ['SQL', 'ER Diagram', 'Relational Model', 'Database Design']
    },
        {
  title: 'Bookstore Management System',
  description: 'An object-oriented C++ application for managing bookstore inventory, sales, and customer records with a console-based interface.',
  year: '2022',
  link: 'https://github.com/Ruquiya/Bookstore-Management-System',
  image: '/images/bookstore.png', // Make sure this path is correct
  tags: ['C++', 'OOP', 'File Handling', 'Console Application']

    },
  ], []);

  const experiences = useMemo<Experience[]>(() => [
    {
      title: 'Software Engineer Intern',
      company: 'SmartTech Solutions',
      period: 'Jul 2024 - Sep 2024',
      details: [
        'Developed AI-powered features for ORAPMS, improving workflow efficiency by 30%.',
        'Implemented responsive UI components using React and TypeScript.',
        'Collaborated with cross-functional teams to deliver features on tight deadlines.',
      ],
    },
    {
      title: 'Volunteer Tech Consultant',
      company: 'SABA HOMES Orphan Trust',
      period: 'Jan 2024 - Feb 2024',
      details: [
        'Managed and optimized donor databases for improved data accuracy.',
        'Designed and executed digital marketing campaigns to increase outreach.',
        'Developed internal tools to streamline volunteer coordination.',
      ],
    },
  ], []);

  const education = useMemo<Education[]>(() => [
    {
      institution: 'Capital University',
      degree: 'BS Computer Science',
      period: '2021-2025',
      details: 'CGPA: 3.90',
    },
    {
      institution: 'Askaria College',
      degree: 'ICS',
      period: '2019-2021',
      details: 'A Division',
    },
  ], []);

  const certifications = useMemo<Certification[]>(() => [
    { title: 'Google UX Design', issuer: 'Coursera', year: '2024' },
    { title: 'Google Data Analytics', issuer: 'Coursera', year: '2023' },
    { title: 'Academic Scholarship', issuer: 'Capital University', year: '2021-2025' },
    { title: 'Certified Associate Member', issuer: 'Pakistan Red Crescent', year: '2022' },
  ], []);

  const languages = useMemo<Language[]>(() => [
    { language: 'English', level: 'Advanced' },
    { language: 'Urdu', level: 'Native' },
    { language: 'French', level: 'Basic' },
  ], []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-blue-50 to-blue-100'} transition-colors duration-500 font-sans relative overflow-x-hidden`}>
      <Head>
        <title>Ruquiya Nasir - Portfolio</title>
        <meta name="description" content="Portfolio of Ruquiya Nasir, a full-stack developer specializing in AI, web development, and innovative digital solutions." />
        <meta name="keywords" content="Ruquiya Nasir, portfolio, full-stack developer, AI, web development, React, Next.js, Laravel, TypeScript" />
        <meta name="author" content="Ruquiya Nasir" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Ruquiya Nasir - Portfolio" />
        <meta property="og:description" content="Explore the portfolio of Ruquiya Nasir, showcasing expertise in full-stack development and AI-driven solutions." />
        <meta property="og:image" content="/images/profile.jpg" />
        <meta property="og:url" content="https://ruquiyanasir.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="relative w-16 h-16"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute inset-0 border-4 border-t-transparent rounded-full" style={{ borderColor: isDarkMode ? '#d8b4fe' : '#3b82f6' }} />
              <motion.div
                className="absolute inset-2 border-2 border-t-transparent rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                style={{ borderColor: isDarkMode ? '#60a5fa' : '#d8b4fe' }}
              />
              <motion.div
                className="text-xs font-semibold text-center text-purple-400 mt-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                Loading...
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Three.js Background */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <InteractiveBackground isDarkMode={isDarkMode} />
        </Canvas>
      </div>

      {/* Header */}
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection isDarkMode={isDarkMode} />
        <SkillsSection isDarkMode={isDarkMode} skills={skills} />
        <ProjectsSection isDarkMode={isDarkMode} projects={projects} />
        <ExperienceSection isDarkMode={isDarkMode} experiences={experiences} />
        <motion.section
          id="education"
          className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-500 transition-transform duration-300 hover:scale-105"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Education
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              My academic foundation in computer science and technology.
            </motion.p>
          </div>
          <div className="space-y-6">
            {education.map((edu) => (
              <motion.div
                key={edu.institution}
                className={`p-6 rounded-xl ${
                  isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/90 border-gray-300'
                } backdrop-blur-md border shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-102 hover:bg-opacity-90`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{edu.institution}</h3>
                <p className="text-sm text-purple-600 dark:text-cyan-400">{edu.degree}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{edu.period} | {edu.details}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        <motion.section
          id="certifications"
          className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-500 transition-transform duration-300 hover:scale-105"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Certifications
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Professional credentials that highlight my expertise and commitment to learning.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <motion.div
                key={cert.title}
                className={`p-6 rounded-xl ${
                  isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/90 border-gray-300'
                } backdrop-blur-md border shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-102 hover:bg-opacity-90`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{cert.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{cert.issuer}{cert.year ? `, ${cert.year}` : ''}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        <motion.section
          id="languages"
          className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-500 transition-transform duration-300 hover:scale-105"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Languages
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              My proficiency in multiple languages enhances my ability to collaborate globally.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {languages.map((lang) => (
              <motion.div
                key={lang.language}
                className={`p-6 rounded-xl ${
                  isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/90 border-gray-300'
                } backdrop-blur-md border shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-102 hover:bg-opacity-90`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{lang.language}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{lang.level}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        <ContactSection isDarkMode={isDarkMode} />
      </main>

      {/* Footer */}
      <footer className="py-8 text-center relative z-10">
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          © 2025 Ruquiya Nasir. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;