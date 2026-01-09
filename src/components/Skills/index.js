import React from 'react';

const skills = [
  {
    name: 'Frontend',
    description: 'React, Docusaurus, Tailwind CSS',
    icon: '🎨',
    color: 'border-blue-500 text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    name: 'Backend',
    description: 'Node.js, Express, PostgreSQL',
    icon: '⚙️',
    color: 'border-green-500 text-green-600',
    bg: 'bg-green-50'
  },
  {
    name: 'Työkalut',
    description: 'Git, Docker, Vercel',
    icon: '🛠️',
    color: 'border-purple-500 text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    name: 'Laki & Tekniikka',
    description: 'Säädöslaskenta, automaatio',
    icon: '⚖️',
    color: 'border-amber-500 text-amber-600',
    bg: 'bg-amber-50'
  }
];

export default function Skills() {
  return (
    <div className="py-12 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-black text-white mb-8 text-center tracking-tight">
          Osaamisalueet
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-2xl border-2 ${skill.color} ${skill.bg} 
                          transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-default`}
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}