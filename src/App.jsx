import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 5;
  const [progress, setProgress] = useState(0);

  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return (
    <div>
      <NavBar />
      <LoadingBar height={3} color="#f11946" progress={progress} />
      <Routes>
        <Route
          path="/"
          element={
            <News
              setProgress={setProgress}
              pageSize={pageSize}
              country="us"
              category="general"
            />
          }
        />
        {categories.map((category) => (
          <Route
            key={category}
            path={`/${category}`}
            element={
              <News
                setProgress={setProgress}
                pageSize={pageSize}
                country="us"
                category={category}
              />
            }
          />
        ))}
      </Routes>
    </div>
  );
};

export default App;
