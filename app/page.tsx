'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [guestCount, setGuestCount] = useState('1')
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Definir altura da janela
    setWindowHeight(window.innerHeight)

    // Criar elemento de áudio
    const audio = new Audio('/musica.mp3') // Adicione seu arquivo de música aqui
    audio.loop = true
    audio.volume = 0.2
    setAudioElement(audio)
    
    // Iniciar música automaticamente
    audio.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {
      // Navegador bloqueou autoplay - usuário terá que clicar
      setIsPlaying(false)
    })

    // Registrar Service Worker para PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Falha silenciosa
      })
    }

    // Parallax effect
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (audio) {
        audio.pause()
      }
    }
  }, [])

  const scrollToContent = () => {
    const nextSection = document.getElementById('main-content')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleMusic = () => {
    if (!audioElement) return
    
    if (isPlaying) {
      audioElement.pause()
      setIsPlaying(false)
    } else {
      audioElement.play().catch(() => {
        // Falha silenciosa se navegador bloquear autoplay
      })
      setIsPlaying(true)
    }
  }

  // Dados da festa
  const eventData = {
    name: 'Isís',
    age: 1,
    date: '16 de Novembro de 2025',
    time: '14h00',
    location: 'Kuramoto Fest',
    address: 'Av. Paulo Corrêa da Costa, 636 - Jardim Leblon',
    mapsUrl: 'https://maps.app.goo.gl/zb7XqpArA5SEhuWP9',
    whatsapp: '5567992005494',
    whatsappMessage: 'Olá! Confirmo minha presença no aniversário da Isís! 🍒',
  }

  const handleWhatsAppClick = () => {
    setShowModal(true)
  }

  const handleConfirmPresence = () => {
    if (!guestName.trim()) {
      alert('Por favor, digite seu nome!')
      return
    }

    // Emojis no início e fim funcionam melhor
    const message = `*CONFIRMACAO DE PRESENCA*\n\n` +
      `Nome: *${guestName}*\n` +
      `Pessoas: *${guestCount}*\n\n` +
      `Evento: *Aniversario de 1 ano da ${eventData.name}*\n` +
      `Data: Domingo, ${eventData.date}\n` +
      `Horario: ${eventData.time}\n` +
      `Local: ${eventData.location}\n\n` +
      `Confirmo minha presenca!\n`
      
    const url = `https://wa.me/${eventData.whatsapp}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    
    // Fechar modal após enviar
    setTimeout(() => {
      setShowModal(false)
      setGuestName('')
      setGuestCount('1')
    }, 500)
  }

  const handleMapsClick = () => {
    window.open(eventData.mapsUrl, '_blank')
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Player de Música Flutuante */}
      <div className="fixed bottom-4 right-4 z-[90]">
        <button
          onClick={toggleMusic}
          className="group relative w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-[#fdabbb]"
          aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
        >
          {/* Ícone de Autofalante */}
          {isPlaying ? (
            <svg className="w-5 h-5 text-[#e54a66]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 text-[#e54a66]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          )}
        </button>
        
        {/* Tooltip discreto */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-[#e54a66] text-white text-[10px] font-medium px-2 py-1 rounded shadow-md whitespace-nowrap">
            {isPlaying ? 'Pausar' : 'Música'}
          </div>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          {/* Backdrop com transparência */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-300/40 via-rose-300/40 to-pink-400/40 backdrop-blur-md"></div>
          
          {/* Modal Content */}
          <div 
            className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-sm w-full p-6 animate-scale-in border-2 border-rose-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão fechar */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-rose-100/80 hover:bg-rose-200 transition-all hover:rotate-90 duration-300"
            >
              <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-5">
              <div className="flex justify-center mb-3">
                <Cherry size={70} />
              </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#e54a66] mb-1">
              Confirmar Presença
            </h2>
            <p className="text-gray-500 text-xs">
              Preencha os dados para confirmar via WhatsApp
            </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Nome */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#e54a66] mb-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  Seu Nome:
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Digite seu nome"
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#fdabbb] focus:border-[#e54a66] focus:outline-none focus:ring-2 focus:ring-[#fdabbb]/50 transition-all text-gray-700 text-sm placeholder-gray-400 bg-white/80"
                />
              </div>

              {/* Quantidade de pessoas */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#e54a66] mb-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                  Quantas pessoas?
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-[#fdabbb] focus:border-[#e54a66] focus:outline-none focus:ring-2 focus:ring-[#fdabbb]/50 transition-all text-gray-700 text-sm bg-white/80"
                >
                  <option value="1">1 pessoa</option>
                  <option value="2">2 pessoas</option>
                  <option value="3">3 pessoas</option>
                  <option value="4">4 pessoas</option>
                  <option value="5">5 pessoas</option>
                  <option value="6+">Mais de 5 pessoas</option>
                </select>
              </div>

              {/* Botão Confirmar */}
              <button
                onClick={handleConfirmPresence}
                className="w-full bg-gradient-to-r from-[#e54a66] to-[#ff2f63] hover:from-[#ff2f63] hover:to-[#e54a66] text-white font-semibold text-base py-3.5 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Enviar no WhatsApp
              </button>
            </div>

            {/* Footer */}
            <div className="mt-5 flex justify-center gap-1.5">
              <Cherry size={22} />
              <Cherry size={26} />
              <Cherry size={22} />
            </div>
          </div>
        </div>
      )}

      {/* Seção 0: Capa do Convite - Envelope */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdebf2]/95 via-white/90 to-[#fdebf2]/95 relative overflow-hidden px-4 py-8 border-b-4 border-dashed border-[#fdabbb]">
        {/* Layer de fundo com parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <ConfettiEffect />
        </div>
        
        <div 
          className="w-full h-full flex flex-col items-center justify-center relative z-10"
          style={{
            transform: `translateY(${scrollY * 0.3}px) scale(${1 - scrollY * 0.0003})`,
            opacity: Math.max(0, 1 - scrollY * 0.002),
            transition: 'transform 0.1s ease-out',
          }}
        >
          {/* Envelope Container */}
          <div className="relative max-w-md w-full animate-scale-in">

            {/* Corpo do Envelope (Card principal) */}
            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border-4 border-[#fdabbb]">
              
              {/* Cerejas nos 4 cantos */}
              <div className="absolute -top-3 -left-3">
                <Cherry size={30} />
              </div>
              <div className="absolute -top-3 -right-3">
                <Cherry size={30} />
              </div>
              <div className="absolute -bottom-3 -left-3">
                <Cherry size={30} />
              </div>
              <div className="absolute -bottom-3 -right-3">
                <Cherry size={30} />
              </div>

              {/* Detalhes de borda interna do envelope */}
              <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-dashed border-[#fdabbb]/60 rounded-xl pointer-events-none"></div>

              {/* Conteúdo do convite */}
              <div className="relative z-10 text-center">
                {/* Cereja central */}
                <div className="flex justify-center mb-6 animate-float">
                  <Cherry size={90} />
                </div>

                {/* Título "Convite" */}
                <h1 className="font-display text-5xl md:text-6xl font-bold text-[#e54a66] mb-2 tracking-wide">
                  Convite
                </h1>
                
                {/* Subtítulo "Especial" */}
                <p className="font-display text-3xl md:text-4xl text-[#ff2f63] italic mb-6">
                  Especial
                </p>

                {/* Linha decorativa */}
                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#ecbe09] to-transparent mx-auto mb-6"></div>

                {/* Flores decorativas */}
                <div className="flex justify-center items-center gap-3 mb-2">
                  <span className="text-[#fdabbb] text-xl">✿</span>
                  <span className="text-[#ecbe09] text-2xl">❀</span>
                  <span className="text-[#fdabbb] text-xl">✿</span>
                </div>
              </div>

              {/* Detalhes decorativos nos cantos */}
              <div className="absolute top-6 left-6 text-[#fdabbb] text-xl opacity-50">❀</div>
              <div className="absolute bottom-6 right-6 text-[#ecbe09] text-xl opacity-50">❀</div>
            </div>
          </div>

          {/* Texto instrucional */}
          <div 
            onClick={scrollToContent}
            className="mt-20 md:mt-24 text-[#e54a66] font-bold text-xl md:text-2xl animate-bounce text-center cursor-pointer hover:text-[#ff2f63] transition-colors"
          >
            <p className="uppercase tracking-wider mb-1">Deslize para abrir</p>
            <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <div id="main-content">
        {/* Seção 1: Nome e Idade */}
        <section 
          id="section-1"
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdebf2]/95 via-white/90 to-[#fdebf2]/95 relative overflow-hidden px-4 py-8 border-b-4 border-dashed border-[#fdabbb]"
        >
          {/* Pétalas de cereja flutuantes em todas as seções */}
          <div className="absolute inset-0 z-0">
            <FloatingDecorations />
          </div>
          
          <div className="relative z-10 text-center animate-slide-up">
            {/* Texto de boas-vindas */}
            <div className="mb-10 flex justify-center px-4">
              <div className="relative max-w-md w-full">
                {/* Box retangular estilo envelope */}
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-6 shadow-2xl border-4 border-[#fdabbb]">
                  
                  {/* Cerejas nos 4 cantos */}
                  <div className="absolute -top-2 -left-2">
                    <Cherry size={24} />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Cherry size={24} />
                  </div>
                  <div className="absolute -bottom-2 -left-2">
                    <Cherry size={24} />
                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <Cherry size={24} />
                  </div>

                  {/* Borda interna tracejada */}
                  <div className="absolute top-3 left-3 right-3 bottom-3 border-2 border-dashed border-[#fdabbb]/60 rounded-xl pointer-events-none"></div>

                  {/* Conteúdo */}
                  <div className="relative z-10 text-center">
                    <p className="font-display text-xl md:text-2xl font-bold text-[#e54a66] leading-tight mb-2">
                      A nossa cerejinha está
                    </p>
                    <p className="font-display text-2xl md:text-3xl font-black text-[#ff2f63] leading-tight mb-3">
                      fazendo 1 aninho!
                    </p>
                    
                    {/* Linha decorativa dourada */}
                    <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#ecbe09] to-transparent mx-auto mb-3"></div>
                    
                    <p className="font-display text-lg md:text-xl font-semibold text-[#e54a66] italic">
                      Venha comemorar conosco! 🍒
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Foto da Aniversariante */}
            <div className="mb-10 flex justify-center">
              <div className="relative">
                {/* Anel brilhante externo */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e54a66]/40 via-[#ff2f63]/40 to-[#ecbe09]/40 rounded-full blur-2xl scale-110 animate-pulse-soft"></div>
                
                {/* Container da foto */}
                <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-[#e54a66] via-[#ff2f63] to-[#e54a66] p-1 shadow-2xl">
                  {/* Anel branco fino */}
                  <div className="w-full h-full rounded-full bg-white p-0.2">
                    {/* Foto */}
                    <div className="w-full h-full rounded-full overflow-hidden shadow-xl">
                      <img src="/isis.png" alt="Isís" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  {/* Brilho superior */}
                  <div className="absolute top-4 left-8 w-16 h-12 bg-white/40 rounded-full blur-xl pointer-events-none"></div>
                </div>
                
                {/* Cerejas decorativas ao redor */}
                <div className="absolute -top-4 -right-6 animate-float">
                  <Cherry size={50} />
                </div>
                <div className="absolute -bottom-2 -left-6 animate-float" style={{ animationDelay: '1s' }}>
                  <Cherry size={45} />
                </div>
                
                {/* Flores delicadas */}
                <div className="absolute top-8 -left-8 text-4xl opacity-80 animate-float" style={{ animationDelay: '0.5s' }}>
                  🌸
                </div>
                <div className="absolute bottom-12 -right-8 text-3xl opacity-80 animate-float" style={{ animationDelay: '1.5s' }}>
                  🌸
                </div>
                
                {/* Estrelinhas douradas */}
                <div className="absolute top-2 left-2 text-2xl opacity-90 animate-pulse-soft">
                  ✨
                </div>
                <div className="absolute bottom-4 right-4 text-xl opacity-90 animate-pulse-soft" style={{ animationDelay: '1s' }}>
                  ✨
                </div>
              </div>
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-bold text-[#e54a66] mb-8 drop-shadow-md tracking-tight">
              {eventData.name}
            </h1>
            
            <div className="relative inline-flex items-center justify-center mb-2">
              {/* Balão com design moderno */}
              <div className="relative bg-white/95 backdrop-blur-md rounded-full px-12 py-6 shadow-2xl border-2 border-[#fdabbb]">
                {/* Brilho sutil */}
                <div className="absolute top-3 left-6 w-12 h-8 bg-gradient-to-br from-white/80 to-transparent rounded-full blur-sm"></div>
                
                <div className="flex items-center gap-4">
                  <span className="text-8xl md:text-9xl font-black text-[#e54a66] leading-none">
                    {eventData.age}
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-[#ff2f63] uppercase tracking-wide">
                    ANINHO
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-3">
              <Cherry size={50} />
              <Cherry size={60} />
              <Cherry size={50} />
            </div>

            <div className="mt-8 flex flex-col items-center">
              <div 
                onClick={() => scrollToSection('section-2')}
                className="text-[#e54a66] font-semibold text-xs md:text-sm animate-bounce text-center cursor-pointer hover:text-[#ff2f63] transition-colors"
              >
                <p className="uppercase tracking-wider mb-1">Deslize para ver mais</p>
                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2: Detalhes da Festa */}
        <section 
          id="section-2"
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdebf2]/95 via-white/90 to-[#fdebf2]/95 relative overflow-hidden px-4 py-8 border-b-4 border-dashed border-[#fdabbb]"
        >
          {/* Pétalas de cereja flutuantes */}
          <div className="absolute inset-0 z-0">
            <FloatingDecorations />
          </div>
          <div 
            className="relative z-10 w-full max-w-lg mx-auto my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-4 border-[#fdabbb]">
              <div className="text-center mb-6">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#e54a66] mb-2">
                  Você está convidado!
                </h2>
                <div className="flex justify-center gap-2 mt-3">
                  <Cherry size={30} />
                  <Cherry size={30} />
                  <Cherry size={30} />
                </div>
              </div>

              {/* Data e Hora */}
              <div className="mb-4 sm:mb-5 md:mb-6 bg-gradient-to-r from-[#fdebf2] to-white rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-[#fdabbb]">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#e54a66] to-[#ff2f63] rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#e54a66] mb-1">Quando?</h3>
                    <p className="text-gray-700 font-semibold">Domingo, {eventData.date}</p>
                    <p className="text-[#ff2f63] font-bold text-lg">{eventData.time}</p>
                  </div>
                </div>
              </div>

              {/* Local */}
              <div 
                className="mb-4 sm:mb-5 md:mb-6 bg-gradient-to-r from-[#fdebf2] to-white rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-[#fdabbb] cursor-pointer hover:scale-105 transition-transform active:scale-95"
                onClick={handleMapsClick}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#e54a66] to-[#ff2f63] rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#e54a66] mb-1">Onde?</h3>
                    <p className="text-gray-700 font-semibold">{eventData.location}</p>
                    <p className="text-gray-600 text-sm">{eventData.address}</p>
                    <p className="text-[#ff2f63] text-sm mt-2 font-semibold underline">Toque para abrir no mapa →</p>
                  </div>
                </div>
              </div>

              {/* Presentes */}
              <div className="mb-4 sm:mb-5 md:mb-6 bg-gradient-to-r from-[#fdebf2] to-white rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-[#fdabbb]">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#e54a66] to-[#ff2f63] rounded-full flex items-center justify-center shadow-lg">
                    <GiftBox size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#e54a66] mb-1">Presente</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Sua presença já é o maior presente! Caso queira mimar a Isís, nossa sugestão são roupinhas de (2-3 anos) e brinquedos 🍒
                    </p>
                  </div>
                </div>
              </div>

              {/* Botão WhatsApp */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-gradient-to-r from-[#e54a66] to-[#ff2f63] hover:from-[#ff2f63] hover:to-[#e54a66] text-white font-bold text-lg sm:text-xl py-4 sm:py-5 px-6 rounded-full shadow-2xl hover:shadow-[#fdabbb] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Confirmar Presença
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-[#e54a66] via-[#ff2f63] to-[#e54a66] py-3 px-4 text-center border-t-4 border-[#e54a66]">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-white font-semibold text-sm">
              Feito com muito carinho 🤍
            </p>
            <a 
              href="https://www.instagram.com/vexelmkt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/90 hover:text-white text-xs font-medium transition-colors hover:underline"
            >
              Desenvolvido por Vexel Agency
            </a>
          </div>
        </footer>
      </div>
    </main>
  )
}

// Componente: Efeito de explosão de cerejas, flores e laços contínuo
function ConfettiEffect() {
  // Posições fixas (não aleatórias) para evitar erro de hidratação
  const confetti = [
    // Cerejas - Anel 1
    { endX: '50%', endY: '5%', type: 'cherry', delay: 0 },
    { endX: '75%', endY: '15%', type: 'cherry', delay: 0.1 },
    { endX: '90%', endY: '35%', type: 'flower', delay: 0.2 },
    { endX: '85%', endY: '60%', type: 'bow', delay: 0.3 },
    { endX: '70%', endY: '85%', type: 'cherry', delay: 0.4 },
    { endX: '45%', endY: '92%', type: 'flower', delay: 0.5 },
    { endX: '20%', endY: '85%', type: 'cherry', delay: 0.6 },
    { endX: '8%', endY: '60%', type: 'bow', delay: 0.7 },
    { endX: '12%', endY: '35%', type: 'flower', delay: 0.8 },
    { endX: '25%', endY: '12%', type: 'cherry', delay: 0.9 },
    
    // Anel 2
    { endX: '60%', endY: '10%', type: 'flower', delay: 0.15 },
    { endX: '82%', endY: '25%', type: 'cherry', delay: 0.25 },
    { endX: '92%', endY: '50%', type: 'bow', delay: 0.35 },
    { endX: '78%', endY: '75%', type: 'flower', delay: 0.45 },
    { endX: '52%', endY: '88%', type: 'cherry', delay: 0.55 },
    { endX: '28%', endY: '78%', type: 'bow', delay: 0.65 },
    { endX: '15%', endY: '48%', type: 'cherry', delay: 0.75 },
    { endX: '22%', endY: '22%', type: 'flower', delay: 0.85 },
    
    // Anel 3
    { endX: '42%', endY: '6%', type: 'bow', delay: 0.2 },
    { endX: '68%', endY: '8%', type: 'cherry', delay: 0.3 },
    { endX: '88%', endY: '30%', type: 'flower', delay: 0.4 },
    { endX: '90%', endY: '65%', type: 'cherry', delay: 0.5 },
    { endX: '62%', endY: '90%', type: 'bow', delay: 0.6 },
    { endX: '35%', endY: '90%', type: 'flower', delay: 0.7 },
    { endX: '10%', endY: '65%', type: 'cherry', delay: 0.8 },
    { endX: '12%', endY: '28%', type: 'bow', delay: 0.9 },
    
    // Extras
    { endX: '95%', endY: '20%', type: 'cherry', delay: 0.12 },
    { endX: '85%', endY: '48%', type: 'flower', delay: 0.22 },
    { endX: '72%', endY: '82%', type: 'cherry', delay: 0.32 },
    { endX: '38%', endY: '8%', type: 'bow', delay: 0.42 },
    { endX: '18%', endY: '40%', type: 'flower', delay: 0.52 },
    { endX: '28%', endY: '88%', type: 'cherry', delay: 0.62 },
    { endX: '55%', endY: '18%', type: 'flower', delay: 0.17 },
    { endX: '92%', endY: '42%', type: 'bow', delay: 0.27 },
    { endX: '65%', endY: '78%', type: 'cherry', delay: 0.37 },
    { endX: '32%', endY: '25%', type: 'flower', delay: 0.47 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[60]">
      {confetti.map((item, index) => (
        <div
          key={index}
          className="absolute animate-confetti-explosion-infinite opacity-70"
          style={{
            '--target-x': item.endX,
            '--target-y': item.endY,
            animationDelay: `${item.delay}s`,
          } as React.CSSProperties}
        >
          {item.type === 'cherry' ? (
            <Cherry size={27} />
          ) : item.type === 'flower' ? (
            <span className="text-3xl">🍒</span>
          ) : (
            <span className="text-3xl">🍒</span>
          )}
        </div>
      ))}
    </div>
  )
}

// Componente: Pétalas de cereja flutuantes (efeito sakura)
function FloatingDecorations() {
  const [petals, setPetals] = useState<Array<{ id: number; x: number; scale: number; delay: number; duration: number }>>([])

  useEffect(() => {
    const petalCount = 20
    const generatedPetals = []
    
    for (let i = 0; i < petalCount; i++) {
      generatedPetals.push({
        id: i,
        x: (i / petalCount) * 100,
        scale: Math.random() * 0.6 + 0.3,
        delay: -(Math.random() * 5000),
        duration: Math.random() * 90000 + 30000,
      })
    }
    
    setPetals(generatedPetals)
  }, [])

  return (
    <>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="falling-petal"
          style={{
            left: `${petal.x}vw`,
            animationDelay: `${petal.delay}ms`,
            animationDuration: `${petal.duration}ms`,
            '--petal-scale': petal.scale,
          } as React.CSSProperties}
        >
          <div className="petal-rotate">
            <div className="petal-drift">
              <span className="text-2xl">🍒</span>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

// Componente: Caixa de presente (SVG branco para círculo rosa)
function GiftBox({ size = 30 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Caixa base */}
      <rect x="3" y="10" width="18" height="11" rx="1" stroke="white" fill="none"/>
      {/* Tampa */}
      <path d="M3 10 L21 10 L21 7 L3 7 Z" stroke="white" fill="none"/>
      {/* Fita vertical */}
      <line x1="12" y1="7" x2="12" y2="21" stroke="white" strokeWidth="2"/>
      {/* Fita horizontal */}
      <line x1="3" y1="13" x2="21" y2="13" stroke="white" strokeWidth="2"/>
      {/* Laço decorativo simples */}
      <path d="M12 4 Q9 5, 8 3" stroke="white" strokeWidth="1.5" fill="none"/>
      <path d="M12 4 Q15 5, 16 3" stroke="white" strokeWidth="1.5" fill="none"/>
    </svg>
  )
}

// Cherry SVG Component (atualizado com cores mais suaves)
function Cherry({ size = 50 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Stem */}
      <path 
        d="M50 10 Q45 25, 40 35" 
        stroke="#4a7c59" 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M50 10 Q55 25, 65 32" 
        stroke="#4a7c59" 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Leaf */}
      <ellipse 
        cx="52" 
        cy="8" 
        rx="8" 
        ry="4" 
        fill="#86efac"
        transform="rotate(-20 52 8)"
      />
      
      {/* Left Cherry */}
      <circle cx="40" cy="65" r="20" fill="#f43f5e" />
      <circle cx="40" cy="65" r="20" fill="url(#cherry-gradient)" />
      <ellipse 
        cx="35" 
        cy="60" 
        rx="6" 
        ry="4" 
        fill="white" 
        opacity="0.5"
        transform="rotate(-30 35 60)"
      />
      
      {/* Right Cherry */}
      <circle cx="68" cy="60" r="18" fill="#f43f5e" />
      <circle cx="68" cy="60" r="18" fill="url(#cherry-gradient)" />
      <ellipse 
        cx="64" 
        cy="56" 
        rx="5" 
        ry="3" 
        fill="white" 
        opacity="0.5"
        transform="rotate(-30 64 56)"
      />
      
      <defs>
        <radialGradient id="cherry-gradient">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#f43f5e" />
        </radialGradient>
      </defs>
    </svg>
  )
}

