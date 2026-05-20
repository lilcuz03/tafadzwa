import React from "react";

const SkillCard = () => {
  const skills = [
    {
      name: "React Native",
      icon: "📱",
      type: "Mobile Development",
    },
    {
      name: "Flutter",
      icon: "🐦",
      type: "Mobile Development",
    },
    {
      name: "React Js",
      icon: "⚛️",
      type: "Frontend Development",
    },
    {
      name: "Next Js",
      icon: "▲",
      type: "Frontend Development",
    },
    {
      name: "Supabase",
      icon: "🗄️",
      type: "Backend Development",
    },
    {
      name: "MongoDB",
      icon: "🍃",
      type: "Backend Development",
    },
    {
      name: "Photograpghy",
      icon: "📸",
      type: "creactive",
    },
    {
      name: "Canva & Desin",
      icon: "🎨",
      type: "creactive",
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center  flex-wrap mt-10">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="flex min-w-20 flex-col items-center justify-center gap-2 p-4 
             bg-[#111] border border-white/8 rounded-xl w-40 
             transition-all duration-300 ease-out
             hover:bg-[#1a1a1a] hover:border-cyan-500/40 
             hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] 
             hover:-translate-y-1 hover:scale-105 cursor-default"
        >
          <div className="text-4xl transition-transform duration-300 group-hover:scale-110">
            {skill.icon}
          </div>
          <h3 className="text-sm font-semibold">{skill.name}</h3>
          <p className="text-xs text-gray-400">{skill.type}</p>
        </div>
      ))}
    </div>
  );
};

export default SkillCard;
