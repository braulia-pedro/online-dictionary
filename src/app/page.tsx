import React from 'react';
import Header from "@/components/header";
import Search from "@/components/search"
import Footer from "@/components/footer";
import Curiosity from "@/components/curiosity";

// Hidratação do html https://medium.com/@ignatovich.dm/react-hydration-explained-what-happens-on-the-client-side-6b4ef44c3b3d
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 px-24 py-8 space-y-8">
        <Search />
        <Curiosity />
      </div>
      <Footer />
    </main>
  );
}
