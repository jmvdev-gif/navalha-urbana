"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  SERVICES,
  BARBERS,
  AVAILABLE_SLOTS,
  Service,
  Barber,
} from "@/lib/data";
import {
  Scissors,
  User,
  Calendar as CalendarIcon,
  Clock,
  Mail,
  Phone,
  Pencil,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { SuccessModal } from "./SuccessModal";

interface BookingViewProps {
  initialService?: Service;
  initialBarber?: Barber;
  onClose: () => void;
}

const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const WEEKDAY_NAMES_SHORT = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

export const BookingView: React.FC<BookingViewProps> = ({
  initialService,
  initialBarber,
  onClose,
}) => {
  const [selectedService, setSelectedService] = useState<Service>(
    initialService || SERVICES[0]
  );
  const [selectedBarber, setSelectedBarber] = useState<Barber>(
    initialBarber || BARBERS[0]
  );

  // Dynamic Date & Time State
  const today = new Date();
  const [viewDate, setViewDate] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("14:00");

  // User form details
  const [name, setName] = useState<string>("João da Silva");
  const [phone, setPhone] = useState<string>("(11) 99999-9999");
  const [email, setEmail] = useState<string>("joao@exemplo.com");

  // Selection modal state for changing barber/service
  const [isChangingService, setIsChangingService] = useState(false);
  const [isChangingBarber, setIsChangingBarber] = useState(false);

  // Confirmation modal state
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Current View Month & Year
  const currentMonthIndex = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const currentMonthName = MONTH_NAMES[currentMonthIndex];

  // Calendar calculations for viewDate
  const firstDayOfWeekIndex = new Date(currentYear, currentMonthIndex, 1).getDay();
  const totalDaysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

  // Navigation Month handlers
  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonthIndex - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonthIndex + 1, 1));
  };

  // Generate mobile 7 upcoming day chips starting from today
  const mobileDaysList = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      dateObj: d,
      dayName: WEEKDAY_NAMES_SHORT[d.getDay()],
      dayNum: d.getDate(),
      fullFormatted: `${d.getDate()} de ${MONTH_NAMES[d.getMonth()].slice(0, 3)}, ${d.getFullYear()}`,
    };
  });

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const formattedSelectedDate = `${selectedDate.getDate()} de ${MONTH_NAMES[selectedDate.getMonth()].slice(0, 3)}, ${selectedDate.getFullYear()}`;

  const handleConfirmBooking = () => {
    if (!name.trim()) {
      alert("Por favor, preencha o seu nome completo.");
      return;
    }
    if (!phone.trim()) {
      alert("Por favor, informe seu telefone ou WhatsApp.");
      return;
    }
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-4 pb-28 md:pb-20">
      {/* Top Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 border-b border-zinc-800/80">
          <div
            onClick={onClose}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-zinc-950 transition-all">
              <Scissors className="w-4 h-4 -rotate-45" />
            </div>
            <span className="font-bold tracking-wider text-lg sm:text-xl text-white font-sans uppercase">
              NAVALHA URBANA
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest text-zinc-300">
              <span
                onClick={onClose}
                className="hover:text-brand-gold cursor-pointer transition-colors"
              >
                Serviços
              </span>
              <span
                onClick={onClose}
                className="hover:text-brand-gold cursor-pointer transition-colors"
              >
                Profissionais
              </span>
              <span
                onClick={onClose}
                className="hover:text-brand-gold cursor-pointer transition-colors"
              >
                Galeria
              </span>
            </nav>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors"
              title="Fechar Agendamento"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Page Title */}
        <div className="my-8 md:my-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-sans">
            <span className="hidden md:inline">
              Confirme Seu Horário na Navalha Urbana
            </span>
            <span className="md:hidden">Confirme Seu Horário</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-normal">
            <span className="hidden md:inline">
              Complete os detalhes abaixo para garantir seu atendimento.
            </span>
            <span className="md:hidden">
              Revise os detalhes e finalize seu agendamento.
            </span>
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Details, Date/Time, User Form) */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. RESUMO DA SELEÇÃO */}
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 md:hidden">
                RESUMO DA SELEÇÃO
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Service Card */}
                <div
                  onClick={() => setIsChangingService(true)}
                  className="relative p-5 rounded-2xl bg-[#141416] border border-zinc-800/90 hover:border-brand-gold/50 cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-1">
                        SERVIÇO
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-gold transition-colors">
                        {selectedService.name}
                      </h3>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-brand-gold group-hover:border-brand-gold/40">
                      <Scissors className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 my-3 leading-relaxed hidden sm:block">
                    {selectedService.description}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-zinc-800/60">
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {selectedService.duration}
                    </span>
                    <span className="text-lg font-extrabold text-brand-gold">
                      R$ {selectedService.price}
                    </span>
                  </div>
                </div>

                {/* Barber Card */}
                <div
                  onClick={() => setIsChangingBarber(true)}
                  className="relative p-5 rounded-2xl bg-[#141416] border border-zinc-800/90 hover:border-brand-gold/50 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-gold/40 flex-shrink-0">
                      <Image
                        src={selectedBarber.imageUrl}
                        alt={selectedBarber.name}
                        fill
                        className="object-cover grayscale contrast-125"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-0.5">
                        PROFISSIONAL
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-brand-gold transition-colors">
                        {selectedBarber.name}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                        {selectedBarber.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    className="p-2 rounded-lg text-zinc-400 hover:text-brand-gold bg-zinc-900 border border-zinc-800 group-hover:border-brand-gold/30 transition-colors"
                    title="Alterar Profissional"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* 2. DATA E HORA DYNÂMICO */}
            <section className="p-6 rounded-2xl bg-[#141416] border border-zinc-800/90 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <CalendarIcon className="w-5 h-5 text-brand-gold" />
                  <h2 className="text-lg font-bold text-white font-sans">
                    Data e Hora
                  </h2>
                </div>
                <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider">
                  {currentMonthName} {currentYear}
                </span>
              </div>

              {/* Desktop Calendar + Time Slots Split */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Desktop Dynamic Calendar Grid */}
                <div className="hidden md:block md:col-span-6 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={handlePrevMonth}
                      className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      title="Mês Anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {currentMonthName} {currentYear}
                    </span>
                    <button
                      onClick={handleNextMonth}
                      className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      title="Próximo Mês"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Calendar Weekday Names */}
                  <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-zinc-500 mb-2">
                    <span>D</span>
                    <span>S</span>
                    <span>T</span>
                    <span>Q</span>
                    <span>Q</span>
                    <span>S</span>
                    <span>S</span>
                  </div>

                  {/* Dynamic Days Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {/* Empty Day Offsets */}
                    {Array.from({ length: firstDayOfWeekIndex }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="h-8" />
                    ))}

                    {/* Active Month Days */}
                    {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
                      const dayNumber = idx + 1;
                      const thisDayDate = new Date(
                        currentYear,
                        currentMonthIndex,
                        dayNumber
                      );
                      const isSelected = isSameDay(thisDayDate, selectedDate);
                      const isPast =
                        thisDayDate <
                        new Date(today.getFullYear(), today.getMonth(), today.getDate());

                      return (
                        <button
                          key={dayNumber}
                          disabled={isPast}
                          onClick={() => setSelectedDate(thisDayDate)}
                          className={`h-8 rounded-lg flex items-center justify-center transition-all ${
                            isPast
                              ? "opacity-25 text-zinc-600 cursor-not-allowed"
                              : isSelected
                              ? "border border-brand-gold text-brand-gold font-bold bg-brand-gold/10 gold-glow-sm"
                              : "text-zinc-300 hover:bg-zinc-800"
                          }`}
                        >
                          {dayNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Horizontal Day Selector Chips */}
                <div className="md:hidden flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                  {mobileDaysList.map((item) => {
                    const isSelected = isSameDay(item.dateObj, selectedDate);
                    return (
                      <button
                        key={item.fullFormatted}
                        onClick={() => {
                          setSelectedDate(item.dateObj);
                          setViewDate(
                            new Date(
                              item.dateObj.getFullYear(),
                              item.dateObj.getMonth(),
                              1
                            )
                          );
                        }}
                        className={`flex-1 min-w-[76px] py-3.5 px-4 rounded-xl border flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? "border-brand-gold bg-brand-gold/10 text-white gold-glow-sm"
                            : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          {item.dayName}
                        </span>
                        <span
                          className={`text-xl font-bold mt-0.5 ${
                            isSelected ? "text-white" : "text-zinc-200"
                          }`}
                        >
                          {item.dayNum}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots Grid */}
                <div className="md:col-span-6 space-y-3">
                  <span className="text-xs font-semibold text-zinc-400 block">
                    Horários Disponíveis
                  </span>
                  <div className="grid grid-cols-3 gap-2.5">
                    {AVAILABLE_SLOTS.map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      const isDisabled = slot === "11:00"; // Sample unavailable slot
                      return (
                        <button
                          key={slot}
                          disabled={isDisabled}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2.5 px-3 rounded-lg text-xs font-bold tracking-wider transition-all border ${
                            isDisabled
                              ? "opacity-30 border-zinc-800/40 text-zinc-600 line-through cursor-not-allowed"
                              : isSelected
                              ? "border-brand-gold bg-brand-gold/10 text-brand-gold gold-glow-sm"
                              : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* 3. SEUS DADOS */}
            <section className="p-6 rounded-2xl bg-[#141416] border border-zinc-800/90 space-y-5">
              <div className="flex items-center space-x-2.5">
                <User className="w-5 h-5 text-brand-gold" />
                <h2 className="text-lg font-bold text-white font-sans">
                  Seus Dados
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1.5">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: João da Silva"
                      className="w-full bg-[#0B0B0C] border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1.5">
                      Telefone / WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-500" />
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(11) 90000-0000"
                        className="w-full bg-[#0B0B0C] border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1.5">
                      E-mail (Opcional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="joao@exemplo.com"
                        className="w-full bg-[#0B0B0C] border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-gold transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (Desktop Sticky Summary Card) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="p-6 rounded-2xl bg-[#141416] border border-zinc-800/90 shadow-xl space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white border-b border-zinc-800 pb-4">
                FINALIZAÇÃO E PAGAMENTO
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Serviço</span>
                  <span className="font-semibold text-white">
                    {selectedService.name}
                  </span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Profissional</span>
                  <span className="font-semibold text-white">
                    {selectedBarber.name}
                  </span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Data</span>
                  <span className="font-semibold text-white">
                    {formattedSelectedDate}
                  </span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Horário</span>
                  <span className="font-semibold text-white">
                    {selectedTimeSlot}
                  </span>
                </div>

                <div className="border-t border-zinc-800 pt-4 flex justify-between items-center text-base font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-2xl text-brand-gold">
                    R$ {selectedService.price}
                  </span>
                </div>
              </div>

              {/* Desktop Confirm Button */}
              <div className="hidden lg:block pt-2">
                <button
                  onClick={handleConfirmBooking}
                  className="w-full bg-brand-gold hover:bg-brand-gold-hover text-zinc-950 font-extrabold text-sm uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-between shadow-lg shadow-brand-gold/15 transition-all transform active:scale-98"
                >
                  <span>Confirmar Agendamento</span>
                  <span>R$ {selectedService.price}</span>
                </button>
                <p className="text-[11px] text-zinc-500 text-center mt-3">
                  Pagamento no local.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer Confirm Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/95 to-transparent backdrop-blur-md">
        <button
          onClick={handleConfirmBooking}
          className="w-full bg-brand-gold hover:bg-brand-gold-hover text-zinc-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-between shadow-xl shadow-brand-gold/25 transform active:scale-98 transition-all"
        >
          <span>CONFIRMAR AGENDAMENTO</span>
          <span>R$ {selectedService.price}</span>
        </button>
      </div>

      {/* Change Service Drawer/Modal */}
      {isChangingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#141416] border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white">
                Selecione o Serviço
              </h3>
              <button
                onClick={() => setIsChangingService(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    setSelectedService(s);
                    setIsChangingService(false);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                    selectedService.id === s.id
                      ? "border-brand-gold bg-brand-gold/10"
                      : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-white">{s.name}</h4>
                    <p className="text-xs text-zinc-400 mt-1">{s.duration}</p>
                  </div>
                  <span className="text-base font-bold text-brand-gold">
                    R$ {s.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Change Barber Drawer/Modal */}
      {isChangingBarber && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#141416] border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white">
                Selecione o Profissional
              </h3>
              <button
                onClick={() => setIsChangingBarber(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {BARBERS.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    setSelectedBarber(b);
                    setIsChangingBarber(false);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center space-x-4 ${
                    selectedBarber.id === b.id
                      ? "border-brand-gold bg-brand-gold/10"
                      : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-brand-gold/40 flex-shrink-0">
                    <Image
                      src={b.imageUrl}
                      alt={b.name}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{b.name}</h4>
                    <p className="text-xs text-brand-gold font-semibold">
                      {b.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Success Confirmation Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          onClose();
        }}
        bookingDetails={{
          service: selectedService,
          barber: selectedBarber,
          date: formattedSelectedDate,
          time: selectedTimeSlot,
          userName: name,
          userPhone: phone,
        }}
      />
    </div>
  );
};
