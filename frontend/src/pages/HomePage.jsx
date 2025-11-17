import AddTask from "@/components/ui/AddTask";
import DateTimeAndFillter from "@/components/ui/DateTimeAndFillter";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import StartAndFiltter from "@/components/ui/StartAndFiltter";
import TaskList from "@/components/ui/TaskList";
import TaskListPegination from "@/components/ui/TaskListPegination";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const handleFilterChange = (f) => {
    setFilter(f);
    setPage(1);
  };
  const handlePageChange = (p) => setPage(p);
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPage(1);
  };

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Purple Gradient Grid Right Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #f0f0f0 1px, transparent 1px),
        linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
        radial-gradient(circle 800px at 100% 200px, #d5c5ff, transparent)
      `,
          backgroundSize: "96px 64px, 96px 64px, 100% 100%",
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto">
        <div className="w-full max-w-2xl px-6 mx-auto space-y-6">
          <Header />

          <AddTask />

          <StartAndFiltter
            filter={filter}
            onFilterChange={handleFilterChange}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />

          <TaskList
            filter={filter}
            currentPage={page}
            pageSize={pageSize}
            onTotalPagesChange={setTotalPages}
          />

          <div className="items-center justify-between mt-6 text-center flex gap-6">
            <TaskListPegination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <DateTimeAndFillter onFilterChange={handleFilterChange} />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
