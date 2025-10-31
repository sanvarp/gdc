/**
 * Home Page - Premium Modern Design
 * Ultra-modern welcome screen with advanced animations and stunning visuals
 */

import { Card, Button, Logo } from '@components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function HomePage() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-full overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-secondary-900">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 animate-gradient-fast bg-200% blur-3xl" />
      </div>

      {/* Floating orbs with parallax */}
      <div
        className="absolute top-20 left-10 h-96 w-96 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 opacity-20 blur-3xl animate-float"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      />
      <div
        className="absolute bottom-20 right-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-secondary-400 to-secondary-600 opacity-20 blur-3xl animate-float-delayed"
        style={{ transform: `translate(${-mousePosition.x * 0.8}px, ${-mousePosition.y * 0.8}px)` }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Main content */}
      <div className="relative z-10 flex min-h-full items-center justify-center p-4 md:p-8 lg:p-12">
        <div className="w-full max-w-7xl space-y-12 md:space-y-16">

          {/* Hero section - Ultra premium */}
          <div className="text-center space-y-8 animate-fade-in-scale pt-8">
            {/* Animated logo with premium glow effects */}
            <div className="relative inline-flex items-center justify-center mb-8 py-6">
              {/* Multiple layer glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full blur-3xl opacity-40 animate-pulse-glow scale-150" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-600 rounded-full blur-2xl opacity-30 animate-glow-pulse scale-125" />

              {/* Logo container with 3D effect */}
              <div className="relative p-8 md:p-10 lg:p-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-white/20 shadow-floating animate-float overflow-visible">
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-full" />
                <Logo
                  size="xl"
                  withGlow
                  className="relative z-10 filter drop-shadow-2xl scale-110 md:scale-125 lg:scale-150"
                />
              </div>
            </div>

            {/* Main title with shimmer effect */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="inline-block bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent bg-[length:200%_100%] animate-text-shimmer">
                  Gases del Caribe
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-transparent bg-gradient-to-r from-primary-300 via-secondary-300 to-accent-300 bg-clip-text animate-fade-in-up">
                Asistente Inteligente de Documentación
              </p>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:200ms]">
              Consulta contratos, documentos y políticas de Gases del Caribe de forma instantánea.
              Nuestra IA analiza tu documentación para brindarte respuestas precisas y contextuales
              basadas en tus archivos empresariales.
            </p>

            {/* CTA buttons - Premium style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in-up [animation-delay:400ms]">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/chats')}
                className="group relative min-w-[200px] bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600 hover:from-primary-400 hover:via-primary-500 hover:to-secondary-500 shadow-glow-lg hover:shadow-glow-xl transform hover:scale-105 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Consultar Documentos
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/files')}
                className="min-w-[200px] border-2 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white hover:border-white/40 transform hover:scale-105 transition-all duration-300"
              >
                Ver Documentos
              </Button>
            </div>
          </div>

          {/* Feature cards - Modern bento grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">

            {/* Chats card - Large */}
            <div className="group md:col-span-2 lg:col-span-2 animate-stagger-1">
              <Card className="relative h-full overflow-hidden border-white/10 bg-white/5 backdrop-blur-2xl shadow-depth-lg hover:shadow-floating transition-all duration-700 hover:-translate-y-2">
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-[-2px] bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 rounded-2xl blur-sm animate-gradient" />
                </div>

                {/* Glow effect on hover - reduced opacity for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-transparent to-transparent group-hover:from-primary-500/5 transition-all duration-700 rounded-2xl" />

                <div className="relative z-10 p-8 space-y-6 h-full flex flex-col">
                  <div className="flex items-start gap-6">
                    {/* Icon with 3D effect */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity animate-pulse-glow" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-400 to-primary-600 text-4xl shadow-depth-md transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        💬
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-300 group-hover:to-secondary-300 group-hover:bg-clip-text transition-all duration-500">
                        Consultas Inteligentes
                      </h3>
                      <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                        Pregunta sobre cualquier contrato, cláusula o documento de GDC.
                        Nuestra IA analiza tus archivos y proporciona respuestas precisas
                        con referencias directas a la documentación relevante.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="group/feature p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/5 hover:border-primary-500/30 transition-all duration-300">
                      <div className="text-2xl mb-2">📄</div>
                      <h4 className="font-semibold text-white text-sm mb-1">Análisis de Contratos</h4>
                      <p className="text-xs text-gray-400 group-hover/feature:text-gray-300 transition-colors">Consulta cláusulas y términos específicos</p>
                    </div>

                    <div className="group/feature p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/5 hover:border-primary-500/30 transition-all duration-300">
                      <div className="text-2xl mb-2">🔍</div>
                      <h4 className="font-semibold text-white text-sm mb-1">Búsqueda en Documentos</h4>
                      <p className="text-xs text-gray-400 group-hover/feature:text-gray-300 transition-colors">Encuentra información al instante</p>
                    </div>

                    <div className="group/feature p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/5 hover:border-primary-500/30 transition-all duration-300">
                      <div className="text-2xl mb-2">⚡</div>
                      <h4 className="font-semibold text-white text-sm mb-1">Respuestas Precisas</h4>
                      <p className="text-xs text-gray-400 group-hover/feature:text-gray-300 transition-colors">Basadas en tus archivos reales</p>
                    </div>

                    <div className="group/feature p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/5 hover:border-primary-500/30 transition-all duration-300">
                      <div className="text-2xl mb-2">📊</div>
                      <h4 className="font-semibold text-white text-sm mb-1">Referencias Directas</h4>
                      <p className="text-xs text-gray-400 group-hover/feature:text-gray-300 transition-colors">Con citas a documentos fuente</p>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => navigate('/chats')}
                    className="mt-auto bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-400 hover:to-secondary-400 shadow-primary hover:shadow-glow-md transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Hacer una Consulta
                  </Button>
                </div>
              </Card>
            </div>

            {/* Files card */}
            <div className="group animate-stagger-2">
              <Card className="relative h-full overflow-hidden border-white/10 bg-white/5 backdrop-blur-2xl shadow-depth-lg hover:shadow-floating transition-all duration-700 hover:-translate-y-2">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-[-2px] bg-gradient-to-r from-secondary-500 via-accent-500 to-secondary-500 rounded-2xl blur-sm animate-gradient" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/0 via-transparent to-transparent group-hover:from-secondary-500/10 transition-all duration-700 rounded-2xl" />

                <div className="relative z-10 p-8 space-y-6 h-full flex flex-col">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity animate-pulse-glow" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-secondary-400 to-secondary-600 text-4xl shadow-depth-md transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 mx-auto">
                      📁
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-secondary-300 group-hover:to-accent-300 group-hover:bg-clip-text transition-all duration-500">
                      Documentos GDC
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      Accede, gestiona y sube contratos, políticas y documentación
                      empresarial con control de permisos y organización inteligente.
                    </p>
                  </div>

                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <span className="text-xl">📋</span>
                      <span className="text-sm text-gray-300">Contratos y acuerdos</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <span className="text-xl">🔐</span>
                      <span className="text-sm text-gray-300">Acceso seguro y controlado</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <span className="text-xl">📤</span>
                      <span className="text-sm text-gray-300">Carga de documentos nuevos</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => navigate('/files')}
                    className="mt-auto bg-gradient-to-r from-secondary-500 to-accent-500 hover:from-secondary-400 hover:to-accent-400 shadow-secondary hover:shadow-glow-md transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Gestionar Documentos
                  </Button>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
