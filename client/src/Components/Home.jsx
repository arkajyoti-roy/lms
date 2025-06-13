import Courses from "@/pages/student/Courses";
import { Search, BookOpen, TrendingUp, Users, Award } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Add your search logic here
    console.log("Searching for:", searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const stats = [
    { icon: BookOpen, label: "Courses", value: "150+", color: "text-blue-600 dark:text-blue-400" },
    { icon: Users, label: "Students", value: "10K+", color: "text-green-600 dark:text-green-400" },
    { icon: Award, label: "Certificates", value: "5K+", color: "text-purple-600 dark:text-purple-400" },
    { icon: TrendingUp, label: "Success Rate", value: "95%", color: "text-orange-600 dark:text-orange-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="text-center space-y-8">
              {/* Hero Text */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent leading-tight">
                  Discover Your Next
                  <br />
                  <span className="relative">
                    Learning Adventure
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 animate-pulse"></div>
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Unlock your potential with world-class courses designed to help you succeed in today's digital world
                </p>
              </div>

              {/* Enhanced Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden backdrop-blur-sm">
                    <div className="flex items-center">
                      {/* Search Icon */}
                      <div className="flex items-center justify-center w-14 h-14 text-gray-400 dark:text-gray-500">
                        <Search className="w-5 h-5" />
                      </div>
                      
                      {/* Search Input */}
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 h-14 px-4 text-lg font-medium bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 outline-none"
                        placeholder="What do you want to learn today?"
                      />
                      
                      {/* Search Button */}
                      <button
                        onClick={handleSearch}
                        className="h-14 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Popular Searches */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Popular:</span>
                  {["Web Development", "Data Science", "UI/UX Design", "Marketing"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Section */}
              <div className="mt-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {stats.map((stat, index) => (
                    <div key={index} className="group">
                      <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/50 dark:border-slate-700/50">
                        <div className="flex flex-col items-center space-y-3">
                          <div className={`p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 group-hover:scale-110 transition-transform duration-300`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Courses Section */}
      <div className="relative">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
              Featured Courses
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our carefully curated selection of courses designed to help you achieve your learning goals
            </p>
          </div>
        </div>
        
        {/* Courses Component */}
        <div className="relative z-10">
          <Courses />
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0);
          background-size: 20px 20px;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;