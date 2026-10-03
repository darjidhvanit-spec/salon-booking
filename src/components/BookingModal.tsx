import { useState, useEffect } from 'react';
import type { FC, FormEvent } from 'react';
import {
  X,
  Scissors,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';
import type { Service, Barber, BookingFormData } from '../types';
import { useServices, useBarbers, useCreateBooking } from '../services/api';
import { TIME_SLOTS } from '../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: Service | null;
}

export const BookingModal: FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedService,
}) => {
  const { data: services } = useServices();
  const { data: barbers } = useBarbers();
  const createBooking = useCreateBooking();

  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  useEffect(() => {
    if (preSelectedService) {
      setSelectedService(preSelectedService);
      setStep(2);
    } else if (services && services.length > 0 && !selectedService) {
      setSelectedService(services[0]);
    }
  }, [preSelectedService, services]);

  useEffect(() => {
    if (barbers && barbers.length > 0 && !selectedBarber) {
      setSelectedBarber(barbers[0]);
    }
    // Set default date to tomorrow
    if (!selectedDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [barbers, selectedDate]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedBarber || !selectedDate || !selectedTime) return;

    const payload: BookingFormData = {
      serviceId: selectedService.id,
      barberId: selectedBarber.id,
      date: selectedDate,
      time: selectedTime,
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes,
    };

    createBooking.mutate(payload, {
      onSuccess: (data) => {
        setConfirmedBookingId(data.id);
        setStep(5);
      },
    });
  };

  const handleReset = () => {
    setStep(1);
    setConfirmedBookingId(null);
    setFormData({ customerName: '', email: '', phone: '', notes: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#faf8f5] border border-stone-300 w-full max-w-2xl overflow-hidden shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="bg-[#121212] text-white px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-[#c59b27] -rotate-45" />
            <h3 className="text-sm font-bold tracking-widest uppercase font-serif">
              {step === 5 ? 'Booking Confirmed' : 'Book Your Appointment'}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator */}
        {step < 5 && (
          <div className="bg-[#f5f1ea] px-6 py-3 border-b border-stone-200/80 flex items-center justify-between text-[11px] font-bold tracking-wider text-stone-600">
            <span className={step === 1 ? 'text-[#b8860b]' : ''}>1. SERVICE</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className={step === 2 ? 'text-[#b8860b]' : ''}>2. BARBER</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className={step === 3 ? 'text-[#b8860b]' : ''}>3. TIME</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className={step === 4 ? 'text-[#b8860b]' : ''}>4. DETAILS</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-base font-serif font-bold text-stone-900">
                Select Your Service
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services?.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    className={`p-4 border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedService?.id === srv.id
                        ? 'border-[#c59b27] bg-[#fdfbf7] shadow-sm'
                        : 'border-stone-200 bg-white hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={srv.image}
                      alt={srv.name}
                      className="w-14 h-14 object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold uppercase tracking-wider text-stone-900">
                        {srv.name}
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">{srv.duration}</div>
                      <div className="text-sm font-extrabold text-[#b8860b] mt-1 font-serif">
                        ${srv.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Barber */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-base font-serif font-bold text-stone-900">
                Choose Your Master Barber
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {barbers?.map((barber) => (
                  <div
                    key={barber.id}
                    onClick={() => setSelectedBarber(barber)}
                    className={`p-4 border cursor-pointer transition-all flex items-start gap-4 ${
                      selectedBarber?.id === barber.id
                        ? 'border-[#c59b27] bg-[#fdfbf7] shadow-sm'
                        : 'border-stone-200 bg-white hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={barber.image}
                      alt={barber.name}
                      className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-stone-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-stone-900">
                        {barber.name}
                      </div>
                      <div className="text-xs text-[#b8860b] font-medium">
                        {barber.role}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                        {barber.bio}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Select Date & Time */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-serif font-bold text-stone-900 mb-2">
                  Select Appointment Date
                </h4>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white border border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-900 focus:outline-none focus:border-[#b8860b]"
                />
              </div>

              <div>
                <h4 className="text-base font-serif font-bold text-stone-900 mb-2">
                  Available Time Slots
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-3 text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                        selectedTime === slot
                          ? 'bg-[#121212] text-white shadow-xs'
                          : 'bg-white border border-stone-200 text-stone-800 hover:border-stone-900'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Client Info */}
          {step === 4 && (
            <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
              <h4 className="text-base font-serif font-bold text-stone-900">
                Your Contact Information
              </h4>

              {/* Order Summary Box */}
              <div className="bg-[#f5f1ea] p-4 border border-stone-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-600">Service:</span>
                  <span className="font-bold text-stone-900">{selectedService?.name} (${selectedService?.price})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Barber:</span>
                  <span className="font-bold text-stone-900">{selectedBarber?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Date & Time:</span>
                  <span className="font-bold text-stone-900">{selectedDate} at {selectedTime || '09:00 AM'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-white border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#b8860b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#b8860b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#b8860b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Special Requests / Hair Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Skin fade on sides, textured top, beard line only..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white border border-stone-300 px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#b8860b]"
                />
              </div>
            </form>
          )}

          {/* STEP 5: Success State */}
          {step === 5 && (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10 stroke-[2]" />
              </div>

              <h4 className="text-2xl font-serif font-bold text-stone-900">
                Appointment Confirmed!
              </h4>

              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                We've reserved your slot. A confirmation message and reminder have been sent to <strong>{formData.email || 'your email'}</strong>.
              </p>

              <div className="bg-[#f5f1ea] p-4 border border-stone-300 text-xs text-left max-w-sm mx-auto space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-500">Booking ID:</span>
                  <span className="font-mono font-bold text-stone-900">{confirmedBookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Service:</span>
                  <span className="font-bold text-stone-900">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Barber:</span>
                  <span className="font-bold text-stone-900">{selectedBarber?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Time:</span>
                  <span className="font-bold text-stone-900">{selectedDate} @ {selectedTime || '09:00 AM'}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="bg-[#121212] hover:bg-[#c59b27] text-white px-8 py-3 text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 5 && (
          <div className="bg-[#f5f1ea] px-6 py-4 border-t border-stone-200/80 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-stone-700 hover:text-stone-950 uppercase cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <button
                type="button"
                disabled={step === 3 && !selectedTime}
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-2 bg-[#121212] hover:bg-[#c59b27] disabled:opacity-50 text-white px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                form="booking-form"
                type="submit"
                disabled={createBooking.isPending}
                className="inline-flex items-center gap-2 bg-[#121212] hover:bg-[#c59b27] disabled:opacity-50 text-white px-7 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer shadow-md"
              >
                {createBooking.isPending ? (
                  <span>Reserving Slot...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>Confirm Booking</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
