
import { Subject } from './types';

export const SUBJECT_CATEGORIES = [
  "Science & Engineering",
  "Medical & Life Sciences",
  "Humanities & History",
  "Languages & Lit",
  "Arts & Media",
  "Modern Technology",
  "Competitive Exams"
];

export const SUBJECTS: Subject[] = [
  // Science & Engineering
  { id: 'phy', name: 'Physics', icon: '⚡', category: 'Science & Engineering', description: 'Quantum, Classical, and Nuclear Physics', topics: ['Mechanics', 'Quantum', 'Electrodynamics'] },
  { id: 'che', name: 'Chemistry', icon: '🧪', category: 'Science & Engineering', description: 'Organic, Inorganic, and Physical Chemistry', topics: ['Periodic Table', 'Chemical Bonding', 'Reaction Mechanisms'] },
  { id: 'mat', name: 'Mathematics', icon: '📐', category: 'Science & Engineering', description: 'Calculus, Algebra, and Geometry', topics: ['Calculus', 'Linear Algebra', 'Trigonometry'] },
  { id: 'ast', name: 'Astronomy', icon: '🔭', category: 'Science & Engineering', description: 'Cosmology, Planets, and Deep Space', topics: ['Stars', 'Black Holes', 'Galaxies'] },
  { id: 'qua', name: 'Quantum Science', icon: '⚛️', category: 'Science & Engineering', description: 'Quantum Mechanics and Computing', topics: ['Entanglement', 'Superposition', 'Qubits'] },
  { id: 'gen_sci', name: 'General Science', icon: '🔬', category: 'Science & Engineering', description: 'Unified concepts across sciences', topics: ['Scientific Method', 'Basic Principles'] },
  
  // Medical & Life Sciences
  { id: 'bio', name: 'Biology', icon: '🧬', category: 'Medical & Life Sciences', description: 'Zoology, Botany, and Genetics', topics: ['Cell Theory', 'Genetics', 'Evolution'] },
  { id: 'biomed', name: 'Biomedical', icon: '🏥', category: 'Medical & Life Sciences', description: 'Medicine and biological engineering', topics: ['Anatomy', 'Physiology', 'Biotech'] },
  { id: 'geron', name: 'Gerontology', icon: '👴', category: 'Medical & Life Sciences', description: 'The study of aging', topics: ['Biological Aging', 'Sociology of Aging'] },
  { id: 'env', name: 'Environment', icon: '🌿', category: 'Medical & Life Sciences', description: 'Ecology and Nature Conservation', topics: ['Ecosystems', 'Sustainability', 'Pollution'] },
  { id: 'eco_sci', name: 'Ecology', icon: '🌳', category: 'Medical & Life Sciences', description: 'Interactions of organisms', topics: ['Biodiversity', 'Habitats'] },
  { id: 'pal', name: 'Paleontology', icon: '🦴', category: 'Medical & Life Sciences', description: 'Study of prehistoric life', topics: ['Fossils', 'Dinosaurs', 'Evolutionary History'] },
  { id: 'nat', name: 'Nature', icon: '🌻', category: 'Medical & Life Sciences', description: 'Natural world and wildlife', topics: ['Flora', 'Fauna', 'Wilderness'] },

  // Humanities & History
  { id: 'psy', name: 'Psychology', icon: '🧠', category: 'Humanities & History', description: 'Cognitive and behavioral science', topics: ['Cognition', 'Behavior', 'Memory'] },
  { id: 'phi', name: 'Philosophy', icon: '🏛️', category: 'Humanities & History', description: 'Logic, Ethics, and Metaphysics', topics: ['Socratic Method', 'Existentialism', 'Ethics'] },
  { id: 'his_i', name: 'Indian History', icon: '🇮🇳', category: 'Humanities & History', description: 'Ancient, Medieval, and Modern India', topics: ['Indus Valley', 'Mughal Empire', 'Independence'] },
  { id: 'his_w', name: 'World History', icon: '🗺️', category: 'Humanities & History', description: 'Global Civilizations and Revolutions', topics: ['World Wars', 'Renaissance', 'Ancient Egypt'] },
  { id: 'geo', name: 'Geography', icon: '🌍', category: 'Humanities & History', description: 'Physical and Human Geography', topics: ['Climatology', 'Oceanography', 'Maps'] },
  { id: 'civ', name: 'Civics', icon: '⚖️', category: 'Humanities & History', description: 'Political Science and Constitution', topics: ['Democracy', 'Human Rights', 'Governance'] },
  { id: 'eco', name: 'Economics', icon: '📈', category: 'Humanities & History', description: 'Macro and Micro Economics', topics: ['Supply & Demand', 'GDP', 'Inflation'] },
  { id: 'arch', name: 'Archaeology', icon: '⛏️', category: 'Humanities & History', description: 'Ancient civilizations through artifacts', topics: ['Excavation', 'Historical Preservation'] },

  // Languages & Lit
  { id: 'hin', name: 'Hindi Grammar', icon: '✍️', category: 'Languages & Lit', description: 'Hindi Vyakaran and Literature', topics: ['Vyakaran', 'Kavita', 'Sahitya'] },
  { id: 'eng', name: 'English Grammar', icon: '📖', category: 'Languages & Lit', description: 'English Composition and Grammar', topics: ['Grammar', 'Poetry', 'Tenses'] },
  { id: 'lit', name: 'Literature', icon: '📚', category: 'Languages & Lit', description: 'World and Regional Classics', topics: ['Fiction', 'Drama', 'Criticism'] },

  // Arts & Media
  { id: 'art', name: 'Art', icon: '🎨', category: 'Arts & Media', description: 'Visual Arts and History', topics: ['Painting', 'Sculpture', 'Art History'] },
  { id: 'mus', name: 'Music', icon: '🎵', category: 'Arts & Media', description: 'Music Theory and History', topics: ['Scales', 'Composers', 'Instruments'] },
  { id: 'mov', name: 'Movies', icon: '🎬', category: 'Arts & Media', description: 'Cinema and Filmmaking', topics: ['Direction', 'Screenwriting', 'Film History'] },
  { id: 'dan', name: 'Dance', icon: '💃', category: 'Arts & Media', description: 'Classical and Contemporary Dance', topics: ['Kathak', 'Ballet', 'Folk Dance'] },

  // Modern Technology
  { id: 'cs', name: 'Computer Science', icon: '💻', category: 'Modern Technology', description: 'Algorithms and Systems', topics: ['Python', 'DSA', 'Architecture'] },
  { id: 'ds', name: 'Data Science', icon: '📊', category: 'Modern Technology', description: 'ML, AI, and Big Data', topics: ['Regression', 'Neural Networks', 'Stats'] },
  { id: 'cyb', name: 'Cybersecurity', icon: '🛡️', category: 'Modern Technology', description: 'Network Security and Ethics', topics: ['Cryptography', 'Firewalls', 'Pentesting'] },
  { id: 'tech', name: 'Technology', icon: '🚀', category: 'Modern Technology', description: 'Emerging tech and gadgets', topics: ['Robotics', 'Nanotech', 'IOT'] },

  // Competitive Exams
  { id: 'gk', name: 'General Knowledge', icon: '💡', category: 'Competitive Exams', description: 'Current Affairs and Facts', topics: ['National', 'International', 'Sports'] },
  { id: 'log', name: 'Logical Reasoning', icon: '🧩', category: 'Competitive Exams', description: 'Analytical and Critical Thinking', topics: ['Aptitude', 'Puzzles', 'Patterns'] },
];

export const APP_LOGO_URL = 'https://i.ibb.co/VvW32rL/polymath-logo.png';
