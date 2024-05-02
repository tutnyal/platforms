// "use client"
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { redirect } from "next/navigation";
// import HomePage from "@/components/Home/page"; // Import your homepage component
// import DemoPage from "../home/demo/page"; // Assuming you have a DemoPage component
// import Header from '@/components/Header'; // Import the NavMenu component


// const App: React.FC = () => {
//   return (
//     <Router>
//       <Header /> {/* You need to manage isTop state accordingly */}
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/demo" element={<DemoPage />} />
//         {/* <Route path="/login" element={<DemoPage />} />          */}
//         {/* <div>
//        <Header /> 
//        <HomePage />
      
//      </div> */}
//       </Routes>

//     </Router>

//   );
// };

// export default App;

import React from 'react';
import Header from '@/components/Header'; // Import the NavMenu component
import HomePage from "@/components/Home/page";

const App = () => {
  return (
    <div>
      <Header /> 
      <HomePage />
    </div>
    
  );
};

export default App;

