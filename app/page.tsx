"use client";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import ModuleView from "@/components/ModuleView";
import ProblemasView from "@/components/ProblemasView";
import SolucionesView from "@/components/SolucionesView";
import NichoView from "@/components/NichoView";
import PricingView from "@/components/PricingView";
import LandingView from "@/components/LandingView";
import { modules } from "@/lib/modules";

export default function Home() {
  const [activeModuleId, setActiveModuleId] = useState(modules[0].id);
  const [problemasSeleccionados, setProblemasSeleccionados] = useState<string[]>([]);
  const [nichoSeleccionado, setNichoSeleccionado] = useState("");
  const currentModule = modules.find((m) => m.id === activeModuleId) ?? modules[0];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f0f13" }}>
      <Navigation modules={modules} activeModule={activeModuleId} onModuleChange={setActiveModuleId} />
      {currentModule.id === "problemas" ? (
        <ProblemasView module={currentModule} seleccionados={problemasSeleccionados} onSeleccionChange={setProblemasSeleccionados} />
      ) : currentModule.id === "soluciones" ? (
        <SolucionesView module={currentModule} problemasSeleccionados={problemasSeleccionados} />
      ) : currentModule.id === "nicho" ? (
        <NichoView module={currentModule} onNichoChange={setNichoSeleccionado} />
      ) : currentModule.id === "pricing" ? (
        <PricingView />
      ) : currentModule.id === "landing" ? (
        <LandingView module={currentModule} nichoSeleccionado={nichoSeleccionado} />
      ) : (
        <ModuleView module={currentModule} />
      )}
    </div>
  );
}
