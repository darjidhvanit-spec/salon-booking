import { useState, useEffect } from 'react';
import type { FC, FormEvent } from 'react';
import {
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { useServices, useBarbers, useCreateBooking } from '../services/api';
import type { Service, Barber, BookingFormData } from '../types';
import { TIME_SLOTS } from '../data/mockData';

interface BookingPageProps {
  initialService?: Service | null;
  onNavigateHome: () => void;
}

export const BookingPage: FC<BookingPageProps> = ({
  initialService,
  onNavigateHome,
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
  const [bookingResult, setBookingResult] = useState<{ id: string } | null>(null);

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
      setStep(2);
    } else if (services && services.length > 0 && !selectedService) {
      setSelectedService(services[0]);
    }
  }, [initialService, services]);

  useEffect(() => {
    if (barbers && barbers.length > 0 && !selectedBarber) {
      setSelectedBarber(barbers[0]);
    }
    if (!selectedDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [barbers, selectedDate]);

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
        setBookingResult(data);
        setStep(5);
      },
    });
  };

  return (
    <div className="bg-[#faf8f5] py-16 sm:py-20 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#b8860b]"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#b8860b] uppercase">
              ONLINE RESERVATION
            </span>
            <span className="w-6 h-[1px] bg-[#b8860b]"></span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-stone-900 tracking-tight">
            Reserve Your <span className="text-[#b8860b] italic font-serif">Chair</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Select your desired service, preferred master barber, and convenient time slot.
          </p>
        </div>

        {/* Multi-step Box */}
        <div className="bg-white border border-stone-200/90 shadow-xl overflow-hidden">
          
          {/* Top Progress bar */}
          {step < 5 && (
            <div className="bg-[#121212] text-stone-300 px-6 py-4 flex items-center justify-between text-xs font-bold tracking-wider uppercase border-b border-stone-800">
              <span className={step === 1 ? 'text-[#c59b27]' : ''}>1. Service</span>
              <ChevronRight className="w-4 h-4 text-stone-600" />
              <span className={step === 2 ? 'text-[#c59b27]' : ''}>2. Barber</span>
              <ChevronRight className="w-4 h-4 text-stone-600" />
              <span className={step === 3 ? 'text-[#c59b27]' : ''}>3. Time & Date</span>
              <ChevronRight className="w-4 h-4 text-stone-600" />
              <span className={step === 4 ? 'text-[#c59b27]' : ''}>4. Confirm</span>
            </div>
          )}

          <div className="p-8 sm:p-12">
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Select a Grooming Service
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services?.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`p-5 border cursor-pointer transition-all flex items-center gap-4 ${
                        selectedService?.id === service.id
                          ? 'border-[#c59b27] bg-[#faf6ee] shadow-sm'
                          : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-16 h-16 object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                          {service.name}
                        </h4>
                        <p className="text-xs text-stone-500 mt-0.5">{service.duration}</p>
                        <p className="text-sm font-serif font-extrabold text-[#b8860b] mt-1">
                          ${service.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Select Your Master Barber
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {barbers?.map((barber) => (
                    <div
                      key={barber.id}
                      onClick={() => setSelectedBarber(barber)}
                      className={`p-5 border cursor-pointer transition-all flex items-start gap-4 ${
                        selectedBarber?.id === barber.id
                          ? 'border-[#c59b27] bg-[#faf6ee] shadow-sm'
                          : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <img
                        src={barber.image}
                        alt={barber.name}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-stone-200"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-stone-900">{barber.name}</h4>
                        <div className="text-xs text-[#b8860b] font-medium">{barber.role}</div>
                        <p className="text-xs text-stone-500 mt-1 line-clamp-2">{barber.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                    Select Appointment Date
                  </h3>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-stone-300 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-[#b8860b]"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">
                    Available Time Slots
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2.5 px-4 text-xs font-bold tracking-wider transition-all cursor-pointer ${
                          selectedTime === slot
                            ? 'bg-[#121212] text-white shadow-md'
                            : 'bg-[#faf8f5] border border-stone-200 text-stone-800 hover:border-stone-900'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <form id="full-booking-form" onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Client & Confirmation Details
                </h3>

                {/* Summary Card */}
                <div className="bg-[#f5f1ea] p-5 border border-stone-300 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Selected Service:</span>
                    <strong className="text-stone-900">{selectedService?.name} (${selectedService?.price})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Master Barber:</span>
                    <strong className="text-stone-900">{selectedBarber?.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Date & Time:</span>
                    <strong className="text-stone-900">{selectedDate} @ {selectedTime || '09:00 AM'}</strong>
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
                      placeholder="Jonathan Sterling"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#b8860b]"
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
                      className="w-full bg-[#faf8f5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#b8860b]"
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
                    placeholder="jonathan@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#faf8f5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#b8860b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Special Styling Requests / Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="E.g., high skin fade, hot towel shave, beard shape only..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#faf8f5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#b8860b]"
                  />
                </div>
              </form>
            )}

            {/* Step 5: Success confirmation */}
            {step === 5 && (
              <div className="text-center py-8 space-y-6 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-stone-900">
                  Appointment Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.customerName}</strong>! Your appointment has been successfully scheduled.
                </p>
                <div className="bg-[#faf8f5] p-6 border border-stone-300 text-xs text-left max-w-md mx-auto space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Booking Reference:</span>
                    <span className="font-mono font-bold text-stone-900">{bookingResult?.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Service:</span>
                    <span className="font-bold text-stone-900">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Master Barber:</span>
                    <span className="font-bold text-stone-900">{selectedBarber?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Date & Time:</span>
                    <span className="font-bold text-stone-900">{selectedDate} @ {selectedTime || '09:00 AM'}</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={onNavigateHome}
                    className="bg-[#121212] hover:bg-[#c59b27] text-white px-8 py-3 text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Step Actions */}
          {step < 5 && (
            <div className="bg-[#f5f1ea] px-8 py-4 border-t border-stone-200/80 flex items-center justify-between">
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
                  className="inline-flex items-center gap-2 bg-[#121212] hover:bg-[#c59b27] disabled:opacity-50 text-white px-7 py-3 text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer shadow-sm"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  form="full-booking-form"
                  type="submit"
                  disabled={createBooking.isPending}
                  className="inline-flex items-center gap-2 bg-[#121212] hover:bg-[#c59b27] disabled:opacity-50 text-white px-8 py-3 text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer shadow-md"
                >
                  {createBooking.isPending ? (
                    <span>Confirming...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#c59b27]" />
                      <span>Confirm Appointment</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
