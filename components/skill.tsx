import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiReact, SiHtml5, SiCss3, SiJavascript, SiPhp, SiNextdotjs, SiFigma, SiGit } from 'react-icons/si';

const skillCategories = [
  {
    name: "Front-End",
    skills: [
      { skill: 'HTML', level: 90, icon: SiHtml5, color: "#E34F26" },
      { skill: 'CSS', level: 50, icon: SiCss3, color: "#1572B6" },
      { skill: 'JavaScript', level: 50, icon: SiJavascript, color: "#F7DF1E" },
      { skill: 'React', level: 50, icon: SiReact, color: "#61DAFB" }
    ]
  },
  {
    name: "Back-End",
    skills: [
      { skill: 'PHP', level: 89, icon: SiPhp, color: "#777BB4" },
      { skill: 'Node.js', level: 45, icon: SiNextdotjs, color: "#339933" },
      { skill: 'MySQL', level: 70, icon: null, color: "#4479A1" }
    ]
  },
  {
    name: "Tools & Others",
    skills: [
      { skill: 'Git', level: 65, icon: SiGit, color: "#F05032" },
      { skill: 'Figma', level: 75, icon: SiFigma, color: "#F24E1E" }
    ]
  }
];

export default function Skill({ isDarkMode }: { isDarkMode: boolean }) {
  const [activeSkillTab, setActiveSkillTab] = useState("Front-End");

  return (
    <motion.div
      className="w-full max-w-6xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <motion.h2
        className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        Skills
      </motion.h2>
      <motion.div
        className={`w-20 h-1.5 bg-blue-500 rounded mb-8`}
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      />
      <motion.div
        className={`${isDarkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white bg-opacity-70'} backdrop-blur-lg p-8 rounded-2xl shadow-xl mb-8`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        {/* Skill category tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {skillCategories.map((category) => (
            <motion.button
              key={category.name}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSkillTab === category.name
                  ? `bg-blue-600 text-white`
                  : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
              }`}
              onClick={() => setActiveSkillTab(category.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Skills progress bars with animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSkillTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl mx-auto"
          >
            {skillCategories
              .find((cat) => cat.name === activeSkillTab)
              ?.skills.map((item, index) => (
                <motion.div
                  key={item.skill}
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: false }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      {item.icon && <item.icon size={20} color={item.color} />}
                      <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.skill}</p>
                    </div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.level}%</p>
                  </div>
                  <div
                    className={`bg-gray-700 h-2.5 rounded-full overflow-hidden relative ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color || '#3B82F6' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: false }}
                    >
                      <motion.div
                        className="absolute top-0 right-0 h-full w-2 bg-white opacity-30"
                        animate={{
                          x: [100, -100],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}