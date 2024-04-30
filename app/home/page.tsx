// "use client"
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { redirect } from "next/navigation";
// import HomePage from "@/components/Home/page"; // Import your homepage component
// import DemoPage from "@/components/Home/page"; // Assuming you have a DemoPage component
// import Header from '@/components/Header'; // Import the NavMenu component


// const App: React.FC = () => {
//   return (
//     <Router>
//       <Header /> {/* You need to manage isTop state accordingly */}
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/demo" element={<DemoPage />} />
//         {/* <Route path="/login" element={<DemoPage />} />          */}
//       </Routes>

//     </Router>

//   );
// };

// export default App;

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header'; // Import the NavMenu component
import HomePage from "@/components/Home/page";

const App: React.FC = () => {
  return (
    <div>
      <Header /> 
      <HomePage />
      
    </div>
  );
};

export default App;



